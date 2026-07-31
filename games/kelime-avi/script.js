var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var MIN_LEN = 3;
var MAX_LEN = 10;
var MAX_GRID = 14;

var DIRECTIONS = {
  easy: [[0, 1], [1, 0]],
  normal: [[0, 1], [1, 0], [1, 1], [-1, 1]],
  hard: [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]]
};

var state = {
  grid: [],
  size: 0,
  words: [],
  foundCount: 0,
  startTime: 0,
  timerId: null,
  anchor: null,
  pendingAnchor: null,
  dragging: false,
  selection: []
};

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitCheckboxesEl = document.getElementById("unit-checkboxes");
var unitWordCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");
var gridEl = document.getElementById("grid");
var soundToggleBtn = document.getElementById("sound-toggle");

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

function randomLetter() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

/* ---------- Sound ---------- */

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

// Bulmacaya sadece tek parçalı, sadece harflerden oluşan ve uygun
// uzunluktaki kelimeler girebilir ("take a nap" gibi ifadeler ızgaraya
// yerleştirilemez).
function buildWordPool(unitIds) {
  var grade = CURRICULUM[gradeSelect.value];
  var seen = {};
  var words = [];
  grade.units
    .filter(function (u) { return unitIds.indexOf(u.id) !== -1; })
    .forEach(function (u) {
      u.words.forEach(function (w) {
        var clean = w.en.toUpperCase();
        if (!/^[A-Z]+$/.test(clean)) return;
        if (clean.length < MIN_LEN || clean.length > MAX_LEN) return;
        if (seen[clean]) return;
        seen[clean] = true;
        words.push({ en: clean, tr: w.tr, original: w.en });
      });
    });
  return words;
}

function updateWordCount() {
  var count = buildWordPool(getCheckedUnitIds()).length;
  unitWordCountEl.textContent = count > 0
    ? count + " kelime bulmacaya uygun"
    : "";
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

document.getElementById("start-btn").addEventListener("click", function () {
  var unitIds = getCheckedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ünite seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }

  var pool = buildWordPool(unitIds);
  var wanted = parseInt(document.getElementById("word-count-select").value, 10);

  if (pool.length < wanted) {
    unitErrorEl.textContent =
      "Bu seçimde bulmacaya uygun sadece " + pool.length +
      " kelime var. Daha az kelime seç veya başka ünite ekle.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  showScreen("screen-game");
  newPuzzle(pool, wanted);
});

document.getElementById("new-puzzle-btn").addEventListener("click", regenerate);
document.getElementById("win-new-btn").addEventListener("click", regenerate);

function regenerate() {
  var pool = buildWordPool(getCheckedUnitIds());
  var wanted = parseInt(document.getElementById("word-count-select").value, 10);
  newPuzzle(pool, wanted);
}

/* ---------- Puzzle generation ---------- */

function newPuzzle(pool, wanted) {
  var difficulty = document.getElementById("difficulty-select").value;
  var dirs = DIRECTIONS[difficulty] || DIRECTIONS.normal;

  var built = null;
  // Yerleştirme rastgele olduğu için birkaç kez deneriz; her denemede
  // farklı kelime kümesi ve farklı konumlar seçilir.
  for (var attempt = 0; attempt < 25 && !built; attempt++) {
    var picked = shuffle(pool.slice()).slice(0, wanted);
    built = tryBuild(picked, dirs);
  }

  if (!built) {
    // Çok nadir: hiçbir denemede yerleşmediyse kelime sayısını azalt.
    for (var less = wanted - 1; less >= 3 && !built; less--) {
      for (var a2 = 0; a2 < 15 && !built; a2++) {
        built = tryBuild(shuffle(pool.slice()).slice(0, less), dirs);
      }
    }
  }

  state.grid = built.grid;
  state.size = built.size;
  state.words = built.words;
  state.foundCount = 0;
  state.anchor = null;
  state.pendingAnchor = null;
  state.selection = [];

  renderGrid();
  renderWordList();
  document.getElementById("found-count").textContent = "0";
  document.getElementById("total-count").textContent = state.words.length;
  document.getElementById("win-banner").hidden = true;
  startTimer();
}

function tryBuild(words, dirs) {
  var longest = words.reduce(function (m, w) { return Math.max(m, w.en.length); }, 0);
  var size = Math.min(Math.max(longest + 2, 10), MAX_GRID);

  var grid = [];
  for (var r = 0; r < size; r++) {
    grid.push(new Array(size).fill(null));
  }

  var placed = [];

  for (var i = 0; i < words.length; i++) {
    var placement = placeWord(grid, size, words[i].en, dirs);
    if (!placement) return null;
    placed.push({
      en: words[i].en,
      tr: words[i].tr,
      original: words[i].original,
      cells: placement,
      found: false
    });
  }

  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      if (grid[y][x] === null) grid[y][x] = randomLetter();
    }
  }

  return { grid: grid, size: size, words: placed };
}

function placeWord(grid, size, word, dirs) {
  var options = [];
  dirs.forEach(function (d) {
    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        options.push({ r: r, c: c, d: d });
      }
    }
  });
  shuffle(options);

  for (var i = 0; i < options.length; i++) {
    var o = options[i];
    var cells = [];
    var ok = true;

    for (var k = 0; k < word.length; k++) {
      var rr = o.r + o.d[0] * k;
      var cc = o.c + o.d[1] * k;
      if (rr < 0 || rr >= size || cc < 0 || cc >= size) { ok = false; break; }
      var existing = grid[rr][cc];
      if (existing !== null && existing !== word[k]) { ok = false; break; }
      cells.push({ r: rr, c: cc });
    }

    if (!ok) continue;

    for (var k2 = 0; k2 < word.length; k2++) {
      grid[cells[k2].r][cells[k2].c] = word[k2];
    }
    return cells;
  }

  return null;
}

