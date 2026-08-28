/*
 * Sınıf/ünite bazlı "Cümle Kurma" veritabanı. `curriculum.js`'teki kelime
 * havuzunun aksine burada tam cümleler var; her cümle o ünitenin
 * kazanımındaki bir dil yapısına/işlevine (`structure`) bağlanır — amaç
 * rastgele kelime karmaşası değil, ünitenin öğrettiği kalıbı pratik
 * ettirmek (örn. "be from + ülke", "there is/are", emir cümleleri).
 *
 * ⚠️ TASLAK (2026-08-28): Bu ünitenin yapı/işlev ataması ve cümleleri genel
 * İngilizce öğretim programı bilgisiyle hazırlandı, kitaptaki resmi
 * kazanımlarla karşılaştırılıp öğretmen tarafından onaylanmadı. Yeni ünite
 * eklerken de aynı şekilde "TASLAK" olarak işaretle, öğretmen onayladıktan
 * sonra bu notu kaldır. (bkz. HANDOFF.md Faz 2/3)
 *
 * Yapı: SENTENCES[sınıf].units[] = {
 *   id, title:    curriculum.js'teki aynı ünite ile BİREBİR aynı olmalı
 *                 (oyun, kelime havuzu yerine bu id/title eşleşmesini
 *                 kullanarak üniteleri listeler),
 *   structures:   [{ id, label }] — bu ünitede pratik edilen dil yapıları,
 *   sentences:    [{ en, tr, structure }] — structure, yukarıdaki
 *                 structures[].id'lerinden biri olmalı.
 * }
 *
 * Bir ünitenin `curriculum.js`'te kelime kaydı olması, burada da cümle
 * kaydı olacağı anlamına gelmez — cümleler ünite ünite, ayrı ayrı
 * eklenir. Oyun sadece burada verisi olan sınıf/üniteleri listeler.
 */
var SENTENCES = {
  "5": {
    label: "5. Sınıf",
    units: [
      {
        id: "theme1-school-life",
        title: "Ünite 1 - School Life (Okul Hayatı)",
        structures: [
          { id: "countries", label: "Nereli olduğunu söyleme (be from + ülke)" },
          { id: "clubs", label: "Kulübe katılma isteği belirtme (I'd like to / I want to join...)" },
          { id: "rules", label: "Okul kuralları / emir cümleleri (Don't..., Respect...)" },
          { id: "facilities", label: "Okul olanaklarını tanıtma (There is/are...)" }
        ],
        sentences: [
          { en: "I am from Türkiye.", tr: "Ben Türkiye'denim.", structure: "countries" },
          { en: "She is from Japan.", tr: "O Japonya'dan.", structure: "countries" },
          { en: "They are from Canada.", tr: "Onlar Kanada'dan.", structure: "countries" },
          { en: "He is from Italy.", tr: "O İtalya'dan.", structure: "countries" },

          { en: "I would like to join the chess club.", tr: "Satranç kulübüne katılmak istiyorum.", structure: "clubs" },
          { en: "I want to join the drama club.", tr: "Drama kulübüne katılmak istiyorum.", structure: "clubs" },
          { en: "My favourite club is the science club.", tr: "Favori kulübüm bilim kulübü.", structure: "clubs" },
          { en: "I want to join the sports club.", tr: "Spor kulübüne katılmak istiyorum.", structure: "clubs" },

          { en: "Don't shout in the corridor.", tr: "Koridorda bağırma.", structure: "rules" },
          { en: "Don't chew gum in the library.", tr: "Kütüphanede sakız çiğneme.", structure: "rules" },
          { en: "Respect the school rules.", tr: "Okul kurallarına saygı göster.", structure: "rules" },
          { en: "Don't be late for school.", tr: "Okula geç kalma.", structure: "rules" },

          { en: "There is a canteen in our school.", tr: "Okulumuzda bir kantin var.", structure: "facilities" },
          { en: "There is a library in our school.", tr: "Okulumuzda bir kütüphane var.", structure: "facilities" },
          { en: "There is a sports field in our school.", tr: "Okulumuzda bir spor sahası var.", structure: "facilities" }
        ]
      }
    ]
  }
};
