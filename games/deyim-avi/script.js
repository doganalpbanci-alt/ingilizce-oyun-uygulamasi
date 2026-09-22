/*
 * Deyim Avı — Türkçe anlamı göster, dört İngilizce deyimden doğrusunu seçtir.
 *
 * Veri kaynağı `data/twinkl-idioms.js` (IDIOMS). Kelime oyunlarından farklı
 * olarak CURRICULUM değil IDIOMS okunur; dış iskelet aynı olduğu için
 * HubSetup.unitPicker hiç değiştirilmeden çalışır.
 */
var state = {
  questions: [],
  index: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  locked: false
};

var unitCountEl = document.getElementById("unit-word-count");
var unitErrorEl = document.getElementById("unit-error");
var questionCountSelect = document.getElementById("question-count-select");

var questionIndexEl = document.getElementById("question-index");
var questionTotalEl = document.getElementById("question-total");
var scoreEl = document.getElementById("score");
var streakEl = document.getElementById("streak");
var meaningEl = document.getElementById("idiom-meaning");
var turkishEl = document.getElementById("idiom-turkish");
var optionsEl = document.getElementById("options");
var feedbackEl = document.getElementById("feedback");
var nextBtn = document.getElementById("next-btn");

var soundToggleBtn = document.getElementById("sound-toggle");

var showScreen = HubSetup.screenSwitcher();
var shuffle = HubSetup.shuffle;

/* ---------- Ses ---------- */

function refreshSoundToggleIcon() {
  soundToggleBtn.textContent = SoundManager.isMuted() ? "🔇" : "🔊";
}

soundToggleBtn.addEventListener("click", function () {
  SoundManager.setMuted(!SoundManager.isMuted());
  refreshSoundToggleIcon();
});

refreshSoundToggleIcon();

/* ---------- Havuz kurma ---------- */

// Seçili derslerin deyimleri: sorulacak olanlar bunlar.
function buildIdiomPool(unitIds) {
  var level = picker.grade();
  var seen = {};
  var items = [];
  level.units
    .filter(function (u) { return unitIds.indexOf(u.id) !== -1; })
    .forEach(function (u) {
      u.idioms.forEach(function (idiom) {
        var key = idiom.en.toLowerCase();
        if (!seen[key]) {
          seen[key] = true;
          items.push(idiom);
        }
      });
    });
  return items;
}

// Çeldiriciler: tek ders seçildiğinde o derste yalnızca 1 deyim olduğu için
// şık üretilemez. Bu yüzden çeldirici havuzu önce seçili seviyenin tamamı,
// yetmezse bütün seviyelerdir.
function buildDistractorPool() {
  var level = picker.grade();
  var seen = {};
  var items = [];

  function add(unit) {
    unit.idioms.forEach(function (idiom) {
      var key = idiom.en.toLowerCase();
      if (!seen[key]) {
        seen[key] = true;
        items.push(idiom);
      }
    });
  }

  level.units.forEach(add);
  if (items.length < 4) {
    Object.keys(IDIOMS).forEach(function (key) {
      IDIOMS[key].units.forEach(add);
    });
  }
  return items;
}

function updateIdiomCount() {
  var count = buildIdiomPool(picker.checkedUnitIds()).length;
  unitCountEl.textContent = count > 0 ? count + " deyim seçildi" : "";
}

/* ---------- Soru üretimi ---------- */

function buildQuestions(pool, distractors, wanted) {
  var asked = shuffle(pool.slice());
  if (wanted > 0 && asked.length > wanted) asked = asked.slice(0, wanted);

  return asked.map(function (correct) {
    var others = distractors.filter(function (i) {
      return i.en.toLowerCase() !== correct.en.toLowerCase();
    });
    var options = shuffle(others).slice(0, 3);
    options.push(correct);
    return { correct: correct, options: shuffle(options) };
  });
}

/* ---------- Ekranlar ---------- */

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () { showScreen("screen-setup"); });
});

