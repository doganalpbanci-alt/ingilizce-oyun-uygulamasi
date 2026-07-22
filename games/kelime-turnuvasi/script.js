var ROUND_SECONDS = 8;

var state = {
  grade: null,
  unitIds: [],
  words: [],
  mode: "race",
  roundCount: 5,
  roundTargetWins: 3,
  timePerPlayer: 30,
  rounds: [],
  match: null
};

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitCheckboxesEl = document.getElementById("unit-checkboxes");
var unitWordCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");
var timePerPlayerField = document.getElementById("time-per-player-field");
var timePerPlayerSelect = document.getElementById("time-per-player-select");
var roundCountSelect = document.getElementById("round-count-select");
var playerNamesEl = document.getElementById("player-names");
var playersErrorEl = document.getElementById("players-error");
var bracketViewEl = document.getElementById("bracket-view");
var nextMatchBoxEl = document.getElementById("next-match-box");
var soundToggleBtn = document.getElementById("sound-toggle");

function showScreen(id) {
  screens.forEach(function (el) {
    el.hidden = el.id !== id;
  });
}

/* ---------- Sound toggle & effects ---------- */

function refreshSoundToggleIcon() {
  soundToggleBtn.textContent = SoundManager.isMuted() ? "🔇" : "🔊";
}

soundToggleBtn.addEventListener("click", function () {
  SoundManager.setMuted(!SoundManager.isMuted());
  refreshSoundToggleIcon();
});

refreshSoundToggleIcon();

function showGoalPopup() {
  var el = document.getElementById("goal-popup");
  el.hidden = false;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
  setTimeout(function () {
    el.hidden = true;
    el.classList.remove("show");
  }, 900);
}

function triggerConfetti() {
  var container = document.getElementById("confetti-container");
  var colors = ["#facc15", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#ffffff"];
  for (var i = 0; i < 40; i++) {
    var piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2.2 + Math.random() * 1.6) + "s";
    piece.style.animationDelay = (Math.random() * 0.6) + "s";
    container.appendChild(piece);
    (function (el) {
      setTimeout(function () { el.remove(); }, 4500);
    })(piece);
  }
}

/* ---------- Setup screen ---------- */

function populateGrades() {
  Object.keys(CURRICULUM).forEach(function (gradeKey) {
    var option = document.createElement("option");
    option.value = gradeKey;
    option.textContent = CURRICULUM[gradeKey].label;
    gradeSelect.appendChild(option);
  });
  populateUnits();
}

function populateUnits() {
  var grade = CURRICULUM[gradeSelect.value];
  unitCheckboxesEl.innerHTML = "";
  grade.units.forEach(function (unit) {
    var label = document.createElement("label");
    label.className = "unit-checkbox";

    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = unit.id;
    input.addEventListener("change", function () {
      label.classList.toggle("checked", input.checked);
      updateWordCount();
    });

    var span = document.createElement("span");
    span.textContent = unit.title;

    label.appendChild(input);
    label.appendChild(span);
    unitCheckboxesEl.appendChild(label);
  });
  updateWordCount();
}

function getCheckedUnitIds() {
  return Array.prototype.slice
    .call(unitCheckboxesEl.querySelectorAll("input:checked"))
    .map(function (input) { return input.value; });
}

function buildWordPool(unitIds) {
  var grade = CURRICULUM[gradeSelect.value];
  var seen = {};
  var words = [];
  grade.units
    .filter(function (u) { return unitIds.indexOf(u.id) !== -1; })
    .forEach(function (u) {
      u.words.forEach(function (w) {
        var key = w.en.toLowerCase() + "|" + w.tr.toLowerCase();
        if (!seen[key]) {
          seen[key] = true;
          words.push(w);
        }
      });
    });
  return words;
}

function updateWordCount() {
  var count = buildWordPool(getCheckedUnitIds()).length;
  unitWordCountEl.textContent = count > 0 ? count + " kelime seçildi" : "";
}

gradeSelect.addEventListener("change", populateUnits);

document.getElementById("select-all-units").addEventListener("click", function () {
  unitCheckboxesEl.querySelectorAll("input").forEach(function (input) {
    input.checked = true;
    input.closest(".unit-checkbox").classList.add("checked");
  });
  updateWordCount();
});

