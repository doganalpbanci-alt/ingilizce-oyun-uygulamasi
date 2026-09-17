var MAX_WRONG = 6;
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var MAX_WORD_LENGTH = 16;

var state = {
  pool: [],
  used: [],
  word: null,
  guessed: {},
  wrongCount: 0,
  roundOver: false,
  solved: 0,
  failed: 0,
  streak: 0
};

var unitWordCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");
var soundToggleBtn = document.getElementById("sound-toggle");

var showScreen = HubSetup.screenSwitcher();

var shuffle = HubSetup.shuffle;

function isLetter(ch) {
  return /[a-z]/i.test(ch);
}

/* ---------- Sound toggle ---------- */

function refreshSoundToggleIcon() {
  soundToggleBtn.textContent = SoundManager.isMuted() ? "🔇" : "🔊";
}

soundToggleBtn.addEventListener("click", function () {
  SoundManager.setMuted(!SoundManager.isMuted());
  refreshSoundToggleIcon();
});

refreshSoundToggleIcon();

/* ---------- Setup ---------- */

function buildWordPool(unitIds) {
  var grade = picker.grade();
  var seen = {};
  var words = [];
  grade.units
    .filter(function (u) { return unitIds.indexOf(u.id) !== -1; })
    .forEach(function (u) {
      u.words.forEach(function (w) {
        var key = w.en.toLowerCase() + "|" + w.tr.toLowerCase();
        if (!seen[key] && w.en.length <= MAX_WORD_LENGTH) {
          seen[key] = true;
          words.push(w);
        }
      });
    });
  return words;
}

function updateWordCount() {
  var count = buildWordPool(picker.checkedUnitIds()).length;
  unitWordCountEl.textContent = count > 0 ? count + " kelime seçildi" : "";
}

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () { showScreen("screen-setup"); });
});

document.getElementById("start-btn").addEventListener("click", function () {
  var unitIds = picker.checkedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ünite seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }

  var words = buildWordPool(unitIds);
  if (words.length === 0) {
    unitErrorEl.textContent = "Bu seçimde oynanabilir kelime yok, başka ünite seç.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  state.pool = words;
  state.used = [];
  state.solved = 0;
  state.failed = 0;
  state.streak = 0;

  buildKeyboard();
  showScreen("screen-game");
  nextWord();
});

/* ---------- Round ---------- */

function pickWord() {
  var available = state.pool.filter(function (w) {
    return state.used.indexOf(w) === -1;
  });
  if (available.length === 0) {
    state.used = [];
    available = state.pool;
  }
  var pick = available[Math.floor(Math.random() * available.length)];
  state.used.push(pick);
  return pick;
}

function nextWord() {
  state.word = pickWord();
  state.guessed = {};
  state.wrongCount = 0;
  state.roundOver = false;

  document.getElementById("hint-text").textContent = state.word.tr;
  document.getElementById("round-result").hidden = true;
  document.getElementById("wrong-letters").textContent = "";
  document.getElementById("lives-left").textContent = MAX_WRONG;

  document.querySelectorAll(".gallows .body-part").forEach(function (el) {
    el.classList.remove("shown");
  });
  document.getElementById("face-alive").classList.remove("shown");
  document.getElementById("face-dead").classList.remove("shown");

  document.querySelectorAll(".key").forEach(function (key) {
    key.disabled = false;
    key.classList.remove("hit", "miss");
  });

  renderWord();
  updateStats();
}

function buildKeyboard() {
  var kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  ALPHABET.forEach(function (letter) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "key";
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.addEventListener("click", function () { guessLetter(letter); });
    kb.appendChild(btn);
  });
}

function renderWord(revealAll) {
  var container = document.getElementById("word-display");
  container.innerHTML = "";

  state.word.en.split("").forEach(function (ch) {
    var slot = document.createElement("span");

    if (ch === " ") {
      slot.className = "letter-slot space";
      container.appendChild(slot);
      return;
    }

    if (!isLetter(ch)) {
      slot.className = "letter-slot punct";
      slot.textContent = ch;
      container.appendChild(slot);
      return;
    }

    var upper = ch.toUpperCase();
    var known = state.guessed[upper];
    slot.className = "letter-slot";

    if (known) {
      slot.textContent = upper;
      slot.classList.add("revealed");
    } else if (revealAll) {
      slot.textContent = upper;
      slot.classList.add("missed");
    }

    container.appendChild(slot);
  });
}

function wordSolved() {
  return state.word.en.split("").every(function (ch) {
    return !isLetter(ch) || state.guessed[ch.toUpperCase()];
  });
}

function guessLetter(letter) {
  if (state.roundOver) return;
  if (state.guessed[letter] !== undefined) return;

  var inWord = state.word.en.toUpperCase().indexOf(letter) !== -1;
  state.guessed[letter] = inWord;

  var keyEl = document.querySelector('.key[data-letter="' + letter + '"]');
  if (keyEl) {
    keyEl.disabled = true;
    keyEl.classList.add(inWord ? "hit" : "miss");
  }

  if (inWord) {
    SoundManager.playHit();
    renderWord();
    if (wordSolved()) finishRound(true);
    return;
  }

  SoundManager.playMiss();
  state.wrongCount++;
  document.getElementById("lives-left").textContent = Math.max(MAX_WRONG - state.wrongCount, 0);

  var part = document.querySelector('.gallows .body-part[data-part="' + state.wrongCount + '"]');
  if (part) part.classList.add("shown");
  if (state.wrongCount === 1) document.getElementById("face-alive").classList.add("shown");

  var wrongList = Object.keys(state.guessed).filter(function (l) { return !state.guessed[l]; });
  document.getElementById("wrong-letters").textContent = wrongList.join(" ");

  if (state.wrongCount >= MAX_WRONG) finishRound(false);
}

function finishRound(won) {
  state.roundOver = true;
  document.querySelectorAll(".key").forEach(function (key) { key.disabled = true; });

  var resultText = document.getElementById("round-result-text");

  if (won) {
    state.solved++;
    state.streak++;
    SoundManager.playWin();
    resultText.innerHTML = '🎉 Bravo! Kelime: <span class="answer">' + state.word.en.toUpperCase() + "</span>";
  } else {
    state.failed++;
    state.streak = 0;
    SoundManager.playLose();
    renderWord(true);
    document.getElementById("face-alive").classList.remove("shown");
    document.getElementById("face-dead").classList.add("shown");
    resultText.innerHTML = '😔 Bilemedik. Doğrusu: <span class="answer">' + state.word.en.toUpperCase() + "</span>";
  }

  updateStats();
  document.getElementById("round-result").hidden = false;
}

function updateStats() {
  document.getElementById("stat-solved").textContent = state.solved;
  document.getElementById("stat-failed").textContent = state.failed;
  document.getElementById("stat-streak").textContent = state.streak;
}

document.getElementById("next-word-btn").addEventListener("click", nextWord);

document.getElementById("skip-btn").addEventListener("click", function () {
  if (state.roundOver) {
    nextWord();
    return;
  }
  finishRound(false);
});

document.addEventListener("keydown", function (e) {
  if (document.getElementById("screen-game").hidden) return;
  var key = e.key.toUpperCase();
  if (ALPHABET.indexOf(key) !== -1) {
    guessLetter(key);
  } else if (e.key === "Enter" && state.roundOver) {
    nextWord();
  }
});

var picker = HubSetup.unitPicker({ source: CURRICULUM, onChange: updateWordCount });
picker.start();
