var CHAR_WIDTH = 90;
var MOVE_SPEED = 340;
var BASE_FALL_SPEED = 85;
var MAX_FALL_SPEED = 210;
var MAX_LIVES = 3;

var state = {
  words: [],
  running: false,
  score: 0,
  combo: 0,
  bestCombo: 0,
  correctCount: 0,
  level: 1,
  lives: MAX_LIVES,
  fallSpeed: BASE_FALL_SPEED,
  currentWord: null,
  bubbles: [],
  waveScheduled: false,
  charX: 0,
  prevCharX: 0,
  moveDir: 0,
  dragging: false,
  lastTs: null
};

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitCheckboxesEl = document.getElementById("unit-checkboxes");
var unitWordCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");
var gameAreaEl = document.getElementById("game-area");
var characterEl = document.getElementById("character");
var soundToggleBtn = document.getElementById("sound-toggle");

function showScreen(id) {
  screens.forEach(function (el) {
    el.hidden = el.id !== id;
  });
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
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

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    state.running = false;
    clearDynamicElements();
    showScreen("screen-setup");
  });
});

/* ---------- Game lifecycle ---------- */

function clearDynamicElements() {
  gameAreaEl.querySelectorAll(".word-bubble, .particle").forEach(function (el) {
    el.remove();
  });
}

function startGame() {
  var unitIds = getCheckedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ünite seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }

  var words = buildWordPool(unitIds);
  if (words.length < 4) {
    unitErrorEl.textContent = "Bu seçim için yeterli kelime yok, daha fazla ünite seç.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  clearDynamicElements();

  state.words = words;
  state.running = true;
  state.score = 0;
  state.combo = 0;
  state.bestCombo = 0;
  state.correctCount = 0;
  state.level = 1;
  state.lives = MAX_LIVES;
  state.fallSpeed = BASE_FALL_SPEED;
  state.bubbles = [];
  state.waveScheduled = false;
  state.moveDir = 0;
  state.dragging = false;

  showScreen("screen-game");

  state.charX = Math.max((gameAreaEl.clientWidth - CHAR_WIDTH) / 2, 0);
  state.prevCharX = state.charX;
  characterEl.style.setProperty("--char-x", state.charX + "px");
  characterEl.classList.add("idle");
  characterEl.classList.remove("lean-left", "lean-right", "happy", "hurt");

  pickNextWord();
  updateHud();
  SoundManager.playHoot();
  scheduleWave(500);
}

function endGame() {
  state.running = false;
  SoundManager.playGameOver();
  document.getElementById("final-score").textContent = state.score;
  document.getElementById("final-combo").textContent = state.bestCombo;
  showScreen("screen-over");
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("retry-btn").addEventListener("click", startGame);

/* ---------- Word / wave logic ---------- */

function pickNextWord() {
  var pool = state.words;
  var next = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1) {
    var attempts = 0;
    while (next === state.currentWord && attempts < 8) {
      next = pool[Math.floor(Math.random() * pool.length)];
      attempts++;
    }
  }
  state.currentWord = next;
  document.getElementById("hud-target-word").textContent = next.en;
}

function scheduleWave(delay) {
  state.waveScheduled = true;
  setTimeout(function () {
    state.waveScheduled = false;
    if (state.running) spawnWave();
  }, delay);
}

