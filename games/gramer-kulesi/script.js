/*
 * Gramer Kulesi — boşluk doldurmalı gramer pratiği.
 *
 * Kaynak: data/grammar.js (MEB) + data/twinkl-grammar.js. Her madde
 * [cümle, doğru, çeldirici1, çeldirici2]; şıklar karıştırılır.
 * Doğru cevap kuleye bir blok ekler. Yanlış cevapta ünitenin kısa kuralı
 * gösterilir ve öğrenci "Devam" diyene kadar beklenir (kuralı okusun diye).
 */

var BLOCK_COLORS = ["#f97316", "#eab308", "#22c55e", "#06b6d4", "#6366f1", "#ec4899", "#ef4444", "#14b8a6"];

var state = {
  mode: "solo",
  item: null,          // {q, answer, options[], topic, rule}
  answered: false,
  // solo
  queue: [], index: 0, streak: 0, bestStreak: 0, missed: [],
  soloPool: [], soloWanted: 10,
  // ortak: kuleler (solo modda tek kule)
  towers: [],          // [{name, blocks: [color...]}]
  // takım
  pool: [], used: [], duration: 20, roundsPerTeam: 5,
  turnIndex: 0, totalTurns: 0, timeLeft: 0, timerId: null
};

var generation = 0;
function later(fn, ms) {
  var g = generation;
  setTimeout(function () { if (g === generation) fn(); }, ms);
}

var headerEl = document.getElementById("gk-header");
var showScreen = HubSetup.screenSwitcher(function (id) {
  headerEl.hidden = id === "screen-play";
  document.body.classList.toggle("gk-playing", id === "screen-play");
  window.scrollTo(0, 0);
});
var shuffle = HubSetup.shuffle;
var esc = HubPlay.escapeHtml;
var setupErrorEl = document.getElementById("setup-error");
var optionsEl = document.getElementById("gk-options");
var nextBtn = document.getElementById("next-btn");

HubSound.bindToggle(document.getElementById("sound-toggle"));

/* ---------- Havuz ---------- */

function buildPool() {
  var pool = [];
  picker.checkedUnits().forEach(function (u) {
    u.items.forEach(function (it) {
      pool.push({ q: it[0], answer: it[1], wrong: [it[2], it[3]], topic: u.topic, rule: u.rule });
    });
  });
  return pool;
}

function updateTopics() {
  var units = picker.checkedUnits();
  var el = document.getElementById("topic-list");
  if (units.length === 0) { el.innerHTML = ""; return; }
  var count = 0;
  units.forEach(function (u) { count += u.items.length; });
  el.innerHTML = '<p class="hint">' + count + " soru · Yapılar:</p>" +
    units.map(function (u) { return '<span class="gk-topic small">' + esc(u.topic) + "</span>"; }).join("");
}

/* ---------- Mod ---------- */

function selectedMode() {
  var c = document.querySelector('input[name="game-mode"]:checked');
  return c ? c.value : "solo";
}

function toggleModeFields() {
  var m = selectedMode();
  document.getElementById("solo-count-field").hidden = m !== "solo";
  document.getElementById("team-duration-field").hidden = m !== "team";
  document.getElementById("team-rounds-field").hidden = m !== "team";
}

document.querySelectorAll('input[name="game-mode"]').forEach(function (r) {
  r.addEventListener("change", function () {
    document.querySelectorAll(".mode-option").forEach(function (el) { el.classList.remove("checked"); });
    r.closest(".mode-option").classList.add("checked");
    toggleModeFields();
  });
});
toggleModeFields();

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    stopTimer();
    generation++;
    showScreen("screen-setup");
  });
});

document.getElementById("to-next-btn").addEventListener("click", function () {
  var pool = buildPool();
  if (pool.length === 0) {
    setupErrorEl.textContent = "En az bir ünite seçmelisin.";
    setupErrorEl.hidden = false;
    return;
  }
  setupErrorEl.hidden = true;
  state.mode = selectedMode();
  if (state.mode === "solo") {
    state.soloPool = pool;
    state.soloWanted = parseInt(document.getElementById("solo-count-select").value, 10);
    startSolo();
  } else {
    state.pool = pool;
    state.duration = parseInt(document.getElementById("team-duration-select").value, 10);
    state.roundsPerTeam = parseInt(document.getElementById("team-rounds-select").value, 10);
    showScreen("screen-teams");
  }
});

/* ---------- Kuleler ---------- */