document.getElementById("clear-all-units").addEventListener("click", function () {
  unitCheckboxesEl.querySelectorAll("input").forEach(function (input) {
    input.checked = false;
    input.closest(".unit-checkbox").classList.remove("checked");
  });
  updateWordCount();
});

function getSelectedMode() {
  var checked = document.querySelector('input[name="game-mode"]:checked');
  return checked ? checked.value : "race";
}

document.querySelectorAll('input[name="game-mode"]').forEach(function (radio) {
  radio.addEventListener("change", function () {
    document.querySelectorAll(".mode-option").forEach(function (label) {
      label.classList.toggle("checked", label.querySelector("input").checked);
    });
    timePerPlayerField.hidden = getSelectedMode() !== "time-attack";
  });
});

document.getElementById("to-players-btn").addEventListener("click", function () {
  var unitIds = getCheckedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ünite seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  state.grade = gradeSelect.value;
  state.unitIds = unitIds;
  state.words = buildWordPool(unitIds);
  state.mode = getSelectedMode();
  state.roundCount = parseInt(roundCountSelect.value, 10);
  state.roundTargetWins = Math.ceil(state.roundCount / 2);
  state.timePerPlayer = parseInt(timePerPlayerSelect.value, 10);

  showScreen("screen-players");
});

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    showScreen("screen-setup");
  });
});

/* ---------- Players screen -> bracket build ---------- */

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

function nextPowerOfTwo(n) {
  var p = 1;
  while (p < n) p *= 2;
  return p;
}

function buildBracket(names) {
  var shuffled = shuffle(names.slice());
  var size = nextPowerOfTwo(shuffled.length);
  while (shuffled.length < size) shuffled.push(null);

  var round1 = [];
  for (var i = 0; i < shuffled.length; i += 2) {
    var a = shuffled[i];
    var b = shuffled[i + 1];
    var isBye = a === null || b === null;
    round1.push({
      a: a,
      b: b,
      isBye: isBye,
      winner: isBye ? (a === null ? b : a) : null
    });
  }

  state.rounds = [round1];
}

document.getElementById("start-tournament-btn").addEventListener("click", function () {
  var names = playerNamesEl.value
    .split("\n")
    .map(function (n) { return n.trim(); })
    .filter(function (n) { return n.length > 0; });

  if (names.length < 2) {
    playersErrorEl.textContent = "En az 2 öğrenci adı girmelisin.";
    playersErrorEl.hidden = false;
    return;
  }

  playersErrorEl.hidden = true;
  buildBracket(names);
  renderBracketScreen();
  showScreen("screen-bracket");
});

/* ---------- Bracket status / rendering ---------- */

function getBracketStatus() {
  while (true) {
    var lastRound = state.rounds[state.rounds.length - 1];
    var pendingIndex = -1;
    for (var i = 0; i < lastRound.length; i++) {
      if (lastRound[i].winner === null) {
        pendingIndex = i;
        break;
      }
    }

    if (pendingIndex !== -1) {
      return {
        type: "match",
        roundIndex: state.rounds.length - 1,
        matchIndex: pendingIndex,
        match: lastRound[pendingIndex]
      };
    }

    if (lastRound.length === 1) {
      return { type: "champion", winner: lastRound[0].winner };
    }

    var winners = lastRound.map(function (m) { return m.winner; });
    var nextRoundMatches = [];
    for (var j = 0; j < winners.length; j += 2) {
      nextRoundMatches.push({
        a: winners[j],
        b: winners[j + 1],
        isBye: false,
        winner: null
      });
    }
    state.rounds.push(nextRoundMatches);
  }
}

