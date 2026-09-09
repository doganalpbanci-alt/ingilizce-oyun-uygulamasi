var DRAG_THRESHOLD = 8;

var state = {
  mode: "solo",
  // ortak
  current: null,       // { sentence, tokens, poolTiles, placedTiles }
  // tek kişilik mod
  queue: [],
  index: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  soloPool: [],
  soloWanted: 0,
  // takım modu
  pool: [],
  usedSentences: [],
  teams: [],
  duration: 45,
  roundsPerTeam: 3,
  turnIndex: 0,
  totalTurns: 0,
  timeLeft: 0,
  timerId: null,
  finished: false
};

var drag = { active: false };

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitCheckboxesEl = document.getElementById("unit-checkboxes");
var structureCheckboxesEl = document.getElementById("structure-checkboxes");
var poolCountEl = document.getElementById("pool-count");
var setupErrorEl = document.getElementById("setup-error");
var soundToggleBtn = document.getElementById("sound-toggle");
var poolAreaEl = document.getElementById("pool-area");
var sentenceAreaEl = document.getElementById("sentence-area");
var checkBtn = document.getElementById("check-btn");
var ghostEl = document.getElementById("drag-ghost");

function showScreen(id) {
  screens.forEach(function (el) { el.hidden = el.id !== id; });
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

/* ---------- Setup: sınıf / ünite / yapı ---------- */

// Sınıf listesi iki kaynaktan gelir (MEB ve Twinkl), bu yüzden kayıtlardaki
// `group` alanına göre <optgroup> başlıkları altında toplanır. `group`
// taşımayan kayıtlar doğrudan listeye eklenir.
function populateGrades() {
  var groups = {};
  Object.keys(SENTENCES).forEach(function (gradeKey) {
    var groupName = SENTENCES[gradeKey].group || "";
    var parent = gradeSelect;
    if (groupName) {
      if (!groups[groupName]) {
        groups[groupName] = document.createElement("optgroup");
        groups[groupName].label = groupName;
        gradeSelect.appendChild(groups[groupName]);
      }
      parent = groups[groupName];
    }
    var option = document.createElement("option");
    option.value = gradeKey;
    option.textContent = SENTENCES[gradeKey].label;
    parent.appendChild(option);
  });
  populateUnits();
}

function populateUnits() {
  var grade = SENTENCES[gradeSelect.value];
  unitCheckboxesEl.innerHTML = "";
  grade.units.forEach(function (unit) {
    var label = document.createElement("label");
    label.className = "unit-checkbox checked";

    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = unit.id;
    input.checked = true;
    input.addEventListener("change", function () {
      label.classList.toggle("checked", input.checked);
      populateStructures();
    });

    var span = document.createElement("span");
    span.textContent = unit.title;

    label.appendChild(input);
    label.appendChild(span);
    unitCheckboxesEl.appendChild(label);
  });
  populateStructures();
}

function getCheckedUnitIds() {
  return Array.prototype.slice
    .call(unitCheckboxesEl.querySelectorAll("input:checked"))
    .map(function (input) { return input.value; });
}

function populateStructures() {
  var grade = SENTENCES[gradeSelect.value];
  var unitIds = getCheckedUnitIds();
  var seen = {};
  var list = [];
  grade.units
    .filter(function (u) { return unitIds.indexOf(u.id) !== -1; })
    .forEach(function (u) {
      u.structures.forEach(function (s) {
        if (!seen[s.id]) {
          seen[s.id] = true;
          list.push(s);
        }
      });
    });

  structureCheckboxesEl.innerHTML = "";
  list.forEach(function (s) {
    var label = document.createElement("label");
    label.className = "unit-checkbox checked";

    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = s.id;
    input.checked = true;
    input.addEventListener("change", function () {
      label.classList.toggle("checked", input.checked);
      updatePoolCount();
    });

    var span = document.createElement("span");
    span.textContent = s.label;

    label.appendChild(input);
    label.appendChild(span);
    structureCheckboxesEl.appendChild(label);
  });

  updatePoolCount();
}

function getCheckedStructureIds() {
  return Array.prototype.slice
    .call(structureCheckboxesEl.querySelectorAll("input:checked"))
    .map(function (input) { return input.value; });
}

function buildSentencePool(gradeKey, unitIds, structureIds) {
  var grade = SENTENCES[gradeKey];
  var pool = [];
  grade.units
    .filter(function (u) { return unitIds.indexOf(u.id) !== -1; })
    .forEach(function (u) {
      var labelMap = {};
      u.structures.forEach(function (s) { labelMap[s.id] = s.label; });
      u.sentences.forEach(function (s) {
        if (structureIds.indexOf(s.structure) === -1) return;
        pool.push({
          en: s.en,
          tr: s.tr,
          structure: s.structure,
          structureLabel: labelMap[s.structure] || s.structure
        });
      });
    });
  return pool;
}

function updatePoolCount() {
  var pool = buildSentencePool(gradeSelect.value, getCheckedUnitIds(), getCheckedStructureIds());
  poolCountEl.textContent = pool.length > 0 ? pool.length + " cümle bu seçimde uygun" : "Bu seçimde uygun cümle yok.";
}

gradeSelect.addEventListener("change", populateUnits);

document.getElementById("select-all-units").addEventListener("click", function () {
  unitCheckboxesEl.querySelectorAll("input").forEach(function (input) {
    input.checked = true;
    input.closest(".unit-checkbox").classList.add("checked");
  });
  populateStructures();
});

document.getElementById("clear-all-units").addEventListener("click", function () {
  unitCheckboxesEl.querySelectorAll("input").forEach(function (input) {
    input.checked = false;
    input.closest(".unit-checkbox").classList.remove("checked");
  });
  populateStructures();
});

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    stopTeamTimer();
    showScreen("screen-setup");
  });
});

