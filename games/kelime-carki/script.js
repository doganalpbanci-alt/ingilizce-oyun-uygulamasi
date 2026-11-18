/*
 * Kelime Çarkı — sınıfta konuşturma oyunu.
 *
 * Çark bir GÖREV seçer (Türkçesini söyle, hecele, cümle kur, canlandır...),
 * seçili ünitelerden rastgele bir kelime gelir. Takım adı girildiyse sıra
 * takımlar arasında döner ve öğretmen "Bildi / Bilemedi" ile puan verir.
 * Takım girilmezse puan tutulmaz; çark serbest kullanılır.
 *
 * "Canlandır" ve "Çiz" görevlerinde kelime tahtada gizli gelir: yalnızca
 * anlatacak öğrenci "Kelimeyi gör" ile bakar.
 */

var TASKS = [
  { id: "tr", short: "Türkçesi?", text: "Bu kelimenin Türkçesini söyle.", show: "en", points: 1, color: "#3b82f6" },
  { id: "en", short: "İngilizcesi?", text: "Bu kelimenin İngilizcesini söyle.", show: "tr", points: 1, color: "#22c55e" },
  { id: "spell", short: "Hecele", text: "İngilizcesini harf harf hecele (spell).", show: "tr", points: 2, color: "#f59e0b", spellable: true },
  { id: "sentence", short: "Cümle kur", text: "Bu kelimeyle İngilizce bir cümle kur.", show: "en", points: 2, color: "#a855f7" },
  { id: "mime", short: "Canlandır", text: "Konuşmadan canlandır, takımın İngilizcesini tahmin etsin.", show: "en", points: 2, color: "#ec4899", secret: true },
  { id: "draw", short: "Çiz", text: "Tahtaya çiz, takımın İngilizcesini tahmin etsin.", show: "en", points: 2, color: "#14b8a6", secret: true },
  { id: "bonus", short: "⭐ Bonus", text: "Şanslı gün! Takım 1 puan kazandı.", special: "bonus", color: "#eab308" },
  { id: "pass", short: "🔁 Pas", text: "Pas! Sıra diğer takıma geçiyor.", special: "pass", color: "#64748b" }
];

var DEFAULT_TASKS = ["tr", "en", "spell", "sentence", "mime", "draw", "bonus", "pass"];
var MIN_SEGMENTS = 8;

var state = {
  pool: [],
  used: [],
  segments: [],       // TASKS öğeleri (çarkta görünme sırası)
  rotation: 0,
  spinning: false,
  current: null,      // {task, word}
  teams: [],
  turn: 0,
  awaitingScore: false
};

var headerEl = document.getElementById("kc-header");
var showScreen = HubSetup.screenSwitcher(function (id) {
  headerEl.hidden = id === "screen-wheel";
  document.body.classList.toggle("kc-playing", id === "screen-wheel");
});
var esc = HubPlay.escapeHtml;
var wheelEl = document.getElementById("kc-wheel");
var spinBtn = document.getElementById("spin-btn");

HubSound.bindToggle(document.getElementById("sound-toggle"));

/* ---------- Kurulum ---------- */

(function renderTaskBoxes() {
  var box = document.getElementById("task-checkboxes");
  box.innerHTML = TASKS.map(function (t) {
    var on = DEFAULT_TASKS.indexOf(t.id) !== -1;
    return '<label class="unit-checkbox' + (on ? " checked" : "") + '"><input type="checkbox" value="' + t.id + '"' +
      (on ? " checked" : "") + '><span><strong>' + esc(t.short) + "</strong> — " + esc(t.text) + "</span></label>";
  }).join("");
  box.addEventListener("change", function (e) {
    var label = e.target.closest(".unit-checkbox");
    if (label) label.classList.toggle("checked", e.target.checked);
  });
})();

