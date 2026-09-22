/*
 * Twinkl ESL Curriculum — deyimler ("Idiom spotlight").
 *
 * Kaynak: Twinkl "ESL Curriculum — Guidance/Overview" belgesinde Level 8'den
 * itibaren her dersin "Vocabulary / Idioms" sütununda bir "Idiom spotlight"
 * satırı var. Level 8-15 boyunca ~80 deyim ediyor.
 *
 * NEDEN AYRI DOSYA / AYRI OBJE (karar, 2026-09-22):
 * Deyimler bilinçli olarak `CURRICULUM`'a EKLENMEZ. Eklenseydi kelime
 * oyunlarının içine karışırlardı ve hiçbirinde iyi çalışmazlardı:
 *   - Kelime Avı ızgaraya yalnızca tek parçalı kelimeleri alıyor, "it's
 *     raining cats and dogs" zaten elenirdi.
 *   - Adam Asmaca 25+ harfli bir ifadeyi harf harf tahmin ettirirdi.
 *   - Eşleştirme/Yakala kartlarında deyim, normal kelimelerin arasına
 *     karışıp dersin kelime tekrarını bozardı.
 * Kullanıcının kararı da deyimlerin **ayrı bir beceri** olması yönündeydi
 * (`skill: "deyim"`, bkz. HANDOFF.md). `skill` alanı oyunlara ait olduğu
 * için bunun karşılığı: deyimleri kendi veri kaynağında tutmak ve onları
 * kullanan ayrı bir oyun/araç eklemek.
 *
 * YAPI: `CURRICULUM` ile aynı dış iskelet (`label`, `group`, `units[]` →
 * `id`, `title`) — böylece `HubSetup.unitPicker({ source: IDIOMS })` hiçbir
 * değişiklik olmadan çalışır (seçici yalnızca bu alanları okur). Kelime
 * dizisinin adı `words` değil `idioms`, kayıtlar:
 *   { en, tr, meaning }
 *   en      — deyimin İngilizcesi
 *   tr      — varsa Türkçe karşılığı/eşdeğer deyim, yoksa birebir anlamı
 *   meaning — deyimin ne anlama geldiğinin Türkçe açıklaması
 *
 * Ünite `id`/`title` değerleri `data/twinkl.js`'teki karşılıklarıyla
 * BİREBİR aynıdır (aynı ders).
 *
 * ⚠️ TASLAK: Türkçe karşılıklar ve açıklamalar bu proje için yazıldı,
 * öğretmen onayından geçmedi.
 */
var IDIOMS = {};