function renderBracketScreen() {
  var status = getBracketStatus();

  bracketViewEl.innerHTML = state.rounds.map(function (round, roundIndex) {
    var label = round.length === 1 ? "Final" : "Tur " + (roundIndex + 1);
    var matchesHtml = round.map(function (m) {
      var aLabel = m.a === null ? "—" : m.a;
      var bLabel = m.b === null ? "—" : m.b;
      var aClass = m.winner && m.winner === m.a ? "winner" : "";
      var bClass = m.winner && m.winner === m.b ? "winner" : "";
      var byeClass = m.isBye ? " bye" : "";
      return (
        '<div class="bracket-match' + byeClass + '">' +
          '<div class="vs-row"><span class="' + aClass + '">' + aLabel + "</span></div>" +
          '<div class="vs-row"><span class="' + bClass + '">' + bLabel + "</span></div>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="bracket-round"><h4>' + label + "</h4>" + matchesHtml + "</div>"
    );
  }).join("");

  if (status.type === "champion") {
    document.getElementById("champion-name").textContent = status.winner;
    showScreen("screen-champion");
    return;
  }

  var match = status.match;
  nextMatchBoxEl.innerHTML =
    "<h3>Sıradaki Maç: " + match.a + " 🆚 " + match.b + "</h3>" +
    '<button id="start-match-btn" type="button" class="primary-btn">Maçı Başlat</button>';

  document.getElementById("start-match-btn").addEventListener("click", function () {
    startMatch(status.roundIndex, status.matchIndex, match);
  });
}

/* ---------- Match screen (shared) ---------- */

function startMatch(roundIndex, matchIndex, match) {
  state.match = {
    roundIndex: roundIndex,
    matchIndex: matchIndex,
    a: match.a,
    b: match.b,
    scoreA: 0,
    scoreB: 0,
    roundNumber: 1,
    usedWords: [],
    timerId: null,
    roundDecided: false,
    sideALocked: false,
    sideBLocked: false,
    currentWord: null,
    taScoreA: 0,
    taScoreB: 0,
    taTimerId: null,
    taUsedWords: [],
    taCurrentSide: null,
    taCurrentWord: null
  };

  document.getElementById("player-a-name").textContent = state.match.a;
  document.getElementById("player-b-name").textContent = state.match.b;
  document.getElementById("col-a-name").textContent = state.match.a;
  document.getElementById("col-b-name").textContent = state.match.b;
  updateScoreDisplay();
  updateRoundProgress();

  var raceUi = document.getElementById("race-ui");
  var taUi = document.getElementById("time-attack-ui");
  raceUi.hidden = state.mode !== "race";
  taUi.hidden = state.mode === "race";

  showScreen("screen-match");
  SoundManager.playWhistle();

  if (state.mode === "race") {
    playRound();
  } else {
    startTimeAttackRoundReady("a");
  }
}

function updateScoreDisplay() {
  document.getElementById("score-a").textContent = state.match.scoreA;
  document.getElementById("score-b").textContent = state.match.scoreB;
}

function updateRoundProgress() {
  var m = state.match;
  document.getElementById("round-progress").textContent =
    "Raunt " + m.roundNumber + " / " + state.roundCount + " • Kazanmak için " + state.roundTargetWins + " raunt gerekli";
}

function checkMatchProgress() {
  var m = state.match;
  if (m.scoreA >= state.roundTargetWins || m.scoreB >= state.roundTargetWins) {
    finishMatch();
    return;
  }
  m.roundNumber++;
  updateRoundProgress();
  if (state.mode === "race") {
    playRound();
  } else {
    startTimeAttackRoundReady("a");
  }
}

function buildOptions(correctWord) {
  var distractPool = state.words.filter(function (w) { return w !== correctWord; });
  shuffle(distractPool);
  var distractors = distractPool.slice(0, Math.min(3, distractPool.length));
  var options = distractors.map(function (w) { return { tr: w.tr, correct: false }; });
  options.push({ tr: correctWord.tr, correct: true });
  return shuffle(options);
}

function finishMatch() {
  var m = state.match;
  var winnerName = m.scoreA > m.scoreB ? m.a : m.b;
  state.rounds[m.roundIndex][m.matchIndex].winner = winnerName;
  state.match = null;
  SoundManager.playFullTimeWhistle();
  renderBracketScreen();
  if (document.getElementById("screen-champion").hidden) {
    showScreen("screen-bracket");
  } else {
    SoundManager.playCheer();
    triggerConfetti();
  }
}

/* ---------- Race mode ---------- */

function pickWord() {
  var used = state.match.usedWords;
  var available = state.words.filter(function (w, i) { return used.indexOf(i) === -1; });
  if (available.length === 0) {
    state.match.usedWords = [];
    available = state.words;
  }
  var pick = available[Math.floor(Math.random() * available.length)];
  var pickIndex = state.words.indexOf(pick);
  state.match.usedWords.push(pickIndex);
  return pick;
}

function playRound() {
  var m = state.match;
  m.roundDecided = false;
  m.sideALocked = false;
  m.sideBLocked = false;

  var word = pickWord();
  m.currentWord = word;
  var options = buildOptions(word);

  document.getElementById("round-word").textContent = word.en;
  document.getElementById("round-feedback").textContent = "";

  renderOptions("options-a", "a", options);
  renderOptions("options-b", "b", options);

  startTimer();
}

function renderOptions(containerId, side, options) {
  var container = document.getElementById(containerId);
  container.innerHTML = "";
  options.forEach(function (opt) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt.tr;
    btn.addEventListener("click", function () {
      handleOptionClick(side, opt.correct, btn);
    });
    container.appendChild(btn);
  });
}

function startTimer() {
  var bar = document.getElementById("timer-bar");
  bar.style.transition = "none";
  bar.style.width = "100%";
  // force reflow so the transition below actually animates
  void bar.offsetWidth;
  bar.style.transition = "width " + ROUND_SECONDS + "s linear";
  bar.style.width = "0%";

  var m = state.match;
  m.tickTimerIds = [3, 2, 1].filter(function (secondsLeft) {
    return secondsLeft < ROUND_SECONDS;
  }).map(function (secondsLeft) {
    return setTimeout(function () {
      if (!m.roundDecided) SoundManager.playTick();
    }, (ROUND_SECONDS - secondsLeft) * 1000);
  });

  state.match.timerId = setTimeout(function () {
    if (!state.match.roundDecided) {
      endRound(null);
    }
  }, ROUND_SECONDS * 1000);
}

function clearTimer() {
  if (state.match.timerId) {
    clearTimeout(state.match.timerId);
    state.match.timerId = null;
  }
  if (state.match.tickTimerIds) {
    state.match.tickTimerIds.forEach(clearTimeout);
    state.match.tickTimerIds = [];
  }
}

function handleOptionClick(side, isCorrect, btnEl) {
  var m = state.match;
  if (m.roundDecided) return;
  if (side === "a" && m.sideALocked) return;
  if (side === "b" && m.sideBLocked) return;

  if (isCorrect) {
    btnEl.classList.add("correct");
    SoundManager.playGoal();
    showGoalPopup();
    endRound(side);
    return;
  }

  SoundManager.playWrong();
  btnEl.classList.add("wrong");
  btnEl.disabled = true;
  if (side === "a") m.sideALocked = true;
  else m.sideBLocked = true;

  if (m.sideALocked && m.sideBLocked) {
    endRound(null);
  }
}

function endRound(winningSide) {
  var m = state.match;
  m.roundDecided = true;
  clearTimer();

  ["options-a", "options-b"].forEach(function (containerId) {
    document.querySelectorAll("#" + containerId + " .option-btn").forEach(function (btn) {
      btn.disabled = true;
      if (btn.textContent === m.currentWord.tr) {
        btn.classList.add("correct");
      }
    });
  });

  var feedback = document.getElementById("round-feedback");
  if (winningSide === "a") {
    m.scoreA++;
    feedback.textContent = m.a + " doğru bildi!";
  } else if (winningSide === "b") {
    m.scoreB++;
    feedback.textContent = m.b + " doğru bildi!";
  } else {
    feedback.textContent = "Süre doldu, kimse bilemedi.";
  }
  updateScoreDisplay();

  setTimeout(checkMatchProgress, 1200);
}

/* ---------- Time attack mode ---------- */

function startTimeAttackRoundReady(side) {
  var m = state.match;
  var name = side === "a" ? m.a : m.b;

  document.getElementById("ta-ready").hidden = false;
  document.getElementById("ta-playing").hidden = true;
  document.getElementById("ta-round-result").hidden = true;
  document.getElementById("ta-ready-name").textContent = name + ", hazır mısın?";

  var startBtn = document.getElementById("ta-start-btn");
  var freshBtn = startBtn.cloneNode(true);
  startBtn.parentNode.replaceChild(freshBtn, startBtn);
  freshBtn.addEventListener("click", function () {
    startTimeAttackRun(side);
  });
}

function startTimeAttackRun(side) {
  var m = state.match;
  document.getElementById("ta-ready").hidden = true;
  document.getElementById("ta-playing").hidden = false;
  SoundManager.playWhistle();

  var name = side === "a" ? m.a : m.b;
  document.getElementById("ta-playing-name").textContent = name;
  document.getElementById("ta-live-score").textContent = "0";

  m.taCurrentSide = side;
  m.taUsedWords = [];
  if (side === "a") m.taScoreA = 0;
  else m.taScoreB = 0;

  var bar = document.getElementById("ta-timer-bar");
  bar.style.transition = "none";
  bar.style.width = "100%";
  void bar.offsetWidth;
  bar.style.transition = "width " + state.timePerPlayer + "s linear";
  bar.style.width = "0%";

  m.taTimerId = setTimeout(function () {
    finishTimeAttackSide(side);
  }, state.timePerPlayer * 1000);

  taPlayNextWord();
}

function taPickWord() {
  var m = state.match;
  var used = m.taUsedWords;
  var available = state.words.filter(function (w, i) { return used.indexOf(i) === -1; });
  if (available.length === 0) {
    m.taUsedWords = [];
    available = state.words;
  }
  var pick = available[Math.floor(Math.random() * available.length)];
  m.taUsedWords.push(state.words.indexOf(pick));
  return pick;
}

function taPlayNextWord() {
  var m = state.match;
  var word = taPickWord();
  m.taCurrentWord = word;
  var options = buildOptions(word);

  document.getElementById("ta-word").textContent = word.en;
  var container = document.getElementById("ta-options");
  container.innerHTML = "";
  options.forEach(function (opt) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt.tr;
    btn.addEventListener("click", function () {
      taHandleAnswer(opt.correct, btn);
    });
    container.appendChild(btn);
  });
}

