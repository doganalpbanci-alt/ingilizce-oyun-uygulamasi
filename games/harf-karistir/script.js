/*
 * Harf Karıştır — yazım (spelling) pratiği.
 *
 * Türkçe ipucu gösterilir, İngilizce kelimenin harfleri karışık kartlar
 * olarak gelir. Öğrenci harflere sırayla dokunur (veya klavyeden yazar);
 * tüm kutular dolunca kelime otomatik kontrol edilir.
 *
 * Boşluk, kesme işareti ve tire kartlaştırılmaz, yerinde sabit gösterilir
 * ("ice cream", "o'clock"). Harf dışı karakter içeren kelimeler (Türkiye,
 * sayı vb.) havuza alınmaz.
 */

var MAX_LETTERS = 14;
var MIN_LETTERS = 3;
var VALID_RE = /^[a-z][a-z '\-]*[a-z]$/i;

var state = {
  mode: "solo",
  word: null,          // {en, tr}
  slots: [],           // [{fixed:bool, char, tileId|null}]
  tiles: [],           // [{id, char, used}]
  hintsUsed: 0,
  locked: false,
  // solo
  queue: [], index: 0, score: 0, streak: 0, bestStreak: 0,
  soloPool: [], soloWanted: 10, results: [],
  // takım
  pool: [], used: [], teams: [], duration: 30, roundsPerTeam: 3,
  turnIndex: 0, totalTurns: 0, timeLeft: 0, timerId: null, finished: false
};

// Gecikmeli geçişler (doğru cevaptan sonra 1 sn bekleme gibi) oyuncu bu
// arada kurulum ekranına dönüp yeni oyun başlatırsa eski oyunu ilerletmesin.
var generation = 0;
function later(fn, ms) {
  var g = generation;
  setTimeout(function () { if (g === generation) fn(); }, ms);
}

var showScreen = HubSetup.screenSwitcher();
var shuffle = HubSetup.shuffle;
var slotsEl = document.getElementById("hk-slots");
var lettersEl = document.getElementById("hk-letters");
var feedbackEl = document.getElementById("play-feedback");
var setupErrorEl = document.getElementById("setup-error");

HubSound.bindToggle(document.getElementById("sound-toggle"));

/* ---------- Havuz ---------- */

function letterCount(en) {
  return en.replace(/[^a-z]/gi, "").length;
}

function lengthOk(n, filter) {
  if (filter === "short") return n >= 3 && n <= 5;
  if (filter === "medium") return n >= 6 && n <= 8;
  if (filter === "long") return n >= 9;
  return true;
}

function buildWordPool() {
  var filter = document.getElementById("length-select").value;
  var seen = {};
  var words = [];
  picker.checkedUnits().forEach(function (u) {
    u.words.forEach(function (w) {
      var en = w.en.trim();
      var n = letterCount(en);
      if (!VALID_RE.test(en) || n < MIN_LETTERS || n > MAX_LETTERS) return;
      if (en.split(" ").length > 2) return;   // uzun ifadeler tahtada karışıyor
      if (!lengthOk(n, filter)) return;
      var key = en.toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      words.push({ en: en, tr: w.tr });
    });
  });
  return words;
}

function updateWordCount() {
  var n = buildWordPool().length;
  var el = document.getElementById("word-count");
  el.textContent = picker.checkedUnitIds().length === 0
    ? ""
    : (n > 0 ? n + " kelime bu oyuna uygun" : "Bu seçimde uygun kelime yok.");
}

document.getElementById("length-select").addEventListener("change", updateWordCount);

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
    state.locked = true;
    generation++;
    showScreen("screen-setup");
  });
});

document.getElementById("to-next-btn").addEventListener("click", function () {
  if (picker.checkedUnitIds().length === 0) {
    setupErrorEl.textContent = "En az bir ünite seçmelisin.";
    setupErrorEl.hidden = false;
    return;
  }
  var pool = buildWordPool();
  if (pool.length === 0) {
    setupErrorEl.textContent = "Bu seçimde uygun kelime yok. Ünite veya uzunluk seçimini değiştir.";
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
    state.used = [];
    state.duration = parseInt(document.getElementById("team-duration-select").value, 10);
    state.roundsPerTeam = parseInt(document.getElementById("team-rounds-select").value, 10);
    showScreen("screen-teams");
  }
});

/* ---------- Bulmaca ---------- */