function renderTowers(el, highlightIndex) {
  var maxBlocks = 1;
  state.towers.forEach(function (t) { maxBlocks = Math.max(maxBlocks, t.blocks.length); });
  // Kule alanı sabit yükseklikte; blok sayısı arttıkça bloklar incelir.
  var blockH = Math.max(6, Math.min(26, Math.floor(260 / maxBlocks)));
  el.style.setProperty("--block-h", blockH + "px");
  el.classList.toggle("multi", state.towers.length > 1);
  el.innerHTML = state.towers.map(function (t, i) {
    var blocks = t.blocks.map(function (color, k) {
      var fresh = k === t.blocks.length - 1 && t.fresh;
      return '<span class="gk-block' + (fresh ? " fresh" : "") + '" style="background:' + color + '"></span>';
    }).join("");
    return '<div class="gk-tower' + (i === highlightIndex ? " active" : "") + '">' +
      '<div class="gk-stack">' + blocks + "</div>" +
      '<div class="gk-base"></div>' +
      '<div class="gk-tower-name">' + esc(t.name) + ' <strong>' + t.blocks.length + "</strong></div>" +
      "</div>";
  }).join("");
  state.towers.forEach(function (t) { t.fresh = false; });
}

function addBlock(tower) {
  tower.blocks.push(BLOCK_COLORS[tower.blocks.length % BLOCK_COLORS.length]);
  tower.fresh = true;
}

/* ---------- Soru ---------- */

function showItem(item) {
  state.item = item;
  state.answered = false;
  document.getElementById("gk-topic").textContent = item.topic;
  var parts = item.q.split("___");
  document.getElementById("gk-sentence").innerHTML =
    esc(parts[0]) + '<span class="gk-gap" id="gk-gap">&nbsp;?&nbsp;</span>' + esc(parts[1] || "");
  var opts = shuffle([item.answer].concat(item.wrong));
  optionsEl.innerHTML = opts.map(function (o) {
    return '<button type="button" class="gk-option" data-value="' + esc(o) + '">' + esc(o) + "</button>";
  }).join("");
  var fb = document.getElementById("play-feedback");
  fb.textContent = "";
  fb.className = "play-feedback";
  document.getElementById("gk-rule").hidden = true;
  nextBtn.hidden = true;
}

optionsEl.addEventListener("click", function (e) {
  var btn = e.target.closest(".gk-option");
  if (!btn || state.answered) return;
  answer(btn.getAttribute("data-value"), btn);
});

function markOptions(chosenBtn, correct) {
  optionsEl.querySelectorAll(".gk-option").forEach(function (b) {
    b.disabled = true;
    if (b.getAttribute("data-value") === state.item.answer) b.classList.add("right");
  });
  if (chosenBtn && !correct) chosenBtn.classList.add("wrong");
  var gap = document.getElementById("gk-gap");
  gap.textContent = state.item.answer;
  gap.classList.add(correct ? "ok" : "fix");
}

function showRule() {
  var el = document.getElementById("gk-rule");
  el.innerHTML = "<strong>📘 Kural:</strong> " + esc(state.item.rule);
  el.hidden = false;
}

function answer(value, btn) {
  state.answered = true;
  stopTimer();
  var correct = value === state.item.answer;
  markOptions(btn, correct);
  var fb = document.getElementById("play-feedback");

  if (state.mode === "solo") {
    var tower = state.towers[0];
    if (correct) {
      state.streak++;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      addBlock(tower);
      HubSound.correct();
      fb.textContent = state.streak >= 3 ? "🔥 " + state.streak + " doğru üst üste!" : "✅ Doğru!";
      fb.className = "play-feedback good";
      renderTowers(document.getElementById("gk-towers"), -1);
      document.getElementById("play-streak").textContent = state.streak;
      later(advanceSolo, 1000);
    } else {
      state.streak = 0;
      state.missed.push(state.item);
      HubSound.wrong();
      fb.textContent = "❌ Doğrusu: " + state.item.answer;
      fb.className = "play-feedback bad";
      document.getElementById("play-streak").textContent = 0;
      showRule();
      nextBtn.textContent = state.index + 1 >= state.queue.length ? "Bitir →" : "Devam →";
      nextBtn.hidden = false;
    }
    return;
  }

  // Takım modu
  var team = currentTower();
  if (correct) {
    addBlock(team);
    HubSound.correct();
    fb.textContent = "✅ Doğru! " + team.name + " kulesine bir kat ekledi.";
    fb.className = "play-feedback good";
  } else {
    HubSound.wrong();
    fb.textContent = value === null ? "⏱️ Süre doldu!" : "❌ Olmadı.";
    fb.className = "play-feedback bad";
    showRule();
  }
  renderTowers(document.getElementById("gk-towers"), state.turnIndex % state.towers.length);
  state.turnIndex++;
  nextBtn.textContent = state.turnIndex >= state.totalTurns ? "Sonuçları Gör →" : "Sıradaki: " + currentTower().name + " →";
  nextBtn.hidden = false;
}

nextBtn.addEventListener("click", function () {
  if (state.mode === "solo") { advanceSolo(); return; }
  if (state.turnIndex >= state.totalTurns) { endTeam(); return; }
  playTeamTurn();
});

/* ---------- Tek kişilik ---------- */

