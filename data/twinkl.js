/*
 * Twinkl ESL Curriculum — özel derslerde kullanılan müfredat.
 *
 * Kaynak: Twinkl "ESL Curriculum — Guidance/Overview" (49 sayfa, öğretmen
 * tarafından sağlandı). 15 seviye (CEFR A1-B2), her seviyede 12 ders;
 * 6. ve 12. dersler review dersi olduğu için burada YER ALMAZ — seviye
 * başına 10 içerik dersi girilir.
 *
 * Bu dosya `data/curriculum.js`'ten SONRA yüklenmelidir: MEB verisiyle
 * aynı `CURRICULUM` objesine `twinkl-<seviye>` anahtarlarıyla eklenir.
 * Böylece tüm oyunlar (hepsi `Object.keys(CURRICULUM)` okur) hiçbir
 * değişiklik olmadan bu seviyeleri de listeler.
 *
 * `group` alanı, oyunlardaki sınıf açılır listesinde <optgroup> başlığı
 * olarak kullanılır (MEB seviyeleriyle karışmasın diye).
 *
 * ⚠️ TÜRKÇE KARŞILIKLAR: Twinkl tek dilli (İngilizce) bir müfredattır;
 * buradaki Türkçe anlamlar bu proje için eklenmiştir (oyunlar en↔tr
 * eşleşmesi üzerine kurulu). Öğretmen gözden geçirip değiştirebilir.
 *
 * Yeni seviye eklerken: aynı desende bir `twinkl-<n>` anahtarı ekle,
 * review dersleri (6 ve 12) atlanır, `sw.js` PRECACHE zaten bu dosyayı
 * içerdiği için ek dosya işlemi gerekmez.
 */