function taHandleAnswer(isCorrect, btnEl) {
  var m = state.match;
  var side = m.taCurrentSide;

  document.querySelectorAll("#ta-options .option-btn").forEach(function (btn) {
    btn.disabled = true;
  });

  if (isCorrect) {
    btnEl.classList.add("correct");
    SoundManager.playGoal();
    showGoalPopup();
    if (side === "a") m.taScoreA++;
    else m.taScoreB++;
  } else {
    SoundManager.playWrong();
    btnEl.classList.add("wrong");
  }

  document.getElementById("ta-live-score").textContent = side === "a" ? m.taScoreA : m.taScoreB;

  setTimeout(function () {
    if (m.taTimerId === null) return;
    taPlayNextWord();
  }, 250);
}

function finishTimeAttackSide(side) {
  var m = state.match;
  clearTimeout(m.taTimerId);
  m.taTimerId = null;
  document.getElementById("ta-options").innerHTML = "";

  if (side === "a") {
    startTimeAttackRoundReady("b");
    return;
  }

  var scoreA = m.taScoreA;
  var scoreB = m.taScoreB;
  var winningSide = scoreA > scoreB ? "a" : (scoreB > scoreA ? "b" : null);

  if (winningSide === "a") m.scoreA++;
  else if (winningSide === "b") m.scoreB++;
  updateScoreDisplay();

  document.getElementById("ta-playing").hidden = true;
  var resultEl = document.getElementById("ta-round-result");
  resultEl.hidden = false;

  var resultText = m.a + ": " + scoreA + " doğru • " + m.b + ": " + scoreB + " doğru. ";
  if (winningSide === "a") resultText += m.a + " bu raundu kazandı!";
  else if (winningSide === "b") resultText += m.b + " bu raundu kazandı!";
  else resultText += "Bu raunt berabere, kimse puan almadı.";
  resultEl.textContent = resultText;

  setTimeout(checkMatchProgress, 2000);
}

/* ---------- Restart ---------- */

document.getElementById("restart-btn").addEventListener("click", function () {
  state.rounds = [];
  state.match = null;
  playerNamesEl.value = "";
  showScreen("screen-players");
});

populateGrades();
