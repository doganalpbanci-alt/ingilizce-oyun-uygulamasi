/*
 * Twinkl ESL Curriculum — gramer maddeleri (Gramer Kulesi oyunu için).
 *
 * `data/grammar.js`'ten SONRA yüklenir; aynı `GRAMMAR` objesine
 * `twinkl-<seviye>` anahtarlarıyla eklenir. Ders `id`/`title` değerleri
 * `data/twinkl.js` ile BİREBİR aynıdır (bu dosya o dosyadan üretildi).
 * Her dersin `topic`'i Twinkl'ın "Topic & Key Sentences" sütunundaki hedef
 * yapıdır; maddeler o yapıyı dersin kelimeleriyle sorar.
 *
 * Biçim için bkz. data/grammar.js (doğru cevap her zaman 2. eleman,
 * çeldiriciler dilbilgisel olarak yanlış olmalı).
 *
 * ⚠️ TASLAK (2026-11-18): Maddeler ve Türkçe kurallar bu proje için
 * yazıldı, öğretmen onayından geçmedi.
 */
(function () {
  if (typeof GRAMMAR === "undefined") return;
  var TWINKL_GROUP = "Twinkl ESL (Özel Ders)";

  GRAMMAR["twinkl-1"] = {
    label: "Level 1 (A1) — Başlangıç",
    group: TWINKL_GROUP,
    units: [
      {
        id: "t1-l1-say-hello",
        title: "Ders 1 - Say Hello (Selamlaşma ve Duygular)",
        topic: "to be: am / is / are",
        rule: "I → am · he / she / it → is · you / we / they → are.",
        items: [
          ["I ___ happy.", "am", "is", "are"],
          ["How ___ you?", "are", "is", "am"],
          ["She ___ tired.", "is", "am", "are"],
          ["My name ___ Ali.", "is", "am", "are"]
        ]
      },
      {
        id: "t1-l2-how-old-are-you",
        title: "Ders 2 - How Old Are You? (Sayılar 1-20)",
        topic: "How old...? + to be",
        rule: "Yaş: I am eight (years old). Soru: How old are you? / How old is he?",
        items: [
          ["How old ___ you?", "are", "is", "am"],
          ["I ___ eight years old.", "am", "is", "are"],
          ["How old ___ your brother?", "is", "are", "am"],
          ["He is ten years ___.", "old", "olds", "age"]
        ]
      },
      {
        id: "t1-l3-where-are-you-from",
        title: "Ders 3 - Where Are You From? (Ülkeler)",
        topic: "be from",
        rule: "Nereli: I am from Türkiye. Soru: Where are you from? / Where is she from?",
        items: [
          ["I am ___ Türkiye.", "from", "at", "of"],
          ["Where ___ you from?", "are", "is", "am"],
          ["Where is she ___?", "from", "of", "in"],
          ["They ___ from Japan.", "are", "is", "am"]
        ]
      },
      {
        id: "t1-l4-what-is-it",
        title: "Ders 4 - What Is It? (Sınıf Eşyaları)",
        topic: "It is a / an",
        rule: "Sessiz harfle başlayan kelimeden önce a (a pencil), sesli harfle başlayandan önce an (an eraser).",
        items: [
          ["It is ___ pencil.", "a", "an", "two"],
          ["It is ___ eraser.", "an", "a", "two"],
          ["What ___ it?", "is", "are", "am"],
          ["It's ___ ruler.", "a", "an", "two"]
        ]
      },
      {
        id: "t1-l5-what-are-they",
        title: "Ders 5 - What Are They? (Meyve ve Sebzeler, Çoğul)",
        topic: "Çoğul: They are + -s",
        rule: "Birden fazla: They are apples. Çoğul eki -s, bazı kelimelerde -es (tomatoes).",
        items: [
          ["They are ___.", "apples", "apple", "an apple"],
          ["What ___ they?", "are", "is", "am"],
          ["They are ___.", "tomatoes", "tomatos", "tomato"],
          ["It is a banana. They are ___.", "bananas", "banana", "a bananas"]
        ]
      },
      {
        id: "t1-l7-who-is-this",
        title: "Ders 7 - Who Is This? (Aile ve Arkadaşlar)",
        topic: "Who is this? my / his / her",
        rule: "Erkek için his / he, kadın için her / she. Benim: my.",
        items: [
          ["Who ___ this?", "is", "are", "am"],
          ["This is ___ mother.", "my", "I", "me"],
          ["This is my brother. ___ name is Can.", "His", "Her", "He"],
          ["This is my sister. ___ is nine.", "She", "He", "Her"]
        ]
      },
      {
        id: "t1-l8-what-colour-is-it",
        title: "Ders 8 - What Colour Is It? (Renkler)",
        topic: "What colour is it / are they?",
        rule: "Tekil: What colour is it? — It is blue. Çoğul: What colour are they?",
        items: [
          ["What colour ___ it?", "is", "are", "am"],
          ["It ___ blue.", "is", "are", "am"],
          ["What colour ___ the apples?", "are", "is", "am"],
          ["The car is ___.", "red", "a red", "reds"]
        ]
      },
      {
        id: "t1-l9-favourite-animal",
        title: "Ders 9 - What's Your Favourite Animal? (Hayvanlar)",
        topic: "My favourite ... is",
        rule: "Sahiplik: my / your. Favori: My favourite animal is the lion.",
        items: [
          ["What's ___ favourite animal?", "your", "you", "you're"],
          ["My favourite animal ___ the lion.", "is", "are", "am"],
          ["Her favourite animal is ___ elephant.", "an", "a", "two"],
          ["I really like ___.", "dogs", "dog", "a dogs"]
        ]
      },
      {
        id: "t1-l10-what-is-this",
        title: "Ders 10 - What Is This? What Are These? (Vücudumuz)",
        topic: "this / these",
        rule: "Tek ve yakın: this (is). Çok ve yakın: these (are).",
        items: [
          ["What is ___? It's my nose.", "this", "these", "they"],
          ["What are ___? They're my ears.", "these", "this", "it"],
          ["These ___ my hands.", "are", "is", "am"],
          ["This ___ my head.", "is", "are", "am"]
        ]
      },
      {
        id: "t1-l11-is-it-a",
        title: "Ders 11 - Is It A...? (Şekiller)",
        topic: "Is it a...? Yes, it is / No, it isn't",
        rule: "Soru: Is it a circle? Kısa cevap: Yes, it is. / No, it isn't.",
        items: [
          ["Is it a circle? Yes, it ___.", "is", "are", "does"],
          ["Is it a square? No, it ___.", "isn't", "is", "aren't"],
          ["___ it a triangle?", "Is", "Are", "Am"],
          ["It's ___ oval.", "an", "a", "two"]
        ]
      }
    ]
  };

  GRAMMAR["twinkl-2"] = {
    label: "Level 2 (A1) — Temel Yapılar",
    group: TWINKL_GROUP,
    units: [
      {
        id: "t2-l1-he-is-she-is",
        title: "Ders 1 - He Is / She Is… (Zamirler, Ülkeler, Duygular)",
        topic: "he / she / they + to be",
        rule: "Erkek: he is, kadın: she is, çoğul: they are. Olumsuz: isn't / aren't.",
        items: [
          ["___ is my friend. Her name is Zeynep.", "She", "He", "It"],
          ["He ___ from Brazil.", "is", "are", "am"],
          ["___ are happy.", "They", "He", "She"],
          ["Is he sad? No, he ___.", "isn't", "aren't", "not"]
        ]
      },
      {
        id: "t2-l2-i-can",
        title: "Ders 2 - I Can… (Yetenekler)",
        topic: "can / can't",
        rule: "can + fiilin yalın hâli: I can swim. Olumsuz: can't. Soru: Can you...?",
        items: [
          ["I can ___.", "swim", "swims", "swimming"],
          ["Can you ___? Yes, I can.", "dance", "dances", "dancing"],
          ["She ___ ride a bike.", "can", "cans", "can to"],
          ["He can't ___.", "sing", "sings", "singing"]
        ]
      },
      {
        id: "t2-l3-what-do-you-like",
        title: "Ders 3 - What Do You Like? (Yiyecek ve İçecekler)",
        topic: "like / don't like",
        rule: "I like pizza. Olumsuz: I don't like... Soru: What do you like? / Do you like...?",
        items: [
          ["I ___ pizza.", "like", "likes", "liking"],
          ["What ___ you like?", "do", "does", "are"],
          ["Do you like milk? No, I ___.", "don't", "doesn't", "not"],
          ["I don't ___ fish.", "like", "likes", "liking"]
        ]
      },
      {
        id: "t2-l4-what-is-it",
        title: "Ders 4 - What Is It? (Sıfat + İsim)",
        topic: "Sıfat + isim",
        rule: "Sıfat isimden önce gelir ve çoğul eki almaz: a big dog, long pencils. Boyut renkten önce: a small red ball.",
        items: [
          ["It is a ___.", "big dog", "dog big", "bigs dog"],
          ["It is a ___ ball.", "small red", "red small", "smalls red"],
          ["It's ___ old car.", "an", "a", "two"],
          ["They are ___.", "long pencils", "pencils long", "longs pencils"]
        ]
      },
      {
        id: "t2-l5-is-there-a-an",
        title: "Ders 5 - Is There A/An…? (Mutfak Eşyaları)",
        topic: "Is there a / an...?",
        rule: "Soru: Is there a fridge? Kısa cevap: Yes, there is. / No, there isn't.",
        items: [
          ["Is there ___ oven in the kitchen?", "an", "a", "two"],
          ["Is there a fridge? Yes, there ___.", "is", "are", "it"],
          ["There ___ a cup on the table.", "is", "are", "am"],
          ["Is there a kettle? No, there ___.", "isn't", "aren't", "not"]
        ]
      },
      {
        id: "t2-l7-where-is",
        title: "Ders 7 - Where Is…? (Yer Edatları ve Teknoloji)",
        topic: "Where is / are...? + yer edatları",
        rule: "in = içinde, on = üstünde, under = altında. Tekil: Where is...? Çoğul: Where are...?",
        items: [
          ["Where ___ the laptop?", "is", "are", "am"],
          ["Where ___ my headphones?", "are", "is", "am"],
          ["The phone is ___ the bag. I can't see it.", "in", "on", "at"],
          ["The cat is ___ the table. It's hiding.", "under", "on", "in"]
        ]
      },
      {
        id: "t2-l8-what-are-you-doing",
        title: "Ders 8 - What Are You Doing? (Şimdiki Zaman)",
        topic: "Şimdiki zaman: am / is / are + -ing",
        rule: "Şu an: I am reading. She is running. Soru: What are you doing?",
        items: [
          ["What are you ___?", "doing", "do", "does"],
          ["I am ___.", "reading", "read", "reads"],
          ["She ___ running.", "is", "are", "am"],
          ["They are ___.", "swimming", "swiming", "swim"]
        ]
      },
      {
        id: "t2-l9-what-is-this",
        title: "Ders 9 - What Is This? (Taşıtlar, this/that/these/those)",
        topic: "this / that / these / those",
        rule: "Yakın: this (tek), these (çok). Uzak: that (tek), those (çok).",
        items: [
          ["___ is a bus.", "This", "These", "Those"],
          ["Look over there! ___ are bikes.", "Those", "That", "This"],
          ["What are ___? They're cars.", "these", "this", "that"],
          ["Is ___ a train over there?", "that", "those", "these"]
        ]
      },
      {
        id: "t2-l10-stand-up",
        title: "Ders 10 - Stand Up! (Sınıf Komutları)",
        topic: "Emir cümleleri",
        rule: "Emir cümlesi fiilin yalın hâliyle başlar: Stand up! Olumsuz: Don't shout!",
        items: [
          ["___ up, please.", "Stand", "Stands", "Standing"],
          ["Sit ___, please.", "down", "of", "at"],
          ["Please ___ your mic on.", "turn", "turns", "turning"],
          ["Don't ___.", "shout", "shouts", "shouting"]
        ]
      },
      {
        id: "t2-l11-what-are-you-wearing",
        title: "Ders 11 - What Are You Wearing? (Kıyafetler)",
        topic: "What are you wearing?",
        rule: "Şimdiki zaman: I'm wearing a dress. She is wearing jeans.",
        items: [
          ["What are you ___?", "wearing", "wear", "wears"],
          ["I'm wearing ___ red dress.", "a", "an", "two"],
          ["She ___ wearing jeans.", "is", "are", "am"],
          ["He is wearing ___.", "trainers", "trainer", "a trainers"]
        ]
      }
    ]
  };

  GRAMMAR["twinkl-3"] = {
    label: "Level 3 (A1-A2) — Zaman ve Rutinler",
    group: TWINKL_GROUP,
    units: [
      {
        id: "t3-l1-how-old-is",
        title: "Ders 1 - How Old Is…? (Sayılar 20-100)",
        topic: "How old is...? (sayılar)",
        rule: "How old is she? — She is seventy (years old). Türkçedeki gibi have kullanılmaz.",
        items: [
          ["How old ___ your grandmother?", "is", "are", "am"],
          ["She ___ seventy years old.", "is", "are", "has"],
          ["How old ___ they?", "are", "is", "am"],
          ["My dad is forty-five ___ old.", "years", "year", "age"]
        ]
      },
      {
        id: "t3-l2-what-time-is-it",
        title: "Ders 2 - What Time Is It? (Saatler ve Günün Bölümleri)",
        topic: "What time is it?",
        rule: "It's three o'clock. half past six = altı buçuk. Saatle: at noon / at 7:30.",
        items: [
          ["What time ___ it?", "is", "are", "am"],
          ["It's three ___.", "o'clock", "clock", "o'clocks"],
          ["It's half ___ six.", "past", "to", "at"],
          ["I have lunch ___ noon.", "at", "in", "on"]
        ]
      },
      {
        id: "t3-l3-what-do-you-do-on-tuesdays",
        title: "Ders 3 - What Do You Do on Tuesdays? (Haftanın Günleri)",
        topic: "Günler: on + gün, geniş zaman",
        rule: "Günlerle on: on Tuesdays. he / she + fiil-s (goes, plays).",
        items: [
          ["What do you do ___ Tuesdays?", "on", "in", "at"],
          ["I ___ football on Mondays.", "play", "plays", "playing"],
          ["She ___ swimming on Fridays.", "goes", "go", "going"],
          ["What ___ he do on Sundays?", "does", "do", "is"]
        ]
      },
      {
        id: "t3-l4-whats-the-weather-like",
        title: "Ders 4 - What's the Weather like Today? (Hava Durumu)",
        topic: "What's the weather like?",
        rule: "It is sunny / windy. Şu an yağıyor: It's raining.",
        items: [
          ["What's the weather ___ today?", "like", "likes", "as"],
          ["It ___ sunny.", "is", "are", "am"],
          ["It's ___ today.", "raining", "rain", "rains"],
          ["Is it windy? Yes, it ___.", "is", "are", "does"]
        ]
      },
      {
        id: "t3-l5-what-month-is-it",
        title: "Ders 5 - What Month Is It? (Aylar ve Mevsimler)",
        topic: "Aylar ve mevsimler: in",
        rule: "Ay ve mevsimlerle in: in May, in winter.",
        items: [
          ["My birthday is ___ May.", "in", "on", "at"],
          ["What month ___ it?", "is", "are", "am"],
          ["It's cold ___ winter.", "in", "on", "at"],
          ["Summer ___ my favourite season.", "is", "are", "am"]
        ]
      },
      {
        id: "t3-l7-what-time-do-you",
        title: "Ders 7 - What Time Do You…? (Günlük Rutinler)",
        topic: "Günlük rutin: What time do you...?",
        rule: "Saatle at: at seven o'clock. he / she + fiil-s / -es (brushes, goes).",
        items: [
          ["What time ___ you get up?", "do", "does", "are"],
          ["I get up ___ seven o'clock.", "at", "in", "on"],
          ["He ___ his teeth at 7:15.", "brushes", "brush", "brushing"],
          ["What time does she ___ to bed?", "go", "goes", "going"]
        ]
      },
      {
        id: "t3-l8-what-do-you-like-doing",
        title: "Ders 8 - What Do You Like Doing? (Hobiler, like + ing)",
        topic: "like + fiil-ing",
        rule: "Hobi: I like drawing. She likes reading books.",
        items: [
          ["I like ___ pictures.", "drawing", "draw", "draws"],
          ["What do you like ___?", "doing", "do", "does"],
          ["She likes ___ books.", "reading", "read", "reads"],
          ["He doesn't like ___ the guitar.", "playing", "play", "plays"]
        ]
      },
      {
        id: "t3-l9-how-often-do-you",
        title: "Ders 9 - How Often Do You…? (Sıklık Zarfları)",
        topic: "Sıklık: always, never, twice a week",
        rule: "Sıklık zarfı fiilden önce (I always eat), be fiilinden sonra gelir (She is never late).",
        items: [
          ["How ___ do you go swimming?", "often", "many", "much"],
          ["I ___ eat breakfast.", "always", "alway", "all"],
          ["She is ___ late.", "never", "ever", "nothing"],
          ["I go to the park ___ a week.", "twice", "two", "second"]
        ]
      },
      {
        id: "t3-l10-where-is-the",
        title: "Ders 10 - Where Is The…? (Şehirdeki Yerler ve Edatlar)",
        topic: "Yer edatları: next to, between, in front of",
        rule: "next to = yanında, between = arasında, in front of = önünde.",
        items: [
          ["The bank is next ___ the café.", "to", "of", "at"],
          ["Where ___ the library?", "is", "are", "am"],
          ["The park is ___ the school and the hospital.", "between", "next", "in front"],
          ["The shop is ___ front of the cinema.", "in", "on", "at"]
        ]
      },
      {
        id: "t3-l11-what-is-there",
        title: "Ders 11 - What Is There? (Otel Odası)",
        topic: "There is / There are",
        rule: "Tekil: There is a bed. Çoğul: There are two pillows. Soru: Is there...? / Are there any...?",
        items: [
          ["There ___ a bed in the room.", "is", "are", "am"],
          ["There ___ two pillows.", "are", "is", "am"],
          ["Is there ___ TV?", "a", "an", "two"],
          ["___ there any towels?", "Are", "Is", "Am"]
        ]
      }
    ]
  };

  GRAMMAR["twinkl-4"] = {
    label: "Level 4 (A1-A2) — Geçmiş Zaman",
    group: TWINKL_GROUP,
    units: [
      {
        id: "t4-l1-favourite-subject",
        title: "Ders 1 - What's Your Favourite Subject? (Dersler ve Sıfatlar)",
        topic: "Dersler + sıfatlar",
        rule: "Ders adları tekil fiil alır: Maths is difficult. Uzun sıfat: more interesting than.",
        items: [
          ["What's your favourite ___?", "subject", "subjects", "a subject"],
          ["Maths ___ difficult.", "is", "are", "am"],
          ["I think art is ___.", "fun", "funs", "a fun"],
          ["Science is ___ than history.", "more interesting", "interestinger", "interesting"]
        ]
      },
      {
        id: "t4-l2-what-did-you-do",
        title: "Ders 2 - What Did You Do Yesterday? (Geçmiş Zaman Fiilleri)",
        topic: "Geçmiş zaman: -ed, did",
        rule: "Düzenli fiil: played, watched. Soru ve olumsuzda did + fiilin yalın hâli.",
        items: [
          ["What ___ you do yesterday?", "did", "do", "does"],
          ["I ___ football yesterday.", "played", "play", "plays"],
          ["She ___ TV last night.", "watched", "watch", "watches"],
          ["Did you ___ your homework?", "finish", "finished", "finishes"]
        ]
      },
      {
        id: "t4-l3-was-were",
        title: "Ders 3 - Was/Were (Doğum Günü Partisi)",
        topic: "was / were",
        rule: "I / he / she / it → was · you / we / they → were.",
        items: [
          ["The party ___ fun yesterday.", "was", "were", "are"],
          ["We ___ at the party last night.", "were", "was", "are"],
          ["___ you at Zeynep's party?", "Were", "Was", "Did"],
          ["The cake ___ delicious. We ate it all.", "was", "were", "did"]
        ]
      },
      {
        id: "t4-l4-where-did-you-go",
        title: "Ders 4 - Where Did You Go? (Düzensiz Fiiller, Yerler)",
        topic: "Düzensiz fiiller (went, ate, took)",
        rule: "Düzensiz fiillerin geçmiş hâli ezberlenir: go → went, eat → ate, take → took.",
        items: [
          ["Where did you ___?", "go", "went", "going"],
          ["I ___ to the beach last summer.", "went", "go", "goed"],
          ["We ___ ice cream yesterday.", "ate", "eated", "eat"],
          ["She ___ a lot of photos last weekend.", "took", "taked", "take"]
        ]
      },
      {
        id: "t4-l5-you-should-take-medicine",
        title: "Ders 5 - You Should Take Some Medicine! (Sağlık, should)",
        topic: "should / shouldn't",
        rule: "Öneri: You should + fiilin yalın hâli. Olumsuz: You shouldn't...",
        items: [
          ["You ___ take some medicine.", "should", "should to", "shoulds"],
          ["You should ___ to bed.", "go", "goes", "going"],
          ["You ___ eat sweets.", "shouldn't", "don't should", "shouldn't to"],
          ["What should I ___?", "do", "does", "doing"]
        ]
      },
      {
        id: "t4-l7-a-an",
        title: "Ders 7 - A / An (Deniz Canlıları)",
        topic: "a / an",
        rule: "Sesli harf sesiyle başlayan kelimeden önce an: an octopus, an eel. Diğerlerinde a: a shark.",
        items: [
          ["It's ___ octopus.", "an", "a", "two"],
          ["It's ___ shark.", "a", "an", "two"],
          ["I can see ___ eel.", "an", "a", "two"],
          ["There is ___ jellyfish.", "a", "an", "two"]
        ]
      },
      {
        id: "t4-l8-how-much-how-many",
        title: "Ders 8 - How Much? How Many? (Malzemeler)",
        topic: "How much / How many",
        rule: "Sayılabilen: How many eggs are there? Sayılamayan: How much flour is there?",
        items: [
          ["How ___ eggs do we need?", "many", "much", "lot"],
          ["How ___ flour do we need?", "much", "many", "lot"],
          ["How much milk ___ there?", "is", "are", "am"],
          ["How many apples ___ there?", "are", "is", "am"]
        ]
      },
      {
        id: "t4-l9-shes-a-doctor",
        title: "Ders 9 - She's a Doctor (Meslekler)",
        topic: "Meslekler: a / an",
        rule: "She's a doctor / He's an artist. Soru: What does she do?",
        items: [
          ["She's ___ doctor.", "a", "an", "two"],
          ["He's ___ artist.", "an", "a", "two"],
          ["What ___ she do?", "does", "do", "is"],
          ["My mum ___ in a school.", "works", "work", "working"]
        ]
      },
      {
        id: "t4-l10-whose-is-this",
        title: "Ders 10 - Whose Is This? (İyelik, Kişisel Eşyalar)",
        topic: "Whose? mine / yours / Tom's",
        rule: "Kimin: Whose is this? Sahiplik: mine, yours, Tom's. İsimden önce: my, your.",
        items: [
          ["___ is this bag?", "Whose", "Who's", "Who"],
          ["Is it yours? Yes, it's ___.", "mine", "my", "me"],
          ["It isn't mine. It's ___.", "Tom's", "Toms", "Tom"],
          ["Is this ___ watch?", "your", "yours", "you"]
        ]
      },
      {
        id: "t4-l11-how-many-are-there",
        title: "Ders 11 - How Many Are There? (Sayılabilir İsimler)",
        topic: "How many ... are there? (çoğul)",
        rule: "Çoğul: There are three cats. Tekil: There is one bird. -s, -x ile bitenlere -es: boxes.",
        items: [
          ["How many dogs ___ there?", "are", "is", "am"],
          ["There ___ three cats.", "are", "is", "am"],
          ["There ___ one bird.", "is", "are", "am"],
          ["There are two ___.", "boxes", "boxs", "box"]
        ]
      }
    ]
  };

  GRAMMAR["twinkl-5"] = {
    label: "Level 5 (A1-A2) — Gelecek ve Karşılaştırma",
    group: TWINKL_GROUP,
    units: [
      {
        id: "t5-l1-what-will-you-do",
        title: "Ders 1 - What Will You Do? (Gelecek Zaman, Uzay)",
        topic: "Gelecek zaman: will",
        rule: "will + fiilin yalın hâli: I will fly to the Moon. Olumsuz: won't.",
        items: [
          ["What ___ you do in the future?", "will", "are", "is"],
          ["I will ___ to the Moon.", "fly", "flies", "flying"],
          ["Astronauts ___ live on Mars.", "will", "are", "does"],
          ["We won't ___ on Earth.", "stay", "stays", "staying"]
        ]
      },
      {
        id: "t5-l2-what-does-she-look-like",
        title: "Ders 2 - What Does She Look Like? (Görünüş)",
        topic: "What does she look like?",
        rule: "Görünüş: She has long hair (has / have). He is tall (is / are).",
        items: [
          ["What does she look ___?", "like", "likes", "as"],
          ["She ___ long hair.", "has", "have", "is"],
          ["He ___ tall and thin.", "is", "has", "are"],
          ["They ___ blue eyes.", "have", "has", "are"]
        ]
      },
      {
        id: "t5-l3-have-you-got",
        title: "Ders 3 - Have You Got...? (Alışveriş)",
        topic: "have got / has got",
        rule: "Have you got...? — Yes, I have. / No, I haven't. he / she → has got.",
        items: [
          ["___ you got any apples?", "Have", "Has", "Do"],
          ["Have you got a bag? Yes, I ___.", "have", "has", "got"],
          ["She ___ got a basket.", "has", "have", "is"],
          ["We haven't ___ any bread.", "got", "get", "have"]
        ]
      },
      {
        id: "t5-l4-getting-to-know-you",
        title: "Ders 4 - Getting to Know You (Kişisel Sorular)",
        topic: "Kişisel sorular",
        rule: "Where do you live? What are your hobbies? How old are you? When is your birthday?",
        items: [
          ["Where ___ you live?", "do", "does", "are"],
          ["What ___ your hobbies?", "are", "is", "am"],
          ["___ old are you?", "How", "What", "Who"],
          ["When is ___ birthday?", "your", "you", "you're"]
        ]
      },
      {
        id: "t5-l5-what-do-you-want-to-be",
        title: "Ders 5 - What Do You Want to Be? (Hayaller, Meslekler)",
        topic: "want to be",
        rule: "want to + fiil: I want to be an astronaut. he / she → wants.",
        items: [
          ["What do you want ___?", "to be", "be", "being"],
          ["I want to be ___ astronaut.", "an", "a", "two"],
          ["He ___ to be a pilot.", "wants", "want", "wanting"],
          ["Do you want to be a teacher? No, I ___.", "don't", "doesn't", "not"]
        ]
      },
      {
        id: "t5-l7-i-am-taller-than-you",
        title: "Ders 7 - I Am Taller than You (Karşılaştırma)",
        topic: "Karşılaştırma: -er than",
        rule: "Kısa sıfat + -er + than: taller than. Tek heceli sessizle bitenlerde son harf çiftlenir: bigger.",
        items: [
          ["I am ___ than you.", "taller", "tall", "more tall"],
          ["A car is ___ than a bike.", "faster", "fast", "more fast"],
          ["A lion is ___ than a cat.", "bigger", "biger", "big"],
          ["My bag is heavier ___ your bag.", "than", "then", "that"]
        ]
      },
      {
        id: "t5-l8-what-is-the-fastest-animal",
        title: "Ders 8 - What Is the Fastest Animal? (En Üstünlük)",
        topic: "En üstünlük: the -est / the most",
        rule: "the + sıfat-est: the fastest. Uzun sıfat: the most beautiful.",
        items: [
          ["The cheetah is the ___ animal.", "fastest", "faster", "fast"],
          ["The blue whale is the ___ animal.", "biggest", "bigger", "bigest"],
          ["Which animal is the ___?", "strongest", "stronger", "strong"],
          ["It is the ___ beautiful bird.", "most", "more", "much"]
        ]
      },
      {
        id: "t5-l9-what-are-you-going-to-do",
        title: "Ders 9 - What Are You Going to Do? (Tatil Planları)",
        topic: "be going to",
        rule: "Plan: am / is / are going to + fiil: I'm going to pack a suitcase.",
        items: [
          ["What are you going ___ do?", "to", "for", "at"],
          ["I'm going to ___ a suitcase.", "pack", "packs", "packing"],
          ["She ___ going to visit Rome.", "is", "are", "am"],
          ["We ___ going to swim in the sea.", "are", "is", "am"]
        ]
      },
      {
        id: "t5-l10-can-i-have",
        title: "Ders 10 - Can I Have…? (Dünya Mutfağı)",
        topic: "Can I have...? / I'd like...",
        rule: "Sipariş: Can I have a pizza, please? / I'd like some ramen. Teklif: Would you like...?",
        items: [
          ["Can I ___ some noodles, please?", "have", "has", "having"],
          ["___ I have a pizza, please?", "Can", "Do", "Am"],
          ["Would you ___ some paella?", "like", "likes", "liking"],
          ["I'd like ___ ramen, please.", "some", "any", "many"]
        ]
      },
      {
        id: "t5-l11-parts-of-speech",
        title: "Ders 11 - Parts of Speech (Sözcük Türleri)",
        topic: "Sözcük türleri: noun / verb / adjective",
        rule: "noun = isim (dog), verb = fiil (run), adjective = sıfat (red), adverb = zarf (quickly).",
        items: [
          ["In 'The dog runs', the word 'dog' is ___.", "a noun", "a verb", "an adjective"],
          ["In 'She sings well', the word 'sings' is ___.", "a verb", "a noun", "an adjective"],
          ["In 'a red apple', the word 'red' is ___.", "an adjective", "a noun", "a verb"],
          ["In 'He runs quickly', the word 'quickly' is ___.", "an adverb", "a noun", "a verb"]
        ]
      }
    ]
  };

})();