document.getElementById("start-btn").addEventListener("click", function () {
  var unitIds = picker.checkedUnitIds();
  if (unitIds.length === 0) {
    unitErrorEl.textContent = "En az bir ders seçmelisin.";
    unitErrorEl.hidden = false;
    return;
  }

  var pool = buildIdiomPool(unitIds);
  if (pool.length === 0) {
    unitErrorEl.textContent = "Bu seçimde hiç deyim yok.";
    unitErrorEl.hidden = false;
    return;
  }

  var distractors = buildDistractorPool();
  if (distractors.length < 4) {
    unitErrorEl.textContent = "Şık üretmek için yeterli deyim yok.";
    unitErrorEl.hidden = false;
    return;
  }
  unitErrorEl.hidden = true;

  var wanted = parseInt(questionCountSelect.value, 10);
  state.questions = buildQuestions(pool, distractors, wanted);
  state.index = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;

  questionTotalEl.textContent = state.questions.length;
  showScreen("screen-game");
  renderQuestion();
});

document.getElementById("again-btn").addEventListener("click", function () {
  document.getElementById("start-btn").click();
});

/* ---------- Oyun ---------- */

function renderQuestion() {
  var q = state.questions[state.index];
  state.locked = false;

  questionIndexEl.textContent = state.index + 1;
  scoreEl.textContent = state.score;
  streakEl.textContent = state.streak;

  meaningEl.textContent = q.correct.meaning;
  turkishEl.textContent = "Türkçesi: " + q.correct.tr;

  feedbackEl.hidden = true;
  feedbackEl.className = "idiom-feedback";
  nextBtn.hidden = true;

  optionsEl.innerHTML = "";
  q.options.forEach(function (option) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "idiom-option";
    btn.textContent = option.en;
    btn.addEventListener("click", function () { answer(option, btn); });
    optionsEl.appendChild(btn);
  });
}

function answer(picked, btn) {
  // Akıllı tahtada çocuk üst üste dokunabiliyor; ilk cevaptan sonra kilitle.
  if (state.locked) return;
  state.locked = true;

  var q = state.questions[state.index];
  var correct = picked.en.toLowerCase() === q.correct.en.toLowerCase();

  Array.prototype.forEach.call(optionsEl.children, function (el) {
    el.disabled = true;
    if (el.textContent === q.correct.en) el.classList.add("correct");
  });

  if (correct) {
    state.score++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    feedbackEl.textContent = "✅ Doğru!";
    feedbackEl.classList.add("good");
    SoundManager.playCorrect();
  } else {
    state.streak = 0;
    btn.classList.add("wrong");
    feedbackEl.textContent = "❌ Doğrusu: " + q.correct.en;
    feedbackEl.classList.add("bad");
    SoundManager.playWrong();
  }

  scoreEl.textContent = state.score;
  streakEl.textContent = state.streak;
  feedbackEl.hidden = false;

  nextBtn.textContent = state.index + 1 >= state.questions.length
    ? "Sonucu Gör"
    : "Sonraki Soru";
  nextBtn.hidden = false;
}

nextBtn.addEventListener("click", function () {
  state.index++;
  if (state.index >= state.questions.length) {
    showResult();
    return;
  }
  renderQuestion();
});

/* ---------- Sonuç ---------- */

function showResult() {
  var total = state.questions.length;
  document.getElementById("result-score").textContent = state.score;
  document.getElementById("result-total").textContent = total;

  var ratio = total === 0 ? 0 : state.score / total;
  var title = "Bitti!";
  var comment = "En uzun serin: " + state.bestStreak + ".";
  if (ratio === 1) {
    title = "🏆 Kusursuz!";
  } else if (ratio >= 0.7) {
    title = "👏 Çok iyi!";
  } else if (ratio >= 0.4) {
    title = "🙂 Fena değil";
    comment += " Aşağıdaki listeyi bir kez daha oku, tekrar dene.";
  } else {
    title = "💪 Biraz daha çalışalım";
    comment += " Aşağıdaki listeyi bir kez daha oku, tekrar dene.";
  }
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-comment").textContent = comment;

  var list = document.getElementById("review-list");
  list.innerHTML = "";
  state.questions.forEach(function (q) {
    var li = document.createElement("li");
    var en = document.createElement("strong");
    en.textContent = q.correct.en;
    var rest = document.createElement("span");
    rest.textContent = " — " + q.correct.tr + ": " + q.correct.meaning;
    li.appendChild(en);
    li.appendChild(rest);
    list.appendChild(li);
  });

  SoundManager.playFinish();
  showScreen("screen-result");
}

/* ---------- Başlat ---------- */

// picker ATANDIKTAN sonra start() — onChange geri çağrısı picker'ı kullanıyor.
var picker = HubSetup.unitPicker({ source: IDIOMS, onChange: updateIdiomCount });
picker.start();
