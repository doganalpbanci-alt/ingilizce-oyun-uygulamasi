/*
 * Deyim Avı - ses efektleri.
 *
 * Diğer oyunlardaki SoundManager deseninin aynısı: ses dosyası yok, tonlar
 * Web Audio ile kod içinde üretiliyor (offline çalışsın, telif sorunu
 * olmasın). Sessize alma tercihi localStorage'da oyun bazında tutuluyor.
 */
var SoundManager = (function () {
  var ctx = null;
  var muted = localStorage.getItem("da-muted") === "1";

  function getCtx() {
    if (!ctx) {
      var AudioCtor = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtor();
    }
    return ctx;
  }

  // iPad'de standalone modda ses, ilk kullanıcı hareketine kadar kilitli
  // kalıyor; ilk dokunuşta sessiz bir buffer çalıp kilidi açıyoruz.
  function primeOnce() {
    var audio = getCtx();
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
    if (audio.state === "running") {
      callback(audio);
      return;
    }
    audio.resume().then(function () { callback(audio); }).catch(function () {});
  }

  function envelope(gainNode, startTime, attack, sustainLevel, holdTime, release) {
    var g = gainNode.gain;
    g.cancelScheduledValues(startTime);
    g.setValueAtTime(0, startTime);
    g.linearRampToValueAtTime(sustainLevel, startTime + attack);
    g.setValueAtTime(sustainLevel, startTime + attack + holdTime);
    g.linearRampToValueAtTime(0, startTime + attack + holdTime + release);
  }

  function tone(audio, freq, startTime, duration, type, level) {
    var osc = audio.createOscillator();
    osc.type = type || "triangle";
    osc.frequency.setValueAtTime(freq, startTime);
    var gain = audio.createGain();
    envelope(gain, startTime, 0.005, level || 0.2, duration, 0.1);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.2);
  }

  return {
    isMuted: function () { return muted; },
    setMuted: function (value) {
      muted = value;
      localStorage.setItem("da-muted", value ? "1" : "0");
      if (!value) primeOnce();
    },
    playCorrect: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        tone(audio, 659.25, t, 0.08);
        tone(audio, 987.77, t + 0.08, 0.12);
      });
    },
    playWrong: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        var osc = audio.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(240, t);
        osc.frequency.linearRampToValueAtTime(130, t + 0.22);
        var gain = audio.createGain();
        envelope(gain, t, 0.005, 0.16, 0.1, 0.14);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(t);
        osc.stop(t + 0.32);
      });
    },
    playFinish: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach(function (f, i) {
          tone(audio, f, t + i * 0.09, 0.12, "triangle", 0.22);
        });
      });
    }
  };
})();
