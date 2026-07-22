var SoundManager = (function () {
  var ctx = null;
  var muted = localStorage.getItem("kt-muted") === "1";

  function getCtx() {
    if (!ctx) {
      var AudioCtor = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtor();
    }
    return ctx;
  }

  // Safari/iOS only unlocks audio playback if the AudioContext is created
  // and resumed synchronously inside a real user gesture. We prime it on
  // the very first tap/click anywhere on the page, well before any sound
  // is actually needed, so later calls (including ones fired from
  // setTimeout, e.g. after a match ends) have a context that is already
  // running instead of stuck "suspended".
  function primeOnce() {
    var audio = getCtx();
    if (audio.state === "suspended") {
      audio.resume().catch(function () {});
    }
  }

  ["click", "touchend"].forEach(function (evt) {
    document.addEventListener(evt, primeOnce, { capture: true, passive: true });
  });

  // Runs `callback(audioContext)` once the context is actually running.
  // On Safari, scheduling sound nodes while the context is still
  // "suspended" can silently drop them even after resume() later
  // completes, so we always wait for resume() to resolve first.
  function withCtx(callback) {
    if (muted) return;
    var audio = getCtx();
    if (audio.state === "running") {
      callback(audio);
      return;
    }
    audio.resume().then(function () {
      callback(audio);
    }).catch(function () {});
  }

  function envelope(gainNode, startTime, attack, sustainLevel, holdTime, release) {
    var g = gainNode.gain;
    g.cancelScheduledValues(startTime);
    g.setValueAtTime(0, startTime);
    g.linearRampToValueAtTime(sustainLevel, startTime + attack);
    g.setValueAtTime(sustainLevel, startTime + attack + holdTime);
    g.linearRampToValueAtTime(0, startTime + attack + holdTime + release);
  }

  function whistleBurst(audio, startTime, duration) {
    var carrier = audio.createOscillator();
    carrier.type = "square";
    carrier.frequency.setValueAtTime(2900, startTime);

    var lfo = audio.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(17, startTime);
    var lfoGain = audio.createGain();
    lfoGain.gain.setValueAtTime(130, startTime);
    lfo.connect(lfoGain);
    lfoGain.connect(carrier.frequency);

    var gain = audio.createGain();
    envelope(gain, startTime, 0.01, 0.22, Math.max(duration - 0.06, 0.02), 0.04);

    carrier.connect(gain);
    gain.connect(audio.destination);

    carrier.start(startTime);
    lfo.start(startTime);
    carrier.stop(startTime + duration + 0.05);
    lfo.stop(startTime + duration + 0.05);
  }

  function noiseBuffer(audio, duration) {
    var bufferSize = Math.floor(audio.sampleRate * duration);
    var buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  function isMuted() {
    return muted;
  }

  function setMuted(value) {
    muted = value;
    localStorage.setItem("kt-muted", value ? "1" : "0");
    if (!value) primeOnce();
  }

  function playWhistle() {
    withCtx(function (audio) {
      whistleBurst(audio, audio.currentTime, 0.35);
    });
  }

  function playFullTimeWhistle() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      whistleBurst(audio, t, 0.22);
      whistleBurst(audio, t + 0.32, 0.22);
      whistleBurst(audio, t + 0.64, 0.45);
    });
  }

  function playGoal() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      var notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach(function (freq, i) {
        var osc = audio.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t + i * 0.08);
        var gain = audio.createGain();
        envelope(gain, t + i * 0.08, 0.005, 0.25, 0.09, 0.12);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(t + i * 0.08);
        osc.stop(t + i * 0.08 + 0.25);
      });
    });
  }

  function playWrong() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      var osc = audio.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.linearRampToValueAtTime(90, t + 0.22);
      var gain = audio.createGain();
      envelope(gain, t, 0.005, 0.22, 0.1, 0.14);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  }

  function playCheer() {
    withCtx(function (audio) {
      var t = audio.currentTime;

      whistleBurst(audio, t, 0.2);
      whistleBurst(audio, t + 0.28, 0.2);
      whistleBurst(audio, t + 0.56, 0.4);

      var duration = 2.2;
      var noise = audio.createBufferSource();
      noise.buffer = noiseBuffer(audio, duration);

      var filter = audio.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(0.6, t);

      var gain = audio.createGain();
      var startTime = t + 0.9;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.28, startTime + 0.4);
      gain.gain.linearRampToValueAtTime(0.16, startTime + 1.2);
      gain.gain.linearRampToValueAtTime(0, startTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audio.destination);
      noise.start(startTime);
      noise.stop(startTime + duration);
    });
  }

  function playTick() {
    withCtx(function (audio) {
      var t = audio.currentTime;
      var osc = audio.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(1000, t);
      var gain = audio.createGain();
      envelope(gain, t, 0.002, 0.12, 0.02, 0.03);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    });
  }

  return {
    isMuted: isMuted,
    setMuted: setMuted,
    playWhistle: playWhistle,
    playFullTimeWhistle: playFullTimeWhistle,
    playGoal: playGoal,
    playWrong: playWrong,
    playCheer: playCheer,
    playTick: playTick
  };
})();
