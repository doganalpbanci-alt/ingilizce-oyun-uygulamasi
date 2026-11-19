/*
 * İngilizce sesli okuma (tarayıcının yerleşik konuşma sentezi).
 *
 * Telaffuz PRATİĞİ (mikrofonla değerlendirme) kapsam dışı; bu yalnızca
 * kelimeyi doğru telaffuzla dinletir. Ses dosyası yok — cihazın kendi
 * İngilizce sesi kullanılır (iPad/Windows/Android'de çevrimdışı da çalışır).
 * Cihazda İngilizce ses yoksa `available()` false döner ve oyunlar düğmeyi
 * hiç göstermez.
 *
 *   HubSpeech.available()  -> bool
 *   HubSpeech.speak("apple")
 */
var HubSpeech = (function () {
  var synth = window.speechSynthesis;
  var voice = null;

  function pickVoice() {
    if (!synth) return null;
    var voices = synth.getVoices().filter(function (v) { return /^en(-|_|$)/i.test(v.lang); });
    if (voices.length === 0) return null;
    // Önce cihaz üzerindeki (çevrimdışı çalışan) İngiliz, sonra Amerikan sesi.
    function find(test) {
      for (var i = 0; i < voices.length; i++) if (test(voices[i])) return voices[i];
      return null;
    }
    return find(function (v) { return v.localService && /GB/i.test(v.lang); }) ||
      find(function (v) { return v.localService && /US/i.test(v.lang); }) ||
      find(function (v) { return v.localService; }) ||
      voices[0];
  }

  if (synth) {
    voice = pickVoice();
    // Chrome sesleri geç yükler.
    if (typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", function () { voice = pickVoice(); });
    }
  }

  function available() {
    return !!synth && typeof SpeechSynthesisUtterance !== "undefined";
  }

  function speak(text) {
    if (!available()) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = voice ? voice.lang : "en-GB";
    if (voice) u.voice = voice;
    u.rate = 0.9;
    synth.speak(u);
  }

  return { available: available, speak: speak };
})();
