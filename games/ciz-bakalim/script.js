var COLORS = ["#1e1b2e", "#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#ffffff"];
var SIZES = [4, 10, 20];

var state = {
  words: [],
  usedWords: [],
  teams: [],
  duration: 60,
  roundsPerTeam: 3,
  turnIndex: 0,
  totalTurns: 0,
  currentWord: null,
  timeLeft: 0,
  timerId: null,
  finished: false
};

var draw = {
  strokes: [],
  current: null,
  drawing: false,
  color: COLORS[0],
  size: SIZES[1]
};

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitCheckboxesEl = document.getElementById("unit-checkboxes");
var unitWordCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");
var teamNamesEl = document.getElementById("team-names");
var teamsErrorEl = document.getElementById("teams-error");
var soundToggleBtn = document.getElementById("sound-toggle");

var canvas = document.getElementById("board");
var ctx2d = canvas.getContext("2d");

function showScreen(id) {
  screens.forEach(function (el) { el.hidden = el.id !== id; });
  document.body.classList.toggle("compact", id === "screen-draw");
  if (id === "screen-draw") {
    syncDrawHeight();
    resizeCanvas();
  }
}

// Çizim ekranının sayfadaki gerçek başlangıç noktasını ölçüp altında kalan
// yüksekliği CSS'e aktarır; böylece tuval + araçlar + aksiyon butonları
// ekrana tam sığar. (Başlığın altını değil ekranın kendi üstünü ölçüyoruz,
// çünkü aradaki main dolgusu da yer kaplıyor.)
function syncDrawHeight() {
  var screenEl = document.getElementById("screen-draw");
  var top = screenEl.getBoundingClientRect().top;
  var avail = Math.max(window.innerHeight - top - 10, 320);
  document.documentElement.style.setProperty("--draw-avail", avail + "px");
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
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

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    stopTimer();
    showScreen("screen-setup");
  });
});

document.getElementById("to-teams-btn").addEventListener("click", function () {
  var unitIds = getCheckedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ünite seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  state.words = buildWordPool(unitIds);
  state.duration = parseInt(document.getElementById("duration-select").value, 10);
  state.roundsPerTeam = parseInt(document.getElementById("rounds-select").value, 10);
  showScreen("screen-teams");
});

document.getElementById("start-btn").addEventListener("click", function () {
  var names = teamNamesEl.value
    .split("\n")
    .map(function (n) { return n.trim(); })
    .filter(function (n) { return n.length > 0; });

  if (names.length < 2) {
    teamsErrorEl.textContent = "En az 2 takım adı girmelisin.";
    teamsErrorEl.hidden = false;
    return;
  }
  teamsErrorEl.hidden = true;

  state.teams = names.map(function (n) { return { name: n, score: 0 }; });
  state.usedWords = [];
  state.turnIndex = 0;
  state.totalTurns = state.teams.length * state.roundsPerTeam;
  state.finished = false;

  showTurnScreen();
});

/* ---------- Turn flow ---------- */

function currentTeam() {
  return state.teams[state.turnIndex % state.teams.length];
}

function currentRoundNumber() {
  return Math.floor(state.turnIndex / state.teams.length) + 1;
}

function showTurnScreen() {
  document.getElementById("turn-round").textContent =
    "Tur " + currentRoundNumber() + " / " + state.roundsPerTeam;
  document.getElementById("turn-team").textContent = currentTeam().name;
  showScreen("screen-turn");
}

function pickWord() {
  var available = state.words.filter(function (w) {
    return state.usedWords.indexOf(w) === -1;
  });
  if (available.length === 0) {
    state.usedWords = [];
    available = state.words;
  }
  var pick = available[Math.floor(Math.random() * available.length)];
  state.usedWords.push(pick);
  return pick;
}

document.getElementById("reveal-btn").addEventListener("click", function () {
  state.currentWord = pickWord();
  var wordEl = document.getElementById("draw-word");
  wordEl.textContent = state.currentWord.en;
  wordEl.classList.remove("hidden-word");
  document.getElementById("peek-btn").textContent = "👁️ Gizle";

  clearBoard();
  showScreen("screen-draw");
  SoundManager.playStart();
  startTimer();
});

document.getElementById("peek-btn").addEventListener("click", function () {
  var wordEl = document.getElementById("draw-word");
  var nowHidden = wordEl.classList.toggle("hidden-word");
  this.textContent = nowHidden ? "👁️ Göster" : "👁️ Gizle";
});

/* ---------- Timer ---------- */

