/*
 * Halat Çekme — iki takımlı, aynı tahtada eşzamanlı kelime yarışı.
 *
 * Her soru iki tarafa da gösterilir; her takımın kendi şık düğmeleri var
 * (şık sırası iki tarafta farklı karışır, karşı tarafa bakıp kopyalanmasın).
 * İlk doğru cevap ipi o tarafa bir adım çeker. Yanlış cevap veren taraf o
 * soruda kilitlenir. İp hedef adıma ulaşınca oyun biter.
 *
 * Akıllı tahtada iki öğrenci aynı anda dokunur: düğmeler `click` yerine
 * `pointerdown` dinler — çoklu dokunuşta da her dokunuş ayrı işlenir.
 */

var OPTION_COUNT = 4;

var state = {
  pool: [],
  used: [],
  direction: "tr-en",
  goal: 5,
  pos: 0,             // negatif: sol takım (A) önde, pozitif: sağ takım (B)
  scores: { a: 0, b: 0 },
  names: { a: "", b: "" },
  question: null,
  locked: { a: false, b: false },
  answered: false,
  asked: 0
};

var generation = 0;
function later(fn, ms) {
  var g = generation;
  setTimeout(function () { if (g === generation) fn(); }, ms);
}

var headerEl = document.getElementById("tw-header");
var showScreen = HubSetup.screenSwitcher(function (id) {
  // Oyun sırasında başlık gizlenir: tahtada dikey alan değerli.
  headerEl.hidden = id === "screen-play";
  document.body.classList.toggle("tw-playing", id === "screen-play");
});
var shuffle = HubSetup.shuffle;
var setupErrorEl = document.getElementById("setup-error");

HubSound.bindToggle(document.getElementById("sound-toggle"));

/* ---------- Havuz ---------- */

function buildWordPool() {
  var seenEn = {};
  var seenTr = {};
  var words = [];
  picker.checkedUnits().forEach(function (u) {
    u.words.forEach(function (w) {
      var en = w.en.trim();
      var tr = w.tr.trim();
      // Aynı İngilizce ya da aynı Türkçe iki kez girmesin: şıklarda iki
      // "doğru görünen" seçenek çıkmasın.
      if (seenEn[en.toLowerCase()] || seenTr[tr.toLowerCase()]) return;
      seenEn[en.toLowerCase()] = true;
      seenTr[tr.toLowerCase()] = true;
      words.push({ en: en, tr: tr });
    });
  });
  return words;
}

function updateWordCount() {
  var n = buildWordPool().length;
  var el = document.getElementById("word-count");
  if (picker.checkedUnitIds().length === 0) { el.textContent = ""; return; }
  el.textContent = n >= OPTION_COUNT ? n + " kelime seçildi" : "En az " + OPTION_COUNT + " kelime gerekiyor — bir ünite daha seç.";
}

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    generation++;
    showScreen("screen-setup");
  });
});

/* ---------- Başlat ---------- */

document.getElementById("start-btn").addEventListener("click", function () {
  var pool = buildWordPool();
  if (picker.checkedUnitIds().length === 0) {
    setupErrorEl.textContent = "En az bir ünite seçmelisin.";
    setupErrorEl.hidden = false;
    return;
  }
  if (pool.length < OPTION_COUNT) {
    setupErrorEl.textContent = "Bu seçimde yeterli kelime yok (en az " + OPTION_COUNT + "). Bir ünite daha seç.";
    setupErrorEl.hidden = false;
    return;
  }
  setupErrorEl.hidden = true;
  state.pool = pool;
  state.direction = document.getElementById("direction-select").value;
  state.goal = parseInt(document.getElementById("goal-select").value, 10);
  state.names.a = document.getElementById("team-a-name").value.trim() || "Sol Takım";
  state.names.b = document.getElementById("team-b-name").value.trim() || "Sağ Takım";
  startGame();
});

document.getElementById("restart-btn").addEventListener("click", startGame);

function startGame() {
  generation++;
  state.used = [];
  state.pos = 0;
  state.asked = 0;
  state.scores = { a: 0, b: 0 };
  document.getElementById("name-a").textContent = "🔴 " + state.names.a;
  document.getElementById("name-b").textContent = state.names.b + " 🔵";
  updateScores();
  updateRope();
  showScreen("screen-play");
  nextQuestion();
}

/* ---------- Soru ---------- */

