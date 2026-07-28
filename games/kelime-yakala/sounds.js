var SoundManager = (function () {
  var ctx = null;
  var muted = localStorage.getItem("ky-muted") === "1";

  function getCtx() {
    if (!ctx) {
      var AudioCtor = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtor();
    }
    return ctx;
  }

  function primeOnce() {
    var audio = getCtx();
    if (audio.state === "suspended") {
      audio.resume().catch(function () {});
    }
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

  function isMuted() { return muted; }

  function setMuted(value) {
    muted = value;
    localStorage.setItem("ky-muted", value ? "1" : "0");
    if (!value) primeOnce();
  }

  function playCorrect() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      [880, 1174.66, 1567.98].forEach(function (freq, i) {
        var osc = audio.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t + i * 0.06);
        var gain = audio.createGain();
        envelope(gain, t + i * 0.06, 0.004, 0.22, 0.08, 0.1);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(t + i * 0.06);
        osc.stop(t + i * 0.06 + 0.2);
      });
    });
  }

  function playWrong() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      var osc = audio.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.linearRampToValueAtTime(80, t + 0.28);
      var gain = audio.createGain();
      envelope(gain, t, 0.005, 0.2, 0.12, 0.16);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.36);
    });
  }

  function playLevelUp() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach(function (freq, i) {
        var osc = audio.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, t + i * 0.09);
        var gain = audio.createGain();
        envelope(gain, t + i * 0.09, 0.004, 0.16, 0.1, 0.1);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(t + i * 0.09);
        osc.stop(t + i * 0.09 + 0.24);
      });
    });
  }

  function hoot(audio, startTime, baseFreq, duration) {
    var osc = audio.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, startTime);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.7, startTime + duration * 0.5);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.55, startTime + duration);
    var gain = audio.createGain();
    envelope(gain, startTime, 0.05, 0.22, duration - 0.2, 0.1);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  function playHoot() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      hoot(audio, t, 420, 0.3);
      hoot(audio, t + 0.32, 380, 0.4);
    });
  }

  function playGameOver() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      [440, 349.23, 293.66, 220].forEach(function (freq, i) {
        var osc = audio.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, t + i * 0.18);
        var gain = audio.createGain();
        envelope(gain, t + i * 0.18, 0.01, 0.16, 0.14, 0.12);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(t + i * 0.18);
        osc.stop(t + i * 0.18 + 0.3);
      });
    });
  }

  return {
    isMuted: isMuted,
    setMuted: setMuted,
    playCorrect: playCorrect,
    playWrong: playWrong,
    playLevelUp: playLevelUp,
    playHoot: playHoot,
    playGameOver: playGameOver
  };
})();
