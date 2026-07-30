# İngilizce Hub

Akıllı tahtada ve tablette kullanmak için hazırlanan, hem **internetsiz (dosya olarak çift tıklayıp)** hem de **internet üzerinden (web sitesi olarak)** açılabilen İngilizce öğrenme merkezi.

İçinde sınıfça oynanan oyunlar, tek kişilik alıştırmalar ve kelime çalışma araçları bulunur. Tüm içerik, MEB ders kitaplarından çıkarılmış ortak kelime veritabanını kullanır.

## Nasıl açılır

- **Offline:** `index.html` dosyasına çift tıkla, tarayıcıda açılır.
- **Online:** Tüm klasörü herhangi bir statik hosting'e (GitHub Pages, Netlify vb.) yükle, aynı şekilde çalışır.

Hiçbir kurulum, sunucu veya internet bağlantısı gerekmez.

## İçerik

### Oyunlar
| Oyun | Açıklama |
|---|---|
| 🦉 Kelime Yakala | Baykuşu yönet, düşen kelimelerden doğru anlamı yakala. Gerçek zamanlı arcade oyunu. |
| 🏆 Kelime Turnuvası | 1'e 1 eleme usulü sınıf turnuvası. Yarışma ve bireysel süre modları. |
| 🎯 Adam Asmaca | Türkçe ipucundan İngilizce kelimeyi harf harf bul. |
| 🎨 Çiz Bakalım | Kelimeyi tahtaya çiz, takımın tahmin etsin. Takım skoru tutulur. |
| 🧩 Kelime Eşleştirme | Hafıza kartlarıyla kelime-anlam eşleştirme. |

### Çalışma Araçları
| Araç | Açıklama |
|---|---|
| 📚 Kelime Kartları | Ünite ünite kelime listesi + flashcard modu. |

## Kelime veritabanı

`data/curriculum.js` tüm oyunların ortak kaynağıdır. Sınıf → ünite → kelime yapısındadır.

| Sınıf | Ünite | Kelime |
|---|---|---|
| 5. Sınıf | 8 | 529 |
| 6. Sınıf | 10 | 144 |
| 7. Sınıf | 10 | 144 |
| 8. Sınıf | 10 | 341 |

Kaynaklar: öğretmenin gönderdiği MEB ders kitaplarının resmi sözlük/glossary bölümleri; 8. sınıf ayrıca LGS kapsamı için ünite ünite araştırmayla genişletildi.

Yeni ünite eklemek için ilgili sınıfın `units` dizisine şunu ekle:

```js
{ id: "benzersiz-id", title: "Ünite Başlığı", words: [{ en: "word", tr: "anlam" }] }
```

## Klasör yapısı

```
index.html              -> Hub ana sayfası
css/style.css           -> Ortak tema (hub + tüm oyunlar)
data/curriculum.js      -> Sınıf/ünite/kelime veritabanı
js/games-registry.js    -> Hub içerik listesi (yeni oyun eklerken burayı güncelle)
js/hub.js               -> Hub kartlarını çizen kod
games/
  kelime-yakala/        -> her oyun kendi klasöründe, kendi teması ve sesleriyle
  kelime-turnuvasi/
  adam-asmaca/
  ciz-bakalim/
  kelime-eslestirme/
  kelime-kartlari/
```

## Yeni oyun ekleme

1. `games/` altında yeni bir klasör aç.
2. İçine `index.html`, `style.css`, `script.js` koy. `../../css/style.css` ile ortak temayı, `../../data/curriculum.js` ile kelime veritabanını kullan.
3. Sayfaya `<a class="back-link" href="../../index.html">← Menüye Dön</a>` ekle.
4. `js/games-registry.js` içindeki `GAMES` dizisine kaydını ekle (`category: "oyun"` veya `"arac"`).

## Teknik notlar

- Sayfalar arası geçiş `<a href="...">` ile, veriler düz JS dosyalarıyla yüklenir (`fetch` kullanılmaz). Sebep: tarayıcılar `file://` üzerinden açılan sayfalarda yerel dosya okuma isteklerini güvenlik gereği engeller. Bu yapı sayesinde uygulama hem dosya olarak hem site olarak çalışır.
- `<script type="module">` kullanılmaz, çünkü modüller de `file://` üzerinde engellenir.
- Ses efektleri Web Audio API ile kod içinde üretilir; ses dosyası indirilmez, telif sorunu olmaz, offline çalışır. Safari/iOS'ta ses açılışı ilk dokunuşta yapılır.
- Her oyun bağımsızdır (kendi CSS/JS/ses dosyaları) — biri değişince diğerleri etkilenmez.
