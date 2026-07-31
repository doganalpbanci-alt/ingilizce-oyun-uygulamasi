/*
 * İngilizce Hub - Service Worker
 *
 * Amaç: uygulama ana ekrana eklendiğinde (PWA) hem internetsiz çalışsın
 * hem de yeni sürüm yayınlandığında güncelleme kesin olarak ulaşsın.
 *
 * Strateji: same-origin GET istekleri için ÖNCE AĞ, olmazsa önbellek
 * (network-first, cache fallback).
 *   - İnternet varken her zaman sunucudaki güncel dosya gelir, yani
 *     "güncelleme PWA'ya gelmiyor" sorunu yaşanmaz. Gelen yanıt aynı anda
 *     önbelleğe de yazılır.
 *   - İnternet yokken önbellekteki son sürüm sunulur.
 *
 * Not: Service worker sadece http(s) üzerinden çalışır. Klasörü USB ile
 * taşıyıp index.html'e çift tıklayarak açma (file://) senaryosu bundan
 * etkilenmez; orada zaten her şey yerelden okunur.
 *
 * Yeni dosya eklendiğinde PRECACHE listesini ve CACHE_VERSION'ı güncelle.
 */

var CACHE_VERSION = "v2";
var CACHE_NAME = "ingilizce-hub-" + CACHE_VERSION;

var PRECACHE = [
  "./",
  "index.html",
  "manifest.json",
  "css/style.css",
  "data/curriculum.js",
  "js/games-registry.js",
  "js/hub.js",
  "js/pwa.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "games/adam-asmaca/index.html",
  "games/adam-asmaca/script.js",
  "games/adam-asmaca/sounds.js",
  "games/adam-asmaca/style.css",
  "games/ciz-bakalim/index.html",
  "games/ciz-bakalim/script.js",
  "games/ciz-bakalim/sounds.js",
  "games/ciz-bakalim/style.css",
  "games/kelime-avi/index.html",
  "games/kelime-avi/script.js",
  "games/kelime-avi/sounds.js",
  "games/kelime-avi/style.css",
  "games/kelime-eslestirme/index.html",
  "games/kelime-eslestirme/script.js",
  "games/kelime-eslestirme/style.css",
  "games/kelime-kartlari/index.html",
  "games/kelime-kartlari/script.js",
  "games/kelime-kartlari/style.css",
  "games/kelime-turnuvasi/index.html",
  "games/kelime-turnuvasi/script.js",
  "games/kelime-turnuvasi/sounds.js",
  "games/kelime-turnuvasi/style.css",
  "games/kelime-yakala/index.html",
  "games/kelime-yakala/script.js",
  "games/kelime-yakala/sounds.js",
  "games/kelime-yakala/style.css"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // Tek bir dosya bile 404 verirse addAll komple başarısız olur; bu
      // yüzden dosyaları tek tek ekliyoruz ve eksik olanı sessizce atlıyoruz.
      return Promise.all(
        PRECACHE.map(function (url) {
          return cache.add(new Request(url, { cache: "reload" })).catch(function () {});
        })
      );
    }).then(function () {
      // Yeni sürüm beklemeye geçmesin, hemen devralsın.
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.map(function (name) {
          if (name !== CACHE_NAME) return caches.delete(name);
          return null;
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("message", function (event) {
  if (event.data === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", function (event) {
  var request = event.request;

  if (request.method !== "GET") return;

  var url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  // ÖNEMLİ: düz fetch(request) tarayıcının kendi HTTP önbelleğini kullanır;
  // sunucu "max-age" verdiği için (GitHub Pages veriyor) güncellenmiş dosya
  // yerine eski kopya dönebiliyordu ve güncelleme uygulamaya ulaşmıyordu.
  // cache: "no-cache" her seferinde sunucuya koşullu istek attırır: dosya
  // değişmemişse 304 döner (ucuz), değişmişse yeni sürüm gelir.
  var freshRequest = new Request(request.url, {
    cache: "no-cache",
    credentials: "same-origin"
  });

  event.respondWith(
    fetch(freshRequest)
      .then(function (response) {
        // Başarılı yanıtı önbelleğe yaz (opaque/hatalı yanıtları yazma).
        if (response && response.ok && response.type === "basic") {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      })
      .catch(function () {
        return caches.match(request).then(function (cached) {
          if (cached) return cached;
          // Sayfa isteği ve önbellekte yoksa ana sayfayı ver.
          if (request.mode === "navigate") return caches.match("index.html");
          return Response.error();
        });
      })
  );
});