/* ---------- Mod seçimi ---------- */

function getSelectedMode() {
  var checked = document.querySelector('input[name="game-mode"]:checked');
  return checked ? checked.value : "solo";
}

function toggleModeFields() {
  var mode = getSelectedMode();
  document.getElementById("solo-count-field").hidden = mode !== "solo";
  document.getElementById("team-duration-field").hidden = mode !== "team";
  document.getElementById("team-rounds-field").hidden = mode !== "team";
}

document.querySelectorAll('input[name="game-mode"]').forEach(function (radio) {
  radio.addEventListener("change", function () {
    document.querySelectorAll(".mode-option").forEach(function (el) {
      el.classList.remove("checked");
    });
    radio.closest(".mode-option").classList.add("checked");
    toggleModeFields();
  });
});

toggleModeFields();

/* ---------- Kuruluştan devam ---------- */

document.getElementById("to-next-btn").addEventListener("click", function () {
  var unitIds = getCheckedUnitIds();
  var structureIds = getCheckedStructureIds();

  if (unitIds.length === 0 || structureIds.length === 0) {
    setupErrorEl.textContent = "En az bir ünite ve bir dil yapısı seçmelisin.";
    setupErrorEl.hidden = false;
    return;
  }

  var pool = buildSentencePool(gradeSelect.value, unitIds, structureIds);
  if (pool.length === 0) {
    setupErrorEl.textContent = "Bu seçimde hiç cümle yok. Ünite veya yapı seçimini değiştir.";
    setupErrorEl.hidden = false;
    return;
  }
  setupErrorEl.hidden = true;

  var mode = getSelectedMode();
  state.mode = mode;

  if (mode === "solo") {
    var wanted = parseInt(document.getElementById("solo-count-select").value, 10);
    state.soloPool = pool;
    state.soloWanted = wanted;
    startSolo();
  } else {
    state.pool = pool;
    state.usedSentences = [];
    state.duration = parseInt(document.getElementById("team-duration-select").value, 10);
    state.roundsPerTeam = parseInt(document.getElementById("team-rounds-select").value, 10);
    showScreen("screen-teams");
  }
});

/* ---------- Tek kişilik mod ---------- */

function startSolo() {
  var count = Math.min(state.soloWanted, state.soloPool.length);
  state.queue = shuffle(state.soloPool.slice()).slice(0, count);
  state.index = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;

  document.getElementById("play-score-chip").hidden = false;
  document.getElementById("play-streak-chip").hidden = false;
  document.getElementById("play-timer-wrap").hidden = true;
  document.getElementById("skip-btn").textContent = "⏭️ Geç";

  playCurrentSolo();
  showScreen("screen-play");
}

