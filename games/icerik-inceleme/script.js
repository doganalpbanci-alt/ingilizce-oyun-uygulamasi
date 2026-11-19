/*
 * İçerik İnceleme — öğretmenin taslak içeriği onaylaması için araç.
 *
 * Seçili ünitelerin kelimelerini (CURRICULUM), cümlelerini (SENTENCES) ve
 * gramer maddelerini (GRAMMAR) tek sayfada listeler. Her satır ⚑ ile
 * işaretlenip not eklenebilir; işaretler bu cihazın localStorage'ında
 * tutulur. "Notları Kopyala" düz metin bir liste üretir — öğretmen bunu
 * bir sonraki geliştirme oturumunda yapıştırır, düzeltmeler veriye işlenir.
 *
 * Ünite id'leri üç veri dosyasında aynı olduğu için cümle ve gramer
 * kayıtları id ile bulunur.
 */

var STORE_KEY = "hub-review-flags";
var esc = HubPlay.escapeHtml;
var reviewEl = document.getElementById("review");
var flags = loadFlags();

function loadFlags() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}

function saveFlags() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(flags)); } catch (e) {}
  updateFlagCount();
}

function indexById(source) {
  var map = {};
  if (typeof source === "undefined") return map;
  Object.keys(source).forEach(function (k) {
    source[k].units.forEach(function (u) { map[u.id] = u; });
  });
  return map;
}

var sentenceUnits = indexById(typeof SENTENCES !== "undefined" ? SENTENCES : undefined);
var grammarUnits = indexById(typeof GRAMMAR !== "undefined" ? GRAMMAR : undefined);

function shownTypes() {
  var types = {};
  document.querySelectorAll(".ii-types input[value]").forEach(function (i) { types[i.value] = i.checked; });
  return types;
}

function onlyFlagged() { return document.getElementById("only-flagged").checked; }