function setupWord(word) {
  state.word = word;
  state.hintsUsed = 0;
  state.locked = false;
  state.slots = [];
  var letters = [];
  word.en.split("").forEach(function (ch) {
    if (/[a-z]/i.test(ch)) {
      state.slots.push({ fixed: false, char: ch.toUpperCase(), tileId: null, hinted: false });
      letters.push(ch.toUpperCase());
    } else {
      state.slots.push({ fixed: true, char: ch, tileId: null });
    }
  });

  // Karıştır; kelimenin kendisiyle aynı sırada çıkmasın.
  var original = letters.join("");
  var mixed = letters.slice();
  for (var tries = 0; tries < 10; tries++) {
    shuffle(mixed);
    if (mixed.join("") !== original) break;
  }
  state.tiles = mixed.map(function (ch, i) { return { id: i, char: ch, used: false }; });

  document.getElementById("hk-clue").textContent = word.tr;
  feedbackEl.textContent = "";
  feedbackEl.className = "play-feedback";
  document.getElementById("hint-btn").disabled = false;
  document.getElementById("undo-btn").disabled = false;
  document.getElementById("skip-btn").disabled = false;
  render();
}

function render() {
  slotsEl.classList.remove("solved");
  var wordLetters = 0;
  slotsEl.innerHTML = state.slots.map(function (s, i) {
    if (s.fixed) {
      return s.char === " "
        ? '<span class="hk-gap"></span>'
        : '<span class="hk-fixed">' + HubPlay.escapeHtml(s.char) + "</span>";
    }
    wordLetters++;
    var filled = s.tileId !== null || s.hinted;
    return '<button type="button" class="hk-slot' + (filled ? " filled" : "") + (s.hinted ? " hinted" : "") +
      '" data-slot="' + i + '"' + (s.hinted ? " disabled" : "") + ">" + (filled ? slotChar(s) : "") + "</button>";
  }).join("");
  slotsEl.style.setProperty("--n", Math.max(wordLetters, 4));

  lettersEl.innerHTML = state.tiles.map(function (t) {
    return '<button type="button" class="hk-tile' + (t.used ? " used" : "") + '" data-tile="' + t.id + '"' +
      (t.used ? " disabled" : "") + ">" + t.char + "</button>";
  }).join("");
}

function slotChar(s) {
  if (s.hinted) return s.char;
  var t = state.tiles[s.tileId];
  return t ? t.char : "";
}

function firstEmptySlot() {
  for (var i = 0; i < state.slots.length; i++) {
    var s = state.slots[i];
    if (!s.fixed && !s.hinted && s.tileId === null) return i;
  }
  return -1;
}

function placeTile(tileId) {
  if (state.locked) return;
  var tile = state.tiles[tileId];
  if (!tile || tile.used) return;
  var slot = firstEmptySlot();
  if (slot === -1) return;
  tile.used = true;
  state.slots[slot].tileId = tileId;
  HubSound.tap();
  render();
  if (firstEmptySlot() === -1) checkWord();
}

function removeFromSlot(i) {
  if (state.locked) return;
  var s = state.slots[i];
  if (!s || s.fixed || s.hinted || s.tileId === null) return;
  state.tiles[s.tileId].used = false;
  s.tileId = null;
  HubSound.undo();
  feedbackEl.textContent = "";
  render();
}

function undoLast() {
  for (var i = state.slots.length - 1; i >= 0; i--) {
    var s = state.slots[i];
    if (!s.fixed && !s.hinted && s.tileId !== null) { removeFromSlot(i); return; }
  }
}

// İpucu: ilk doğru olmayan kutuya doğru harfi kilitler.
function giveHint() {
  if (state.locked) return;
  // Önce yanlış yerleştirilmiş harfleri geri al ki doğru harf kartı boşa çıksın.
  for (var i = 0; i < state.slots.length; i++) {
    var s = state.slots[i];
    if (s.fixed || s.hinted) continue;
    if (s.tileId !== null && state.tiles[s.tileId].char === s.char) continue;
    // Bu kutuya doğru harfi koy.
    if (s.tileId !== null) { state.tiles[s.tileId].used = false; s.tileId = null; }
    var tile = null;
    for (var k = 0; k < state.tiles.length; k++) {
      if (!state.tiles[k].used && state.tiles[k].char === s.char) { tile = state.tiles[k]; break; }
    }
    if (!tile) {
      // Doğru harf başka bir kutuda yanlış yerde duruyor: oradan al.
      for (var j = i + 1; j < state.slots.length; j++) {
        var o = state.slots[j];
        if (!o.fixed && !o.hinted && o.tileId !== null && state.tiles[o.tileId].char === s.char) {
          tile = state.tiles[o.tileId];
          o.tileId = null;
          break;
        }
      }
    }
    if (!tile) return;
    tile.used = true;
    s.hinted = true;
    s.tileId = tile.id;
    state.hintsUsed++;
    HubSound.tap();
    render();
    if (firstEmptySlot() === -1) checkWord();
    return;
  }
}

