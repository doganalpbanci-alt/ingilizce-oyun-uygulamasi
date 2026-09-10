# İngilizce Hub — Handoff & Yol Planı

Bu dosya oturumdan oturuma güncellenen **canlı** takip dosyasıdır. Durağan
proje bilgisi (mimari, kısıtlar, dosya yapısı) için `CLAUDE.md`'ye bak.

## Nasıl kullanılır

- **Oturum başında:** Bu dosyayı baştan sona oku. "Yol Planı" bölümünden
  hangi fazda kalındığını, hangi adımların işaretli (✅) olduğunu gör.
  "Oturum Günlüğü"nün en altındaki kayıt bir önceki oturumun ne yaptığını
  ve bir sonraki oturumun hedefini söyler.
- **Oturum sonunda:** Tamamlanan adımların checkbox'larını `[x]` yap, ilgili
  fazın durumunu güncelle, ve "Oturum Günlüğü"ne tarih başlıklı yeni bir
  kayıt ekle (ne yapıldı, ne yapılmadı, sıradaki oturumun hedefi ne).
  Yeni açık noktalar çıkarsa Faz 3'teki backlog'a ekle.

## Pivot özeti

2026-08-28'de kullanıcı projenin amacını netleştirdi: hub artık sadece
"kelime oyunu" değil, genel bir **İngilizce oyun ve pratik hub'ı**.

- **Yeni beceri alanları** (Faz 1'de karara bağlandı) — öncelik sırasıyla:
  **1) Cümle kurma  2) Gramer  3) Yazım/spelling**. Telaffuz şimdilik
  kapsam dışı bırakıldı (teknik risk).
- **Kapsam dışı:** soru bankası/quiz modülü, ders anlatım modülü — bunlar
  ayrı bir modül mimarisi olarak eklenmeyecek, her şey mevcut "bağımsız
  oyun/araç klasörü" formatında kalacak.
- **Sınıf kapsamı** (Faz 1'de karara bağlandı): 5-8. sınıf (ortaokul/LGS)
  aynı kalıyor, lise şimdilik yol planına girmiyor.

Detaylar için `CLAUDE.md`.

## Yol Planı (Fazlar)

Yol planı iki paralel iz halinde ilerliyor:
- **A) Hub ve oyunlar** (Faz 0-3) — oyun/pratik türlerini geliştirmek, MEB
  5-8 içeriği.
- **B) Twinkl ESL entegrasyonu** (Faz T0-T3) — özel derslerde kullanılan
  müfredatın aynı oyunlarla çalışılabilir hale gelmesi.

Bu ikisi birbirini beslemek üzere tasarlandı: yeni bir oyun eklendiğinde her
iki müfredat da o oyunda otomatik çalışır, yeni bir müfredat eklendiğinde
tüm oyunlarda otomatik görünür.

---

# A) Hub ve Oyunlar (MEB 5-8)

### Faz 0 — Dokümantasyon ve Temel Kurulum
**Durum: ✅ Tamamlandı (2026-08-28)**
- [x] `CLAUDE.md` güncellendi (proje amacı pivotu yansıtıyor)
- [x] `HANDOFF.md` oluşturuldu (bu dosya)
- [x] Yol planı taslağı (Faz 0-3) çizildi

### Faz 1 — Karar Noktaları ve Mimari Hazırlık
**Durum: ✅ Tamamlandı (2026-08-28)**

Hedef: Pivotun somut gereksinimlerini kullanıcıyla birlikte netleştirmek ve
gerekiyorsa mevcut mimariyi (registry, hub.js, branding metinleri) buna göre
hazırlamak.

Kararlar:
- [x] Yeni beceri alanları: **Gramer, Yazım/spelling, Cümle kurma**.
      Telaffuz kapsam dışı (tarayıcı desteğine bağlı, riskli bulundu).
- [x] Öncelik sırası: **1) Cümle kurma  2) Gramer  3) Yazım/spelling**.
- [x] Sınıf kapsamı: **5-8. sınıf aynı kalıyor**, lise şimdilik yol
      planına girmiyor.