function spawnWave() {
  var distractorCount = clamp(1 + Math.floor(state.level / 2), 1, Math.min(3, state.words.length - 1));
  var pool = state.words.filter(function (w) { return w !== state.currentWord; });
  shuffle(pool);
  var distractors = pool.slice(0, distractorCount);

  var items = distractors.map(function (w) { return { tr: w.tr, correct: false }; });
  items.push({ tr: state.currentWord.tr, correct: true });
  shuffle(items);

  var areaWidth = gameAreaEl.clientWidth;
  var laneWidth = areaWidth / items.length;

  items.forEach(function (item, i) {
    var el = document.createElement("div");
    el.className = "word-bubble";
    el.textContent = item.tr;
    el.style.animationDelay = (Math.random() * 0.6) + "s";
    gameAreaEl.appendChild(el);

    var bw = el.offsetWidth;
    var bh = el.offsetHeight;
    var laneCenter = laneWidth * i + laneWidth / 2;
    var x = clamp(laneCenter - bw / 2, 6, Math.max(areaWidth - bw - 6, 6));
    var y = -60 - Math.random() * 80;

    el.style.transform = "translate(" + x + "px," + y + "px)";

    state.bubbles.push({
      el: el,
      x: x,
      y: y,
      width: bw,
      height: bh,
      speed: state.fallSpeed + Math.random() * 25,
      correct: item.correct
    });
  });
}

function afterBubbleRemoved() {
  if (state.bubbles.length === 0 && !state.waveScheduled && state.running) {
    scheduleWave(500);
  }
}

/* ---------- Catch resolution ---------- */

function popBubble(b) {
  b.el.classList.add("pop");
  setTimeout(function () { b.el.remove(); }, 350);
}

function fadeBubble(b) {
  b.el.classList.add("miss-fade");
  setTimeout(function () { b.el.remove(); }, 300);
}

function spawnParticles(x, y, correct) {
  var colors = correct
    ? ["#facc15", "#4ade80", "#38bdf8", "#a78bfa"]
    : ["#f87171", "#fb923c"];
  for (var i = 0; i < 10; i++) {
    var p = document.createElement("div");
    p.className = "particle";
    var angle = Math.random() * Math.PI * 2;
    var dist = 36 + Math.random() * 42;
    p.style.setProperty("--px", Math.cos(angle) * dist + "px");
    p.style.setProperty("--py", Math.sin(angle) * dist + "px");
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    gameAreaEl.appendChild(p);
    (function (el) {
      setTimeout(function () { el.remove(); }, 650);
    })(p);
  }
}

function renderLives() {
  var el = document.getElementById("hud-lives");
  el.innerHTML = "";
  for (var i = 0; i < MAX_LIVES; i++) {
    var span = document.createElement("span");
    span.className = "heart" + (i >= state.lives ? " lost" : "");
    span.textContent = "❤️";
    el.appendChild(span);
  }
}

function updateHud() {
  document.getElementById("hud-score").textContent = state.score;
  var comboEl = document.getElementById("hud-combo");
  comboEl.textContent = state.combo >= 2 ? "🔥 x" + state.combo : "";
  renderLives();
}

function bounceHappy() {
  characterEl.classList.remove("hurt");
  characterEl.classList.add("happy");
  setTimeout(function () { characterEl.classList.remove("happy"); }, 500);
}

function bounceHurt() {
  characterEl.classList.remove("happy");
  characterEl.classList.add("hurt");
  setTimeout(function () { characterEl.classList.remove("hurt"); }, 400);
}

function showLevelToast(text) {
  var el = document.getElementById("level-toast");
  el.textContent = text;
  el.hidden = false;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
  setTimeout(function () { el.hidden = true; }, 1400);
}

function maybeLevelUp() {
  if (state.correctCount > 0 && state.correctCount % 6 === 0) {
    state.level++;
    state.fallSpeed = Math.min(BASE_FALL_SPEED + state.level * 14, MAX_FALL_SPEED);
    SoundManager.playLevelUp();
    showLevelToast("🌟 Seviye " + state.level + "!");
  }
}

function onCorrectCatch(bubble) {
  state.bubbles.forEach(function (b) { fadeBubble(b); });
  state.bubbles = [];

  SoundManager.playCorrect();
  state.combo++;
  state.correctCount++;
  state.bestCombo = Math.max(state.bestCombo, state.combo);
  state.score += 10 + state.combo * 2;
  updateHud();
  bounceHappy();
  maybeLevelUp();
  pickNextWord();
  scheduleWave(700);
}

