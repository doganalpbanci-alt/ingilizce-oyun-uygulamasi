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
    },

    "twinkl-6": {
      label: "Level 6 (A2) — Geçmiş Yetenek ve Edatlar",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t6-l1-how-do-you-feel",
          title: "Ders 1 - How Do You Feel? (Pekiştiriciler)",
          words: [
            { en: "very", tr: "çok" },
            { en: "really", tr: "gerçekten" },
            { en: "quite", tr: "oldukça" },
            { en: "extremely", tr: "son derece" }
          ]
        },
        {
          id: "t6-l2-making-requests",
          title: "Ders 2 - Making Requests (Otelde Rica Etme)",
          words: [
            { en: "towels", tr: "havlular" },
            { en: "Wi-Fi password", tr: "Wi-Fi şifresi" },
            { en: "volleyball", tr: "voleybol" },
            { en: "watermelon", tr: "karpuz" },
            { en: "fan", tr: "vantilatör" },
            { en: "boat", tr: "tekne" },
            { en: "room service", tr: "oda servisi" },
            { en: "blanket", tr: "battaniye" }
          ]
        },
        {
          id: "t6-l3-could-and-couldnt",
          title: "Ders 3 - Could and Couldn't (Geçmişteki Yetenek)",
          words: [
            { en: "catch", tr: "yakalamak" },
            { en: "fix", tr: "tamir etmek" },
            { en: "carry", tr: "taşımak" },
            { en: "climb", tr: "tırmanmak" },
            { en: "smell", tr: "koklamak" },
            { en: "understand", tr: "anlamak" },
            { en: "ball", tr: "top" },
            { en: "fish", tr: "balık" },
            { en: "bed", tr: "yatak" },
            { en: "table", tr: "masa" },
            { en: "language", tr: "dil (lisan)" },
            { en: "bag", tr: "çanta" },
            { en: "rock", tr: "kaya" },
            { en: "mountain", tr: "dağ" },
            { en: "tree", tr: "ağaç" },
            { en: "laptop", tr: "dizüstü bilgisayar" },
            { en: "bicycle", tr: "bisiklet" },
            { en: "bread", tr: "ekmek" },
            { en: "flowers", tr: "çiçekler" }
          ]
        },
        {
          id: "t6-l4-have-you-been-to-paris",
          title: "Ders 4 - Have You Been to Paris? (Yaşanmışlıklar)",
          words: [
            { en: "Europe", tr: "Avrupa" },
            { en: "Paris", tr: "Paris" },
            { en: "London", tr: "Londra" },
            { en: "village", tr: "köy" },
            { en: "countryside", tr: "kırsal kesim" },
            { en: "fantastic", tr: "harika" },
            { en: "waterfall", tr: "şelale" }
          ]
        },
        {
          id: "t6-l5-i-have-been-living-here",
          title: "Ders 5 - I Have Been Living Here for Three Years (Süre)",
          words: [
            { en: "castle", tr: "kale" },
            { en: "huge", tr: "kocaman" },
            { en: "adventure", tr: "macera" },
            { en: "journalist", tr: "gazeteci" }
          ]
        },
        {
          id: "t6-l7-the-bee-flew-to-the-flowers",
          title: "Ders 7 - The Bee Flew to the Flowers (Yer Edatları)",
          words: [
            { en: "duck", tr: "ördek" },
            { en: "bee", tr: "arı" },
            { en: "cow", tr: "inek" },
            { en: "horse", tr: "at" },
            { en: "frog", tr: "kurbağa" },
            { en: "mouse", tr: "fare" }
          ]
        },
        {
          id: "t6-l8-prepositions-of-time",
          title: "Ders 8 - Prepositions of Time (Zaman Edatları)",
          words: [
            { en: "morning", tr: "sabah" },
            { en: "night", tr: "gece" },
            { en: "summer", tr: "yaz" },
            { en: "weekend", tr: "hafta sonu" },
            { en: "birthday", tr: "doğum günü" }
          ]
        },
        {
          id: "t6-l9-adverbs-order",
          title: "Ders 9 - Adverbs Order (Zarf Sıralaması)",
          words: [
            { en: "photographer", tr: "fotoğrafçı" },
            { en: "picture", tr: "fotoğraf" },
            { en: "tripod", tr: "tripod" },
            { en: "city", tr: "şehir" },
            { en: "stairs", tr: "merdiven" },
            { en: "street", tr: "sokak" },
            { en: "website", tr: "web sitesi" }
          ]
        },
        {
          id: "t6-l10-which-milkshake-did-you-order",
          title: "Ders 10 - Which Milkshake Did You Order? (Geçmiş Zaman Soruları)",
          words: [
            { en: "pancakes", tr: "krep" },
            { en: "meatballs", tr: "köfte" },
            { en: "sausages", tr: "sosis" },
            { en: "pie", tr: "turta" },
            { en: "mango", tr: "mango" },
            { en: "milkshake", tr: "milkshake" }
          ]
        },
        {
          id: "t6-l11-zero-conditional",
          title: "Ders 11 - Zero Conditional (Sıfır Koşul Cümlesi)",
          words: [
            { en: "prize", tr: "ödül" },
            { en: "gym", tr: "spor salonu" },
            { en: "goal", tr: "gol" },
            { en: "cry", tr: "ağlamak" },
            { en: "team", tr: "takım" },
            { en: "tired", tr: "yorgun" }
          ]
        }
      ]
    },

    "twinkl-7": {
      label: "Level 7 (A2) — Koşul, Öneri ve Bağlaçlar",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t7-l1-a-day-in-the-life-of-sally",
          title: "Ders 1 - A Day in the Life of Sally (Öbek Fiiller)",
          words: [
            { en: "volleyball", tr: "voleybol" },
            { en: "assistant", tr: "asistan" },
            { en: "make-up", tr: "makyaj" },
            { en: "photographer", tr: "fotoğrafçı" },
            { en: "jeans", tr: "kot pantolon" },
            { en: "flat", tr: "daire (ev)" },
            { en: "anxious", tr: "endişeli" },
            { en: "model", tr: "manken" },
            { en: "career", tr: "kariyer" },
            { en: "evening", tr: "akşam" }
          ]
        },
        {
          id: "t7-l2-first-conditional",
          title: "Ders 2 - First Conditional (Birinci Koşul, Güvenlik)",
          words: [
            { en: "burglars", tr: "hırsızlar" },
            { en: "smoke detector", tr: "duman dedektörü" },
            { en: "seatbelt", tr: "emniyet kemeri" },
            { en: "speed limit", tr: "hız sınırı" },
            { en: "emergency", tr: "acil durum" },
            { en: "fire drills", tr: "yangın tatbikatları" }
          ]
        },
        {
          id: "t7-l3-giving-opinions",
          title: "Ders 3 - Giving Opinions (Film ve Kitap Yorumu)",
          words: [
            { en: "plot", tr: "olay örgüsü" },
            { en: "characters", tr: "karakterler" },
            { en: "visuals", tr: "görseller" },
            { en: "CGI", tr: "bilgisayar efektleri" },
            { en: "acting", tr: "oyunculuk" },
            { en: "costumes", tr: "kostümler" },
            { en: "story", tr: "hikâye" }
          ]
        },
        {
          id: "t7-l4-making-suggestions",
          title: "Ders 4 - Making Suggestions (Öneride Bulunma)",
          words: [
            { en: "itinerary", tr: "gezi programı" },
            { en: "sightseeing", tr: "gezip görme" },
            { en: "exchange rate", tr: "döviz kuru" },
            { en: "reservations", tr: "rezervasyonlar" },
            { en: "attractions", tr: "gezilecek yerler" },
            { en: "souvenirs", tr: "hediyelik eşyalar" }
          ]
        },
        {
          id: "t7-l5-busy-mondays-at-school",
          title: "Ders 5 - Busy Mondays at School (Edat + Sıfat)",
          words: [
            { en: "chemistry", tr: "kimya" },
            { en: "school", tr: "okul" },
            { en: "maths", tr: "matematik" },
            { en: "revise", tr: "tekrar etmek" },
            { en: "assignment", tr: "ödev" },
            { en: "rugby", tr: "ragbi" },
            { en: "classmates", tr: "sınıf arkadaşları" },
            { en: "textbook", tr: "ders kitabı" }
          ]
        },
        {
          id: "t7-l7-you-dont-have-to-bring-a-blanket",
          title: "Ders 7 - You Don't Have to Bring a Blanket (Zorunluluk)",
          words: [
            { en: "flashlight", tr: "el feneri" },
            { en: "tent", tr: "çadır" },
            { en: "sleeping bag", tr: "uyku tulumu" },
            { en: "water bottle", tr: "su şişesi" },
            { en: "boots", tr: "botlar" },
            { en: "the environment", tr: "çevre (doğa)" }
          ]
        },
        {
          id: "t7-l8-negative-future-tense",
          title: "Ders 8 - Negative Future Tense (Olumsuz Gelecek Zaman)",
          words: [
            { en: "engineer", tr: "mühendis" },
            { en: "nest", tr: "kuş yuvası" },
            { en: "pilot", tr: "pilot" },
            { en: "alone", tr: "yalnız" },
            { en: "honey", tr: "bal" },
            { en: "surprise", tr: "sürpriz" },
            { en: "competition", tr: "yarışma" },
            { en: "channel", tr: "kanal" },
            { en: "remote control", tr: "kumanda" },
            { en: "television", tr: "televizyon" },
            { en: "love", tr: "sevgi" },
            { en: "anger", tr: "öfke" },
            { en: "race", tr: "yarış" },
            { en: "finish", tr: "bitirmek" },
            { en: "stand", tr: "ayakta durmak" }
          ]
        },
        {
          id: "t7-l9-prepositional-phrase-island",
          title: "Ders 9 - Prepositional Phrase Island (Edat Öbekleri)",
          words: [
            { en: "rainbow", tr: "gökkuşağı" },
            { en: "skyscraper", tr: "gökdelen" },
            { en: "gold", tr: "altın" },
            { en: "warm", tr: "ılık" },
            { en: "soft", tr: "yumuşak" },
            { en: "airport", tr: "havalimanı" },
            { en: "umbrella", tr: "şemsiye" },
            { en: "key", tr: "anahtar" },
            { en: "caves", tr: "mağaralar" },
            { en: "castles", tr: "kaleler" }
          ]
        },
        {
          id: "t7-l10-sentence-connectors",
          title: "Ders 10 - Sentence Connectors (Bağlaçlar, İklim)",
          words: [
            { en: "climate change", tr: "iklim değişikliği" },
            { en: "greenhouse gases", tr: "sera gazları" },
            { en: "carbon footprint", tr: "karbon ayak izi" },
            { en: "renewable energy", tr: "yenilenebilir enerji" },
            { en: "deforestation", tr: "ormansızlaşma" },
            { en: "ecovillage", tr: "ekoköy" }
          ]
        },
        {
          id: "t7-l11-storytelling",
          title: "Ders 11 - Storytelling (Hikâye Anlatımı)",
          words: [
            { en: "character", tr: "karakter" },
            { en: "plot", tr: "olay örgüsü" },
            { en: "setting", tr: "hikâyenin geçtiği yer" },
            { en: "vampire", tr: "vampir" },
            { en: "dragon", tr: "ejderha" },
            { en: "fairy", tr: "peri" },
            { en: "witch", tr: "cadı" },
            { en: "king", tr: "kral" },
            { en: "queen", tr: "kraliçe" },
            { en: "ghost", tr: "hayalet" }
          ]
        }
      ]
    },

    "twinkl-8": {
      label: "Level 8 (B1) — Karşılaştırma ve Varsayım",
      group: TWINKL_GROUP,
      units: [
        {
          id: "t8-l1-comparisons-with-creatures",
          title: "Ders 1 - Comparisons with Creatures (Karşılaştırma)",
          words: [
            { en: "mighty", tr: "kudretli" },
            { en: "wise", tr: "bilge" },
            { en: "impressive", tr: "etkileyici" },
            { en: "frightening", tr: "korkutucu" },
            { en: "griffin", tr: "grifon (efsanevi yaratık)" },
            { en: "kraken", tr: "kraken (efsanevi deniz canavarı)" }
          ]
        },
        {
          id: "t8-l2-whats-it-like-outside",
          title: "Ders 2 - What's It Like Outside? (Hava Durumu, Olasılık)",
          words: [
            { en: "hail", tr: "dolu" },
            { en: "sleet", tr: "sulu kar" },
            { en: "freezing", tr: "dondurucu" },
            { en: "frost", tr: "kırağı" },
            { en: "misty", tr: "sisli" },
            { en: "thunderstorms", tr: "gök gürültülü fırtınalar" },
            { en: "chilly", tr: "serin" },
            { en: "humid", tr: "nemli" }
          ]
        },
        {
          id: "t8-l3-video-games-or-board-games",
          title: "Ders 3 - Video Games or Board Games? (Katılma ve Karşı Çıkma)",
          words: [
            { en: "console", tr: "oyun konsolu" },
            { en: "virtual", tr: "sanal" },
            { en: "multiplayer", tr: "çok oyunculu" },
            { en: "simulator", tr: "simülatör" },
            { en: "graphics", tr: "grafikler" },
            { en: "strategies", tr: "stratejiler" }
          ]
        },
        {
          id: "t8-l4-what-are-you-doing-this-weekend",
          title: "Ders 4 - What Are You Doing This Weekend? (Gelecekte Sürekli)",
          words: [
            { en: "move house", tr: "taşınmak" },
            { en: "stay in", tr: "evde kalmak" },
            { en: "go to a yoga class", tr: "yoga dersine gitmek" },
            { en: "take a road trip", tr: "arabayla geziye çıkmak" },
            { en: "watch a sports match", tr: "spor maçı izlemek" },
            { en: "visit a museum", tr: "müze gezmek" },
            { en: "knit", tr: "örgü örmek" }
          ]
        },
        {
          id: "t8-l5-putting-it-all-together",
          title: "Ders 5 - Putting It All Together (put Öbek Fiilleri)",
          words: [
            { en: "chores", tr: "ev işleri" },
            { en: "schedule", tr: "çizelge" },
            { en: "messy", tr: "dağınık" },
            { en: "shelves", tr: "raflar" },
            { en: "wipe down", tr: "silip temizlemek" },
            { en: "dustbin", tr: "çöp kovası" },
            { en: "take out the rubbish", tr: "çöpü dışarı çıkarmak" }
          ]
        },
        {
          id: "t8-l7-what-am-i-doing-today",
          title: "Ders 7 - What Am I Doing Today? (should have / might have)",
          words: [
            { en: "bustling", tr: "hareketli (kalabalık ve canlı)" },
            { en: "organised", tr: "düzenli" },
            { en: "cosy", tr: "sıcak ve rahat" },
            { en: "cluttered", tr: "eşya dolu" },
            { en: "peaceful", tr: "huzurlu" },
            { en: "adventurous", tr: "maceracı" }
          ]
        },
        {
          id: "t8-l8-hypotheticals",
          title: "Ders 8 - Hypotheticals (2. ve 3. Koşul, Teknoloji)",
          words: [
            { en: "influencer", tr: "sosyal medya fenomeni" },
            { en: "gamer", tr: "oyuncu (video oyunu)" },
            { en: "video drone", tr: "kameralı drone" },
            { en: "electric scooter", tr: "elektrikli scooter" },
            { en: "wireless headphones", tr: "kablosuz kulaklık" },
            { en: "smartwatch", tr: "akıllı saat" },
            { en: "artificial intelligence (AI)", tr: "yapay zekâ" }
          ]
        },
        {
          id: "t8-l9-a-letter-to-a-pen-pal",
          title: "Ders 9 - A Letter to a Pen Pal (Mektup Yazma)",
          words: [
            { en: "pen pal", tr: "mektup arkadaşı" },
            { en: "letter", tr: "mektup" },
            { en: "envelope", tr: "zarf" },
            { en: "mailbox", tr: "posta kutusu" },
            { en: "address", tr: "adres" },
            { en: "reply", tr: "cevap" },
            { en: "continent", tr: "kıta" },
            { en: "time zones", tr: "saat dilimleri" },
            { en: "stamp", tr: "pul" }
          ]
        },
        {
          id: "t8-l10-seriously-fun-rides",
          title: "Ders 10 - Seriously Fun Rides (Pekiştiriciler, Lunapark)",
          words: [
            { en: "theme park", tr: "lunapark" },
            { en: "roller coaster", tr: "hız treni" },
            { en: "merry-go-round", tr: "atlıkarınca" },
            { en: "water slide", tr: "su kaydırağı" },
            { en: "bumper cars", tr: "çarpışan arabalar" },
            { en: "Ferris wheel", tr: "dönme dolap" }
          ]
        },
        {
          id: "t8-l11-looking-around-london",
          title: "Ders 11 - Looking around London (look Öbek Fiilleri)",
          words: [
            { en: "clue", tr: "ipucu" },
            { en: "suspect", tr: "şüpheli" },
            { en: "investigator", tr: "araştırmacı" },
            { en: "fingerprint", tr: "parmak izi" }
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
          words: [
            { en: "invention", tr: "icat" },
            { en: "communicate", tr: "iletişim kurmak" },
            { en: "period", tr: "dönem" },
            { en: "server", tr: "sunucu (bilgisayar)" },
            { en: "the cloud", tr: "bulut (veri depolama)" },
            { en: "search engine", tr: "arama motoru" },
            { en: "entertainment", tr: "eğlence" },
            { en: "connected", tr: "bağlı" },
            { en: "dust", tr: "toz" }
          ]
        },
        {
          id: "t9-l2-lets-help-ourselves-relax",
          title: "Ders 2 - Let's Help Ourselves Relax (Dönüşlü Zamirler)",
          words: [
            { en: "mood", tr: "ruh hâli" },
            { en: "stress", tr: "stres" },
            { en: "support network", tr: "destek çevresi" },
            { en: "balance", tr: "denge" },
            { en: "mental health", tr: "ruh sağlığı" },
            { en: "relaxation technique", tr: "rahatlama tekniği" }
          ]
        },
        {
          id: "t9-l3-he-said-you-should-visit-the-island",
          title: "Ders 3 - He Said You Should Visit the Island (Aktarma Cümleleri)",
          words: [
            { en: "port", tr: "liman" },
            { en: "abroad", tr: "yurt dışı" },
            { en: "ferry", tr: "feribot" },
            { en: "coasts", tr: "kıyılar" },
            { en: "tours", tr: "turlar" },
            { en: "deck", tr: "güverte" },
            { en: "rainforest", tr: "yağmur ormanı" },
            { en: "lifejackets", tr: "can yelekleri" }
          ]
        },
        {
          id: "t9-l4-sign-up-for-an-online-course",
          title: "Ders 4 - Sign Up for an Online Course (Teknoloji Öbek Fiilleri)",
          words: [
            { en: "sign up", tr: "kaydolmak" },
            { en: "log in", tr: "oturum açmak" },
            { en: "log out", tr: "oturumu kapatmak" },
            { en: "click on", tr: "tıklamak" },
            { en: "set up", tr: "kurmak" },
            { en: "plug in", tr: "fişe takmak" },
            { en: "scroll down", tr: "aşağı kaydırmak" },
            { en: "app", tr: "uygulama" },
            { en: "email address", tr: "e-posta adresi" },
            { en: "password", tr: "şifre" }
          ]
        },
        {
          id: "t9-l5-ancient-mysteries",
          title: "Ders 5 - Ancient Mysteries (Geçmişe Yönelik Tahmin)",
          words: [
            { en: "civilisation", tr: "uygarlık" },
            { en: "myth", tr: "efsane" },
            { en: "fact", tr: "olgu (gerçek bilgi)" },
            { en: "research", tr: "araştırma" },
            { en: "documented", tr: "belgelenmiş" },
            { en: "mystery", tr: "gizem" },
            { en: "ancient", tr: "antik" },
            { en: "evidence", tr: "kanıt" },
            { en: "social studies", tr: "sosyal bilgiler" }
          ]
        },
        {
          id: "t9-l7-the-end-of-school-celebration",
          title: "Ders 7 - The End of School Celebration (Koşullu Teklif)",
          words: [
            { en: "flyer", tr: "el ilanı" },
            { en: "plan", tr: "plan" },
            { en: "celebration", tr: "kutlama" },
            { en: "refreshments", tr: "ikramlıklar" },
            { en: "speech", tr: "konuşma (hitap)" },
            { en: "guests", tr: "konuklar" },
            { en: "fairy lights", tr: "süs ışıkları" }
          ]
        },
        {
          id: "t9-l8-stick-with-it",
          title: "Ders 8 - Stick With It (Spor Öbek Fiilleri)",
          words: [
            { en: "warm up", tr: "ısınmak" },
            { en: "cool down", tr: "soğuma hareketi yapmak" },
            { en: "work out", tr: "spor yapmak" },
            { en: "keep up", tr: "ayak uydurmak" },
            { en: "get into", tr: "merak sarmak" },
            { en: "build up", tr: "kademeli olarak artırmak" },
            { en: "stick with", tr: "bırakmamak" },
            { en: "workout", tr: "antrenman" },
            { en: "routine", tr: "rutin" }
          ]
        },
        {
          id: "t9-l9-has-the-festival-started-already",
          title: "Ders 9 - Has the Festival Started Already? (yet, still, just, already)",
          words: [
            { en: "festival", tr: "festival" },
            { en: "annual", tr: "yıllık" },
            { en: "postpone", tr: "ertelemek" },
            { en: "venue", tr: "etkinlik mekânı" },
            { en: "programme", tr: "program (akış)" },
            { en: "genre", tr: "tür (sanatta)" },
            { en: "sci-fi", tr: "bilim kurgu" },
            { en: "documentary", tr: "belgesel" }
          ]
        },
        {
          id: "t9-l10-behind-the-scenes",
          title: "Ders 10 - Behind the Scenes (Ön Ekler)",
          words: [
            { en: "episode", tr: "bölüm (dizi)" },
            { en: "presenter", tr: "program sunucusu" },
            { en: "producer", tr: "yapımcı" },
            { en: "competitor", tr: "yarışmacı" }
          ]
        },
        {
          id: "t9-l11-lost-treasure",
          title: "Ders 11 - Lost Treasure (Soru Ekleri)",
          words: [
            { en: "gold", tr: "altın" },
            { en: "pirate", tr: "korsan" },
            { en: "treasure", tr: "hazine" },
            { en: "crew", tr: "mürettebat" },
            { en: "treasure chest", tr: "hazine sandığı" },
            { en: "pirate ship", tr: "korsan gemisi" },
            { en: "captain", tr: "kaptan" }
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
          words: [
            { en: "vinegar", tr: "sirke" },
            { en: "sour", tr: "ekşi" },
            { en: "seaweed", tr: "deniz yosunu" },
            { en: "sushi mat", tr: "suşi hasırı" },
            { en: "spread", tr: "sürmek (yaymak)" },
            { en: "sticky", tr: "yapışkan" },
            { en: "salmon", tr: "somon" },
            { en: "avocado", tr: "avokado" },
            { en: "cucumber", tr: "salatalık" }
          ]
        },
        {
          id: "t10-l2-what-were-people-doing-in-1986",
          title: "Ders 2 - What Were People Doing in 1986? (Geçmişte Sürekli)",
          words: [
            { en: "time capsule", tr: "zaman kapsülü" },
            { en: "dig", tr: "kazmak" },
            { en: "bury", tr: "gömmek" },
            { en: "stick", tr: "yapıştırmak" },
            { en: "locket", tr: "madalyon" },
            { en: "cassette tape", tr: "kaset" },
            { en: "stuff", tr: "eşya" }
          ]
        },
        {
          id: "t10-l3-all-on-board-to-the-isle-of-lewis",
          title: "Ders 3 - All On Board to the Isle of Lewis (Yolculuk Edatları)",
          words: [
            { en: "backseat", tr: "arka koltuk" },
            { en: "seasick", tr: "deniz tutmuş" },
            { en: "on board", tr: "gemide" },
            { en: "departure", tr: "kalkış" }
          ]
        },
        {
          id: "t10-l4-finding-the-cafe-in-twinklton",
          title: "Ders 4 - Finding the Cafe in Twinklton (Yer Zarfları)",
          words: [
            { en: "roundabout", tr: "göbekli kavşak" },
            { en: "corner", tr: "köşe" },
            { en: "crossing", tr: "yaya geçidi" },
            { en: "bridge", tr: "köprü" },
            { en: "food truck", tr: "yemek arabası" },
            { en: "street", tr: "cadde" },
            { en: "metro", tr: "metro" }
          ]
        },
        {
          id: "t10-l5-remember-to-order",
          title: "Ders 5 - Remember to Order (Mastar ve -ing Farkı)",
          words: [
            { en: "tape", tr: "bant" },
            { en: "files", tr: "dosyalar" },
            { en: "sticky notes", tr: "yapışkan notlar" },
            { en: "shelf", tr: "raf" },
            { en: "stickers", tr: "çıkartmalar" },
            { en: "backpack", tr: "sırt çantası" }
          ]
        },
        {
          id: "t10-l7-when-books-are-made-into-movies",
          title: "Ders 7 - When Books Are Made Into Movies (Edilgen Çatı)",
          words: [
            { en: "adapt", tr: "uyarlamak" },
            { en: "release", tr: "piyasaya sürmek" },
            { en: "author", tr: "yazar" },
            { en: "bestseller", tr: "çok satan kitap" },
            { en: "publish", tr: "yayımlamak" }
          ]
        },
        {
          id: "t10-l8-they-told-us-to-be-calm",
          title: "Ders 8 - They Told Us to Be Calm (Aktarma, Güvenlik)",
          words: [
            { en: "safety", tr: "güvenlik" },
            { en: "calm", tr: "sakin" },
            { en: "remind", tr: "hatırlatmak" },
            { en: "warn", tr: "uyarmak" },
            { en: "lift", tr: "asansör" },
            { en: "exit", tr: "çıkış" }
          ]
        },
        {
          id: "t10-l9-i-used-to-love-pottery",
          title: "Ders 9 - I Used to Love Pottery (used to)",
          words: [
            { en: "art gallery", tr: "sanat galerisi" },
            { en: "debate club", tr: "münazara kulübü" },
            { en: "member", tr: "üye" },
            { en: "pottery", tr: "çömlekçilik" },
            { en: "clay", tr: "kil" },
            { en: "sculpture", tr: "heykel" },
            { en: "artistic", tr: "sanatsal" }
          ]
        },
        {
          id: "t10-l10-where-had-you-been-before",
          title: "Ders 10 - Where Had You Been Before? (Geçmişin Geçmişi)",
          words: [
            { en: "farmers' market", tr: "semt pazarı" },
            { en: "monument", tr: "anıt" },
            { en: "time machine", tr: "zaman makinesi" },
            { en: "programme", tr: "program (akış)" },
            { en: "device", tr: "cihaz" },
            { en: "marathon", tr: "maraton" }
          ]
        },
        {
          id: "t10-l11-a-trip-to-the-moon",
          title: "Ders 11 - A Trip to the Moon (Birleşik İsimler)",
          words: [
            { en: "astronaut", tr: "astronot" },
            { en: "planet", tr: "gezegen" },
            { en: "Earth", tr: "Dünya (gezegen)" },
            { en: "return", tr: "geri dönmek" },
            { en: "spaceship", tr: "uzay gemisi" },
            { en: "solar system", tr: "güneş sistemi" },
            { en: "outer space", tr: "uzay boşluğu" },
            { en: "space station", tr: "uzay istasyonu" },
            { en: "space exploration", tr: "uzay araştırmaları" }
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
