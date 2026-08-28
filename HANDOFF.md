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
"kelime oyunu" değil, genel bir **İngilizce oyun ve pratik hub'ı**. Yeni
içerikler kelime dışı becerileri (gramer, yazım, cümle kurma vb.) de
kapsayabilir, ama hepsi mevcut "bağımsız oyun/araç klasörü" formatında
kalacak. **Kapsam dışı:** soru bankası/quiz modülü, ders anlatım modülü —
bunlar ayrı modül mimarisi olarak eklenmeyecek. Sınıf kapsamının (5-8.
sınıf mi kalacak, lise eklenecek mi) genişletilip genişletilmeyeceği henüz
karara bağlanmadı. Detaylar için `CLAUDE.md`.

## Yol Planı (Fazlar)

### Faz 0 — Dokümantasyon ve Temel Kurulum
**Durum: ✅ Tamamlandı (2026-08-28)**
- [x] `CLAUDE.md` güncellendi (proje amacı pivotu yansıtıyor)
- [x] `HANDOFF.md` oluşturuldu (bu dosya)
- [x] Yol planı taslağı (Faz 0-3) çizildi

### Faz 1 — Karar Noktaları ve Mimari Hazırlık
**Durum: ⬜ Başlanmadı**

Hedef: Pivotun somut gereksinimlerini kullanıcıyla birlikte netleştirmek ve
gerekiyorsa mevcut mimariyi (registry, hub.js, branding metinleri) buna göre
hazırlamak. Bu faz büyük ölçüde **karar/soru** fazı, kod değişikliği azdır.

Adımlar:
- [ ] Kullanıcıyla karar ver: yeni oyunlar/pratikler hangi beceri
      alanlarını kapsayacak (gramer? yazım? cümle kurma? telaffuz? başka?)
      ve öncelik sırası ne olacak.
- [ ] Sınıf kapsamı kararı: 5-8. sınıf aynı mı kalacak, lise (9-12) eklenecek
      mi (kullanıcı "şimdilik karar verme" dedi — bu faz uygun bir nokta).
- [ ] Hub metinlerinde "kelime oyunu" vurgusu geçen yerler var mı bak
      (`index.html` başlık/açıklama, `README.md`) — genel "oyun ve pratik"
      diline çekilmesi gerekip gerekmediğine karar ver.
- [ ] Sadece ihtiyaç netleşirse: `games-registry.js` şemasına yeni bir alan
      eklenip eklenmeyeceğine karar ver (örn. `skill: "vocab" | "grammar" | ...`
      gibi bir filtreleme ihtiyacı doğar mı).

### Faz 2 — İlk Yeni Oyun/Pratik Türü
**Durum: ⬜ Başlanmadı (Faz 1'deki kararlara bağlı)**

Hedef: Kelime dışı ilk oyun/pratik aracını tasarlayıp hub'a eklemek.

Adımlar:
- [ ] Oyun konsepti ve kuralları netleştir (kullaıcıyla birlikte)
- [ ] Gerekiyorsa yeni bir veri dosyası oluştur (`data/...`) —
      `curriculum.js` deseniyle tutarlı, düz JS/`<script src>`
- [ ] `games/<ad>/` altında `index.html` + `style.css` + `script.js`
      (+ gerekiyorsa `sounds.js`) yaz
- [ ] `js/games-registry.js`'e kaydet
- [ ] `sw.js` → `PRECACHE` listesine ekle, `CACHE_VERSION`'ı artır
- [ ] Playwright ile uçtan uca test (masaüstü + iPad yatay/dikey), konsol
      hatası kontrolü

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