function onWrongCatch(bubble) {
  SoundManager.playWrong();
  state.combo = 0;
  state.lives--;
  updateHud();
  bounceHurt();
  if (state.lives <= 0) {
    endGame();
    return;
  }
  afterBubbleRemoved();
}

function onMiss() {
  afterBubbleRemoved();
}

/* ---------- Game loop ---------- */

function updateCharacter(dt) {
  var areaWidth = gameAreaEl.clientWidth;
  if (!state.dragging && state.moveDir !== 0) {
    state.charX = clamp(state.charX + state.moveDir * MOVE_SPEED * dt, 0, Math.max(areaWidth - CHAR_WIDTH, 0));
  }
  var vx = state.charX - state.prevCharX;
  state.prevCharX = state.charX;
  characterEl.style.setProperty("--char-x", state.charX + "px");
  characterEl.classList.toggle("lean-left", vx < -0.4);
  characterEl.classList.toggle("lean-right", vx > 0.4);
}

function updateBubbles(dt) {
  var areaHeight = gameAreaEl.clientHeight;
  var charTop = areaHeight - 14 - 90;
  var charCatchTop = charTop + 22;
  var charLeft = state.charX;
  var charRight = state.charX + CHAR_WIDTH;

  for (var i = state.bubbles.length - 1; i >= 0; i--) {
    var b = state.bubbles[i];
    b.y += b.speed * dt;
    b.el.style.transform = "translate(" + b.x + "px," + b.y + "px)";

    var bubbleBottom = b.y + b.height;
    var overlapsX = (b.x + b.width) > charLeft && b.x < charRight;

    if (overlapsX && bubbleBottom > charCatchTop && b.y < areaHeight - 6) {
      state.bubbles.splice(i, 1);
      popBubble(b);
      spawnParticles(b.x + b.width / 2, b.y + b.height / 2, b.correct);
      if (b.correct) onCorrectCatch(b);
      else onWrongCatch(b);
      continue;
    }

    if (b.y > areaHeight + 20) {
      state.bubbles.splice(i, 1);
      fadeBubble(b);
      onMiss();
    }
  }
}

function loop(ts) {
  if (state.lastTs == null) state.lastTs = ts;
  var dt = Math.min((ts - state.lastTs) / 1000, 0.05);
  state.lastTs = ts;

  if (state.running) {
    updateCharacter(dt);
    updateBubbles(dt);
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

/* ---------- Input ---------- */

document.addEventListener("keydown", function (e) {
  if (!state.running) return;
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    state.moveDir = -1;
    state.dragging = false;
  } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    state.moveDir = 1;
    state.dragging = false;
  }
});

document.addEventListener("keyup", function (e) {
  if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && state.moveDir === -1) {
    state.moveDir = 0;
  }
  if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && state.moveDir === 1) {
    state.moveDir = 0;
  }
});

function bindHold(btn, dir) {
  var start = function (e) {
    e.preventDefault();
    state.dragging = false;
    state.moveDir = dir;
  };
  var end = function () {
    if (state.moveDir === dir) state.moveDir = 0;
  };
  btn.addEventListener("pointerdown", start);
  btn.addEventListener("pointerup", end);
  btn.addEventListener("pointerleave", end);
  btn.addEventListener("pointercancel", end);
}

bindHold(document.getElementById("btn-left"), -1);
bindHold(document.getElementById("btn-right"), 1);

function updateDragTarget(e) {
  var rect = gameAreaEl.getBoundingClientRect();
  var x = e.clientX - rect.left - CHAR_WIDTH / 2;
  state.charX = clamp(x, 0, Math.max(gameAreaEl.clientWidth - CHAR_WIDTH, 0));
}

gameAreaEl.addEventListener("pointerdown", function (e) {
  if (e.target.closest(".touch-btn")) return;
  state.dragging = true;
  state.moveDir = 0;
  updateDragTarget(e);
});

gameAreaEl.addEventListener("pointermove", function (e) {
  if (state.dragging) updateDragTarget(e);
});

window.addEventListener("pointerup", function () {
  state.dragging = false;
});

populateGrades();
