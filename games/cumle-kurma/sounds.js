var SoundManager = (function () {
  var ctx = null;
  var muted = localStorage.getItem("cmk-muted") === "1";

  function getCtx() {
    if (!ctx) {
      var AudioCtor = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtor();
    }
    return ctx;
  }

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
      localStorage.setItem("cmk-muted", value ? "1" : "0");
      if (!value) primeOnce();
    },
    playPlace: function () {
      withCtx(function (audio) {
        tone(audio, 520, audio.currentTime, 0.06, "sine", 0.14);
      });
    },
    playRemove: function () {
      withCtx(function (audio) {
        tone(audio, 340, audio.currentTime, 0.06, "sine", 0.1);
      });
    },
    playCorrect: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        [523.25, 659.25, 783.99].forEach(function (f, i) {
          tone(audio, f, t + i * 0.08, 0.14, "triangle", 0.22);
        });
      });
    },
    playWrong: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        tone(audio, 180, t, 0.14, "sawtooth", 0.14);
      });
    },
    playTick: function () {
      withCtx(function (audio) {
        tone(audio, 880, audio.currentTime, 0.05, "square", 0.08);
      });
    },
    playTimeUp: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        [220, 160].forEach(function (f, i) {
          tone(audio, f, t + i * 0.14, 0.18, "sawtooth", 0.16);
        });
      });
    },
    playWin: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98].forEach(function (f, i) {
          tone(audio, f, t + i * 0.1, 0.16, "triangle", 0.22);
        });
      });
    }
  };
})();
