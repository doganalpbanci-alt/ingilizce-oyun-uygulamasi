# İngilizce Oyun Uygulaması

Akıllı tahtada kullanmak için hazırlanan, hem **internetsiz (dosya olarak çift tıklayıp)** hem de **internet üzerinden (web sitesi olarak)** açılabilen İngilizce öğretim oyunları merkezi.

## Nasıl açılır

- **Offline:** `index.html` dosyasına çift tıkla, tarayıcıda açılır.
- **Online:** Tüm klasörü herhangi bir statik hosting'e (GitHub Pages, Netlify vb.) yükle, aynı şekilde çalışır.

Hiçbir kurulum, sunucu veya internet bağlantısı gerekmez.

## Klasör yapısı

```
index.html              -> Ana menü (hub)
css/style.css           -> Ortak tema (hub + tüm oyunlar bunu kullanır)
js/games-registry.js    -> Oyun listesi (yeni oyun eklerken burayı güncelle)
js/hub.js               -> Ana menüyü listeye göre çizen kod
games/
  kelime-eslestirme/    -> İlk oyun: kelime eşleştirme (hafıza kartları)
    index.html
    style.css
    script.js
```

## Yeni oyun ekleme

1. `games/` altında yeni bir klasör aç (ör. `games/bosluk-doldurma/`).
2. İçine kendi `index.html`, `style.css`, `script.js` dosyalarını koy. `../../css/style.css` dosyasını `<link>` ile ekleyerek ortak temayı kullanabilirsin.
3. Menüye dönmek için sayfaya `<a class="back-link" href="../../index.html">← Menüye Dön</a>" ekle.
4. `js/games-registry.js` içindeki `GAMES` dizisine yeni oyunu ekle (`id`, `title`, `description`, `icon`, `path`, `color`).

## Teknik notlar

- Sayfalar arası bağlantı `<a href="...">` ile yapılır, oyun listesi düz bir JS dizisidir (`fetch` ile JSON okuma yapılmaz). Bunun sebebi: tarayıcılar `file://` üzerinden açılan sayfalarda yerel dosya okuma (fetch/XHR) isteklerini güvenlik gereği engeller. Bu yapı sayesinde uygulama hem dosya olarak hem site olarak sorunsuz çalışır.
- `<script type="module">` kullanılmaz, çünkü modüller de `file://` üzerinden bazı tarayıcılarda engellenir. Bunun yerine normal `<script src="...">` etiketleri kullanılır.