function selectedTasks() {
  var ids = Array.prototype.map.call(
    document.querySelectorAll("#task-checkboxes input:checked"),
    function (i) { return i.value; }
  );
  return TASKS.filter(function (t) { return ids.indexOf(t.id) !== -1; });
}

function buildPool() {
  var seen = {};
  var pool = [];
  picker.checkedUnits().forEach(function (u) {
    u.words.forEach(function (w) {
      var key = w.en.toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      pool.push({ en: w.en, tr: w.tr });
    });
  });
  return pool;
}

function updateWordCount() {
  var n = buildPool().length;
  document.getElementById("word-count").textContent = picker.checkedUnitIds().length ? n + " kelime seçildi" : "";
}

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () { showScreen("screen-setup"); });
});

document.getElementById("start-btn").addEventListener("click", function () {
  var err = document.getElementById("setup-error");
  var tasks = selectedTasks();
  var playable = tasks.filter(function (t) { return !t.special; });
  if (picker.checkedUnitIds().length === 0) { err.textContent = "En az bir ünite seçmelisin."; err.hidden = false; return; }
  if (playable.length === 0) { err.textContent = "Bonus/Pas dışında en az bir görev seçmelisin."; err.hidden = false; return; }
  err.hidden = true;

  state.pool = buildPool();
  state.used = [];
  state.teams = HubPlay.parseTeams(document.getElementById("team-names"));
  state.turn = 0;
  state.awaitingScore = false;

  // Görev sayısı azsa çark dolu görünsün diye görevler tekrar edilir.
  state.segments = [];
  while (state.segments.length < MIN_SEGMENTS) state.segments = state.segments.concat(tasks);

  renderWheel();
  resetCard();
  document.getElementById("kc-scoring").hidden = state.teams.length === 0;
  updateTurn();
  renderScores();
  showScreen("screen-wheel");
});

/* ---------- Çark ---------- */

function renderWheel() {
  var n = state.segments.length;
  var seg = 360 / n;
  var stops = state.segments.map(function (t, i) {
    return t.color + " " + (i * seg) + "deg " + ((i + 1) * seg) + "deg";
  });
  wheelEl.style.background = "conic-gradient(" + stops.join(", ") + ")";
  wheelEl.innerHTML = state.segments.map(function (t, i) {
    var angle = i * seg + seg / 2;
    return '<span class="kc-label" style="transform: rotate(' + angle + 'deg)"><span>' + esc(t.short) + "</span></span>";
  }).join("");
  state.rotation = 0;
  wheelEl.style.transition = "none";
  wheelEl.style.transform = "rotate(0deg)";
}

spinBtn.addEventListener("click", spin);

function spin() {
  if (state.spinning) return;
  if (state.awaitingScore) {
    // Önceki görev puanlanmadan çevrilirse "bilemedi" sayılır.
    nextTurn();
  }
  state.spinning = true;
  spinBtn.disabled = true;
  resetCard();

  var n = state.segments.length;
  var seg = 360 / n;
  var index = Math.floor(Math.random() * n);
  // Dilimin ortası yukarıdaki oka gelsin (küçük rastgele kayma ile).
  var target = -(index * seg + seg / 2) + (Math.random() - 0.5) * seg * 0.6;
  var current = state.rotation % 360;
  var delta = ((target - current) % 360 + 360) % 360;
  state.rotation += 360 * 5 + delta;

  wheelEl.style.transition = "transform 3.6s cubic-bezier(0.17, 0.67, 0.12, 1)";
  wheelEl.style.transform = "rotate(" + state.rotation + "deg)";

  // Dönerken tık sesleri (yavaşlayarak).
  var ticks = 0;
  (function tick(delay) {
    if (ticks++ > 18) return;
    HubSound.tick();
    setTimeout(function () { tick(delay * 1.18); }, delay);
  })(60);

  setTimeout(function () { onLanded(state.segments[index]); }, 3700);
}