(function () {
  var TWINKL_GROUP = "Twinkl ESL (Özel Ders)";

  var LEVELS = {
    "twinkl-1": {
      label: "Level 1 (A1) — Başlangıç",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t1-l1-say-hello",
          title: "Ders 1 - Say Hello (Selamlaşma ve Duygular)",
          words: [
            { en: "happy", tr: "mutlu" },
            { en: "sad", tr: "üzgün" },
            { en: "angry", tr: "kızgın" },
            { en: "tired", tr: "yorgun" },
            { en: "hungry", tr: "aç" },
            { en: "sick", tr: "hasta" },
            { en: "scared", tr: "korkmuş" },
            { en: "worried", tr: "endişeli" }
          ]
        },
        {
          id: "t1-l2-how-old-are-you",
          title: "Ders 2 - How Old Are You? (Sayılar 1-20)",
          words: [
            { en: "one", tr: "bir" },
            { en: "two", tr: "iki" },
            { en: "three", tr: "üç" },
            { en: "four", tr: "dört" },
            { en: "five", tr: "beş" },
            { en: "six", tr: "altı" },
            { en: "seven", tr: "yedi" },
            { en: "eight", tr: "sekiz" },
            { en: "nine", tr: "dokuz" },
            { en: "ten", tr: "on" },
            { en: "eleven", tr: "on bir" },
            { en: "twelve", tr: "on iki" },
            { en: "thirteen", tr: "on üç" },
            { en: "fourteen", tr: "on dört" },
            { en: "fifteen", tr: "on beş" },
            { en: "sixteen", tr: "on altı" },
            { en: "seventeen", tr: "on yedi" },
            { en: "eighteen", tr: "on sekiz" },
            { en: "nineteen", tr: "on dokuz" },
            { en: "twenty", tr: "yirmi" }
          ]
        },
        {
          id: "t1-l3-where-are-you-from",
          title: "Ders 3 - Where Are You From? (Ülkeler)",
          words: [
            { en: "Mexico", tr: "Meksika" },
            { en: "the UK", tr: "Birleşik Krallık" },
            { en: "the USA", tr: "Amerika Birleşik Devletleri" },
            { en: "Spain", tr: "İspanya" },
            { en: "South Korea", tr: "Güney Kore" },
            { en: "Türkiye", tr: "Türkiye" },
            { en: "China", tr: "Çin" },
            { en: "Morocco", tr: "Fas" },
            { en: "Brazil", tr: "Brezilya" },
            { en: "Japan", tr: "Japonya" }
          ]
        },
        {
          id: "t1-l4-what-is-it",
          title: "Ders 4 - What Is It? (Sınıf Eşyaları)",
          words: [
            { en: "pencil", tr: "kurşun kalem" },
            { en: "chair", tr: "sandalye" },
            { en: "bag", tr: "çanta" },
            { en: "notebook", tr: "defter" },
            { en: "pencil case", tr: "kalem kutusu" },
            { en: "table", tr: "masa" },
            { en: "pen", tr: "tükenmez kalem" },
            { en: "computer", tr: "bilgisayar" },
            { en: "teacher", tr: "öğretmen" },
            { en: "screen", tr: "ekran" },
            { en: "keyboard", tr: "klavye" },
            { en: "mouse", tr: "fare" }
          ]
        },
        {
          id: "t1-l5-what-are-they",
          title: "Ders 5 - What Are They? (Meyve ve Sebzeler, Çoğul)",
          words: [
            { en: "apples", tr: "elmalar" },
            { en: "oranges", tr: "portakallar" },
            { en: "bananas", tr: "muzlar" },
            { en: "tomatoes", tr: "domatesler" },
            { en: "grapes", tr: "üzümler" },
            { en: "avocados", tr: "avokadolar" },
            { en: "potatoes", tr: "patatesler" },
            { en: "eggs", tr: "yumurtalar" },
            { en: "olives", tr: "zeytinler" },
            { en: "cucumbers", tr: "salatalıklar" }
          ]
        },
        {
          id: "t1-l7-who-is-this",
          title: "Ders 7 - Who Is This? (Aile ve Arkadaşlar)",
          words: [
            { en: "family", tr: "aile" },
            { en: "Mum", tr: "anne" },
            { en: "Dad", tr: "baba" },
            { en: "parents", tr: "ebeveynler" },
            { en: "brother", tr: "erkek kardeş" },
            { en: "sister", tr: "kız kardeş" },
            { en: "grandma", tr: "büyükanne" },
            { en: "grandpa", tr: "büyükbaba" },
            { en: "teacher", tr: "öğretmen" },
            { en: "teachers", tr: "öğretmenler" },
            { en: "friend", tr: "arkadaş" },
            { en: "friends", tr: "arkadaşlar" }
          ]
        },
        {
          id: "t1-l8-what-colour-is-it",
          title: "Ders 8 - What Colour Is It? (Renkler)",
          words: [
            { en: "red", tr: "kırmızı" },
            { en: "blue", tr: "mavi" },
            { en: "yellow", tr: "sarı" },
            { en: "white", tr: "beyaz" },
            { en: "pink", tr: "pembe" },
            { en: "green", tr: "yeşil" },
            { en: "purple", tr: "mor" },
            { en: "grey", tr: "gri" },
            { en: "brown", tr: "kahverengi" },
            { en: "orange", tr: "turuncu" },
            { en: "black", tr: "siyah" }
          ]
        },
        {
          id: "t1-l9-favourite-animal",
          title: "Ders 9 - What's Your Favourite Animal? (Hayvanlar)",
          words: [
            { en: "cat", tr: "kedi" },
            { en: "dog", tr: "köpek" },
            { en: "elephant", tr: "fil" },
            { en: "rabbit", tr: "tavşan" },
            { en: "dolphin", tr: "yunus" },
            { en: "lion", tr: "aslan" },
            { en: "horse", tr: "at" },
            { en: "monkey", tr: "maymun" },
            { en: "tiger", tr: "kaplan" },
            { en: "shark", tr: "köpekbalığı" }
          ]
        },
        {
          id: "t1-l10-what-is-this",
          title: "Ders 10 - What Is This? What Are These? (Vücudumuz)",
          words: [
            { en: "body", tr: "vücut" },
            { en: "nose", tr: "burun" },
            { en: "mouth", tr: "ağız" },
            { en: "head", tr: "baş" },
            { en: "stomach", tr: "karın" },
            { en: "eyes", tr: "gözler" },
            { en: "arms", tr: "kollar" },
            { en: "legs", tr: "bacaklar" },
            { en: "feet", tr: "ayaklar" },
            { en: "hands", tr: "eller" },
            { en: "ears", tr: "kulaklar" }
          ]
        },
        {
          id: "t1-l11-is-it-a",
          title: "Ders 11 - Is It A...? (Şekiller)",
          words: [
            { en: "triangle", tr: "üçgen" },
            { en: "square", tr: "kare" },
            { en: "circle", tr: "daire" },
            { en: "rectangle", tr: "dikdörtgen" },
            { en: "oval", tr: "oval" },
            { en: "star", tr: "yıldız" },
            { en: "heart", tr: "kalp" }
          ]
        }
      ]
    }
  };

  // curriculum.js yüklenmediyse (beklenmedik durum) sessizce çık —
  // oyun yine de MEB verisiyle çalışmaya devam etsin.
  if (typeof CURRICULUM === "undefined") return;

  Object.keys(LEVELS).forEach(function (key) {
    CURRICULUM[key] = LEVELS[key];
  });
})();
