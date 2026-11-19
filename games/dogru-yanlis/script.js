/*
 * Doğru mu Yanlış mı? — süreye karşı hızlı karar oyunu.
 *
 * Kelime modu: "apple = elma" gösterilir; %50 ihtimalle anlam doğru,
 * değilse havuzdaki başka bir kelimenin anlamı.
 * Gramer modu: data/grammar.js maddesinin boşluğu ya doğru cevapla ya da
 * bir çeldiriciyle doldurulup tam cümle gösterilir ("She go to school.").
 * Çeldiriciler dilbilgisel olarak yanlış olacak şekilde yazıldığı için
 * "yanlış" cümle gerçekten yanlıştır.
 *
 * Puan: doğru karar 10 × çarpan (5 seri → ×2, 10 seri → ×3).
 * Rekor, sınıf + içerik türü başına cihazda (localStorage) tutulur.
 */

var state = {
  content: "kelime",
  pool: [],
  duration: 60,
  timeLeft: 0,
  timerId: null,
  score: 0,
  streak: 0,
  bestStreak: 0,
  answered: 0,
  correct: 0,
  mistakes: [],
  card: null,         // {html, isTrue, correction}
  busy: false,
  lastPick: null
};

var generation = 0;
function later(fn, ms) {
  var g = generation;
  setTimeout(function () { if (g === generation) fn(); }, ms);
}

var headerEl = document.getElementById("dy-header");
var showScreen = HubSetup.screenSwitcher(function (id) {
  var playing = id === "screen-play" || id === "screen-ready";
  headerEl.hidden = playing;
  document.body.classList.toggle("dy-playing", playing);
});
var esc = HubPlay.escapeHtml;
var setupErrorEl = document.getElementById("setup-error");
var cardEl = document.getElementById("dy-card");

HubSound.bindToggle(document.getElementById("sound-toggle"));

/* ---------- İçerik ---------- */

function selectedContent() {
  var c = document.querySelector('input[name="content"]:checked');
  return c ? c.value : "kelime";
}

function buildPool() {
  var units = picker.checkedUnits();
  var pool = [];
  if (selectedContent() === "gramer") {
    units.forEach(function (u) {
      u.items.forEach(function (it) { pool.push({ q: it[0], answer: it[1], wrong: [it[2], it[3]] }); });
    });
    return pool;
  }
  var seenEn = {}, seenTr = {};
  units.forEach(function (u) {
    u.words.forEach(function (w) {
      var en = w.en.trim().toLowerCase(), tr = w.tr.trim().toLowerCase();
      if (seenEn[en] || seenTr[tr]) return;
      seenEn[en] = seenTr[tr] = true;
      pool.push({ en: w.en, tr: w.tr });
    });
  });
  return pool;
}

function minPool() { return selectedContent() === "gramer" ? 3 : 4; }

function updatePoolCount() {
  var el = document.getElementById("pool-count");
  if (picker.checkedUnitIds().length === 0) { el.textContent = ""; return; }
  var n = buildPool().length;
  var unit = selectedContent() === "gramer" ? " cümle" : " kelime";
  el.textContent = n >= minPool() ? n + unit + " seçildi" : "Biraz az — bir ünite daha seç.";
}

document.querySelectorAll('input[name="content"]').forEach(function (r) {
  r.addEventListener("change", function () {
    document.querySelectorAll(".dy-content .mode-option").forEach(function (el) { el.classList.remove("checked"); });
    r.closest(".mode-option").classList.add("checked");
    picker.setSource(r.value === "gramer" ? GRAMMAR : CURRICULUM);
  });
});

function pickItem() {
  // Aynı öğe arka arkaya gelmesin.
  var item;
  for (var i = 0; i < 5; i++) {
    item = state.pool[Math.floor(Math.random() * state.pool.length)];
    if (item !== state.lastPick) break;
  }
  state.lastPick = item;
  return item;
}

function makeCard() {
  var item = pickItem();
  var isTrue = Math.random() < 0.5;

  if (state.content === "gramer") {
    var fill = isTrue ? item.answer : item.wrong[Math.floor(Math.random() * 2)];
    var parts = item.q.split("___");
    var correctSentence = parts[0] + item.answer + (parts[1] || "");
    return {
      html: '<p class="dy-sentence" lang="en">' + esc(parts[0]) + '<span class="dy-fill">' + esc(fill) + "</span>" +
        esc(parts[1] || "") + "</p>",
      isTrue: isTrue,
      correction: correctSentence,
      review: (isTrue ? "" : parts[0] + fill + (parts[1] || "") + " → ") + correctSentence
    };
  }

  var tr = item.tr;
  if (!isTrue) {
    var other;
    do { other = state.pool[Math.floor(Math.random() * state.pool.length)]; } while (other === item);
    tr = other.tr;
  }
  return {
    html: '<p class="dy-en" lang="en">' + esc(item.en) + '</p><p class="dy-eq">=</p><p class="dy-tr">' + esc(tr) + "</p>",
    isTrue: isTrue,
    correction: item.en + " = " + item.tr,
    review: item.en + " = " + item.tr
  };
}

function showCard() {
  state.card = makeCard();
  document.getElementById("dy-prompt").innerHTML = state.card.html;
  document.getElementById("dy-correction").textContent = "";
  cardEl.className = "dy-card enter";
  state.busy = false;
}

/* ---------- Akış ---------- */

