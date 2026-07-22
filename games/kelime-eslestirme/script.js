var WORD_PAIRS = [
  { en: "apple", tr: "elma" },
  { en: "book", tr: "kitap" },
  { en: "cat", tr: "kedi" },
  { en: "dog", tr: "köpek" },
  { en: "house", tr: "ev" },
  { en: "water", tr: "su" },
  { en: "sun", tr: "güneş" },
  { en: "friend", tr: "arkadaş" }
];

var board = document.getElementById("board");
var moveCountEl = document.getElementById("move-count");
var winMessageEl = document.getElementById("win-message");
var finalMovesEl = document.getElementById("final-moves");
var restartBtn = document.getElementById("restart-btn");

var flippedCards = [];
var matchedCount = 0;
var moveCount = 0;
var locked = false;

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

function buildDeck() {
  var deck = [];
  WORD_PAIRS.forEach(function (pair, index) {
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
  if (locked) return;

  var card = event.currentTarget;
  if (card.classList.contains("is-matched") || card.classList.contains("is-face-up-selected")) {
    return;
  }

  card.classList.remove("is-face-down");
  card.classList.add("is-face-up-selected");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moveCount++;
    moveCountEl.textContent = moveCount;
    checkMatch();
  }
}

function checkMatch() {
  var [first, second] = flippedCards;

  if (first.dataset.pair === second.dataset.pair) {
    first.classList.add("is-matched");
    second.classList.add("is-matched");
    first.classList.remove("is-face-up-selected");
    second.classList.remove("is-face-up-selected");
    flippedCards = [];
    matchedCount++;

    if (matchedCount === WORD_PAIRS.length) {
      finalMovesEl.textContent = moveCount;
      winMessageEl.hidden = false;
    }
    return;
  }

  locked = true;
  setTimeout(function () {
    first.classList.remove("is-face-up-selected");
    second.classList.remove("is-face-up-selected");
    first.classList.add("is-face-down");
    second.classList.add("is-face-down");
    flippedCards = [];
    locked = false;
  }, 800);
}

function restartGame() {
  flippedCards = [];
  matchedCount = 0;
  moveCount = 0;
  locked = false;
  moveCountEl.textContent = "0";
  winMessageEl.hidden = true;
  renderBoard();
}

restartBtn.addEventListener("click", restartGame);
renderBoard();