function playCurrentSolo() {
  setupCurrent(state.queue[state.index]);
  renderPlay();
  document.getElementById("play-progress-chip").textContent =
    "Cümle " + (state.index + 1) + " / " + state.queue.length;
  document.getElementById("play-score").textContent = state.score;
  document.getElementById("play-streak").textContent = state.streak;
  document.getElementById("play-feedback").textContent = "";
}

function advanceSolo() {
  state.index++;
  if (state.index >= state.queue.length) {
    endSolo();
    return;
  }
  playCurrentSolo();
}

function endSolo() {
  document.getElementById("solo-end-summary").textContent =
    "Skor: " + state.score + " puan · En uzun serin: " + state.bestStreak + " 🔥";
  SoundManager.playWin();
  triggerConfetti();
  showScreen("screen-solo-end");
}

document.getElementById("solo-restart-btn").addEventListener("click", startSolo);

/* ---------- Takım modu ---------- */

var teamNamesEl = document.getElementById("team-names");
var teamsErrorEl = document.getElementById("teams-error");

document.getElementById("start-team-btn").addEventListener("click", function () {
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
  state.usedSentences = [];
  state.turnIndex = 0;
  state.totalTurns = state.teams.length * state.roundsPerTeam;
  state.finished = false;

  document.getElementById("play-score-chip").hidden = true;
  document.getElementById("play-streak-chip").hidden = true;
  document.getElementById("play-timer-wrap").hidden = false;
  document.getElementById("skip-btn").textContent = "⏭️ Pas Geç";

  showTurnScreen();
});

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

function pickSentence() {
  var available = state.pool.filter(function (s) {
    return state.usedSentences.indexOf(s) === -1;
  });
  if (available.length === 0) {
    state.usedSentences = [];
    available = state.pool;
  }
  var pick = available[Math.floor(Math.random() * available.length)];
  state.usedSentences.push(pick);
  return pick;
}

document.getElementById("turn-start-btn").addEventListener("click", function () {
  setupCurrent(pickSentence());
  renderPlay();
  document.getElementById("play-progress-chip").textContent =
    currentTeam().name + " · Tur " + currentRoundNumber() + "/" + state.roundsPerTeam;
  document.getElementById("play-feedback").textContent = "";
  showScreen("screen-play");
  startTeamTimer();
});

function startTeamTimer() {
  stopTeamTimer();
  state.timeLeft = state.duration;
  updateTeamTimerUi();
  state.timerId = setInterval(function () {
    state.timeLeft--;
    updateTeamTimerUi();
    if (state.timeLeft <= 5 && state.timeLeft > 0) SoundManager.playTick();
    if (state.timeLeft <= 0) {
      stopTeamTimer();
      endTurn(false);
    }
  }, 1000);
}

function stopTeamTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function updateTeamTimerUi() {
  var pct = (state.timeLeft / state.duration) * 100;
  document.getElementById("play-timer-bar").style.width = Math.max(pct, 0) + "%";
}

function endTurn(guessed) {
  stopTeamTimer();

  var earned = 0;
  if (guessed) {
    earned = 10 + Math.floor(Math.max(state.timeLeft, 0) / 5) * 2;
    currentTeam().score += earned;
    SoundManager.playCorrect();
  } else {
    SoundManager.playTimeUp();
  }

  state.turnIndex++;
  var isLastTurn = state.turnIndex >= state.totalTurns;

  renderScoreboard(isLastTurn);
  document.getElementById("score-subtitle").textContent = guessed
    ? "🎉 Doğru! +" + earned + " puan"
    : "⏱️ Süre doldu, bu turda puan yok.";

  if (isLastTurn) {
    state.finished = true;
    document.getElementById("score-title").textContent = "🏆 Oyun Bitti!";
    document.getElementById("continue-btn").textContent = "Yeni Oyun";
    SoundManager.playWin();
    triggerConfetti();
  } else {
    document.getElementById("score-title").textContent = "Skor Tablosu";
    document.getElementById("continue-btn").textContent = "Sıradaki Takım →";
  }

  showScreen("screen-score");
}

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
        '<span class="score-name">' + escapeHtml(team.name) + "</span>" +
        '<span class="score-points">' + team.score + "</span>" +
      "</div>"
    );
  }).join("");
}

