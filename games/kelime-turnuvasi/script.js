var TARGET_SCORE = 3;
var ROUND_SECONDS = 8;

var state = {
  grade: null,
  unitId: null,
  words: [],
  rounds: [],
  match: null
};

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitSelect = document.getElementById("unit-select");
var playerNamesEl = document.getElementById("player-names");
var playersErrorEl = document.getElementById("players-error");
var bracketViewEl = document.getElementById("bracket-view");
var nextMatchBoxEl = document.getElementById("next-match-box");

function showScreen(id) {
  screens.forEach(function (el) {
    el.hidden = el.id !== id;
  });
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
  unitSelect.innerHTML = "";
  grade.units.forEach(function (unit) {
    var option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.title;
    unitSelect.appendChild(option);
  });
}

gradeSelect.addEventListener("change", populateUnits);

document.getElementById("to-players-btn").addEventListener("click", function () {
  state.grade = gradeSelect.value;
  state.unitId = unitSelect.value;
  var unit = CURRICULUM[state.grade].units.filter(function (u) {
    return u.id === state.unitId;
  })[0];
  state.words = unit.words;
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

/* ---------- Match screen ---------- */

function startMatch(roundIndex, matchIndex, match) {
  state.match = {
    roundIndex: roundIndex,
    matchIndex: matchIndex,
    a: match.a,
    b: match.b,
    scoreA: 0,
    scoreB: 0,
    usedWords: [],
    timerId: null,
    roundDecided: false,
    sideALocked: false,
    sideBLocked: false
  };

  document.getElementById("player-a-name").textContent = state.match.a;
  document.getElementById("player-b-name").textContent = state.match.b;
  document.getElementById("col-a-name").textContent = state.match.a;
  document.getElementById("col-b-name").textContent = state.match.b;
  updateScoreDisplay();

  showScreen("screen-match");
  playRound();
}

function updateScoreDisplay() {
  document.getElementById("score-a").textContent = state.match.scoreA;
  document.getElementById("score-b").textContent = state.match.scoreB;
}

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

function buildOptions(correctWord) {
  var distractPool = state.words.filter(function (w) { return w !== correctWord; });
  shuffle(distractPool);
  var distractors = distractPool.slice(0, Math.min(3, distractPool.length));
  var options = distractors.map(function (w) { return { tr: w.tr, correct: false }; });
  options.push({ tr: correctWord.tr, correct: true });
  return shuffle(options);
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
}

function handleOptionClick(side, isCorrect, btnEl) {
  var m = state.match;
  if (m.roundDecided) return;
  if (side === "a" && m.sideALocked) return;
  if (side === "b" && m.sideBLocked) return;

  if (isCorrect) {
    btnEl.classList.add("correct");
    endRound(side);
    return;
  }

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

  setTimeout(function () {
    if (m.scoreA >= TARGET_SCORE || m.scoreB >= TARGET_SCORE) {
      finishMatch();
    } else {
      playRound();
    }
  }, 1200);
}

function finishMatch() {
  var m = state.match;
  var winnerName = m.scoreA > m.scoreB ? m.a : m.b;
  state.rounds[m.roundIndex][m.matchIndex].winner = winnerName;
  state.match = null;
  renderBracketScreen();
  if (document.getElementById("screen-champion").hidden) {
    showScreen("screen-bracket");
  }
}

/* ---------- Restart ---------- */

document.getElementById("restart-btn").addEventListener("click", function () {
  state.rounds = [];
  state.match = null;
  playerNamesEl.value = "";
  showScreen("screen-players");
});

populateGrades();