function makeQuestion() {
  var word = HubPlay.pickFresh(state.pool, state.used);
  var dir = state.direction === "mixed" ? (Math.random() < 0.5 ? "tr-en" : "en-tr") : state.direction;
  var askField = dir === "tr-en" ? "tr" : "en";
  var answerField = dir === "tr-en" ? "en" : "tr";

  var distractors = shuffle(state.pool.filter(function (w) { return w !== word; }))
    .slice(0, OPTION_COUNT - 1);
  var options = [word].concat(distractors).map(function (w) {
    return { text: w[answerField], correct: w === word };
  });

  return {
    word: word,
    label: dir === "tr-en" ? "İngilizcesi hangisi?" : "Türkçesi hangisi?",
    prompt: word[askField],
    promptLang: askField === "en" ? "en" : "tr",
    optionLang: answerField === "en" ? "en" : "tr",
    options: options,
    answer: word[answerField]
  };
}

function nextQuestion() {
  state.question = makeQuestion();
  state.locked = { a: false, b: false };
  state.answered = false;
  state.asked++;
  var q = state.question;
  document.getElementById("tw-prompt-label").textContent = q.label;
  var promptEl = document.getElementById("tw-prompt");
  promptEl.textContent = q.prompt;
  promptEl.setAttribute("lang", q.promptLang);
  setStatus("", "");
  renderSide("a");
  renderSide("b");
}

function renderSide(side) {
  var el = document.getElementById("side-" + side);
  var opts = shuffle(state.question.options.slice());
  el.innerHTML = opts.map(function (o) {
    return '<button type="button" class="tw-option" lang="' + state.question.optionLang + '" data-correct="' +
      (o.correct ? "1" : "0") + '">' + HubPlay.escapeHtml(o.text) + "</button>";
  }).join("");
  el.classList.remove("locked", "winner");
}

function setStatus(text, cls) {
  var el = document.getElementById("tw-status");
  el.innerHTML = text;
  el.className = "tw-status" + (cls ? " " + cls : "");
}

function onAnswer(side, btn) {
  if (state.answered || state.locked[side]) return;
  var other = side === "a" ? "b" : "a";
  var sideEl = document.getElementById("side-" + side);

  if (btn.getAttribute("data-correct") === "1") {
    state.answered = true;
    btn.classList.add("right");
    sideEl.classList.add("winner");
    document.getElementById("side-" + other).classList.add("locked");
    state.scores[side]++;
    state.pos += side === "a" ? -1 : 1;
    HubSound.pull();
    setTimeout(HubSound.correct, 120);
    updateScores();
    updateRope(side);
    setStatus("💪 " + HubPlay.escapeHtml(state.names[side]) + " çekti!", side);
    if (Math.abs(state.pos) >= state.goal) {
      later(function () { endGame(side); }, 1100);
    } else {
      later(nextQuestion, 1300);
    }
    return;
  }

  // Yanlış: bu taraf bu soruda kilitlenir.
  btn.classList.add("wrong");
  state.locked[side] = true;
  sideEl.classList.add("locked");
  HubSound.wrong();

  if (state.locked[other]) {
    state.answered = true;
    setStatus('İki taraf da bilemedi · Doğrusu: <strong lang="' + state.question.optionLang + '">' +
      HubPlay.escapeHtml(state.question.answer) + "</strong>", "");
    revealCorrect();
    later(nextQuestion, 1800);
  }
}

function revealCorrect() {
  document.querySelectorAll('.tw-option[data-correct="1"]').forEach(function (b) { b.classList.add("reveal"); });
}

["a", "b"].forEach(function (side) {
  document.getElementById("side-" + side).addEventListener("pointerdown", function (e) {
    var btn = e.target.closest(".tw-option");
    if (!btn) return;
    e.preventDefault();
    onAnswer(side, btn);
  });
});

/* ---------- Görsel ---------- */

function updateScores() {
  document.getElementById("score-a").textContent = state.scores.a;
  document.getElementById("score-b").textContent = state.scores.b;
}

function updateRope(pulledBy) {
  var rope = document.getElementById("tw-rope");
  // Kurdele ortadan (%50) başlar, hedefte %32 / %68'deki çizgiye değer.
  document.getElementById("tw-knot").style.left = (50 + (state.pos / state.goal) * 18) + "%";
  rope.classList.remove("tug-a", "tug-b");
  if (pulledBy) {
    void rope.offsetWidth;
    rope.classList.add("tug-" + pulledBy);
  }
}

function endGame(side) {
  var name = state.names[side];
  document.getElementById("end-title").textContent = (side === "a" ? "🔴 " : "🔵 ") + name + " kazandı!";
  document.getElementById("end-summary").textContent =
    state.names.a + " " + state.scores.a + " – " + state.scores.b + " " + state.names.b +
    " · " + state.asked + " soru soruldu";
  HubSound.win();
  HubPlay.confetti();
  showScreen("screen-end");
}

var picker = HubSetup.unitPicker({ source: CURRICULUM, onChange: updateWordCount });
picker.start();