document.querySelectorAll('[data-action="back-to-setup"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    stopTimer();
    generation++;
    showScreen("screen-setup");
  });
});

document.getElementById("start-btn").addEventListener("click", function () {
  if (picker.checkedUnitIds().length === 0) {
    setupErrorEl.textContent = "En az bir ünite seçmelisin.";
    setupErrorEl.hidden = false;
    return;
  }
  var pool = buildPool();
  if (pool.length < minPool()) {
    setupErrorEl.textContent = "Bu seçimde yeterli içerik yok — bir ünite daha seç.";
    setupErrorEl.hidden = false;
    return;
  }
  setupErrorEl.hidden = true;
  state.pool = pool;
  state.content = selectedContent();
  state.duration = parseInt(document.getElementById("duration-select").value, 10);
  countdown();
});

document.getElementById("restart-btn").addEventListener("click", countdown);

function countdown() {
  generation++;
  var n = 3;
  var el = document.getElementById("countdown");
  el.textContent = n;
  showScreen("screen-ready");
  HubSound.tick();
  function step() {
    n--;
    if (n > 0) {
      el.textContent = n;
      HubSound.tick();
      later(step, 700);
    } else {
      startRound();
    }
  }
  later(step, 700);
}

function startRound() {
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.answered = 0;
  state.correct = 0;
  state.mistakes = [];
  state.timeLeft = state.duration;
  updateHud();
  showScreen("screen-play");
  showCard();
  stopTimer();
  state.timerId = setInterval(function () {
    state.timeLeft--;
    updateHud();
    if (state.timeLeft <= 5 && state.timeLeft > 0) HubSound.tick();
    if (state.timeLeft <= 0) endRound();
  }, 1000);
}

function stopTimer() {
  if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
}

function multiplier() {
  return state.streak >= 10 ? 3 : (state.streak >= 5 ? 2 : 1);
}

function updateHud() {
  document.getElementById("score").textContent = state.score;
  document.getElementById("streak").textContent = state.streak;
  var m = multiplier();
  document.getElementById("multiplier").textContent = m > 1 ? "×" + m : "";
  document.getElementById("streak-chip").classList.toggle("hot", m > 1);
  document.getElementById("time-left").textContent = Math.max(state.timeLeft, 0);
  document.getElementById("timer-bar").style.width = Math.max(state.timeLeft / state.duration * 100, 0) + "%";
}

function decide(saysTrue) {
  if (state.busy || !state.card || document.getElementById("screen-play").hidden) return;
  state.busy = true;
  state.answered++;
  var right = saysTrue === state.card.isTrue;

  if (right) {
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.correct++;
    state.score += 10 * multiplier();
    cardEl.className = "dy-card good";
    HubSound.tap();
    updateHud();
    later(showCard, 260);
  } else {
    state.streak = 0;
    state.mistakes.push(state.card.review);
    cardEl.className = "dy-card bad";
    document.getElementById("dy-correction").textContent = "✔ " + state.card.correction;
    HubSound.wrong();
    updateHud();
    later(showCard, 1100);
  }
}

document.getElementById("yes-btn").addEventListener("pointerdown", function (e) { e.preventDefault(); decide(true); });
document.getElementById("no-btn").addEventListener("pointerdown", function (e) { e.preventDefault(); decide(false); });

document.addEventListener("keydown", function (e) {
  if (document.getElementById("screen-play").hidden) return;
  if (e.key === "ArrowRight" || e.key === "l" || e.key === "L") { e.preventDefault(); decide(true); }
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") { e.preventDefault(); decide(false); }
});

/* ---------- Bitiş ---------- */

function recordKey() {
  return "dy-best-" + state.content + "-" + picker.gradeKey();
}

function endRound() {
  stopTimer();
  generation++;
  var acc = state.answered ? Math.round(state.correct / state.answered * 100) : 0;
  document.getElementById("end-title").textContent = state.score + " puan!";
  document.getElementById("end-summary").textContent =
    state.answered + " karar · %" + acc + " isabet · En uzun seri: " + state.bestStreak + " 🔥";

  var best = 0;
  try { best = parseInt(localStorage.getItem(recordKey()), 10) || 0; } catch (e) {}
  var recordEl = document.getElementById("end-record");
  if (state.score > best) {
    try { localStorage.setItem(recordKey(), String(state.score)); } catch (e) {}
    recordEl.textContent = best > 0 ? "🎉 Yeni rekor! (önceki: " + best + ")" : "🏁 Bu sınıf için ilk rekor kaydedildi.";
    document.getElementById("end-emoji").textContent = "🏆";
    if (state.score > 0) { HubSound.win(); HubPlay.confetti(); }
  } else {
    recordEl.textContent = "Bu cihazdaki rekor: " + best;
    document.getElementById("end-emoji").textContent = "⚡";
    HubSound.correct();
  }

  var review = document.getElementById("end-review");
  // Aynı hata birden çok kez yapıldıysa bir kez göster.
  var unique = state.mistakes.filter(function (m, i) { return state.mistakes.indexOf(m) === i; });
  review.innerHTML = unique.length === 0 ? "" :
    '<p class="dy-review-title">Yanlış karar verdiklerin</p>' +
    unique.map(function (m) { return '<div class="dy-review-item" lang="en">' + esc(m) + "</div>"; }).join("");
  showScreen("screen-end");
}

var picker = HubSetup.unitPicker({ source: CURRICULUM, onChange: updatePoolCount });
picker.start();