function unitLabel(unit) {
  // "Karışık" seçimde başlık zaten sınıf adını taşıyor.
  if (picker.isMixed()) return unit.title;
  return picker.grade().label.split(/ \(| —/)[0] + " · " + unit.title;
}

function row(key, label, html) {
  var flag = flags[key];
  if (onlyFlagged() && !flag) return "";
  return '<div class="ii-row' + (flag ? " flagged" : "") + '" data-key="' + esc(key) + '" data-label="' + esc(label) + '">' +
    '<div class="ii-content">' + html + "</div>" +
    '<button type="button" class="ii-flag no-print" aria-label="İşaretle">⚑</button>' +
    (flag ? '<input class="ii-note" type="text" placeholder="Ne sorunlu? (isteğe bağlı)" value="' + esc(flag.note || "") + '">' : "") +
    "</div>";
}

function render() {
  var units = picker.checkedUnits();
  var types = shownTypes();
  if (units.length === 0) {
    reviewEl.innerHTML = '<p class="hint ii-empty">Yukarıdan en az bir ünite seç.</p>';
    return;
  }

  reviewEl.innerHTML = units.map(function (u) {
    var label = unitLabel(u);
    var parts = [];

    if (types.words) {
      var words = u.words.map(function (w) {
        return row("w|" + u.id + "|" + w.en, label, '<span lang="en"><strong>' + esc(w.en) + "</strong></span> — " + esc(w.tr));
      }).join("");
      if (words) parts.push('<h4>📖 Kelimeler (' + u.words.length + ")</h4><div class=\"ii-words\">" + words + "</div>");
    }

    var su = sentenceUnits[u.id];
    if (types.sentences && su) {
      var structLabels = {};
      su.structures.forEach(function (s) { structLabels[s.id] = s.label; });
      var sents = su.sentences.map(function (s) {
        return row("s|" + u.id + "|" + s.en, label,
          '<span lang="en"><strong>' + esc(s.en) + "</strong></span><br><span>" + esc(s.tr) +
          '</span> <small class="ii-tag">' + esc(structLabels[s.structure] || s.structure) + "</small>");
      }).join("");
      if (sents) parts.push("<h4>🔤 Cümle Kurma (" + su.sentences.length + ")</h4>" + sents);
    }

    var gu = grammarUnits[u.id];
    if (types.grammar && gu) {
      var items = gu.items.map(function (it) {
        var q = it[0].split("___");
        return row("g|" + u.id + "|" + it[0], label,
          '<span lang="en">' + esc(q[0]) + '<strong class="ii-answer">' + esc(it[1]) + "</strong>" + esc(q[1] || "") +
          '</span> <small class="ii-tag">çeldiriciler: <span lang="en">' + esc(it[2]) + " · " + esc(it[3]) + "</span></small>");
      }).join("");
      if (items) {
        parts.push("<h4>🧱 Gramer — " + esc(gu.topic) + " (" + gu.items.length + ')</h4><p class="ii-rule">📘 ' + esc(gu.rule) + "</p>" + items);
      }
    }

    if (parts.length === 0) return "";
    return '<section class="ii-unit"><h3>' + esc(label) + "</h3>" + parts.join("") + "</section>";
  }).join("") || '<p class="hint ii-empty">Bu filtreyle gösterilecek satır yok.</p>';
}

reviewEl.addEventListener("click", function (e) {
  var btn = e.target.closest(".ii-flag");
  if (!btn) return;
  var rowEl = btn.closest(".ii-row");
  var key = rowEl.getAttribute("data-key");
  if (flags[key]) delete flags[key];
  else flags[key] = { note: "", label: rowEl.getAttribute("data-label") };
  saveFlags();
  render();
  var input = reviewEl.querySelector('.ii-row[data-key="' + cssEscape(key) + '"] .ii-note');
  if (input) input.focus();
});

reviewEl.addEventListener("input", function (e) {
  if (!e.target.classList.contains("ii-note")) return;
  var key = e.target.closest(".ii-row").getAttribute("data-key");
  if (flags[key]) {
    flags[key].note = e.target.value;
    saveFlags();
  }
});

function cssEscape(s) {
  return window.CSS && CSS.escape ? CSS.escape(s) : s.replace(/["\\]/g, "\\$&");
}

document.querySelectorAll(".ii-types input").forEach(function (i) { i.addEventListener("change", render); });

function updateFlagCount() {
  document.getElementById("flag-count").textContent = "⚑ " + Object.keys(flags).length + " işaretli";
}

/* ---------- Kopyala / yazdır ---------- */

var TYPE_NAMES = { w: "Kelime", s: "Cümle", g: "Gramer" };

function buildReport() {
  var keys = Object.keys(flags).sort();
  if (keys.length === 0) return "";
  var lines = ["İngilizce Hub — içerik inceleme notları (" + keys.length + " madde)", ""];
  keys.forEach(function (key) {
    var parts = key.split("|");
    var f = flags[key];
    lines.push("- [" + (TYPE_NAMES[parts[0]] || parts[0]) + "] " + (f.label || parts[1]) + " — \"" + parts.slice(2).join("|") + "\"" +
      (f.note ? " — Not: " + f.note : ""));
  });
  return lines.join("\n");
}

document.getElementById("copy-btn").addEventListener("click", function () {
  var text = buildReport();
  var status = document.getElementById("copy-status");
  var fallback = document.getElementById("copy-fallback");
  if (!text) { status.textContent = "Henüz işaretli madde yok."; return; }

  function showFallback() {
    fallback.hidden = false;
    fallback.value = text;
    fallback.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    status.textContent = ok ? "✅ Kopyalandı." : "Aşağıdaki metni seçip kopyala.";
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      fallback.hidden = true;
      status.textContent = "✅ " + Object.keys(flags).length + " not kopyalandı.";
    }, showFallback);
  } else {
    showFallback();
  }
});

document.getElementById("print-btn").addEventListener("click", function () { window.print(); });

document.getElementById("clear-flags-btn").addEventListener("click", function () {
  if (!Object.keys(flags).length) return;
  if (!window.confirm("Tüm işaretler ve notlar silinsin mi?")) return;
  flags = {};
  saveFlags();
  render();
});

var picker = HubSetup.unitPicker({ source: CURRICULUM, onChange: render });
picker.start();
updateFlagCount();
