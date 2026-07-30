var SoundManager = (function () {
  var ctx = null;
  var muted = localStorage.getItem("aa-muted") === "1";

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
      localStorage.setItem("aa-muted", value ? "1" : "0");
      if (!value) primeOnce();
    },
    playHit: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        tone(audio, 784, t, 0.07);
        tone(audio, 1046.5, t + 0.07, 0.1);
      });
    },
    playMiss: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        var osc = audio.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.linearRampToValueAtTime(120, t + 0.22);
        var gain = audio.createGain();
        envelope(gain, t, 0.005, 0.18, 0.1, 0.14);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(t);
        osc.stop(t + 0.32);
      });
    },
    playWin: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach(function (f, i) {
          tone(audio, f, t + i * 0.09, 0.12, "triangle", 0.22);
        });
      });
    },
    playLose: function () {
      withCtx(function (audio) {
        var t = audio.currentTime;
        [392, 349.23, 293.66, 196].forEach(function (f, i) {
          tone(audio, f, t + i * 0.2, 0.18, "sawtooth", 0.16);
        });
      });
    }
  };
})();