(function () {
  var TWINKL_GROUP = "Twinkl ESL (Özel Ders)";

  var LEVELS = {
    "twinkl-8": {
      label: "Level 8 (B1) — Karşılaştırma ve Varsayım",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t8-l1-comparisons-with-creatures",
          title: "Ders 1 - Comparisons with Creatures (Karşılaştırma)",
          idioms: [
            {
              en: "sly as a fox",
              tr: "tilki gibi kurnaz",
              meaning: "Çok kurnaz ve uyanık olmak."
            }
          ]
        },
        {
          id: "t8-l2-whats-it-like-outside",
          title: "Ders 2 - What's It Like Outside? (Hava Durumu, Olasılık)",
          idioms: [
            {
              en: "it's raining cats and dogs",
              tr: "bardaktan boşanırcasına yağıyor",
              meaning: "Çok şiddetli yağmur yağıyor."
            }
          ]
        },
        {
          id: "t8-l3-video-games-or-board-games",
          title: "Ders 3 - Video Games or Board Games? (Katılma ve Karşı Çıkma)",
          idioms: [
            {
              en: "agree to disagree",
              tr: "anlaşamadığımızda anlaşmak",
              meaning: "Aynı fikirde olmadığını kabul edip tartışmayı kibarca bitirmek."
            }
          ]
        },
        {
          id: "t8-l4-what-are-you-doing-this-weekend",
          title: "Ders 4 - What Are You Doing This Weekend? (Gelecekte Sürekli)",
          idioms: [
            {
              en: "recharge your batteries",
              tr: "pillerini şarj etmek",
              meaning: "Dinlenip yeniden enerji toplamak."
            }
          ]
        },
        {
          id: "t8-l5-putting-it-all-together",
          title: "Ders 5 - Putting It All Together (put Öbek Fiilleri)",
          idioms: [
            {
              en: "put one's foot down",
              tr: "ayak diremek",
              meaning: "Bir konuda kesin karar verip geri adım atmamak."
            }
          ]
        },
        {
          id: "t8-l7-what-am-i-doing-today",
          title: "Ders 7 - What Am I Doing Today? (should have / might have)",
          idioms: [
            {
              en: "hindsight is 20/20",
              tr: "iş işten geçtikten sonra herkes akıllıdır",
              meaning: "Olay olup bittikten sonra doğrusunu görmek kolaydır."
            }
          ]
        },
        {
          id: "t8-l8-hypotheticals",
          title: "Ders 8 - Hypotheticals (2. ve 3. Koşul, Teknoloji)",
          idioms: [
            {
              en: "cutting-edge",
              tr: "son teknoloji",
              meaning: "Bir alanda en yeni ve en ileri olan."
            }
          ]
        },
        {
          id: "t8-l9-a-letter-to-a-pen-pal",
          title: "Ders 9 - A Letter to a Pen Pal (Mektup Yazma)",
          idioms: [
            {
              en: "nothing to report",
              tr: "bildirecek bir şey yok",
              meaning: "Anlatmaya değer yeni bir gelişme olmaması."
            }
          ]
        },
        {
          id: "t8-l10-seriously-fun-rides",
          title: "Ders 10 - Seriously Fun Rides (Pekiştiriciler, Lunapark)",
          idioms: [
            {
              en: "a roller coaster of emotions",
              tr: "duygusal iniş çıkış",
              meaning: "Kısa sürede çok farklı duygular yaşamak."
            }
          ]
        },
        {
          id: "t8-l11-looking-around-london",
          title: "Ders 11 - Looking around London (look Öbek Fiilleri)",
          idioms: [
            {
              en: "in hot water",
              tr: "başı dertte",
              meaning: "Bir yanlış yüzünden başı belaya girmiş olmak."
            }
          ]
        }
      ]
    },

    "twinkl-9": {
      label: "Level 9 (B1) — Aktarma ve Tahmin",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t9-l1-how-the-internet-started",
          title: "Ders 1 - How the Internet Started (Zaman Edatları)",
          idioms: [
            {
              en: "game changer",
              tr: "oyunun kurallarını değiştiren",
              meaning: "Bir alanı kökten değiştiren yenilik veya kişi."
            },
            {
              en: "a few clicks away",
              tr: "birkaç tık uzakta",
              meaning: "İnternette çok kolay ulaşılabilir olmak."
            }
          ]
        },
        {
          id: "t9-l2-lets-help-ourselves-relax",
          title: "Ders 2 - Let's Help Ourselves Relax (Dönüşlü Zamirler)",
          idioms: [
            {
              en: "be all over the place",
              tr: "darmadağın olmak",
              meaning: "Kafası karışık, dağınık ve odaklanamaz durumda olmak."
            }
          ]
        },
        {
          id: "t9-l3-he-said-you-should-visit-the-island",
          title: "Ders 3 - He Said You Should Visit the Island (Aktarma Cümleleri)",
          idioms: [
            {
              en: "at sea",
              tr: "pusulayı şaşırmak",
              meaning: "Bir konuda ne yapacağını bilememek, şaşkına dönmek."
            }
          ]
        },
        {
          id: "t9-l4-sign-up-for-an-online-course",
          title: "Ders 4 - Sign Up for an Online Course (Teknoloji Öbek Fiilleri)",
          idioms: [
            {
              en: "pull the plug",
              tr: "fişi çekmek",
              meaning: "Devam eden bir işi veya projeyi bitirmek."
            }
          ]
        },
        {
          id: "t9-l5-ancient-mysteries",
          title: "Ders 5 - Ancient Mysteries (Geçmişe Yönelik Tahmin)",
          idioms: [
            {
              en: "history in the making",
              tr: "tarih yazılıyor",
              meaning: "İleride tarihe geçecek bir olayın tam o anda yaşanması."
            }
          ]
        },
        {
          id: "t9-l7-the-end-of-school-celebration",
          title: "Ders 7 - The End of School Celebration (Koşullu Teklif)",
          idioms: [
            {
              en: "let your hair down",
              tr: "kendini salıvermek",
              meaning: "Kuralları bir kenara bırakıp rahatça eğlenmek."
            }
          ]
        },
        {
          id: "t9-l8-stick-with-it",
          title: "Ders 8 - Stick With It (Spor Öbek Fiilleri)",
          idioms: [
            {
              en: "burn the candle at both ends",
              tr: "mumu iki ucundan yakmak",
              meaning: "Hem erken kalkıp hem geç yatarak kendini fazla yormak."
            }
          ]
        },
        {
          id: "t9-l9-has-the-festival-started-already",
          title: "Ders 9 - Has the Festival Started Already? (yet, still, just, already)",
          idioms: [
            {
              en: "in a festive mood",
              tr: "bayram havasında",
              meaning: "Neşeli ve kutlamaya hazır bir ruh hâlinde olmak."
            }
          ]
        },
        {
          id: "t9-l10-behind-the-scenes",
          title: "Ders 10 - Behind the Scenes (Ön Ekler)",
          idioms: [
            {
              en: "steal the show",
              tr: "gösteriyi çalmak",
              meaning: "Bütün ilgiyi üzerine toplayıp en çok beğenilen olmak."
            }
          ]
        },
        {
          id: "t9-l11-lost-treasure",
          title: "Ders 11 - Lost Treasure (Soru Ekleri)",
          idioms: [
            {
              en: "run a tight ship",
              tr: "sıkı yönetmek",
              meaning: "Bir ekibi veya işi disiplinli ve düzenli biçimde yürütmek."
            }
          ]
        }
      ]
    },

    "twinkl-10": {
      label: "Level 10 (B1) — Edilgen Çatı ve Geçmişin Geçmişi",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t10-l1-how-can-i-make-dinner",
          title: "Ders 1 - How Can I Make Dinner? (Emir Kipiyle Tarif)",
          idioms: [
            {
              en: "piece of cake",
              tr: "çocuk oyuncağı",
              meaning: "Yapması çok kolay olan bir iş."
            }
          ]
        },
        {
          id: "t10-l2-what-were-people-doing-in-1986",
          title: "Ders 2 - What Were People Doing in 1986? (Geçmişte Sürekli)",
          idioms: [
            {
              en: "a window into the past",
              tr: "geçmişe açılan pencere",
              meaning: "Geçmişin nasıl olduğunu gösteren bir nesne veya kayıt."
            }
          ]
        },
        {
          id: "t10-l3-all-on-board-to-the-isle-of-lewis",
          title: "Ders 3 - All On Board to the Isle of Lewis (Yolculuk Edatları)",
          idioms: [
            {
              en: "a breeze",
              tr: "su gibi kolay",
              meaning: "Hiç zorlanmadan yapılan bir şey."
            }
          ]
        },
        {
          id: "t10-l4-finding-the-cafe-in-twinklton",
          title: "Ders 4 - Finding the Cafe in Twinklton (Yer Zarfları)",
          idioms: [
            {
              en: "cross that bridge when you come to it",
              tr: "sırası gelince düşünürüz",
              meaning: "Bir sorunu şimdiden dert etmeyip zamanı gelince ele almak."
            }
          ]
        },
        {
          id: "t10-l5-remember-to-order",
          title: "Ders 5 - Remember to Order (Mastar ve -ing Farkı)",
          idioms: [
            {
              en: "paper trail",
              tr: "belge izi",
              meaning: "Bir işin adımlarını kanıtlayan yazılı kayıtlar."
            }
          ]
        },
        {
          id: "t10-l7-when-books-are-made-into-movies",
          title: "Ders 7 - When Books Are Made Into Movies (Edilgen Çatı)",
          idioms: [
            {
              en: "to be on the same page",
              tr: "aynı fikirde olmak",
              meaning: "Bir konuda herkesin aynı şeyi anlamış olması."
            }
          ]
        },
        {
          id: "t10-l8-they-told-us-to-be-calm",
          title: "Ders 8 - They Told Us to Be Calm (Aktarma, Güvenlik)",
          idioms: [
            {
              en: "every second counts",
              tr: "her saniye önemli",
              meaning: "Acil bir durumda hiç zaman kaybetmemek gerektiği."
            }
          ]
        },
        {
          id: "t10-l9-i-used-to-love-pottery",
          title: "Ders 9 - I Used to Love Pottery (used to)",
          idioms: [
            {
              en: "like a fish to water",
              tr: "suya düşen balık gibi",
              meaning: "Yeni bir işe çok çabuk ve doğal biçimde alışmak."
            }
          ]
        },
        {
          id: "t10-l10-where-had-you-been-before",
          title: "Ders 10 - Where Had You Been Before? (Geçmişin Geçmişi)",
          idioms: [
            {
              en: "out of the blue",
              tr: "damdan düşer gibi",
              meaning: "Hiç beklenmedik bir anda, birdenbire."
            }
          ]
        },
        {
          id: "t10-l11-a-trip-to-the-moon",
          title: "Ders 11 - A Trip to the Moon (Birleşik İsimler)",
          idioms: [
            {
              en: "once in a blue moon",
              tr: "kırk yılda bir",
              meaning: "Çok seyrek olarak, nadiren."
            }
          ]
        }
      ]
    }
  };

  Object.keys(LEVELS).forEach(function (key) {
    IDIOMS[key] = LEVELS[key];
  });
})();
