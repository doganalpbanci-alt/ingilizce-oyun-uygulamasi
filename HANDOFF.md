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
**Durum: ⬜ Başlanmadı**

Hedef: İlk kelime-dışı oyunu tasarlayıp hub'a eklemek — **cümle kurma**
(Faz 1'de belirlenen öncelik). Konsept: karışık sırada verilen kelimelerden
doğru İngilizce cümleyi kurma.

Adımlar:
- [ ] Oyun konsepti ve kuralları netleştir (kullanıcıyla birlikte) —
      cümleler nereden gelecek (elle mi girilecek bir veri dosyası, yoksa
      `curriculum.js`'teki kelimelerden mi üretilecek?), zorluk
      seviyeleri, tek kişi/sınıfça modu var mı.
- [ ] Gerekiyorsa yeni bir veri dosyası oluştur (`data/...`) —
      `curriculum.js` deseniyle tutarlı, düz JS/`<script src>`
- [ ] `games/<ad>/` altında `index.html` + `style.css` + `script.js`
      (+ gerekiyorsa `sounds.js`) yaz
- [ ] `js/games-registry.js`'e kaydet — **`skill: "cumle-kurma"`** ver ve
      `SKILL_LABELS`'a `"cumle-kurma": "Cümle Kurma"` ekle (bu, hub'da
      filtre sekmesinin otomatik belirmesini sağlayacak — Faz 1'de
      kurulan mekanizma)
- [ ] `sw.js` → `PRECACHE` listesine ekle, `CACHE_VERSION`'ı artır
- [ ] Playwright ile uçtan uca test (masaüstü + iPad yatay/dikey), konsol
      hatası kontrolü, filtre sekmesinin göründüğünü doğrula

### Faz 3 — Genişleme ve Bakiye Maddeler
**Durum: ⬜ Başlanmadı / sürekli açık**

Backlog (yeni maddeler oturumlar ilerledikçe buraya eklenecek):
- [ ] iPad'de gerçek Safari'de PWA doğrulaması (kullanıcı yapacak: kısayolu
      sil → siteyi Safari'de aç → "Ana Ekrana Ekle" → uçak modunda test)
- [ ] 7. sınıf çevirilerinin öğretmen tarafından gözden geçirilmesi
- [ ] `kelime-eslestirme` ve `kelime-kartlari`'na ses efekti eklenmesi
- [ ] `README.md`'deki 8. sınıf kelime sayısını düzelt (341 → 364)

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
- Commit + push yapılmadı — bu adım henüz onay bekliyor (bir sonraki mesajda).
- **Sıradaki oturumun hedefi:** Faz 2 — Cümle Kurma oyununun konseptini
  kullanıcıyla netleştirip inşa etmek (bkz. yukarıdaki Faz 2 adımları).