function typedWord() {
  return state.slots.map(function (s) { return s.fixed ? s.char : slotChar(s); }).join("");
}

function checkWord() {
  if (typedWord().toUpperCase() === state.word.en.toUpperCase()) {
    state.locked = true;
    slotsEl.classList.add("solved");
    setButtons(false);
    onSolved();
  } else {
    HubSound.wrong();
    feedbackEl.textContent = "Olmadı — harflerin yerini değiştir.";
    feedbackEl.className = "play-feedback bad";
    slotsEl.classList.remove("shake");
    void slotsEl.offsetWidth;
    slotsEl.classList.add("shake");
  }
}

function setButtons(enabled) {
  ["hint-btn", "undo-btn", "skip-btn"].forEach(function (id) {
    document.getElementById(id).disabled = !enabled;
  });
}

slotsEl.addEventListener("click", function (e) {
  var b = e.target.closest(".hk-slot");
  if (b) removeFromSlot(parseInt(b.getAttribute("data-slot"), 10));
});

lettersEl.addEventListener("click", function (e) {
  var b = e.target.closest(".hk-tile");
  if (b) placeTile(parseInt(b.getAttribute("data-tile"), 10));
});

document.getElementById("undo-btn").addEventListener("click", undoLast);
document.getElementById("hint-btn").addEventListener("click", giveHint);
document.getElementById("skip-btn").addEventListener("click", function () {
  if (state.locked) return;
  state.locked = true;
  setButtons(false);
  revealAnswer();
  if (state.mode === "solo") {
    state.streak = 0;
    state.results.push({ word: state.word, ok: false });
    later(advanceSolo, 1400);
  } else {
    later(function () { endTurn(false); }, 1400);
  }
});

function revealAnswer() {
  feedbackEl.innerHTML = 'Doğrusu: <strong lang="en">' + HubPlay.escapeHtml(state.word.en) + "</strong>";
  feedbackEl.className = "play-feedback";
}

document.addEventListener("keydown", function (e) {
  if (document.getElementById("screen-play").hidden || state.locked) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "Backspace") { e.preventDefault(); undoLast(); return; }
  if (/^[a-z]$/i.test(e.key)) {
    var ch = e.key.toUpperCase();
    for (var i = 0; i < state.tiles.length; i++) {
      if (!state.tiles[i].used && state.tiles[i].char === ch) { placeTile(i); return; }
    }
  }
});

/* ---------- Tek kişilik ---------- */

function startSolo() {
  generation++;
  var count = Math.min(state.soloWanted, state.soloPool.length);
  state.queue = shuffle(state.soloPool.slice()).slice(0, count);
  state.index = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.results = [];
  document.getElementById("play-score-chip").hidden = false;
  document.getElementById("play-streak-chip").hidden = false;
  document.getElementById("play-timer-wrap").hidden = true;
  document.getElementById("skip-btn").textContent = "⏭️ Geç";
  showSoloWord();
  showScreen("screen-play");
}

function showSoloWord() {
  setupWord(state.queue[state.index]);
  document.getElementById("play-progress").textContent = "Kelime " + (state.index + 1) + " / " + state.queue.length;
  document.getElementById("play-score").textContent = state.score;
  document.getElementById("play-streak").textContent = state.streak;
}

function onSolved() {
  HubSound.correct();
  if (state.mode === "solo") {
    var earned = Math.max(10 - state.hintsUsed * 3, 2);
    state.score += earned;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.results.push({ word: state.word, ok: state.hintsUsed === 0 });
    feedbackEl.textContent = "🎉 Harika! +" + earned + " puan";
    feedbackEl.className = "play-feedback good";
    document.getElementById("play-score").textContent = state.score;
    document.getElementById("play-streak").textContent = state.streak;
    later(advanceSolo, 1000);
  } else {
    feedbackEl.textContent = "🎉 Doğru!";
    feedbackEl.className = "play-feedback good";
    stopTimer();
    later(function () { endTurn(true); }, 800);
  }
}