function startTimer() {
  stopTimer();
  state.timeLeft = state.duration;
  updateTimerUi();

  state.timerId = setInterval(function () {
    state.timeLeft--;
    updateTimerUi();

    if (state.timeLeft <= 5 && state.timeLeft > 0) SoundManager.playTick();

    if (state.timeLeft <= 0) {
      stopTimer();
      SoundManager.playTimeUp();
      endTurn(false);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function updateTimerUi() {
  var textEl = document.getElementById("timer-text");
  textEl.textContent = Math.max(state.timeLeft, 0);
  textEl.classList.toggle("low", state.timeLeft <= 10);
  var pct = (state.timeLeft / state.duration) * 100;
  document.getElementById("timer-bar").style.width = Math.max(pct, 0) + "%";
}

/* ---------- Canvas drawing ---------- */

function resizeCanvas() {
  var rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  var dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
  redraw();
}

window.addEventListener("resize", function () {
  if (!document.getElementById("screen-draw").hidden) {
    syncDrawHeight();
    resizeCanvas();
  }
});

function redraw() {
  var rect = canvas.getBoundingClientRect();
  ctx2d.clearRect(0, 0, rect.width, rect.height);
  ctx2d.fillStyle = "#ffffff";
  ctx2d.fillRect(0, 0, rect.width, rect.height);

  ctx2d.lineCap = "round";
  ctx2d.lineJoin = "round";

  draw.strokes.forEach(function (stroke) {
    if (stroke.points.length === 0) return;
    ctx2d.strokeStyle = stroke.color;
    ctx2d.lineWidth = stroke.size;
    ctx2d.beginPath();
    ctx2d.moveTo(stroke.points[0].x, stroke.points[0].y);
    if (stroke.points.length === 1) {
      ctx2d.lineTo(stroke.points[0].x + 0.1, stroke.points[0].y + 0.1);
    } else {
      stroke.points.forEach(function (p, i) {
        if (i > 0) ctx2d.lineTo(p.x, p.y);
      });
    }
    ctx2d.stroke();
  });
}

function clearBoard() {
  draw.strokes = [];
  draw.current = null;
  redraw();
}

function pointerPos(e) {
  var rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

canvas.addEventListener("pointerdown", function (e) {
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);
  draw.drawing = true;
  draw.current = { color: draw.color, size: draw.size, points: [pointerPos(e)] };
  draw.strokes.push(draw.current);
  redraw();
});

canvas.addEventListener("pointermove", function (e) {
  if (!draw.drawing || !draw.current) return;
  draw.current.points.push(pointerPos(e));
  redraw();
});

function finishStroke() {
  draw.drawing = false;
  draw.current = null;
}

canvas.addEventListener("pointerup", finishStroke);
canvas.addEventListener("pointercancel", finishStroke);
canvas.addEventListener("pointerleave", finishStroke);

document.getElementById("undo-btn").addEventListener("click", function () {
  draw.strokes.pop();
  redraw();
});

document.getElementById("clear-btn").addEventListener("click", clearBoard);

function buildTools() {
  var colorTools = document.getElementById("color-tools");
  colorTools.innerHTML = "";
  COLORS.forEach(function (color, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-swatch" + (i === 0 ? " active" : "");
    btn.style.background = color;
    if (color === "#ffffff") btn.style.boxShadow = "inset 0 0 0 1px #d8dae6";
    btn.title = color === "#ffffff" ? "Silgi" : "Renk";
    btn.addEventListener("click", function () {
      draw.color = color;
      colorTools.querySelectorAll(".color-swatch").forEach(function (el) {
        el.classList.remove("active");
      });
      btn.classList.add("active");
    });
    colorTools.appendChild(btn);
  });

  var sizeTools = document.getElementById("size-tools");
  sizeTools.innerHTML = "";
  SIZES.forEach(function (size, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "size-btn" + (i === 1 ? " active" : "");
    var dot = document.createElement("span");
    dot.className = "size-dot";
    dot.style.width = Math.min(size, 22) + "px";
    dot.style.height = Math.min(size, 22) + "px";
    btn.appendChild(dot);
    btn.addEventListener("click", function () {
      draw.size = size;
      sizeTools.querySelectorAll(".size-btn").forEach(function (el) {
        el.classList.remove("active");
      });
      btn.classList.add("active");
    });
    sizeTools.appendChild(btn);
  });
}

/* ---------- Turn end / scoring ---------- */

function endTurn(guessed) {
  stopTimer();

  var earned = 0;
  if (guessed) {
    earned = 10 + Math.floor(Math.max(state.timeLeft, 0) / 10) * 2;
    currentTeam().score += earned;
    SoundManager.playCorrect();
  }

  state.turnIndex++;
  var isLastTurn = state.turnIndex >= state.totalTurns;

  renderScoreboard(isLastTurn);
  document.getElementById("score-subtitle").textContent = guessed
    ? "🎉 Doğru bilindi! +" + earned + " puan"
    : "⏱️ Bu turda bilinemedi.";

  if (isLastTurn) {
    state.finished = true;
    document.getElementById("score-title").textContent = "🏆 Oyun Bitti!";
    document.getElementById("continue-btn").textContent = "Yeni Oyun";
    SoundManager.playFanfare();
    triggerConfetti();
  } else {
    document.getElementById("score-title").textContent = "Skor Tablosu";
    document.getElementById("continue-btn").textContent = "Sıradaki Takım →";
  }

  showScreen("screen-score");
}

document.getElementById("correct-btn").addEventListener("click", function () {
  endTurn(true);
});

document.getElementById("pass-btn").addEventListener("click", function () {
  SoundManager.playPass();
  endTurn(false);
});

document.getElementById("continue-btn").addEventListener("click", function () {
  if (state.finished) {
    showScreen("screen-teams");
    return;
  }
  showTurnScreen();
});

function renderScoreboard(showRanking) {
  var sorted = state.teams.slice().sort(function (a, b) { return b.score - a.score; });
  var topScore = sorted.length > 0 ? sorted[0].score : 0;

  document.getElementById("scoreboard").innerHTML = sorted.map(function (team, i) {
    var isLeader = showRanking && team.score === topScore && topScore > 0;
    var medal = i === 0 ? "🥇" : (i === 1 ? "🥈" : (i === 2 ? "🥉" : (i + 1) + "."));
    return (
      '<div class="score-row' + (isLeader ? " leader" : "") + '">' +
        '<span class="score-rank">' + medal + "</span>" +
        '<span class="score-name">' + team.name + "</span>" +
        '<span class="score-points">' + team.score + "</span>" +
      "</div>"
    );
  }).join("");
}

/* ---------- Confetti ---------- */

function triggerConfetti() {
  var container = document.getElementById("confetti-container");
  var colors = ["#facc15", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#ec4899"];
  for (var i = 0; i < 45; i++) {
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

buildTools();
populateGrades();