/* ---------- Rendering ---------- */

function renderGrid() {
  gridEl.style.gridTemplateColumns = "repeat(" + state.size + ", 1fr)";
  gridEl.innerHTML = "";

  for (var r = 0; r < state.size; r++) {
    for (var c = 0; c < state.size; c++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = state.grid[r][c];
      cell.dataset.r = r;
      cell.dataset.c = c;
      gridEl.appendChild(cell);
    }
  }
}

function renderWordList() {
  document.getElementById("word-list").innerHTML = state.words.map(function (w, i) {
    return (
      '<li class="word-item' + (w.found ? " found" : "") + '" data-index="' + i + '">' +
        "<span>" + w.original + "</span>" +
        '<span class="tr">' + w.tr + "</span>" +
      "</li>"
    );
  }).join("");
}

function cellAt(r, c) {
  return gridEl.querySelector('.cell[data-r="' + r + '"][data-c="' + c + '"]');
}

/* ---------- Timer ---------- */

function startTimer() {
  stopTimer();
  state.startTime = Date.now();
  updateTimerText();
  state.timerId = setInterval(updateTimerText, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function elapsedText() {
  var secs = Math.floor((Date.now() - state.startTime) / 1000);
  var m = Math.floor(secs / 60);
  var s = secs % 60;
  return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

function updateTimerText() {
  document.getElementById("timer-text").textContent = elapsedText();
}

/* ---------- Selection ---------- */

function lineBetween(a, b) {
  var dr = b.r - a.r;
  var dc = b.c - a.c;
  if (dr === 0 && dc === 0) return [a];

  var stepR = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
  var stepC = dc === 0 ? 0 : (dc > 0 ? 1 : -1);

  // Sadece düz veya tam çapraz çizgiler geçerli
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;

  var length = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
  var cells = [];
  for (var i = 0; i < length; i++) {
    cells.push({ r: a.r + stepR * i, c: a.c + stepC * i });
  }
  return cells;
}

function clearSelectionHighlight() {
  gridEl.querySelectorAll(".cell.selecting").forEach(function (el) {
    el.classList.remove("selecting");
  });
}

function highlightSelection(cells) {
  clearSelectionHighlight();
  cells.forEach(function (p) {
    var el = cellAt(p.r, p.c);
    if (el) el.classList.add("selecting");
  });
}

function selectionWord(cells) {
  return cells.map(function (p) { return state.grid[p.r][p.c]; }).join("");
}

function commitSelection(cells) {
  clearSelectionHighlight();
  state.selection = [];
  state.anchor = null;
  state.pendingAnchor = null;

  if (!cells || cells.length < 2) return;

  var word = selectionWord(cells);
  var reversed = word.split("").reverse().join("");

  var match = null;
  for (var i = 0; i < state.words.length; i++) {
    var w = state.words[i];
    if (w.found) continue;
    if (w.en === word || w.en === reversed) {
      // Seçilen hücreler gerçekten o kelimenin hücreleri mi?
      var sameCells = sameCellSet(cells, w.cells);
      if (sameCells) { match = w; break; }
    }
  }

  if (!match) {
    SoundManager.playWrong();
    return;
  }

  match.found = true;
  state.foundCount++;
  match.cells.forEach(function (p) {
    var el = cellAt(p.r, p.c);
    if (el) el.classList.add("found");
  });
  SoundManager.playFound();

  document.getElementById("found-count").textContent = state.foundCount;
  renderWordList();

  if (state.foundCount === state.words.length) winPuzzle();
}

function sameCellSet(a, b) {
  if (a.length !== b.length) return false;
  var key = function (p) { return p.r + ":" + p.c; };
  var setB = {};
  b.forEach(function (p) { setB[key(p)] = true; });
  return a.every(function (p) { return setB[key(p)]; });
}

function winPuzzle() {
  stopTimer();
  document.getElementById("final-time").textContent = elapsedText();
  document.getElementById("win-banner").hidden = false;
  SoundManager.playWin();
  triggerConfetti();
}

function cellFromEvent(e) {
  var el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el || !el.classList.contains("cell")) return null;
  return { r: parseInt(el.dataset.r, 10), c: parseInt(el.dataset.c, 10) };
}

gridEl.addEventListener("pointerdown", function (e) {
  var pos = cellFromEvent(e);
  if (!pos) return;
  e.preventDefault();

  // Dokunmatik tahtada sürükleme zor olabildiği için iki dokunuşla da
  // seçim yapılabilir: önce ilk harfe, sonra son harfe dokun.
  if (state.pendingAnchor) {
    var line = lineBetween(state.pendingAnchor, pos);
    if (line && line.length > 1) {
      commitSelection(line);
      return;
    }
  }

  state.dragging = true;
  state.anchor = pos;
  state.pendingAnchor = pos;
  state.selection = [pos];
  highlightSelection(state.selection);
});

gridEl.addEventListener("pointermove", function (e) {
  if (!state.dragging || !state.anchor) return;
  var pos = cellFromEvent(e);
  if (!pos) return;
  var line = lineBetween(state.anchor, pos);
  if (!line) return;
  state.selection = line;
  highlightSelection(line);
});

window.addEventListener("pointerup", function () {
  if (!state.dragging) return;
  state.dragging = false;

  if (state.selection.length > 1) {
    commitSelection(state.selection);
  }
  // Tek hücrede bırakıldıysa seçim açık kalır (iki dokunuşlu mod).
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