function advanceSolo() {
  state.index++;
  if (state.index >= state.queue.length) { endSolo(); return; }
  showSoloWord();
}

function endSolo() {
  var clean = state.results.filter(function (r) { return r.ok; }).length;
  document.getElementById("solo-end-summary").textContent =
    "Skor: " + state.score + " puan · İpucusuz doğru: " + clean + " / " + state.results.length +
    " · En uzun seri: " + state.bestStreak + " 🔥";
  var missed = state.results.filter(function (r) { return !r.ok; });
  document.getElementById("solo-review").innerHTML = missed.length === 0 ? "" :
    '<p class="hk-review-title">Tekrar bakılacak kelimeler</p>' +
    missed.map(function (r) {
      return '<span class="hk-review-item"><strong>' + HubPlay.escapeHtml(r.word.en) + "</strong> " +
        '<span lang="tr">' + HubPlay.escapeHtml(r.word.tr) + "</span></span>";
    }).join("");
  HubSound.win();
  HubPlay.confetti();
  showScreen("screen-solo-end");
}

document.getElementById("solo-restart-btn").addEventListener("click", startSolo);

/* ---------- Takım ---------- */

document.getElementById("start-team-btn").addEventListener("click", function () {
  var teams = HubPlay.parseTeams(document.getElementById("team-names"));
  var err = document.getElementById("teams-error");
  if (teams.length < 2) {
    err.textContent = "En az 2 takım adı girmelisin.";
    err.hidden = false;
    return;
  }
  err.hidden = true;
  state.teams = teams;
  state.used = [];
  state.turnIndex = 0;
  state.totalTurns = teams.length * state.roundsPerTeam;
  state.finished = false;
  document.getElementById("play-score-chip").hidden = true;
  document.getElementById("play-streak-chip").hidden = true;
  document.getElementById("play-timer-wrap").hidden = false;
  document.getElementById("skip-btn").textContent = "⏭️ Pas Geç";
  showTurn();
});

function currentTeam() { return state.teams[state.turnIndex % state.teams.length]; }
function currentRound() { return Math.floor(state.turnIndex / state.teams.length) + 1; }

function showTurn() {
  document.getElementById("turn-round").textContent = "Tur " + currentRound() + " / " + state.roundsPerTeam;
  document.getElementById("turn-team").textContent = currentTeam().name;
  showScreen("screen-turn");
}

document.getElementById("turn-start-btn").addEventListener("click", function () {
  setupWord(HubPlay.pickFresh(state.pool, state.used));
  document.getElementById("play-progress").textContent =
    currentTeam().name + " · Tur " + currentRound() + "/" + state.roundsPerTeam;
  showScreen("screen-play");
  startTimer();
});

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
      state.locked = true;
      setButtons(false);
      revealAnswer();
      HubSound.timeUp();
      later(function () { endTurn(false); }, 1400);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
}

function updateTimer() {
  document.getElementById("play-timer-bar").style.width = Math.max(state.timeLeft / state.duration * 100, 0) + "%";
}

function endTurn(solved) {
  stopTimer();
  var earned = 0;
  if (solved) {
    earned = Math.max(10 - state.hintsUsed * 3, 2) + Math.floor(Math.max(state.timeLeft, 0) / 5) * 2;
    currentTeam().score += earned;
  }
  state.turnIndex++;
  var last = state.turnIndex >= state.totalTurns;
  HubPlay.renderScoreboard(document.getElementById("scoreboard"), state.teams, last);
  document.getElementById("score-subtitle").innerHTML = (solved
    ? "🎉 Doğru! +" + earned + " puan"
    : "Bu turda puan yok.") + ' · Kelime: <strong lang="en">' + HubPlay.escapeHtml(state.word.en) + "</strong>";

  if (last) {
    state.finished = true;
    document.getElementById("score-title").textContent = "🏆 Oyun Bitti!";
    document.getElementById("continue-btn").textContent = "Yeni Oyun";
    HubSound.win();
    HubPlay.confetti();
  } else {
    document.getElementById("score-title").textContent = "Skor Tablosu";
    document.getElementById("continue-btn").textContent = "Sıradaki Takım →";
  }
  showScreen("screen-score");
}

document.getElementById("continue-btn").addEventListener("click", function () {
  if (state.finished) { showScreen("screen-teams"); return; }
  showTurn();
});

var picker = HubSetup.unitPicker({ source: CURRICULUM, onChange: updateWordCount });
picker.start();
