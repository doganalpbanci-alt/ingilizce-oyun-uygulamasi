/*
 * Ortak ses efektleri (Web Audio, dosyasız, offline).
 *
 * Neden var: ilk 6 oyunun her birinde neredeyse aynı sounds.js kopyası var.
 * Yeni oyunlar kendi sounds.js'lerini yazmak yerine bunu yükler. Eski
 * oyunlar şimdilik kendi dosyalarını kullanıyor (çalışıyorlar, dokunmaya
 * gerek yok); ama sessiz ayarı hepsinde aynı anahtarı (`hub-muted`)
 * kullanır — öğretmen bir oyunda sesi kapatınca hepsinde kapalı kalır.
 *
 * Kullanım:
 *   <script src="../../js/shared-sound.js"></script>
 *   HubSound.bindToggle(document.getElementById("sound-toggle"));
 *   HubSound.correct(); HubSound.wrong(); HubSound.win(); ...
 */
var HubSound = (function () {
  var KEY = "hub-muted";
  var ctx = null;
  var muted = false;
  try { muted = localStorage.getItem(KEY) === "1"; } catch (e) {}

  function getCtx() {
    if (!ctx) {
      var AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      ctx = new AudioCtor();
    }
    return ctx;
  }

  // iPad/Safari: ses bağlamı ancak bir kullanıcı dokunuşu içinde açılır.
  function primeOnce() {
    var audio = getCtx();
    if (!audio) return;
    if (audio.state === "suspended") audio.resume().catch(function () {});
    try {
      var buffer = audio.createBuffer(1, 1, audio.sampleRate);
      var source = audio.createBufferSource();
      source.buffer = buffer;
      source.connect(audio.destination);
      source.start(0);
    } catch (e) {}
  }

  ["click", "touchend", "touchstart"].forEach(function (evt) {
    document.addEventListener(evt, primeOnce, { capture: true, passive: true });
  });

  function withCtx(callback) {
    if (muted) return;
    var audio = getCtx();
    if (!audio) return;
    if (audio.state === "running") { callback(audio); return; }
    audio.resume().then(function () { callback(audio); }).catch(function () {});
  }

  function tone(audio, freq, startTime, duration, type, level) {
    var osc = audio.createOscillator();
    osc.type = type || "triangle";
    osc.frequency.setValueAtTime(freq, startTime);
    var gain = audio.createGain();
    var g = gain.gain;
    g.setValueAtTime(0, startTime);
    g.linearRampToValueAtTime(level || 0.2, startTime + 0.005);
    g.setValueAtTime(level || 0.2, startTime + 0.005 + duration);
    g.linearRampToValueAtTime(0, startTime + duration + 0.105);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.2);
  }

  function seq(freqs, step, dur, type, level) {
    withCtx(function (audio) {
      var t = audio.currentTime;
      freqs.forEach(function (f, i) { tone(audio, f, t + i * step, dur, type, level); });
    });
  }

  function setMuted(value) {
    muted = value;
    try { localStorage.setItem(KEY, value ? "1" : "0"); } catch (e) {}
    if (!value) primeOnce();
  }

  function bindToggle(btn) {
    if (!btn) return;
    function refresh() { btn.textContent = muted ? "🔇" : "🔊"; }
    btn.addEventListener("click", function () { setMuted(!muted); refresh(); });
    refresh();
  }

  return {
    isMuted: function () { return muted; },
    setMuted: setMuted,
    bindToggle: bindToggle,
    tap:     function () { seq([520], 0, 0.06, "sine", 0.14); },
    undo:    function () { seq([340], 0, 0.06, "sine", 0.1); },
    correct: function () { seq([523.25, 659.25, 783.99], 0.08, 0.14, "triangle", 0.22); },
    wrong:   function () { seq([180], 0, 0.14, "sawtooth", 0.14); },
    tick:    function () { seq([880], 0, 0.05, "square", 0.08); },
    timeUp:  function () { seq([220, 160], 0.14, 0.18, "sawtooth", 0.16); },
    pull:    function () { seq([300, 420], 0.06, 0.08, "square", 0.12); },
    win:     function () { seq([523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98], 0.1, 0.16, "triangle", 0.22); }
  };
})();
