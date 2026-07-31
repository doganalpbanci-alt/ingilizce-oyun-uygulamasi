/*
 * Service worker kaydı.
 *
 * Sadece http(s) üzerinden çalışır. Klasörü indirip index.html'e çift
 * tıklayarak açtığında (file://) burası sessizce atlanır, uygulama yine
 * normal şekilde çalışır.
 */
(function () {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "http:" && location.protocol !== "https:") return;

  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then(function (registration) {
      // Her açılışta yeni sürüm var mı diye kontrol et.
      registration.update();
    }).catch(function () {
      // Kayıt başarısız olursa uygulama yine çalışsın, sadece offline
      // desteği olmaz.
    });
  });
})();
