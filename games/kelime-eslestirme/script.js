var state = {
  pairs: [],
  flippedCards: [],
  matchedCount: 0,
  moveCount: 0,
  locked: false
};

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitCheckboxesEl = document.getElementById("unit-checkboxes");
var unitWordCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");
var pairCountSelect = document.getElementById("pair-count-select");

var board = document.getElementById("board");
var moveCountEl = document.getElementById("move-count");
var matchCountEl = document.getElementById("match-count");
var pairTotalEl = document.getElementById("pair-total");
var winMessageEl = document.getElementById("win-message");
var finalMovesEl = document.getElementById("final-moves");

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

/* ---------- Setup ---------- */

// Sınıf listesi iki kaynaktan gelir (MEB ve Twinkl), bu yüzden kayıtlardaki
// `group` alanına göre <optgroup> başlıkları altında toplanır. `group`
// taşımayan kayıtlar doğrudan listeye eklenir.
function populateGrades() {
  var groups = {};
  Object.keys(CURRICULUM).forEach(function (gradeKey) {
    var groupName = CURRICULUM[gradeKey].group || "";
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
    option.textContent = CURRICULUM[gradeKey].label;
    parent.appendChild(option);
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
  btn.addEventListener("click", function () { showScreen("screen-setup"); });
});

document.getElementById("start-btn").addEventListener("click", function () {
  var unitIds = getCheckedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ünite seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }

  var pool = buildWordPool(unitIds);
  var wanted = parseInt(pairCountSelect.value, 10);

  if (pool.length < wanted) {
    unitErrorEl.textContent =
      "Bu seçimde sadece " + pool.length + " kelime var. Daha az çift seç veya başka ünite ekle.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  state.pairs = shuffle(pool.slice()).slice(0, wanted);
  showScreen("screen-game");
  restartGame();
});

/* ---------- Game ---------- */

function buildDeck() {
  var deck = [];
  state.pairs.forEach(function (pair, index) {
    deck.push({ pairId: index, text: pair.en });
    deck.push({ pairId: index, text: pair.tr });
  });
  return shuffle(deck);
}

function renderBoard() {
  var deck = buildDeck();
  board.innerHTML = "";

  deck.forEach(function (card, index) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card is-face-down";
    btn.dataset.pair = card.pairId;
    btn.dataset.index = index;

    var label = document.createElement("span");
    label.className = "card-label";
    label.textContent = card.text;
    btn.appendChild(label);

    btn.addEventListener("click", onCardClick);
    board.appendChild(btn);
  });
}

function onCardClick(event) {
  if (state.locked) return;

  var card = event.currentTarget;
  if (card.classList.contains("is-matched") || card.classList.contains("is-face-up-selected")) {
    return;
  }

  card.classList.remove("is-face-down");
  card.classList.add("is-face-up-selected");
  state.flippedCards.push(card);

  if (state.flippedCards.length === 2) {
    state.moveCount++;
    moveCountEl.textContent = state.moveCount;
    checkMatch();
  }
}

function checkMatch() {
  var first = state.flippedCards[0];
  var second = state.flippedCards[1];

  if (first.dataset.pair === second.dataset.pair) {
    first.classList.add("is-matched");
    second.classList.add("is-matched");
    first.classList.remove("is-face-up-selected");
    second.classList.remove("is-face-up-selected");
    state.flippedCards = [];
    state.matchedCount++;
    matchCountEl.textContent = state.matchedCount;

    if (state.matchedCount === state.pairs.length) {
      finalMovesEl.textContent = state.moveCount;
      winMessageEl.hidden = false;
      triggerConfetti();
    }
    return;
  }

  state.locked = true;
  setTimeout(function () {
    first.classList.remove("is-face-up-selected");
    second.classList.remove("is-face-up-selected");
    first.classList.add("is-face-down");
    second.classList.add("is-face-down");
    state.flippedCards = [];
    state.locked = false;
  }, 800);
}

function restartGame() {
  state.flippedCards = [];
  state.matchedCount = 0;
  state.moveCount = 0;
  state.locked = false;
  moveCountEl.textContent = "0";
  matchCountEl.textContent = "0";
  pairTotalEl.textContent = state.pairs.length;
  winMessageEl.hidden = true;
  renderBoard();
}

document.getElementById("restart-btn").addEventListener("click", restartGame);

/* ---------- Confetti ---------- */

function triggerConfetti() {
  var container = document.getElementById("confetti-container");
  var colors = ["#facc15", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#ec4899"];
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

populateGrades();
