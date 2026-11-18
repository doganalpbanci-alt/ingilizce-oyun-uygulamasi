# İngilizce Hub

Akıllı tahtada ve tablette kullanmak için hazırlanan, hem **internetsiz (dosya olarak çift tıklayıp)** hem de **internet üzerinden (web sitesi olarak)** açılabilen İngilizce oyun ve pratik merkezi.

İki müfredatı aynı oyunlarla çalıştırır:

- **MEB Ortaokul (5-8. sınıf, LGS kapsamı)** — okul dersleri
- **Twinkl ESL Curriculum (Level 1-5, A1-A2)** — özel dersler

Her oyunun içindeki sınıf/seviye listesinden hangi müfredatın, hangi ünitenin çalışılacağı seçilir.

## Nasıl açılır

- **Offline:** `index.html` dosyasına çift tıkla, tarayıcıda açılır.
- **Online:** Tüm klasörü herhangi bir statik hosting'e (GitHub Pages, Netlify vb.) yükle, aynı şekilde çalışır.

Hiçbir kurulum, sunucu veya internet bağlantısı gerekmez.

## İçerik

### Oyunlar
| Oyun | Beceri | Açıklama |
|---|---|---|
| ⚡ Doğru mu Yanlış mı? | Kelime, Gramer | Süreye karşı hızlı karar: eşleşme / cümle doğru mu? Seri çarpanı, cihazda rekor. |
| 🧱 Gramer Kulesi | Gramer | Boşluğa doğru kalıbı seç, kuleni yükselt. Yanlışta kısa Türkçe kural. Tek kişi + takımlı. |
| 🔠 Harf Karıştır | Yazım | Türkçe ipucundan karışık harflerle İngilizce kelimeyi yaz. Klavye destekli. |
| 🎡 Kelime Çarkı | Kelime (konuşma) | Çark görevi seçer: Türkçesini söyle, hecele, cümle kur, canlandır, çiz. Takım puanı isteğe bağlı. |
| 🪢 Halat Çekme | Kelime, Gramer | İki takım tahtanın iki yanında aynı soruya yarışır; ilk doğru cevap ipi çeker. |
| 🔤 Cümle Kurma | Cümle | Karışık kelimelerden ünitenin yapısına uygun cümleyi kur. Tek kişi + takımlı. |
| 🦉 Kelime Yakala | Kelime | Baykuşu yönet, düşen kelimelerden doğru anlamı yakala. |
| 🏆 Kelime Turnuvası | Kelime | 1'e 1 eleme usulü sınıf turnuvası. |
| 🎯 Adam Asmaca | Kelime | Türkçe ipucundan İngilizce kelimeyi harf harf bul. |
| 🎨 Çiz Bakalım | Kelime | Kelimeyi tahtaya çiz, takımın tahmin etsin. |
| 🔎 Kelime Avı | Kelime | Harf bulmacasında gizli kelimeleri bul. |
| 🧩 Kelime Eşleştirme | Kelime | Hafıza kartlarıyla kelime-anlam eşleştirme. |

### Çalışma Araçları
| Araç | Açıklama |
|---|---|
| 📚 Kelime Kartları | Ünite ünite kelime listesi + flashcard; 🔊 ile kelimeyi sesli dinleme. |
| 📋 İçerik İnceleme | Öğretmen için: taslak kelime/cümle/gramer maddelerini gözden geçir, sorunluyu işaretle + not al, listeyi kopyala ya da yazdır. |

## Veritabanları

| Dosya | İçerik | Kullanan |
|---|---|---|
| `data/curriculum.js` | MEB 5-8 kelimeleri (1181) | Kelime oyunları, Harf Karıştır |
| `data/twinkl.js` | Twinkl L1-5 kelimeleri (577) | Kelime oyunları, Harf Karıştır |
| `data/sentences.js` | MEB 5-8 cümleleri (38 ünitenin tamamı) | Cümle Kurma |
| `data/twinkl-sentences.js` | Twinkl L1-5 cümleleri (154) | Cümle Kurma |
| `data/grammar.js` | MEB 5-8 gramer maddeleri (266) | Gramer Kulesi, Halat Çekme, Doğru mu Yanlış mı |
| `data/twinkl-grammar.js` | Twinkl L1-5 gramer maddeleri (200) | Aynı |

MEB kelime dağılımı: 5. sınıf 529 · 6. sınıf 144 · 7. sınıf 144 · 8. sınıf 364.

⚠️ Cümle ve gramer verileri ile Twinkl Türkçe karşılıkları **taslaktır**, öğretmen onayı bekler.

## Klasör yapısı

```
index.html              -> Hub ana sayfası
css/style.css           -> Ortak tema (hub + tüm oyunlar)
css/setup.css           -> Kurulum ekranı ortak stilleri
css/play.css            -> Oyun ekranı ortak stilleri (skor tablosu, süre çubuğu...)
data/                   -> Veritabanları (yukarıdaki tablo)
js/games-registry.js    -> Hub içerik listesi (yeni oyun = buraya 1 kayıt)
js/hub.js               -> Hub kartlarını ve beceri sekmelerini çizer
js/shared-setup.js      -> Sınıf/ünite seçici (HubSetup)
js/shared-sound.js      -> Ses efektleri + ortak sessiz ayarı (HubSound)
js/shared-play.js       -> Konfeti, takım listesi, skor tablosu (HubPlay)
js/shared-speech.js     -> İngilizce sesli okuma (HubSpeech)
games/<oyun>/           -> Her oyun kendi klasöründe: index.html + style.css + script.js
```

## Yeni oyun ekleme

Ayrıntılı desen `CLAUDE.md` → "Yeni oyun/pratik ekleme deseni" bölümünde. Kısaca:

1. `games/` altında yeni bir klasör aç; `index.html`, `style.css`, `script.js` koy.
2. Ortak dosyaları yükle (`css/style.css`, `css/setup.css`, `css/play.css`, `js/shared-*.js`) ve kurulum ekranı için `HubSetup.unitPicker` kullan.
3. `js/games-registry.js` içindeki `GAMES` dizisine kaydını ekle.
4. `sw.js` → `PRECACHE` listesine dosyaları ekle, `CACHE_VERSION`'ı artır.

## PWA / güncelleme

Uygulama `manifest.json` + `sw.js` (service worker) içerir. Ana ekrana eklendiğinde
tam ekran bir uygulama gibi açılır ve internetsiz çalışır.

Güncelleme stratejisi **önce ağ, olmazsa önbellek**: internet varken her açılışta
sunucudaki güncel dosyalar alınır, internet yokken önbellekteki son sürüm gösterilir.

## Teknik notlar

- Veriler düz JS dosyalarıyla yüklenir (`fetch` ve `<script type="module">` yok): tarayıcılar `file://` üzerinde ikisini de engeller. Bu yapı sayesinde uygulama hem dosya olarak hem site olarak çalışır.
- Ses efektleri Web Audio API ile kod içinde üretilir; ses dosyası yok, telif sorunu yok, offline çalışır. Sessiz ayarı tüm oyunlarda ortaktır.
- Sesli okuma cihazın yerleşik İngilizce sesini kullanır; desteklemeyen cihazda düğme görünmez.
- Service worker sadece http(s) üzerinden çalışır; `file://` senaryosunda kayıt sessizce atlanır.
