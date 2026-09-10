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
            { en: "oval", tr: "oval (uzun yuvarlak)" },
            { en: "star", tr: "yıldız" },
            { en: "heart", tr: "kalp" }
          ]
        }
      ]
    },
    "twinkl-2": {
      label: "Level 2 (A1) — Temel Yapılar",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t2-l1-he-is-she-is",
          title: "Ders 1 - He Is / She Is… (Zamirler, Ülkeler, Duygular)",
          words: [
            { en: "he", tr: "o (erkek)" },
            { en: "she", tr: "o (kadın)" },
            { en: "they", tr: "onlar" },
            { en: "Poland", tr: "Polonya" },
            { en: "France", tr: "Fransa" },
            { en: "Argentina", tr: "Arjantin" },
            { en: "Nigeria", tr: "Nijerya" },
            { en: "Vietnam", tr: "Vietnam" },
            { en: "South Africa", tr: "Güney Afrika" },
            { en: "annoyed", tr: "canı sıkkın" },
            { en: "embarrassed", tr: "utanmış" },
            { en: "thirsty", tr: "susamış" },
            { en: "nervous", tr: "gergin" }
          ]
        },
        {
          id: "t2-l2-i-can",
          title: "Ders 2 - I Can… (Yetenekler)",
          words: [
            { en: "jump", tr: "zıplamak" },
            { en: "swim", tr: "yüzmek" },
            { en: "run", tr: "koşmak" },
            { en: "fly", tr: "uçmak" },
            { en: "walk", tr: "yürümek" },
            { en: "sing", tr: "şarkı söylemek" },
            { en: "dance", tr: "dans etmek" },
            { en: "read", tr: "okumak" },
            { en: "write", tr: "yazmak" },
            { en: "drive", tr: "araba sürmek" }
          ]
        },
        {
          id: "t2-l3-what-do-you-like",
          title: "Ders 3 - What Do You Like? (Yiyecek ve İçecekler)",
          words: [
            { en: "pizza", tr: "pizza" },
            { en: "hamburgers", tr: "hamburgerler" },
            { en: "sandwiches", tr: "sandviçler" },
            { en: "fizzy drinks", tr: "gazlı içecekler" },
            { en: "juice", tr: "meyve suyu" },
            { en: "coffee", tr: "kahve" },
            { en: "tea", tr: "çay" },
            { en: "ice cream", tr: "dondurma" },
            { en: "hotdogs", tr: "sosisli sandviçler" },
            { en: "cake", tr: "kek" },
            { en: "milk", tr: "süt" },
            { en: "cheese", tr: "peynir" }
          ]
        },
        {
          id: "t2-l4-what-is-it",
          title: "Ders 4 - What Is It? (Sıfat + İsim)",
          words: [
            { en: "small", tr: "küçük" },
            { en: "big", tr: "büyük" },
            { en: "tall", tr: "uzun boylu" },
            { en: "short", tr: "kısa" },
            { en: "cute", tr: "sevimli" },
            { en: "scary", tr: "korkutucu" },
            { en: "car", tr: "araba" },
            { en: "bus", tr: "otobüs" },
            { en: "giraffe", tr: "zürafa" },
            { en: "panda", tr: "panda" },
            { en: "wolf", tr: "kurt" }
          ]
        },
        {
          id: "t2-l5-is-there-a-an",
          title: "Ders 5 - Is There A/An…? (Mutfak Eşyaları)",
          words: [
            { en: "plates", tr: "tabaklar" },
            { en: "spoons", tr: "kaşıklar" },
            { en: "knife", tr: "bıçak" },
            { en: "fork", tr: "çatal" },
            { en: "chopsticks", tr: "yemek çubukları" },
            { en: "bowl", tr: "kase" },
            { en: "refrigerator", tr: "buzdolabı" },
            { en: "microwave", tr: "mikrodalga" },
            { en: "oven", tr: "fırın" },
            { en: "cup", tr: "fincan" },
            { en: "mug", tr: "kupa" }
          ]
        },
        {
          id: "t2-l7-where-is",
          title: "Ders 7 - Where Is…? (Yer Edatları ve Teknoloji)",
          words: [
            { en: "in", tr: "içinde" },
            { en: "on", tr: "üstünde" },
            { en: "under", tr: "altında" },
            { en: "next to", tr: "yanında" },
            { en: "in between", tr: "arasında" },
            { en: "phone", tr: "telefon" },
            { en: "tablet", tr: "tablet (bilgisayar)" },
            { en: "laptop", tr: "dizüstü bilgisayar" },
            { en: "speaker", tr: "hoparlör" },
            { en: "mouse", tr: "fare" },
            { en: "keyboard", tr: "klavye" },
            { en: "charger", tr: "şarj aleti" },
            { en: "camera", tr: "kamera" }
          ]
        },
        {
          id: "t2-l8-what-are-you-doing",
          title: "Ders 8 - What Are You Doing? (Şimdiki Zaman)",
          words: [
            { en: "running", tr: "koşuyor" },
            { en: "hiking", tr: "doğa yürüyüşü yapıyor" },
            { en: "riding", tr: "biniyor" },
            { en: "driving", tr: "araba sürüyor" },
            { en: "playing", tr: "oynuyor" },
            { en: "swimming", tr: "yüzüyor" },
            { en: "writing", tr: "yazıyor" },
            { en: "reading", tr: "okuyor" },
            { en: "cooking", tr: "yemek pişiriyor" }
          ]
        },
        {
          id: "t2-l9-what-is-this",
          title: "Ders 9 - What Is This? (Taşıtlar, this/that/these/those)",
          words: [
            { en: "skateboards", tr: "kaykaylar" },
            { en: "roller skates", tr: "patenler" },
            { en: "bikes", tr: "bisikletler" },
            { en: "plane", tr: "uçak" },
            { en: "helicopter", tr: "helikopter" },
            { en: "cars", tr: "arabalar" },
            { en: "bus", tr: "otobüs" },
            { en: "taxi", tr: "taksi" },
            { en: "subway", tr: "metro" },
            { en: "train", tr: "tren" },
            { en: "truck", tr: "kamyon" },
            { en: "drones", tr: "dronlar" }
          ]
        },
        {
          id: "t2-l10-stand-up",
          title: "Ders 10 - Stand Up! (Sınıf Komutları)",
          words: [
            { en: "sit down", tr: "otur" },
            { en: "stand up", tr: "ayağa kalk" },
            { en: "open your book", tr: "kitabını aç" },
            { en: "close your book", tr: "kitabını kapat" },
            { en: "turn your computer on", tr: "bilgisayarını aç" },
            { en: "turn your computer off", tr: "bilgisayarını kapat" },
            { en: "turn your mic on", tr: "mikrofonunu aç" },
            { en: "turn your mic off", tr: "mikrofonunu kapat" },
            { en: "do your homework", tr: "ödevini yap" }
          ]
        },
        {
          id: "t2-l11-what-are-you-wearing",
          title: "Ders 11 - What Are You Wearing? (Kıyafetler)",
          words: [
            { en: "T-shirt", tr: "tişört" },
            { en: "trousers", tr: "pantolon" },
            { en: "jeans", tr: "kot pantolon" },
            { en: "trainers", tr: "spor ayakkabılar" },
            { en: "shoes", tr: "ayakkabılar" },
            { en: "jumper", tr: "kazak" },
            { en: "dress", tr: "elbise" },
            { en: "skirt", tr: "etek" },
            { en: "jacket", tr: "ceket" },
            { en: "hat", tr: "şapka" },
            { en: "shorts", tr: "şort" },
            { en: "socks", tr: "çoraplar" }
          ]
        }
      ]
    },
    "twinkl-3": {
      label: "Level 3 (A1-A2) — Zaman ve Rutinler",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t3-l1-how-old-is",
          title: "Ders 1 - How Old Is…? (Sayılar 20-100)",
          words: [
            { en: "twenty", tr: "yirmi" },
            { en: "thirty", tr: "otuz" },
            { en: "forty", tr: "kırk" },
            { en: "fifty", tr: "elli" },
            { en: "sixty", tr: "altmış" },
            { en: "seventy", tr: "yetmiş" },
            { en: "eighty", tr: "seksen" },
            { en: "ninety", tr: "doksan" },
            { en: "one hundred", tr: "yüz" }
          ]
        },
        {
          id: "t3-l2-what-time-is-it",
          title: "Ders 2 - What Time Is It? (Saatler ve Günün Bölümleri)",
          words: [
            { en: "midnight", tr: "gece yarısı" },
            { en: "noon", tr: "öğle vakti" },
            { en: "afternoon", tr: "öğleden sonra" },
            { en: "morning", tr: "sabah" },
            { en: "evening", tr: "akşam" },
            { en: "o'clock", tr: "tam saat" },
            { en: "quarter past", tr: "çeyrek geçe" },
            { en: "quarter to", tr: "çeyrek kala" },
            { en: "half past", tr: "buçuk" }
          ]
        },
        {
          id: "t3-l3-what-do-you-do-on-tuesdays",
          title: "Ders 3 - What Do You Do on Tuesdays? (Haftanın Günleri)",
          words: [
            { en: "Monday", tr: "Pazartesi" },
            { en: "Tuesday", tr: "Salı" },
            { en: "Wednesday", tr: "Çarşamba" },
            { en: "Thursday", tr: "Perşembe" },
            { en: "Friday", tr: "Cuma" },
            { en: "Saturday", tr: "Cumartesi" },
            { en: "Sunday", tr: "Pazar" },
            { en: "play football", tr: "futbol oynamak" },
            { en: "go to the cinema", tr: "sinemaya gitmek" },
            { en: "go to English class", tr: "İngilizce dersine gitmek" },
            { en: "go to school", tr: "okula gitmek" },
            { en: "clean the house", tr: "evi temizlemek" },
            { en: "visit my grandma", tr: "büyükannemi ziyaret etmek" },
            { en: "play with friends", tr: "arkadaşlarla oynamak" },
            { en: "go to the park", tr: "parka gitmek" }
          ]
        },
        {
          id: "t3-l4-whats-the-weather-like",
          title: "Ders 4 - What's the Weather like Today? (Hava Durumu)",
          words: [
            { en: "rainy", tr: "yağmurlu" },
            { en: "windy", tr: "rüzgarlı" },
            { en: "hot", tr: "sıcak" },
            { en: "cold", tr: "soğuk" },
            { en: "foggy", tr: "sisli" },
            { en: "sunny", tr: "güneşli" },
            { en: "snowy", tr: "karlı" },
            { en: "stormy", tr: "fırtınalı" },
            { en: "cloudy", tr: "bulutlu" },
            { en: "partly cloudy", tr: "parçalı bulutlu" }
          ]
        },
        {
          id: "t3-l5-what-month-is-it",
          title: "Ders 5 - What Month Is It? (Aylar ve Mevsimler)",
          words: [
            { en: "January", tr: "Ocak" },
            { en: "February", tr: "Şubat" },
            { en: "March", tr: "Mart" },
            { en: "April", tr: "Nisan" },
            { en: "May", tr: "Mayıs" },
            { en: "June", tr: "Haziran" },
            { en: "July", tr: "Temmuz" },
            { en: "August", tr: "Ağustos" },
            { en: "September", tr: "Eylül" },
            { en: "October", tr: "Ekim" },
            { en: "November", tr: "Kasım" },
            { en: "December", tr: "Aralık" },
            { en: "spring", tr: "ilkbahar" },
            { en: "summer", tr: "yaz" },
            { en: "autumn", tr: "sonbahar" },
            { en: "winter", tr: "kış" }
          ]
        },
        {
          id: "t3-l7-what-time-do-you",
          title: "Ders 7 - What Time Do You…? (Günlük Rutinler)",
          words: [
            { en: "after", tr: "sonra" },
            { en: "before", tr: "önce" },
            { en: "go to bed", tr: "yatmak" },
            { en: "wake up", tr: "uyanmak" },
            { en: "brush my teeth", tr: "dişlerimi fırçalamak" },
            { en: "go to school", tr: "okula gitmek" },
            { en: "do my homework", tr: "ödevimi yapmak" },
            { en: "at", tr: "-de/-da (saatte)" },
            { en: "early", tr: "erken" },
            { en: "late", tr: "geç" }
          ]
        },
        {
          id: "t3-l8-what-do-you-like-doing",
          title: "Ders 8 - What Do You Like Doing? (Hobiler, like + ing)",
          words: [
            { en: "skiing", tr: "kayak yapmak" },
            { en: "skydiving", tr: "paraşütle atlamak" },
            { en: "longboarding", tr: "uzun kaykay kaymak" },
            { en: "mountain biking", tr: "dağ bisikleti sürmek" },
            { en: "snowboarding", tr: "snowboard yapmak" },
            { en: "rock climbing", tr: "kaya tırmanışı" },
            { en: "scuba diving", tr: "tüplü dalış" },
            { en: "snorkelling", tr: "şnorkelle dalmak" },
            { en: "kayaking", tr: "kano yapmak" },
            { en: "surfing", tr: "sörf yapmak" },
            { en: "horse-riding", tr: "at binmek" },
            { en: "bungee jumping", tr: "bungee jumping (ip atlayışı)" }
          ]
        },
        {
          id: "t3-l9-how-often-do-you",
          title: "Ders 9 - How Often Do You…? (Sıklık Zarfları)",
          words: [
            { en: "always", tr: "her zaman" },
            { en: "never", tr: "asla" },
            { en: "often", tr: "sık sık" },
            { en: "sometimes", tr: "bazen" },
            { en: "clean my room", tr: "odamı temizlemek" },
            { en: "walk the dog", tr: "köpeği gezdirmek" },
            { en: "cut my hair", tr: "saçımı kestirmek" },
            { en: "buy a new phone", tr: "yeni telefon almak" },
            { en: "visit my grandma", tr: "büyükannemi ziyaret etmek" },
            { en: "visit the dentist", tr: "dişçiye gitmek" }
          ]
        },
        {
          id: "t3-l10-where-is-the",
          title: "Ders 10 - Where Is The…? (Şehirdeki Yerler ve Edatlar)",
          words: [
            { en: "shop", tr: "dükkan" },
            { en: "school", tr: "okul" },
            { en: "police station", tr: "karakol" },
            { en: "park", tr: "park (yeşil alan)" },
            { en: "train station", tr: "tren istasyonu" },
            { en: "bus stop", tr: "otobüs durağı" },
            { en: "shopping centre", tr: "alışveriş merkezi" },
            { en: "hotel", tr: "otel" },
            { en: "library", tr: "kütüphane" },
            { en: "hospital", tr: "hastane" },
            { en: "behind", tr: "arkasında" },
            { en: "opposite", tr: "karşısında" },
            { en: "near to", tr: "yakınında" },
            { en: "next to", tr: "yanında" },
            { en: "in front of", tr: "önünde" },
            { en: "between", tr: "arasında" },
            { en: "near", tr: "yakın" }
          ]
        },
        {
          id: "t3-l11-what-is-there",
          title: "Ders 11 - What Is There? (Otel Odası)",
          words: [
            { en: "wardrobe", tr: "gardırop" },
            { en: "bed", tr: "yatak" },
            { en: "lamp", tr: "lamba" },
            { en: "balcony", tr: "balkon" },
            { en: "desk", tr: "çalışma masası" },
            { en: "bath", tr: "küvet" },
            { en: "TV", tr: "televizyon" },
            { en: "window", tr: "pencere" },
            { en: "hairdryer", tr: "saç kurutma makinesi" },
            { en: "sink", tr: "lavabo" },
            { en: "mirror", tr: "ayna" }
          ]
        }
      ]
    },
    "twinkl-4": {
      label: "Level 4 (A1-A2) — Geçmiş Zaman",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t4-l1-favourite-subject",
          title: "Ders 1 - What's Your Favourite Subject? (Dersler ve Sıfatlar)",
          words: [
            { en: "science", tr: "fen bilimleri" },
            { en: "maths", tr: "matematik" },
            { en: "English", tr: "İngilizce" },
            { en: "history", tr: "tarih" },
            { en: "geography", tr: "coğrafya" },
            { en: "difficult", tr: "zor" },
            { en: "boring", tr: "sıkıcı" },
            { en: "fun", tr: "eğlenceli" },
            { en: "exciting", tr: "heyecan verici" },
            { en: "easy", tr: "kolay" },
            { en: "terrible", tr: "berbat" },
            { en: "good", tr: "iyi" },
            { en: "bad", tr: "kötü" }
          ]
        },
        {
          id: "t4-l2-what-did-you-do",
          title: "Ders 2 - What Did You Do Yesterday? (Geçmiş Zaman Fiilleri)",
          words: [
            { en: "bake", tr: "fırında pişirmek" },
            { en: "play", tr: "oynamak" },
            { en: "watch", tr: "izlemek" },
            { en: "call", tr: "aramak" },
            { en: "eat", tr: "yemek" },
            { en: "drink", tr: "içmek" },
            { en: "take", tr: "almak" },
            { en: "read", tr: "okumak" }
          ]
        },
        {
          id: "t4-l3-was-were",
          title: "Ders 3 - Was/Were (Doğum Günü Partisi)",
          words: [
            { en: "balloon", tr: "balon" },
            { en: "clown", tr: "palyaço" },
            { en: "gift", tr: "hediye" },
            { en: "music", tr: "müzik" },
            { en: "invite", tr: "davet etmek" },
            { en: "birthday cake", tr: "doğum günü pastası" },
            { en: "card", tr: "kart" },
            { en: "games", tr: "oyunlar" },
            { en: "ribbon", tr: "kurdele" },
            { en: "candle", tr: "mum" },
            { en: "gift bag", tr: "hediye çantası" }
          ]
        },
        {
          id: "t4-l4-where-did-you-go",
          title: "Ders 4 - Where Did You Go? (Düzensiz Fiiller, Yerler)",
          words: [
            { en: "theme park", tr: "lunapark" },
            { en: "museum", tr: "müze" },
            { en: "beach", tr: "plaj" },
            { en: "water park", tr: "su parkı" },
            { en: "zoo", tr: "hayvanat bahçesi" },
            { en: "science centre", tr: "bilim merkezi" },
            { en: "restaurant", tr: "restoran" },
            { en: "shopping centre", tr: "alışveriş merkezi" },
            { en: "ride", tr: "binmek" },
            { en: "go", tr: "gitmek" },
            { en: "see", tr: "görmek" },
            { en: "eat", tr: "yemek" },
            { en: "buy", tr: "satın almak" }
          ]
        },
        {
          id: "t4-l5-you-should-take-medicine",
          title: "Ders 5 - You Should Take Some Medicine! (Sağlık, should)",
          words: [
            { en: "toothache", tr: "diş ağrısı" },
            { en: "stomach ache", tr: "karın ağrısı" },
            { en: "headache", tr: "baş ağrısı" },
            { en: "fever", tr: "ateş" },
            { en: "sore throat", tr: "boğaz ağrısı" },
            { en: "medicine", tr: "ilaç" },
            { en: "vegetables", tr: "sebzeler" },
            { en: "dentist", tr: "diş hekimi" },
            { en: "rest", tr: "dinlenmek" }
          ]
        },
        {
          id: "t4-l7-a-an",
          title: "Ders 7 - A / An (Deniz Canlıları)",
          words: [
            { en: "starfish", tr: "deniz yıldızı" },
            { en: "squid", tr: "kalamar" },
            { en: "eel", tr: "yılan balığı" },
            { en: "otter", tr: "su samuru" },
            { en: "shark", tr: "köpekbalığı" },
            { en: "dolphin", tr: "yunus" },
            { en: "whale", tr: "balina" },
            { en: "fish", tr: "balık" },
            { en: "octopus", tr: "ahtapot" },
            { en: "turtle", tr: "kaplumbağa" },
            { en: "aquarium", tr: "akvaryum" },
            { en: "sea", tr: "deniz" }
          ]
        },
        {
          id: "t4-l8-how-much-how-many",
          title: "Ders 8 - How Much? How Many? (Malzemeler)",
          words: [
            { en: "sugar", tr: "şeker" },
            { en: "flour", tr: "un" },
            { en: "butter", tr: "tereyağı" },
            { en: "oil", tr: "yağ" },
            { en: "jam", tr: "reçel" },
            { en: "eggs", tr: "yumurtalar" },
            { en: "nuts", tr: "kuruyemişler" },
            { en: "bananas", tr: "muzlar" },
            { en: "carrots", tr: "havuçlar" },
            { en: "chocolate bars", tr: "çikolatalar" }
          ]
        },
        {
          id: "t4-l9-shes-a-doctor",
          title: "Ders 9 - She's a Doctor (Meslekler)",
          words: [
            { en: "scientist", tr: "bilim insanı" },
            { en: "delivery person", tr: "kurye" },
            { en: "cleaner", tr: "temizlik görevlisi" },
            { en: "doctor", tr: "doktor" },
            { en: "dentist", tr: "diş hekimi" },
            { en: "lawyer", tr: "avukat" },
            { en: "vet", tr: "veteriner" },
            { en: "firefighter", tr: "itfaiyeci" },
            { en: "police officer", tr: "polis memuru" },
            { en: "chef", tr: "aşçı" }
          ]
        },
        {
          id: "t4-l10-whose-is-this",
          title: "Ders 10 - Whose Is This? (İyelik, Kişisel Eşyalar)",
          words: [
            { en: "necklace", tr: "kolye" },
            { en: "watch", tr: "kol saati" },
            { en: "scooter", tr: "scooter (tekmeli araç)" },
            { en: "board game", tr: "kutu oyunu" },
            { en: "perfume", tr: "parfüm" },
            { en: "medicine", tr: "ilaç" },
            { en: "handbag", tr: "el çantası" },
            { en: "sunglasses", tr: "güneş gözlüğü" }
          ]
        },
        {
          id: "t4-l11-how-many-are-there",
          title: "Ders 11 - How Many Are There? (Sayılabilir İsimler)",
          words: [
            { en: "tigers", tr: "kaplanlar" },
            { en: "snakes", tr: "yılanlar" },
            { en: "giraffes", tr: "zürafalar" },
            { en: "umbrellas", tr: "şemsiyeler" },
            { en: "seagulls", tr: "martılar" },
            { en: "sandcastles", tr: "kumdan kaleler" },
            { en: "paintings", tr: "tablolar" },
            { en: "sculptures", tr: "heykeller" },
            { en: "flowers", tr: "çiçekler" },
            { en: "trees", tr: "ağaçlar" },
            { en: "fountain", tr: "çeşme" },
            { en: "roller coasters", tr: "hız trenleri" },
            { en: "tickets", tr: "biletler" },
            { en: "sharks", tr: "köpekbalıkları" },
            { en: "seahorses", tr: "deniz atları" },
            { en: "supermarkets", tr: "süpermarketler" },
            { en: "restaurants", tr: "restoranlar" },
            { en: "subway station", tr: "metro istasyonu" },
            { en: "trains", tr: "trenler" },
            { en: "maps", tr: "haritalar" },
            { en: "squid", tr: "kalamar" },
            { en: "park", tr: "park (yeşil alan)" }
          ]
        }
      ]
    },
    "twinkl-5": {
      label: "Level 5 (A1-A2) — Gelecek ve Karşılaştırma",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t5-l1-what-will-you-do",
          title: "Ders 1 - What Will You Do? (Gelecek Zaman, Uzay)",
          words: [
            { en: "space", tr: "uzay" },
            { en: "moon", tr: "ay" },
            { en: "rocket", tr: "roket" },
            { en: "flying car", tr: "uçan araba" },
            { en: "spacesuit", tr: "uzay giysisi" },
            { en: "VR headset", tr: "sanal gerçeklik gözlüğü" }
          ]
        },
        {
          id: "t5-l2-what-does-she-look-like",
          title: "Ders 2 - What Does She Look Like? (Görünüş)",
          words: [
            { en: "glasses", tr: "gözlük" },
            { en: "tall", tr: "uzun boylu" },
            { en: "short", tr: "kısa boylu" },
            { en: "freckles", tr: "çiller" },
            { en: "curly", tr: "kıvırcık" },
            { en: "straight", tr: "düz (saç)" },
            { en: "bald", tr: "kel" }
          ]
        },
        {
          id: "t5-l3-have-you-got",
          title: "Ders 3 - Have You Got...? (Alışveriş)",
          words: [
            { en: "suitcase", tr: "bavul" },
            { en: "sleeping bag", tr: "uyku tulumu" },
            { en: "map", tr: "harita" },
            { en: "cricket bat", tr: "kriket sopası" },
            { en: "tennis racket", tr: "tenis raketi" },
            { en: "rugby ball", tr: "ragbi topu" },
            { en: "guitars", tr: "gitarlar" },
            { en: "piano", tr: "piyano" },
            { en: "drumset", tr: "bateri" },
            { en: "flute", tr: "flüt" },
            { en: "paper", tr: "kağıt" },
            { en: "paint", tr: "boya" },
            { en: "paintbrushes", tr: "boya fırçaları" },
            { en: "glue", tr: "yapıştırıcı" }
          ]
        },
        {
          id: "t5-l4-getting-to-know-you",
          title: "Ders 4 - Getting to Know You (Kişisel Sorular)",
          words: [
            { en: "time", tr: "zaman" },
            { en: "sleep", tr: "uyku" },
            { en: "exercise", tr: "egzersiz" },
            { en: "water", tr: "su" },
            { en: "pets", tr: "evcil hayvanlar" },
            { en: "languages", tr: "diller" },
            { en: "siblings", tr: "kardeşler" }
          ]
        },
        {
          id: "t5-l5-what-do-you-want-to-be",
          title: "Ders 5 - What Do You Want to Be? (Hayaller, Meslekler)",
          words: [
            { en: "singer", tr: "şarkıcı" },
            { en: "dancer", tr: "dansçı" },
            { en: "actor", tr: "oyuncu" },
            { en: "lecturer", tr: "öğretim görevlisi" },
            { en: "diplomat", tr: "diplomat (elçi)" },
            { en: "president", tr: "cumhurbaşkanı" },
            { en: "artist", tr: "sanatçı" },
            { en: "athlete", tr: "sporcu" }
          ]
        },
        {
          id: "t5-l7-i-am-taller-than-you",
          title: "Ders 7 - I Am Taller than You (Karşılaştırma)",
          words: [
            { en: "superheroes", tr: "süper kahramanlar" },
            { en: "fast", tr: "hızlı" },
            { en: "slow", tr: "yavaş" },
            { en: "strong", tr: "güçlü" },
            { en: "weak", tr: "zayıf" },
            { en: "smart", tr: "akıllı" },
            { en: "brave", tr: "cesur" },
            { en: "baby", tr: "bebek" },
            { en: "child", tr: "çocuk" },
            { en: "teenager", tr: "ergen (genç)" },
            { en: "adult", tr: "yetişkin" },
            { en: "taller", tr: "daha uzun" },
            { en: "shorter", tr: "daha kısa" },
            { en: "older", tr: "daha büyük (yaşça)" },
            { en: "younger", tr: "daha genç" }
          ]
        },
        {
          id: "t5-l8-what-is-the-fastest-animal",
          title: "Ders 8 - What Is the Fastest Animal? (En Üstünlük)",
          words: [
            { en: "long", tr: "uzun" },
            { en: "cheetah", tr: "çita" },
            { en: "seal", tr: "fok" },
            { en: "spider", tr: "örümcek" },
            { en: "bear", tr: "ayı" },
            { en: "fox", tr: "tilki" },
            { en: "gorilla", tr: "goril" },
            { en: "owl", tr: "baykuş" },
            { en: "chicken", tr: "tavuk" },
            { en: "cow", tr: "inek" },
            { en: "mouse", tr: "fare" },
            { en: "fish", tr: "balık" },
            { en: "sloth", tr: "tembel hayvan" },
            { en: "tail", tr: "kuyruk" },
            { en: "fast", tr: "hızlı" },
            { en: "slow", tr: "yavaş" },
            { en: "strong", tr: "güçlü" },
            { en: "weak", tr: "zayıf" },
            { en: "short", tr: "kısa" }
          ]
        },
        {
          id: "t5-l9-what-are-you-going-to-do",
          title: "Ders 9 - What Are You Going to Do? (Tatil Planları)",
          words: [
            { en: "hotel", tr: "otel" },
            { en: "hammock", tr: "hamak" },
            { en: "barbecue", tr: "barbekü" },
            { en: "friends", tr: "arkadaşlar" },
            { en: "shopping", tr: "alışveriş" },
            { en: "food", tr: "yemek" },
            { en: "pack", tr: "bavul hazırlamak" },
            { en: "stay", tr: "kalmak" },
            { en: "relax", tr: "dinlenmek" },
            { en: "make", tr: "yapmak" },
            { en: "try", tr: "denemek" },
            { en: "suitcase", tr: "bavul" },
            { en: "have", tr: "sahip olmak" },
            { en: "go", tr: "gitmek" }
          ]
        },
        {
          id: "t5-l10-can-i-have",
          title: "Ders 10 - Can I Have…? (Dünya Mutfağı)",
          words: [
            { en: "tacos", tr: "takolar" },
            { en: "curry", tr: "köri" },
            { en: "ramen", tr: "ramen" },
            { en: "kimchi", tr: "kimçi" },
            { en: "pho", tr: "pho (Vietnam çorbası)" },
            { en: "pasta", tr: "makarna" },
            { en: "paella", tr: "paella" },
            { en: "kebabs", tr: "kebaplar" },
            { en: "escargots", tr: "salyangoz" },
            { en: "jollof", tr: "jollof pilavı" }
          ]
        },
        {
          id: "t5-l11-parts-of-speech",
          title: "Ders 11 - Parts of Speech (Sözcük Türleri)",
          words: [
            { en: "book", tr: "kitap" },
            { en: "mobile phone", tr: "cep telefonu" },
            { en: "shoes", tr: "ayakkabılar" },
            { en: "flower", tr: "çiçek" },
            { en: "beautiful", tr: "güzel" },
            { en: "colourful", tr: "renkli" },
            { en: "new", tr: "yeni" },
            { en: "awesome", tr: "harika" },
            { en: "funny", tr: "komik" },
            { en: "cool", tr: "havalı" },
            { en: "excitedly", tr: "heyecanla" },
            { en: "quickly", tr: "hızlıca" },
            { en: "gracefully", tr: "zarifçe" },
            { en: "quietly", tr: "sessizce" },
            { en: "neatly", tr: "düzgünce" },
            { en: "skilfully", tr: "ustaca" },
            { en: "joyfully", tr: "neşeyle" },
            { en: "South Korea", tr: "Güney Kore" },
            { en: "Space X", tr: "Space X (uzay şirketi)" }
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
