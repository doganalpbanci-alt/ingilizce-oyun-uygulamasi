# İngilizce Hub — Proje Rehberi (CLAUDE.md)

Bu dosya, bu depoda çalışan Claude Code oturumları için proje rehberidir.
**Her oturuma başlarken bu dosyayı VE `HANDOFF.md`'yi oku.** CLAUDE.md proje
hakkında değişmeyen/az değişen bilgiyi tutar; `HANDOFF.md` ise oturumdan
oturuma güncellenen canlı yol planı ve ilerleme kaydıdır.

## Proje ne, kimin için

Bir İngilizce öğretmeninin **akıllı tahtada ve tablette** sınıfta veya
öğrencinin bireysel çalışmasında kullandığı bir **İngilizce oyun ve pratik
hub'ı**.

**Pivot (2026-08-28, kullanıcı kararı):** Proje başlangıçta "kelime oyunu
hub'ı" olarak kuruldu. Artık kapsam kelimeyle sınırlı değil — hub, İngilizce
üzerine her türlü **oyun ve pratik aracını** toplayan genel bir merkez.
Planlanan yeni beceri alanları (öncelik sırasıyla): **cümle kurma → gramer →
yazım/spelling** (bkz. `HANDOFF.md` Faz 2). Bunlar hep mevcut oyun/pratik
formatında (bağımsız `games/<ad>/` klasörü) eklenecek.

**Kapsam dışı** (kullanıcı netleştirdi): soru bankası/quiz modülü, ders
anlatım modülü, telaffuz pratiği. Bunlar ayrı bir "modül" mimarisi olarak
eklenmeyecek.

**Sınıf kapsamı** (kullanıcı netleştirdi, 2026-08-28): 5-8. sınıf
(ortaokul/LGS) aynı kalıyor, lise şimdilik yol planına girmiyor.

## Değişmez mimari kısıtlar

Bunlar hiçbir zaman ihlal edilmemeli — yeni oyun/pratik eklerken de geçerli:

- Hem **offline** (klasörü kopyala, `index.html`'e çift tıkla, `file://`)
  hem **online** (GitHub Pages) çalışmalı.
- Build adımı yok, `fetch()` yok, `<script type="module">` yok — veriler düz
  JS dosyaları olarak `<script src>` ile yüklenir. Sebep: `file://` üzerinde
  tarayıcılar güvenlik gereği yerel dosya okuma isteklerini ve modülleri
  engeller.
- Her oyun/pratik **bağımsızdır**: kendi `index.html` / `style.css` /
  `script.js` (+ gerekiyorsa `sounds.js`) dosyaları. Sınıf/ünite seçimi
  oyunun *içinde* yapılır (öğretmen sınıf değiştirdikçe).
- Ses efektleri Web Audio API ile kod içinde üretilir (ses dosyası yok,
  telif sorunu yok, offline çalışır).

## Klasör yapısı

```
index.html            Hub ana sayfası
css/style.css         Ortak tema (hub + tüm oyunlar) — paylaşılan, değiştirince hepsini test et
data/curriculum.js    Kelime veritabanı — tek kaynak
js/games-registry.js  Hub içerik listesi (yeni oyun/araç = buraya 1 kayıt)
js/hub.js             Kartları kategoriye göre çizer
js/pwa.js             Service worker kaydı (file:// korumalı)
manifest.json, sw.js, icons/
games/<ad>/           Her biri: index.html + style.css + script.js (+ sounds.js)
```

## Kelime veritabanı (`data/curriculum.js`)

Yapı: `CURRICULUM[sınıf].units[].words[] = {en, tr}`

| Sınıf | Ünite | Kelime | Kaynak |
|---|---|---|---|
| 5 | 8 | 529 | MEB kitabı glossary + hikaye/dinleme metinleri |
| 6 | 10 | 144 | MEB kitabı dictionary (birebir) |
| 7 | 10 | 144 | Kitap İng-İng'di, **çeviriler kullanıcıya ait** — öğretmen onayından geçmedi |
| 8 | 10 | 364 | Kitap + ünite ünite web araştırması (LGS kapsamı) |
| **Toplam** | | **1181** | |

Bu sayılar `data/curriculum.js` üzerinde `node -e` ile 2026-08-28'de doğrulandı.
(`README.md`'deki 8. sınıf sayısı — 341 — güncel değil, dikkat.)

Oyunlar sınıf seçer → ünite(ler) çoklu seçer → kelimeler `en+tr` bazında
tekilleştirilerek havuza alınır (her oyunda aynı `buildWordPool` deseni).

## Mevcut içerik (6 oyun + 1 araç)

| Ad | Klasör | Not |
|---|---|---|
| 🦉 Kelime Yakala | `kelime-yakala` | SVG baykuş, requestAnimationFrame döngüsü, can/seri/seviye. Ses var. |
| 🏆 Kelime Turnuvası | `kelime-turnuvasi` | Eleme ağacı (bye destekli), 2 mod, raunt seçimi. Ses var. |
| 🎯 Adam Asmaca | `adam-asmaca` | Türkçe ipucu → İngilizce kelime, SVG darağacı. Ses var. |
| 🎨 Çiz Bakalım | `ciz-bakalim` | Canvas, takım skoru, süre bonusu. Ses var. |
| 🔎 Kelime Avı | `kelime-avi` | Izgara üretici, 3 zorluk, sürükle veya iki dokunuş. Ses var. |
| 🧩 Kelime Eşleştirme | `kelime-eslestirme` | Hafıza kartı. **Ses yok.** |
| 📚 Kelime Kartları | `kelime-kartlari` | Araç: liste + flashcard (`category: "arac"`). **Ses yok.** |

## PWA / service worker

- `sw.js`: same-origin GET istekleri için **network-first / cache-fallback**.
- **Kritik detay:** düz `fetch(request)` tarayıcının HTTP önbelleğini
  kullanır → GitHub Pages `max-age` verdiği için güncelleme PWA'ya
  ulaşmayabilir. Bunun için `new Request(url, {cache: "no-cache"})`
  kullanılıyor — sakın düz `fetch(request)`'e geri dönme.
- **Yeni dosya eklenince:** `sw.js` içindeki `PRECACHE` listesine ekle **ve**
  `CACHE_VERSION`'ı artır (şu an `v2`). İkisi de yapılmazsa yeni dosya
  önbelleğe girmez / eski sürüm servis edilmeye devam eder.

## Yeni oyun/pratik ekleme deseni

1. `games/` altında yeni bir klasör aç.
2. İçine `index.html`, `style.css`, `script.js` koy (gerekiyorsa `sounds.js`).
   `../../css/style.css` ile ortak temayı, `../../data/curriculum.js` ile
   kelime veritabanını kullan (kelime dışı bir pratikse benzer desende yeni
   bir veri dosyası düşünülebilir — bkz. `HANDOFF.md` Faz 1/2).
3. Sayfaya `<a class="back-link" href="../../index.html">← Menüye Dön</a>` ekle.
4. `js/games-registry.js` içindeki `GAMES` dizisine kaydını ekle
   (`category: "oyun"` veya `"arac"`, ve **`skill`** — hangi İngilizce
   becerisini pratik ettiriyor, örn. `"kelime"`, `"cumle-kurma"`). Yeni bir
   skill kodu kullanıyorsan `SKILL_LABELS` objesine görünür adını da ekle.
   `GAMES` içinde ikinci farklı bir `skill` değeri belirdiği an hub
   ana sayfasında otomatik olarak bir filtre/sekme satırı belirir (bkz.
   `js/hub.js` → `renderSkillFilter`) — elle bir şey açmana gerek yok.
5. `sw.js` → `PRECACHE` listesine yeni dosyaları ekle, `CACHE_VERSION`'ı artır.
6. Playwright ile gerçek tarayıcıda uçtan uca test et (masaüstü + iPad
   yatay/dikey görünüm), konsol hatası olmadığını doğrula.

## Oturum iş akışı (ÖNEMLİ)

Bu proje çok-oturumlu, adım adım bir yol planıyla geliştiriliyor:

- **Her oturumun başında `HANDOFF.md`'yi oku:** hangi fazdayız, bir önceki
  oturum ne yaptı, bu oturumun hedefi ne.
- **Oturum sonunda `HANDOFF.md`'yi güncelle:** tamamlanan adımları işaretle,
  açık kalan noktaları ve bir sonraki oturumun hedefini yaz (Oturum
  Günlüğü'ne yeni bir kayıt ekle).
- Yol planı ve oturum geçmişi burada değil, `HANDOFF.md`'de tutulur — bu
  dosya (CLAUDE.md) durağan proje rehberidir, sık değişmemeli.

## Bilinen açık noktalar / backlog

(Güncel/detaylı takip `HANDOFF.md` → Faz 3'te.)

- iPad'de PWA'nın gerçek Safari'de doğrulanması henüz kullanıcı tarafından yapılmadı.
- 7. sınıf çevirileri kullanıcıya (öğretmene) ait, resmi kaynaktan değil — gözden geçirilebilir.
- `kelime-eslestirme` ve `kelime-kartlari`'nda ses efekti yok (diğer 5 içerikte var).
- `README.md`'deki 8. sınıf kelime sayısı (341) güncel değil, gerçek sayı 364.