function pickWord(task) {
  var pool = state.pool;
  if (task.spellable) {
    var spellable = pool.filter(function (w) { return /^[a-z]+$/i.test(w.en); });
    if (spellable.length) pool = spellable;
  }
  return HubPlay.pickFresh(pool, state.used);
}

function onLanded(task) {
  state.spinning = false;
  spinBtn.disabled = false;
  document.getElementById("kc-placeholder").hidden = true;
  document.getElementById("kc-result").hidden = false;

  var card = document.getElementById("kc-card");
  card.style.setProperty("--task-color", task.color);
  card.classList.add("landed");
  document.getElementById("kc-task").textContent = task.short + " · " + task.text;

  var wordEl = document.getElementById("kc-word");
  var revealBtn = document.getElementById("reveal-btn");
  var answerEl = document.getElementById("kc-answer");
  var sayBtn = document.getElementById("say-btn");
  answerEl.hidden = true;
  sayBtn.hidden = true;

  if (task.special) {
    state.current = { task: task, word: null };
    wordEl.textContent = task.special === "bonus" ? "⭐" : "🔁";
    wordEl.removeAttribute("lang");
    revealBtn.hidden = true;
    HubSound.correct();
    if (state.teams.length) {
      if (task.special === "bonus") currentTeam().score += 1;
      renderScores();
      nextTurn();
    }
    return;
  }

  var word = pickWord(task);
  state.current = { task: task, word: word };
  HubSound.correct();

  if (task.secret) {
    wordEl.textContent = "🤫";
    wordEl.removeAttribute("lang");
    revealBtn.textContent = "👀 Kelimeyi Gör (sadece anlatan baksın)";
  } else {
    wordEl.textContent = word[task.show];
    wordEl.setAttribute("lang", task.show === "en" ? "en" : "tr");
    revealBtn.textContent = "👁️ Cevabı Göster";
  }
  revealBtn.hidden = false;
  state.awaitingScore = state.teams.length > 0;
  document.getElementById("score-ok").textContent = "✅ Bildi (+" + task.points + ")";
}

document.getElementById("reveal-btn").addEventListener("click", function () {
  var c = state.current;
  if (!c || !c.word) return;
  var answerEl = document.getElementById("kc-answer");
  answerEl.innerHTML = '<span lang="en">' + esc(c.word.en) + "</span> = " + esc(c.word.tr);
  answerEl.hidden = !answerEl.hidden;
  if (typeof HubSpeech !== "undefined" && HubSpeech.available()) document.getElementById("say-btn").hidden = answerEl.hidden;
});

document.getElementById("say-btn").addEventListener("click", function () {
  if (state.current && state.current.word) HubSpeech.speak(state.current.word.en);
});

function resetCard() {
  document.getElementById("kc-placeholder").hidden = false;
  document.getElementById("kc-result").hidden = true;
  document.getElementById("kc-card").classList.remove("landed");
}

/* ---------- Takım puanı ---------- */

function currentTeam() { return state.teams[state.turn % state.teams.length]; }

function updateTurn() {
  var chip = document.getElementById("turn-chip");
  if (!state.teams.length) { chip.hidden = true; return; }
  chip.hidden = false;
  chip.textContent = "Sıra: " + currentTeam().name;
}

function nextTurn() {
  state.awaitingScore = false;
  state.turn++;
  updateTurn();
}

function renderScores() {
  if (!state.teams.length) return;
  HubPlay.renderScoreboard(document.getElementById("scoreboard"), state.teams, true);
}

document.getElementById("score-ok").addEventListener("click", function () {
  if (!state.awaitingScore || !state.current || !state.current.word) return;
  currentTeam().score += state.current.task.points;
  HubSound.win();
  renderScores();
  nextTurn();
});

document.getElementById("score-no").addEventListener("click", function () {
  if (!state.awaitingScore) return;
  HubSound.wrong();
  nextTurn();
});

var picker = HubSetup.unitPicker({ source: CURRICULUM, onChange: updateWordCount });
picker.start();
