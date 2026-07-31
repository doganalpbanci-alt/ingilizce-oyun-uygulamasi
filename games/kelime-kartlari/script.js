var state = {
  grade: null,
  unitIds: [],
  groups: [],
  flashcards: [],
  cardIndex: 0,
  flipped: false
};

var screens = document.querySelectorAll(".screen");
var gradeSelect = document.getElementById("grade-select");
var unitCheckboxesEl = document.getElementById("unit-checkboxes");
var unitWordCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");

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

function buildGroupedWords(unitIds) {
  var grade = CURRICULUM[gradeSelect.value];
  return grade.units
    .filter(function (u) { return unitIds.indexOf(u.id) !== -1; })
    .map(function (u) { return { title: u.title, words: u.words }; });
}

function totalWordCount(groups) {
  return groups.reduce(function (sum, g) { return sum + g.words.length; }, 0);
}

function updateWordCount() {
  var groups = buildGroupedWords(getCheckedUnitIds());
  var count = totalWordCount(groups);
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

document.getElementById("view-btn").addEventListener("click", function () {
  var unitIds = getCheckedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ünite seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  state.grade = gradeSelect.value;
  state.unitIds = unitIds;
  state.groups = buildGroupedWords(unitIds);
  state.flashcards = buildFlashcardPool(state.groups);

  renderListView();
  setupFlashcards(false);
  showScreen("screen-view");
  switchTab("list");
});

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    showScreen("screen-setup");
  });
});

/* ---------- Shared helpers ---------- */

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

function buildFlashcardPool(groups) {
  var seen = {};
  var words = [];
  groups.forEach(function (g) {
    g.words.forEach(function (w) {
      var key = w.en.toLowerCase() + "|" + w.tr.toLowerCase();
      if (!seen[key]) {
        seen[key] = true;
        words.push(w);
      }
    });
  });
  return words;
}

/* ---------- Tabs ---------- */

function switchTab(tab) {
  var isList = tab === "list";
  document.getElementById("tab-list").classList.toggle("active", isList);
  document.getElementById("tab-flashcard").classList.toggle("active", !isList);
  document.getElementById("list-view").hidden = !isList;
  document.getElementById("flashcard-view").hidden = isList;
}

document.getElementById("tab-list").addEventListener("click", function () {
  switchTab("list");
});

document.getElementById("tab-flashcard").addEventListener("click", function () {
  switchTab("flashcard");
});

/* ---------- List view ---------- */

function renderListView() {
  var container = document.getElementById("list-container");
  container.innerHTML = state.groups.map(function (group) {
    var rows = group.words.map(function (w) {
      return (
        '<div class="word-row">' +
          '<span class="word-en">' + w.en + "</span>" +
          '<span class="word-tr" data-tr="' + escapeHtml(w.tr) + '">' + w.tr + "</span>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="unit-group">' +
        "<h3>" + group.title + " (" + group.words.length + " kelime)</h3>" +
        '<div class="word-table">' + rows + "</div>" +
      "</div>"
    );
  }).join("");

  applyHideMeanings(document.getElementById("hide-meanings-toggle").checked);
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function applyHideMeanings(hide) {
  document.querySelectorAll(".word-tr").forEach(function (el) {
    if (hide) {
      var tr = el.getAttribute("data-tr");
      el.innerHTML = '<button type="button" class="reveal-btn">Göster</button>';
      el.querySelector(".reveal-btn").addEventListener("click", function () {
        el.textContent = tr;
      });
    } else {
      el.textContent = el.getAttribute("data-tr");
    }
  });
}

document.getElementById("hide-meanings-toggle").addEventListener("change", function (e) {
  applyHideMeanings(e.target.checked);
});

/* ---------- Flashcard view ---------- */

function setupFlashcards(doShuffle) {
  if (doShuffle) shuffle(state.flashcards);
  state.cardIndex = 0;
  state.flipped = false;
  renderFlashcard();
}

function renderFlashcard() {
  var cardEl = document.getElementById("flashcard");
  var total = state.flashcards.length;

  if (total === 0) {
    document.getElementById("flashcard-front-text").textContent = "Kelime yok";
    document.getElementById("flashcard-back-text").textContent = "";
    document.getElementById("flashcard-progress").textContent = "0 / 0";
    return;
  }

  var word = state.flashcards[state.cardIndex];
  document.getElementById("flashcard-front-text").textContent = word.en;
  document.getElementById("flashcard-back-text").textContent = word.tr;
  document.getElementById("flashcard-progress").textContent = (state.cardIndex + 1) + " / " + total;

  state.flipped = false;
  cardEl.classList.remove("flipped");
}

document.getElementById("flashcard").addEventListener("click", function () {
  if (state.flashcards.length === 0) return;
  state.flipped = !state.flipped;
  this.classList.toggle("flipped", state.flipped);
});

document.getElementById("next-card-btn").addEventListener("click", function () {
  if (state.flashcards.length === 0) return;
  state.cardIndex = (state.cardIndex + 1) % state.flashcards.length;
  renderFlashcard();
});

document.getElementById("prev-card-btn").addEventListener("click", function () {
  if (state.flashcards.length === 0) return;
  state.cardIndex = (state.cardIndex - 1 + state.flashcards.length) % state.flashcards.length;
  renderFlashcard();
});

document.getElementById("shuffle-btn").addEventListener("click", function () {
  setupFlashcards(true);
});

document.getElementById("restart-cards-btn").addEventListener("click", function () {
  setupFlashcards(false);
});

populateGrades();