function startSolo() {
  generation++;
  var count = Math.min(state.soloWanted, state.soloPool.length);
  state.queue = shuffle(state.soloPool.slice()).slice(0, count);
  state.index = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.missed = [];
  state.towers = [{ name: "Kulen", blocks: [] }];
  document.getElementById("play-streak-chip").hidden = false;
  document.getElementById("play-streak").textContent = 0;
  document.getElementById("play-timer-wrap").hidden = true;
  document.getElementById("gk-turn").hidden = true;
  showScreen("screen-play");
  renderTowers(document.getElementById("gk-towers"), -1);
  showSoloItem();
}

function showSoloItem() {
  document.getElementById("play-progress").textContent = "Soru " + (state.index + 1) + " / " + state.queue.length;
  showItem(state.queue[state.index]);
}

function advanceSolo() {
  state.index++;
  if (state.index >= state.queue.length) { endSolo(); return; }
  showSoloItem();
}

function endSolo() {
  var total = state.queue.length;
  var right = state.towers[0].blocks.length;
  var pct = right / total;
  document.getElementById("end-emoji").textContent = pct >= 0.8 ? "🏆" : (pct >= 0.5 ? "👏" : "💪");
  document.getElementById("end-title").textContent = right + " katlı kule!";
  document.getElementById("end-summary").textContent =
    total + " sorudan " + right + " doğru · En uzun seri: " + state.bestStreak + " 🔥";
  renderTowers(document.getElementById("end-towers"), -1);
  renderReview();
  if (pct >= 0.5) { HubSound.win(); HubPlay.confetti(); }
  showScreen("screen-end");
}

function renderReview() {
  var el = document.getElementById("end-review");
  if (state.mode !== "solo" || state.missed.length === 0) { el.innerHTML = ""; return; }
  el.innerHTML = '<p class="gk-review-title">Tekrar bakılacak cümleler</p>' +
    state.missed.map(function (it) {
      var parts = it.q.split("___");
      return '<div class="gk-review-item"><span lang="en">' + esc(parts[0]) + "<strong>" + esc(it.answer) + "</strong>" +
        esc(parts[1] || "") + '</span><small>' + esc(it.topic) + "</small></div>";
    }).join("");
}

document.getElementById("restart-btn").addEventListener("click", function () {
  if (state.mode === "solo") startSolo();
  else startTeamGame();
});

/* ---------- Takım ---------- */

var teamNames = [];

document.getElementById("start-team-btn").addEventListener("click", function () {
  var teams = HubPlay.parseTeams(document.getElementById("team-names"));
  var err = document.getElementById("teams-error");
  if (teams.length < 2 || teams.length > 6) {
    err.textContent = "2 ile 6 arasında takım adı girmelisin.";
    err.hidden = false;
    return;
  }
  err.hidden = true;
  teamNames = teams.map(function (t) { return t.name; });
  startTeamGame();
});

function startTeamGame() {
  generation++;
  state.towers = teamNames.map(function (n) { return { name: n, blocks: [] }; });
  state.used = [];
  state.turnIndex = 0;
  state.totalTurns = state.towers.length * state.roundsPerTeam;
  document.getElementById("play-streak-chip").hidden = true;
  document.getElementById("play-timer-wrap").hidden = false;
  document.getElementById("gk-turn").hidden = false;
  showScreen("screen-play");
  playTeamTurn();
}

function currentTower() { return state.towers[state.turnIndex % state.towers.length]; }

function playTeamTurn() {
  var round = Math.floor(state.turnIndex / state.towers.length) + 1;
  document.getElementById("play-progress").textContent = "Tur " + round + " / " + state.roundsPerTeam;
  document.getElementById("gk-turn").textContent = "Sıra: " + currentTower().name;
  renderTowers(document.getElementById("gk-towers"), state.turnIndex % state.towers.length);
  showItem(HubPlay.pickFresh(state.pool, state.used));
  startTimer();
}

function startTimer() {
  stopTimer();
  state.timeLeft = state.duration;
  updateTimer();
  state.timerId = setInterval(function () {
    state.timeLeft--;
    updateTimer();
    if (state.timeLeft <= 5 && state.timeLeft > 0) HubSound.tick();
    if (state.timeLeft <= 0) {
      stopTimer();
      HubSound.timeUp();
      answer(null, null);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
}

function updateTimer() {
  document.getElementById("play-timer-bar").style.width = Math.max(state.timeLeft / state.duration * 100, 0) + "%";
}

function endTeam() {
  var best = 0;
  state.towers.forEach(function (t) { best = Math.max(best, t.blocks.length); });
  var winners = state.towers.filter(function (t) { return t.blocks.length === best; });
  document.getElementById("end-emoji").textContent = "🏆";
  document.getElementById("end-title").textContent = winners.length > 1
    ? "Berabere: " + winners.map(function (t) { return t.name; }).join(" & ")
    : winners[0].name + " kazandı!";
  document.getElementById("end-summary").textContent = "En yüksek kule: " + best + " kat";
  renderTowers(document.getElementById("end-towers"), -1);
  renderReview();
  HubSound.win();
  HubPlay.confetti();
  showScreen("screen-end");
}

var picker = HubSetup.unitPicker({ source: GRAMMAR, onChange: updateTopics });
picker.start();