- [x] Branding metinleri kontrol edildi (`index.html` tagline'ı: "Oyunlar,
      kelime çalışması ve ders araçları — hepsi tek merkezde.") — zaten
      genel bir dil kullanıyor, kelime-özel vurgu yok. Değişiklik
      gerekmedi.
- [x] `games-registry.js` şemasına **`skill`** alanı eklendi (tüm 7 mevcut
      kayıt `skill: "kelime"` aldı) + `SKILL_LABELS` haritası eklendi.
      `js/hub.js` artık `GAMES` içindeki farklı `skill` değerlerinden
      otomatik bir filtre/sekme satırı (`#skill-filter`) üretiyor; tek
      skill varken satır gizli kalıyor (bkz. `renderSkillFilter`).
      `index.html`'e `#skill-filter` konteyneri, `css/style.css`'e
      `.skill-filter` / `.skill-chip` stilleri eklendi.
      Playwright ile doğrulandı: (a) bugünkü 1-skill durumda satır gizli,
      sayaçlar doğru (6 oyun / 1 araç / 1181 kelime), konsol hatası yok;
      (b) geçici 2. bir skill enjekte edilip filtre sekmelerinin doğru
      göründüğü ve doğru filtrelediği test edildi, sonra test verisi geri
      alındı (kalıcı değişiklik yok).

### Faz 2 — İlk Yeni Oyun/Pratik Türü: Cümle Kurma
**Durum: ✅ Oyun tamamlandı (2026-09-09) — içerik pilot aşamasında**

Hedef: İlk kelime-dışı oyunu tasarlayıp hub'a eklemek — **cümle kurma**
(Faz 1'de belirlenen öncelik). Konsept: karışık sırada verilen kelimelerden
doğru İngilizce cümleyi kurma.

Kullanıcı kararları: cümleler **ünite kazanımındaki konu/işlev/yapıya bağlı**
olmalı (rastgele cümle işe yaramaz); **hem tek kişilik hem sınıfça** mod;
**hem tıklama hem sürükleme**; içerik **tek ünite pilot** olarak başlasın;
yapı/kazanım taslağını Claude hazırlayıp öğretmen onaylayacak.

Adımlar:
- [x] Oyun konsepti ve kuralları netleştirildi (yukarıdaki kararlar)
- [x] `data/sentences.js` oluşturuldu — `SENTENCES[sınıf].units[]` içinde
      `structures[]` (kazanım) + `sentences[]`; 5. sınıf Ünite 1 için
      4 yapı / 15 cümle (**TASLAK, öğretmen onayı bekliyor**)
- [x] `games/cumle-kurma/` yazıldı (index.html + style.css + script.js +
      sounds.js). Tıkla-yerleştir + pointer-event tabanlı sürükle-bırak
      (iPad uyumlu, HTML5 DnD kullanılmadı), yapı rozeti + Türkçe anlam
      ipucu, sıfırla/geç/kontrol butonları, yanlışta shake + tekrar deneme.
- [x] Tek kişilik mod (skor + seri) ve takım modu (tur rotasyonu, süre
      sayacı, puan + zaman bonusu, skor tablosu, şampiyon ekranı)
- [x] `js/games-registry.js`'e `skill: "cumle-kurma"` ile kaydedildi,
      `SKILL_LABELS`'a eklendi → hub'daki filtre satırı ilk kez göründü
- [x] `sw.js` PRECACHE + `CACHE_VERSION` → `v3`
- [x] Playwright ile uçtan uca test: solo akış (3 cümle, doğru/yanlış/
      sıfırla/tekrar), takım akışı (2 takım × 2 tur, süre dolması, pas
      geçme), sürükleyerek yeniden sıralama, hub filtresi + karttan
      navigasyon, iPad yatay/dikey taşma kontrolü — konsol hatası yok
- [ ] **Açık:** öğretmen cümleleri onaylasın; sonra kalan üniteler
      (5. sınıfın 7 ünitesi + 6/7/8. sınıflar) aynı desenle eklensin

### Faz 3 — Genişleme ve Bakiye Maddeler
**Durum: ⬜ Başlanmadı / sürekli açık**

Backlog (yeni maddeler oturumlar ilerledikçe buraya eklenecek):
- [ ] iPad'de gerçek Safari'de PWA doğrulaması (kullanıcı yapacak: kısayolu
      sil → siteyi Safari'de aç → "Ana Ekrana Ekle" → uçak modunda test)
- [ ] 7. sınıf çevirilerinin öğretmen tarafından gözden geçirilmesi
- [ ] `data/sentences.js` 5/Ünite 1 cümlelerinin öğretmen onayı
- [ ] Cümle Kurma için kalan MEB üniteleri (5. sınıf 7 ünite + 6/7/8. sınıf)
- [ ] `kelime-eslestirme` ve `kelime-kartlari`'na ses efekti eklenmesi
- [ ] `README.md` güncellemesi (8. sınıf 341 → 364, Cümle Kurma + Twinkl eksik)
- [ ] Gramer ve Yazım/spelling oyunları (Faz 1'de belirlenen 2. ve 3. sıra)
- [ ] ⚠️ **Depo görünürlüğü kararı** — depo public, Twinkl içeriği herkese
      açık yayınlanıyor. Kullanıcı "şimdilik kalsın, sonra ilgilenmemiz
      gerekir" dedi. Seçenekler: public kalması, private'a çekilip Pages
      için alternatif yayın yolu kurulması, ya da Twinkl verisinin depodan
      ayrılması.
- [ ] Twinkl kelime çevirilerinin öğretmen tarafından gözden geçirilmesi

---

# B) Twinkl ESL Curriculum Entegrasyonu (Özel Dersler)

**Bağlam (2026-09-09):** Öğretmen özel derslerinde **Twinkl ESL Curriculum**
kullanıyor ve aynı içeriği bu hub'daki oyunlarla tekrar ettirmek istiyor.
Kaynak doküman: Twinkl "ESL Curriculum — Guidance/Overview" (49 sayfa PDF,
kullanıcı tarafından gönderildi, 2026-09-09'da incelendi).

## Kaynak analizi (PDF'ten çıkan yapı)

- **15 seviye**, CEFR **A1 → B2** eşlemesi:
  L1-2 = A1 · L3-5 = A1-A2 · L6-7 = A2 · L8-10 = B1 · L11-12 = B1-B2 ·
  L13-15 = B2
- Her seviye **12 ders**; **6. ve 12. dersler review** (yeni içerik yok)
  → seviye başına **10 içerik dersi**, toplam **150 ders**
- Her dersin üç bileşeni var ve üçü de bizim veri modelimize birebir oturuyor:
  | Twinkl sütunu | Bizim karşılığımız |
  |---|---|
  | Ders başlığı (örn. "What Time Is It?") | `units[].title` |
  | Topic & Key Sentences (hedef yapı/işlev + örnek cümleler) | `SENTENCES` → `structures[]` + `sentences[]` |
  | Vocabulary (virgülle ayrılmış liste) | `CURRICULUM` → `units[].words[]` |
- **Level 8'den itibaren** her derste ayrıca **"Idiom spotlight"** (1-2 deyim)
  → yaklaşık **80 deyim** ek içerik
- Tahmini hacim: **L1-5 ≈ 580 kelime**, **L6-15 ≈ 800 kelime** →
  toplam **~1400 kelime** (mevcut MEB veritabanı 1181 kelime; yani hub'ın
  içeriği kabaca ikiye katlanır)
- Twinkl'ın kendi oyun platformu **yalnızca Level 1-5**'i kapsıyor →
  **Level 6-15 için oyunlaştırma bu hub'da olacak**, gerçek bir boşluk
  dolduruyor (ayrıca bizimki offline + Türkçe destekli)

### Veriye dönüştürürken dikkat edilecek 3 tuzak
1. **Yer tutucu kelime listeleri:** "numbers 1-20", "days of the week",
   "January - December" gibi girdiler tek kelime değil — gerçek listelere
   açılmalı (one…twenty, Monday…Sunday, January…December).
2. **Çok kelimeli ifadeler:** "go to the cinema", "turn your mic on/off"
   gibi girdiler var. Kelime Avı zaten sadece tek parçalı/harf-içeren
   kelimeleri ızgaraya alıyor (mevcut filtre bunu hallediyor), diğer
   oyunlarda sorun değil.
3. **Uzun anahtar cümleler:** L8+ cümleleri 15-25 kelimeye çıkabiliyor
   (örn. "It was surprising that we got on like a house on fire, because
   we hadn't spoken much before."). Cümle Kurma tahtada bu uzunlukta
   zorlaşır → veri girerken **≤12 kelimelik** cümleler tercih edilmeli,
   uzun olanlar ya kısaltılmalı ya da oyuna bir "cümle uzunluğu" filtresi
   eklenmeli.

## Mimari karar (doğrulandı)

Her oyun sınıf listesini `Object.keys(CURRICULUM)` ile üretip
`CURRICULUM[key].label` ve `.units[]` okuyor. Dolayısıyla:

- Twinkl seviyeleri `CURRICULUM`'a **`twinkl-1` … `twinkl-15`** anahtarlarıyla
  eklenirse **hiçbir oyunun mantığı değişmeden** tüm oyunlarda seçilebilir olur.
- Tek sorun UX: 4 MEB sınıfı + 15 Twinkl seviyesi = 19 düz seçenek. Çözüm:
  kayıtlara `group` alanı eklenip her oyunun `populateGrades()` fonksiyonu
  `<optgroup>` üretecek şekilde güncellenir (oyun başına ~8 satır, 7 oyun).
- Dosyalar: **`data/twinkl.js`** (CURRICULUM'a ekler) ve
  **`data/twinkl-sentences.js`** (SENTENCES'a ekler); ikisi de
  `curriculum.js` / `sentences.js`'ten **sonra** yüklenmeli. Böylece
  `curriculum.js` şişmez, tek veri modeli korunur.
- Her oyunun `index.html`'ine ilgili `<script src>` + `sw.js` PRECACHE +
  `CACHE_VERSION` artışı.

## Kararlar (2026-09-09, kullanıcı)
- [x] **Türkçe karşılık:** Yazılacak. Twinkl kelimelerine Türkçe anlam
      eklenir → mevcut 7 oyun hiç değişmeden çalışır. (Çeviriler bu proje
      için eklendi, öğretmen onayından geçmedi.)
- [x] **Seviye önceliği:** **Level 1'den sırayla** ilerlenecek.
- [x] **Deyimler:** **Ayrı beceri** olarak (`skill: "deyim"`) — hub'da kendi
      filtre sekmesi olacak; L8'e gelindiğinde uygulanacak.
- [x] **Depo görünürlüğü:** Şimdilik **public kalıyor**, ama bu bilinçli bir
      erteleme — ⚠️ **ileride ele alınacak açık madde** (aşağıdaki backlog'da).

## Faz T0 — İskelet + Level 1 pilotu
**Durum: ✅ Tamamlandı (2026-09-09)**
- [x] `data/twinkl.js` oluşturuldu; **Level 1**'in 10 içerik dersi girildi
      (**111 kelime** + Türkçe karşılıkları). "numbers 1-20" yer tutucusu
      gerçek listeye açıldı (one…twenty). Review dersleri (6, 12) atlandı.
      Dosya, `CURRICULUM`'a `twinkl-1` anahtarıyla ekleniyor (IIFE + guard).
- [x] `group` alanı eklendi: MEB kayıtlarına "MEB Ortaokul (5-8. Sınıf)",
      Twinkl'a "Twinkl ESL (Özel Ders)". **8 oyunun** `populateGrades()`
      fonksiyonu `<optgroup>` üretecek şekilde güncellendi (7 CURRICULUM
      oyunu + `cumle-kurma`'nın SENTENCES varyantı — ileride Twinkl
      cümleleri gelince hazır olsun diye).
- [x] 7 oyunun + hub'ın `index.html`'ine `<script src=".../data/twinkl.js">`
- [x] `sw.js` PRECACHE + `CACHE_VERSION` → `v4`
- [x] Playwright doğrulaması:
      - 7 oyunun hepsinde açılır liste iki optgroup gösteriyor, Twinkl
        Level 1 seçilebiliyor, 10 ders listeleniyor
      - MEB regresyonu temiz (5. sınıf hâlâ 8 ünite)
      - Hub kelime sayacı 1181 → **1292** (MEB 1181 + Twinkl L1 111)
      - Kelime Avı Twinkl L1 ile bulmaca üretiyor (111 kelimenin 105'i
        ızgaraya uygun; "the UK", "pencil case", "Türkiye" gibi çok
        parçalı/aksanlı girdiler mevcut filtre tarafından eleniyor — beklenen)
      - Kelime Eşleştirme Twinkl dersiyle kart üretiyor
      - iPad yatay/dikey taşma yok, konsol hatası yok

## Faz T1 — Level 1-5 tamamlama (A1-A2)
**Durum: ✅ Tamamlandı (2026-09-09)**
- [x] Level 2-5 kelimeleri (+ Türkçe) → `data/twinkl.js`
      (L2: 112, L3: 119, L4: 114, L5: 109 → Level 1-5 toplam **565 kelime**,
      50 ders). "numbers 20-100", "days of the week", "January-December"
      gibi yer tutucular gerçek listelere açıldı; L2 ders 10'daki
      "turn your mic on/off" gibi çift komutlar ayrı girdilere bölündü.
- [x] Level 1-5 anahtar cümleleri → `data/twinkl-sentences.js`
      (**154 cümle**, 50 ders; her ders = 1 ünite + 1 yapı). Twinkl'ın
      kalıpları ("I'm from…") dersin kendi kelimeleriyle örneklendi.
      En uzun cümle 8 kelime — ≤12 kuralına uygun.
- [x] `games/cumle-kurma/index.html`'e `twinkl-sentences.js` eklendi
- [x] `sw.js` PRECACHE + `CACHE_VERSION` → `v5`
- [x] Ünite `id`/`title` çapraz kontrolü: 50 dersin tamamı `twinkl.js` ile
      birebir eşleşiyor, geçersiz `structure` referansı yok (script ile
      doğrulandı)
- [x] Playwright doğrulaması:
      - Cümle Kurma'da iki optgroup, 5 Twinkl seviyesi seçilebiliyor;
        L3 seçiminde 10 ders / 10 yapı / 29 cümle listeleniyor
      - Tek kişilik akış (3 cümle) ve takımlı akış (2 takım × 2 tur) uçtan
        uca çalışıyor
      - 7 kelime oyununun hepsinde L1-L5 seçilebiliyor (her biri 10 ders),
        MEB 8. sınıf regresyonu temiz
      - Adam Asmaca Twinkl L1 "Renkler" dersinde Türkçe ipucu ("kırmızı")
        gösteriyor
      - Hub kelime sayacı 1292 → **1746** (MEB 1181 + Twinkl 565)
      - Konsol hatası yok

## Faz T2 — Level 6-10 (A2-B1)
**Durum: ⬜ Başlanmadı — sıradaki iş**
- [ ] Kelime + Türkçe karşılık (Level 6, 7, 8, 9, 10 → `data/twinkl.js`)
- [ ] Anahtar cümleler (`data/twinkl-sentences.js`) — **≤12 kelime kuralı**;
      L8'den itibaren Twinkl'ın cümleleri uzuyor, kısaltılarak girilecek
- [ ] **Level 8'de deyimler başlıyor** → `skill: "deyim"` kararının
      uygulanacağı nokta (aşağıdaki nota bak)
- [ ] Bu noktada Twinkl'ın kendi platformunun kapsamadığı alan başlıyor

**Deyim kararının uygulanması (L8'e gelince):** Deyimler ayrı beceri olacak.
Ama `skill` alanı `games-registry.js`'te **oyunlara** ait, veriye değil —
yani "deyim" bir beceri olarak hub'da görünsün diye ya deyimlerle çalışan
ayrı bir oyun/araç eklenmeli, ya da veri tarafına da bir etiket
mekanizması kurulmalı. Faz T2'nin başında bu netleştirilmeli.

## Faz T3 — Level 11-15 (B1-B2) + Deyimler
**Durum: ⬜ Başlanmadı**
- [ ] Kelime + cümle verisi
- [ ] ~80 "Idiom spotlight" deyiminin veriye girmesi + yukarıdaki
      deyim kararının uygulanması

## Oturum Günlüğü

### Oturum 2026-08-28 — Dokümantasyon pivotu (Faz 0)
- Branch (`claude/ingilizce-hub-devam-1c0xgn`) ve `data/curriculum.js`
  sayıları doğrulandı (5. sınıf 8 ünite/529, 6. sınıf 10/144, 7. sınıf
  10/144, 8. sınıf 10/364, toplam 1181 kelime) — önceki özetle birebir
  eşleşiyor.
- Kullanıcıyla pivot netleştirildi: proje "kelime oyunu hub'ı"ndan
  "İngilizce oyun ve pratik hub'ı"na çevriliyor. Kapsam dışı: soru
  bankası/quiz modülü, ders anlatım modülü. Sınıf kapsamı (5-8 / lise)
  kararı ertelendi.
- `CLAUDE.md` pivotu yansıtacak şekilde yeniden yazıldı.
- `HANDOFF.md` (bu dosya) oluşturuldu, yol planı Faz 0-3 olarak taslaklandı.
- Kod değişikliği yapılmadı — kullanıcı bu oturumda yalnızca dokümantasyon
  istedi.
- **Sıradaki oturumun hedefi:** Faz 1 — beceri alanı ve sınıf kapsamı
  kararlarını kullanıcıyla netleştirmek.

### Oturum 2026-08-28 (devam) — Faz 1 tamamlandı
- Kullanıcıyla Faz 1 kararları netleştirildi (bkz. yukarıdaki Faz 1 bölümü):
  beceri alanları = Gramer, Yazım/spelling, Cümle kurma; öncelik sırası =
  Cümle kurma → Gramer → Yazım; sınıf kapsamı 5-8 aynı kalıyor; hub'a
  şimdiden skill filtreleme altyapısı kurulması istendi.
- Kod değişikliği yapıldı:
  - `js/games-registry.js`: her kayda `skill: "kelime"` eklendi,
    `SKILL_LABELS` haritası eklendi.
  - `js/hub.js`: `renderSkillFilter()` eklendi — `GAMES`'teki farklı
    `skill` değerlerinden otomatik filtre/sekme satırı üretir, tek skill
    varken satır gizli kalır; `render()` artık `activeSkill`'e göre
    filtreliyor.
  - `index.html`: `#skill-filter` konteyneri eklendi (main'in başında).
  - `css/style.css`: `.skill-filter` / `.skill-chip` stilleri eklendi.
  - `CLAUDE.md` güncellendi: pivot bölümü karar edilen beceri
    alanları/önceliği ve sınıf kapsamını yansıtıyor; "yeni oyun ekleme"
    adımlarına `skill` alanı ve `SKILL_LABELS` notu eklendi.
- Test: Playwright ile doğrulandı — bugünkü tek-skill durumda filtre satırı
  gizli, sayaçlar doğru (6 oyun/1 araç/1181 kelime), konsol hatası yok;
  geçici olarak 2. bir skill enjekte edilip sekmelerin doğru göründüğü ve
  doğru filtrelediği test edildi, ardından test verisi geri alındı
  (`git diff` ile kalıcı değişiklik olmadığı teyit edildi).
- `sw.js` `CACHE_VERSION` artırılmadı — yeni bir dosya eklenmedi, sadece
  zaten precache'te olan dosyalar (`index.html`, `css/style.css`,
  `js/games-registry.js`, `js/hub.js`) düzenlendi; network-first strateji
  zaten güncel sürümü online kullanıcıya taşıyacak.
- Commit (`948db0c`) edilip `claude/ingilizce-hub-devam-1c0xgn` branch'ine push edildi.
- **Sıradaki oturumun hedefi:** Faz 2 — Cümle Kurma oyununun konseptini
  kullanıcıyla netleştirip inşa etmek (bkz. yukarıdaki Faz 2 adımları).

### Oturum 2026-09-09 — Faz 2 (Cümle Kurma) + Twinkl planı
**Yapılanlar:**
- **Cümle Kurma oyunu inşa edildi ve push edildi** (commit `5f698ce`).
  Detaylar yukarıdaki Faz 2 bölümünde. Hub'daki beceri filtresi (Faz 1'de
  kurulmuştu) ilk kez gerçek veriyle devreye girdi.
- `data/sentences.js` oluşturuldu — 5. sınıf Ünite 1, 4 yapı / 15 cümle,
  **TASLAK** (öğretmen onayı bekliyor).
- Kullanıcı **Twinkl ESL Curriculum "Guidance/Overview"** PDF'ini gönderdi
  (49 sayfa). Tamamı okundu ve analiz edildi → yeni **B izi (Faz T0-T3)**
  yol planına eklendi. Kritik bulgular:
  - 15 seviye × 12 ders, 6 ve 12 review → **150 içerik dersi**
  - Ders yapısı (başlık / key sentences / vocabulary) mevcut veri modelimize
    birebir oturuyor
  - Tahmini **~1400 kelime + ~80 deyim** (mevcut veritabanının ~1.2 katı)
  - `CURRICULUM`'a yeni üst anahtar eklemek **oyun kodu değiştirmeden**
    çalışıyor — sadece `<optgroup>` için küçük bir UX değişikliği gerekiyor
  - L8+ anahtar cümleleri çok uzun (15-25 kelime) → Cümle Kurma için
    ≤12 kelime kuralı önerildi
- `CLAUDE.md` güncellendi: iki ders ortamı (okul + özel ders), cümle
  veritabanı bölümü, Cümle Kurma içerik tablosuna eklendi, `CACHE_VERSION`
  notu v3, `CURRICULUM`'a anahtar ekleme deseni belgelendi.
- `HANDOFF.md` (bu dosya) A/B izlerine ayrıldı, Twinkl analizi + fazları
  eklendi.

**Yapılmayanlar / açık:**
- Twinkl verisinin hiçbiri henüz girilmedi — önce 3 karar gerekiyor
  (Türkçe karşılık? seviye önceliği? deyimler nereye?), bkz. B izi
  "Karara bağlanacak açık sorular".
- Kullanıcı, "course overview atacağım" dedi; bu PDF geldi ve incelendi.
  Daha ayrıntılı materyal (ders PPT'leri / worksheet'ler) gelirse veri
  girişi hızlanır ama zorunlu değil — bu PDF veri girişi için yeterli.

- **Faz T0 aynı oturumda tamamlandı** (kullanıcı 4 kararı da verdi):
  `data/twinkl.js` + Level 1 (111 kelime), optgroup desteği 8 oyunda,
  script/precache/sürüm güncellemeleri, Playwright doğrulaması. Detaylar
  yukarıdaki Faz T0 bölümünde.
- **Faz T1 de aynı oturumda tamamlandı:** Level 2-5 kelimeleri (454 kelime,
  Level 1-5 toplamı 565) ve Level 1-5 anahtar cümleleri (154 cümle, 50 ders)
  girildi; Cümle Kurma'nın Twinkl tarafı açıldı; `CACHE_VERSION` → `v5`.
  Detaylar yukarıdaki Faz T1 bölümünde. Hub artık **1746 kelime** içeriyor.
- **Sıradaki oturumun hedefi:** Faz T2 — Level 6-10. İlk iş, Level 8'de
  başlayan deyimler için `skill: "deyim"` kararının nasıl uygulanacağını
  netleştirmek (bkz. Faz T2 altındaki not), sonra seviye seviye veri girişi.
- **Kullanıcıdan beklenen:** Twinkl Level 1-5 kelime çevirilerini ve
  cümlelerini gözden geçirmesi; ayrıca iPad'de PWA doğrulaması hâlâ açık.

### Oturum 2026-09-10 — İçerik denetimi + seçim davranışı düzeltmesi
Kullanıcı "kelime ve ifadeler gerçekten uysun" diyerek Twinkl verisinin
doğruluğunu istedi. Yapılan denetim ve düzeltmeler:

**1) Kaynak sadakati (script ile, PDF metnine karşı):**
- Veride olup kaynakta olmayan kelime: **0** (43 "eşleşmedi" uyarısının
  32'si bilerek açılan yer tutucular, 3'ü on/off komut ayrımı, 8'i PDF
  satır kırılması kaynaklı yanlış alarmdı)
- Kaynakta olup veride olmayan: **12 kelime bulundu ve eklendi** —
  `squid`, `park` (L4/D11); `fast, slow, strong, weak, short` (L5/D8);
  `suitcase, have, go` (L5/D9); `South Korea, Space X` (L5/D11).
  Bunları "başka derste zaten var" diye atlamıştım; öğretmen tek ders
  seçtiğinde eksik kalıyorlardı. → **577 kelime** (önce 565)

**2) Çeviri denetimi (577 kelimenin tamamı elden geçti):**
- **Belirsizlik (kritik):** L2'de `run/running`, `swim/swimming`,
  `read/reading`, `write/writing`, `drive/driving` çiftleri aynı Türkçeye
  düşüyordu → eşleştirme/asmacada iki kart aynı ipucunu veriyordu.
  -ing biçimleri sürekli hâle çevrildi (`koşmak` → `koşuyor` vb., 9 kelime).
- **Yanlış/yanıltıcı (4):** `athlete` atlet→**sporcu** (TR'de fanila
  anlamı var), `older` daha yaşlı→**daha büyük (yaşça)** (bebek/çocuk/
  ergen sıralamasında yanlıştı), `teenager`→ergen (genç), `noon`
  öğlen→öğle vakti.
- **İpucu olarak işe yaramayanlar (5):** tr = en olan `oval`, `tablet`,
  `bungee jumping`, `scooter`, `diplomat` açıklama aldı.
- **Türkçe kalitesi (4):** `drones` dronelar→dronlar, `trainers`→spor
  ayakkabılar, `paintbrushes`→boya fırçaları, `park`→park (yeşil alan).
- Kalan 6 tr=en (Türkiye, Vietnam, pizza, panda, ramen, paella) gerçekten
  Türkçede de aynı — dokunulmadı.

**3) Cümle denetimi (154 cümle):**
- Hepsi ≤12 kelime kuralına uygun (en uzun 8).
- Her cümlenin kendi dersinin kelimesini/anahtar sorusunu kullandığı
  script ile doğrulandı.
- 5 düzeltme: `Onlar elmalar/patatesler` → `Onlar elma/patates` (Türkçede
  çoğul isim tekrar çoğullanmaz), `Those are bikes` → "Şunlar bisiklet"
  (işaret zamiri ayrımı), `She baked a cake` → "bir kek pişirdi",
  ve `We saw a big whale` → **`We ate at a restaurant`** (whale o dersin
  değil D7'nin kelimesiydi).

**4) Seçim davranışı tutarlılığı:**
- Cümle Kurma'da dersler "hepsi seçili" başlıyordu, 7 kelime oyununda
  "hiçbiri seçili değil". Cümle Kurma **işaretsiz başlayacak** şekilde
  hizalandı (öğretmen genelde tek ders seçiyor; "hepsi seçili" fazladan
  bir "Temizle" dokunuşu demekti). Hiç ders seçilmemişken yapı bölümü
  artık "Önce yukarıdan en az bir ders seç." ipucu gösteriyor.

**Test:** 8 oyunun tamamı aynı davranışta (10 ders, 0 varsayılan işaretli);
Cümle Kurma'da boş seçim → hata mesajı, 1 ders seçimi → yapı otomatik
işaretleniyor, 3 cümlelik tur uçtan uca oynandı; 7 kelime oyununda L1-L5 +
MEB 5/8 regresyonu temiz; Adam Asmaca L2/D8'de düzeltilmiş ipucu
("biniyor") görünüyor; hub sayacı **1758** (MEB 1181 + Twinkl 577).
Konsol hatası yok.

- **Sıradaki oturumun hedefi:** değişmedi — Faz T2 (Level 6-10), önce
  deyim/`skill` kararının uygulanması.