/* ---------- Cümle kurma: ortak (tek kişilik + takım) ---------- */

function tokenize(en) {
  return en.split(" ");
}

function setupCurrent(sentenceObj) {
  var tokens = tokenize(sentenceObj.en);
  var tiles = tokens.map(function (t, i) { return { id: i, text: t }; });
  shuffle(tiles);

  if (tiles.length > 1 && tiles.every(function (t, i) { return t.text === tokens[i]; })) {
    var tmp = tiles[0];
    tiles[0] = tiles[1];
    tiles[1] = tmp;
  }

  state.current = {
    sentence: sentenceObj,
    tokens: tokens,
    poolTiles: tiles,
    placedTiles: []
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function tileHtml(tile) {
  return '<button type="button" class="tile" data-tile-id="' + tile.id + '">' + escapeHtml(tile.text) + "</button>";
}

function renderPlay() {
  poolAreaEl.innerHTML = state.current.poolTiles.map(tileHtml).join("");
  sentenceAreaEl.innerHTML = state.current.placedTiles.map(tileHtml).join("") ||
    '<span class="sentence-placeholder">Kelimeleri buraya sırayla ekle</span>';
  checkBtn.disabled = state.current.poolTiles.length > 0;
  document.getElementById("structure-chip").textContent = state.current.sentence.structureLabel;
  document.getElementById("sentence-hint").textContent = "🇹🇷 " + state.current.sentence.tr;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

checkBtn.addEventListener("click", function () {
  if (state.current.poolTiles.length > 0) return;
  var attempt = state.current.placedTiles.map(function (t) { return t.text; });
  var correct = arraysEqual(attempt, state.current.tokens);

  if (correct) {
    document.getElementById("play-feedback").textContent = "🎉 Doğru!";
    sentenceAreaEl.classList.remove("shake");
    if (state.mode === "solo") {
      state.score += 10;
      state.streak++;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      document.getElementById("play-score").textContent = state.score;
      document.getElementById("play-streak").textContent = state.streak;
      SoundManager.playCorrect();
      setTimeout(advanceSolo, 900);
    } else {
      endTurn(true);
    }
  } else {
    document.getElementById("play-feedback").textContent = "❌ Sırayı kontrol et, tekrar dene.";
    SoundManager.playWrong();
    if (state.mode === "solo") state.streak = 0;
    sentenceAreaEl.classList.remove("shake");
    void sentenceAreaEl.offsetWidth;
    sentenceAreaEl.classList.add("shake");
  }
});

document.getElementById("reset-btn").addEventListener("click", function () {
  state.current.poolTiles = state.current.poolTiles.concat(state.current.placedTiles);
  state.current.placedTiles = [];
  shuffle(state.current.poolTiles);
  document.getElementById("play-feedback").textContent = "";
  renderPlay();
});

document.getElementById("skip-btn").addEventListener("click", function () {
  if (state.mode === "solo") {
    state.streak = 0;
    advanceSolo();
  } else {
    endTurn(false);
  }
});

/* ---------- Tıkla veya sürükle: kelime yerleştirme ---------- */

function handleTileTap(zone, tileObj) {
  if (zone === "pool") {
    var idx = state.current.poolTiles.indexOf(tileObj);
    if (idx !== -1) state.current.poolTiles.splice(idx, 1);
    state.current.placedTiles.push(tileObj);
    SoundManager.playPlace();
  } else {
    var idx2 = state.current.placedTiles.indexOf(tileObj);
    if (idx2 !== -1) state.current.placedTiles.splice(idx2, 1);
    state.current.poolTiles.push(tileObj);
    SoundManager.playRemove();
  }
  document.getElementById("play-feedback").textContent = "";
  renderPlay();
}

function computeInsertIndex(containerEl, clientX, clientY, excludeId) {
  var children = Array.prototype.filter.call(
    containerEl.querySelectorAll(".tile"),
    function (el) { return el.dataset.tileId !== String(excludeId); }
  );
  for (var i = 0; i < children.length; i++) {
    var r = children[i].getBoundingClientRect();
    if (clientY < r.top) return i;
    if (clientY >= r.top && clientY <= r.bottom) {
      var midX = r.left + r.width / 2;
      if (clientX < midX) return i;
    }
  }
  return children.length;
}

function zoneFromPoint(x, y) {
  var el = document.elementFromPoint(x, y);
  var container = el && el.closest ? el.closest("#pool-area, #sentence-area") : null;
  if (!container) return null;
  return container.id === "pool-area" ? "pool" : "sentence";
}

function startTileDrag(e, zone) {
  var tileEl = e.target.closest(".tile");
  if (!tileEl) return;
  var id = tileEl.dataset.tileId;
  var arr = zone === "pool" ? state.current.poolTiles : state.current.placedTiles;
  var tileObj = arr.filter(function (t) { return String(t.id) === id; })[0];
  if (!tileObj) return;

  e.preventDefault();
  try { tileEl.setPointerCapture(e.pointerId); } catch (err) {}

  drag = {
    active: true,
    moved: false,
    tileObj: tileObj,
    tileEl: tileEl,
    homeZone: zone,
    startX: e.clientX,
    startY: e.clientY
  };
}

poolAreaEl.addEventListener("pointerdown", function (e) { startTileDrag(e, "pool"); });
sentenceAreaEl.addEventListener("pointerdown", function (e) { startTileDrag(e, "sentence"); });

window.addEventListener("pointermove", function (e) {
  if (!drag.active) return;
  var dx = e.clientX - drag.startX;
  var dy = e.clientY - drag.startY;

  if (!drag.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
    drag.moved = true;
    drag.tileEl.classList.add("dragging");
    ghostEl.textContent = drag.tileObj.text;
    ghostEl.hidden = false;
  }

  if (drag.moved) {
    ghostEl.style.left = e.clientX + "px";
    ghostEl.style.top = e.clientY + "px";

    var overZone = zoneFromPoint(e.clientX, e.clientY);
    poolAreaEl.classList.toggle("drop-target", overZone === "pool");
    sentenceAreaEl.classList.toggle("drop-target", overZone === "sentence");
  }
});

function endDragVisuals() {
  ghostEl.hidden = true;
  document.querySelectorAll(".tile.dragging").forEach(function (el) { el.classList.remove("dragging"); });
  poolAreaEl.classList.remove("drop-target");
  sentenceAreaEl.classList.remove("drop-target");
}

window.addEventListener("pointerup", function (e) {
  if (!drag.active) return;

  if (!drag.moved) {
    handleTileTap(drag.homeZone, drag.tileObj);
  } else {
    var targetZone = zoneFromPoint(e.clientX, e.clientY) || drag.homeZone;
    var targetContainerEl = targetZone === "pool" ? poolAreaEl : sentenceAreaEl;
    var insertIdx = computeInsertIndex(targetContainerEl, e.clientX, e.clientY, drag.tileObj.id);

    var homeArr = drag.homeZone === "pool" ? state.current.poolTiles : state.current.placedTiles;
    var hIdx = homeArr.indexOf(drag.tileObj);
    if (hIdx !== -1) homeArr.splice(hIdx, 1);

    var targetArr = targetZone === "pool" ? state.current.poolTiles : state.current.placedTiles;
    if (insertIdx > targetArr.length) insertIdx = targetArr.length;
    targetArr.splice(insertIdx, 0, drag.tileObj);

    document.getElementById("play-feedback").textContent = "";
    renderPlay();

    if (targetZone === "sentence" && drag.homeZone !== "sentence") SoundManager.playPlace();
    else if (targetZone === "pool" && drag.homeZone !== "pool") SoundManager.playRemove();
  }

  endDragVisuals();
  drag = { active: false };
});

window.addEventListener("pointercancel", function () {
  if (!drag.active) return;
  endDragVisuals();
  drag = { active: false };
});

/* ---------- Confetti ---------- */

function triggerConfetti() {
  var container = document.getElementById("confetti-container");
  var colors = ["#facc15", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#14b8a6"];
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

populateGrades();
