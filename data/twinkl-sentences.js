/*
 * Twinkl ESL Curriculum — anahtar cümleler (Cümle Kurma oyunu için).
 *
 * Kaynak: Twinkl "ESL Curriculum — Guidance/Overview" belgesindeki
 * "Topic & Key Sentences" sütunu. Twinkl orada çoğunlukla kalıbı verir
 * ("I'm from...", "There is/there are"); buradaki cümleler o kalıbın
 * dersin KENDİ kelimeleriyle örneklenmiş hâlidir.
 *
 * Bu dosya `data/sentences.js`'ten SONRA yüklenmelidir: aynı `SENTENCES`
 * objesine `twinkl-<seviye>` anahtarlarıyla eklenir, böylece Cümle Kurma
 * oyunu bu seviyeleri de listeler. Ünite `id`/`title` değerleri
 * `data/twinkl.js`'teki karşılıklarıyla BİREBİR aynıdır.
 *
 * Kural: cümleler tahtada kurulabilsin diye 12 kelimeyi geçmez.
 * (Twinkl'ın L8+ anahtar cümleleri çok uzun — o seviyeler girilirken
 * kısaltılmalı, bkz. HANDOFF.md Faz T2/T3.)
 *
 * ⚠️ TASLAK: Yapı etiketleri ve Türkçe çeviriler bu proje için yazıldı,
 * öğretmen onayından geçmedi.
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
          structures: [
            { id: "greeting", label: "Kendini tanıtma ve nasıl hissettiğini söyleme" }
          ],
          sentences: [
            { en: "My name is Ali.", tr: "Benim adım Ali.", structure: "greeting" },
            { en: "How are you today?", tr: "Bugün nasılsın?", structure: "greeting" },
            { en: "I am very happy.", tr: "Çok mutluyum.", structure: "greeting" },
            { en: "She is tired and hungry.", tr: "O yorgun ve aç.", structure: "greeting" }
          ]
        },
        {
          id: "t1-l2-how-old-are-you",
          title: "Ders 2 - How Old Are You? (Sayılar 1-20)",
          structures: [
            { id: "age", label: "Yaş söyleme (I'm ___ years old)" }
          ],
          sentences: [
            { en: "I am ten years old.", tr: "On yaşındayım.", structure: "age" },
            { en: "How old are you?", tr: "Kaç yaşındasın?", structure: "age" },
            { en: "My brother is seven years old.", tr: "Erkek kardeşim yedi yaşında.", structure: "age" }
          ]
        },
        {
          id: "t1-l3-where-are-you-from",
          title: "Ders 3 - Where Are You From? (Ülkeler)",
          structures: [
            { id: "origin", label: "Nereli olduğunu söyleme (I'm from...)" }
          ],
          sentences: [
            { en: "I am from Türkiye.", tr: "Ben Türkiye'denim.", structure: "origin" },
            { en: "Where are you from?", tr: "Nerelisin?", structure: "origin" },
            { en: "She is from Japan.", tr: "O Japonya'dan.", structure: "origin" },
            { en: "They are from Brazil.", tr: "Onlar Brezilya'dan.", structure: "origin" }
          ]
        },
        {
          id: "t1-l4-what-is-it",
          title: "Ders 4 - What Is It? (Sınıf Eşyaları)",
          structures: [
            { id: "it-is-a", label: "Nesneleri tanıtma (It's a...)" }
          ],
          sentences: [
            { en: "It is a pencil.", tr: "Bu bir kurşun kalem.", structure: "it-is-a" },
            { en: "What is it?", tr: "Bu nedir?", structure: "it-is-a" },
            { en: "It is a notebook.", tr: "Bu bir defter.", structure: "it-is-a" },
            { en: "This is my pencil case.", tr: "Bu benim kalem kutum.", structure: "it-is-a" }
          ]
        },
        {
          id: "t1-l5-what-are-they",
          title: "Ders 5 - What Are They? (Meyve ve Sebzeler, Çoğul)",
          structures: [
            { id: "they-are", label: "Çoğul biçim (They are...)" }
          ],
          sentences: [
            { en: "They are apples.", tr: "Onlar elma.", structure: "they-are" },
            { en: "What are they?", tr: "Onlar nedir?", structure: "they-are" },
            { en: "They are potatoes.", tr: "Onlar patates.", structure: "they-are" }
          ]
        },
        {
          id: "t1-l7-who-is-this",
          title: "Ders 7 - Who Is This? (Aile ve Arkadaşlar)",
          structures: [
            { id: "this-is-my", label: "Aile tanıtma (This is my... / They are...)" }
          ],
          sentences: [
            { en: "This is my mum.", tr: "Bu benim annem.", structure: "this-is-my" },
            { en: "Who is this?", tr: "Bu kim?", structure: "this-is-my" },
            { en: "They are my parents.", tr: "Onlar benim ebeveynlerim.", structure: "this-is-my" },
            { en: "This is my grandma.", tr: "Bu benim büyükannem.", structure: "this-is-my" }
          ]
        },
        {
          id: "t1-l8-what-colour-is-it",
          title: "Ders 8 - What Colour Is It? (Renkler)",
          structures: [
            { id: "colour", label: "Renk söyleme (It is...)" }
          ],
          sentences: [
            { en: "It is red.", tr: "O kırmızı.", structure: "colour" },
            { en: "What colour is it?", tr: "O ne renk?", structure: "colour" },
            { en: "My bag is blue.", tr: "Çantam mavi.", structure: "colour" }
          ]
        },
        {
          id: "t1-l9-favourite-animal",
          title: "Ders 9 - What's Your Favourite Animal? (Hayvanlar)",
          structures: [
            { id: "favourite", label: "Tercih belirtme (My favourite animal is...)" }
          ],
          sentences: [
            { en: "My favourite animal is a dolphin.", tr: "En sevdiğim hayvan yunus.", structure: "favourite" },
            { en: "What is your favourite animal?", tr: "En sevdiğin hayvan hangisi?", structure: "favourite" },
            { en: "My favourite animal is a tiger.", tr: "En sevdiğim hayvan kaplan.", structure: "favourite" }
          ]
        },
        {
          id: "t1-l10-what-is-this",
          title: "Ders 10 - What Is This? What Are These? (Vücudumuz)",
          structures: [
            { id: "this-these", label: "Tekil/çoğul (This is my... / These are my...)" }
          ],
          sentences: [
            { en: "This is my nose.", tr: "Bu benim burnum.", structure: "this-these" },
            { en: "These are my hands.", tr: "Bunlar benim ellerim.", structure: "this-these" },
            { en: "These are my eyes.", tr: "Bunlar benim gözlerim.", structure: "this-these" }
          ]
        },
        {
          id: "t1-l11-is-it-a",
          title: "Ders 11 - Is It A...? (Şekiller)",
          structures: [
            { id: "yes-no", label: "Kısa cevaplar (Yes, it is / No, it isn't)" }
          ],
          sentences: [
            { en: "Is it a circle?", tr: "O bir daire mi?", structure: "yes-no" },
            { en: "Yes, it is a star.", tr: "Evet, o bir yıldız.", structure: "yes-no" },
            { en: "No, it is not a square.", tr: "Hayır, o bir kare değil.", structure: "yes-no" }
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
          structures: [
            { id: "pronouns", label: "Üçüncü tekil/çoğul şahıs (he / she / they)" }
          ],
          sentences: [
            { en: "He is from Poland.", tr: "O Polonya'dan.", structure: "pronouns" },
            { en: "She is nervous today.", tr: "O bugün gergin.", structure: "pronouns" },
            { en: "They are from Nigeria.", tr: "Onlar Nijerya'dan.", structure: "pronouns" }
          ]
        },
        {
          id: "t2-l2-i-can",
          title: "Ders 2 - I Can… (Yetenekler)",
          structures: [
            { id: "can", label: "Yetenek belirtme (can / can't)" }
          ],
          sentences: [
            { en: "I can swim very well.", tr: "Çok iyi yüzebilirim.", structure: "can" },
            { en: "Can you dance?", tr: "Dans edebilir misin?", structure: "can" },
            { en: "She can drive a car.", tr: "O araba sürebilir.", structure: "can" },
            { en: "No, I cannot fly.", tr: "Hayır, uçamam.", structure: "can" }
          ]
        },
        {
          id: "t2-l3-what-do-you-like",
          title: "Ders 3 - What Do You Like? (Yiyecek ve İçecekler)",
          structures: [
            { id: "like", label: "Beğeni belirtme (like, geniş zaman)" }
          ],
          sentences: [
            { en: "I like pizza.", tr: "Pizzayı severim.", structure: "like" },
            { en: "Do you like coffee?", tr: "Kahve sever misin?", structure: "like" },
            { en: "She does not like cheese.", tr: "O peyniri sevmez.", structure: "like" }
          ]
        },
        {
          id: "t2-l4-what-is-it",
          title: "Ders 4 - What Is It? (Sıfat + İsim)",
          structures: [
            { id: "adj-noun", label: "Sıfat + isim (It's a big bus)" }
          ],
          sentences: [
            { en: "It is a big bus.", tr: "O büyük bir otobüs.", structure: "adj-noun" },
            { en: "It is a cute panda.", tr: "O sevimli bir panda.", structure: "adj-noun" },
            { en: "It is a tall giraffe.", tr: "O uzun boylu bir zürafa.", structure: "adj-noun" }
          ]
        },
        {
          id: "t2-l5-is-there-a-an",
          title: "Ders 5 - Is There A/An…? (Mutfak Eşyaları)",
          structures: [
            { id: "there-is", label: "There is / there are" }
          ],
          sentences: [
            { en: "There is a bowl on the table.", tr: "Masanın üstünde bir kase var.", structure: "there-is" },
            { en: "There are two spoons here.", tr: "Burada iki kaşık var.", structure: "there-is" },
            { en: "There is not a microwave.", tr: "Mikrodalga yok.", structure: "there-is" }
          ]
        },
        {
          id: "t2-l7-where-is",
          title: "Ders 7 - Where Is…? (Yer Edatları ve Teknoloji)",
          structures: [
            { id: "prepositions", label: "Yer edatları (in, on, under, next to)" }
          ],
          sentences: [
            { en: "The phone is on the table.", tr: "Telefon masanın üstünde.", structure: "prepositions" },
            { en: "The charger is under the bed.", tr: "Şarj aleti yatağın altında.", structure: "prepositions" },
            { en: "The laptop is next to the camera.", tr: "Dizüstü bilgisayar kameranın yanında.", structure: "prepositions" }
          ]
        },
        {
          id: "t2-l8-what-are-you-doing",
          title: "Ders 8 - What Are You Doing? (Şimdiki Zaman)",
          structures: [
            { id: "present-continuous", label: "Şimdiki zaman (verb + ing)" }
          ],
          sentences: [
            { en: "I am cooking now.", tr: "Şu anda yemek pişiriyorum.", structure: "present-continuous" },
            { en: "What are you doing?", tr: "Ne yapıyorsun?", structure: "present-continuous" },
            { en: "She is reading a book.", tr: "O bir kitap okuyor.", structure: "present-continuous" }
          ]
        },
        {
          id: "t2-l9-what-is-this",
          title: "Ders 9 - What Is This? (Taşıtlar, this/that/these/those)",
          structures: [
            { id: "demonstratives", label: "İşaret zamirleri (this, that, these, those)" }
          ],
          sentences: [
            { en: "What are these?", tr: "Bunlar nedir?", structure: "demonstratives" },
            { en: "Those are bikes.", tr: "Şunlar bisiklet.", structure: "demonstratives" },
            { en: "This is a helicopter.", tr: "Bu bir helikopter.", structure: "demonstratives" }
          ]
        },
        {
          id: "t2-l10-stand-up",
          title: "Ders 10 - Stand Up! (Sınıf Komutları)",
          structures: [
            { id: "imperatives", label: "Emir cümleleri (sınıf komutları)" }
          ],
          sentences: [
            { en: "Please stand up.", tr: "Lütfen ayağa kalk.", structure: "imperatives" },
            { en: "Open your book now.", tr: "Şimdi kitabını aç.", structure: "imperatives" },
            { en: "Do your homework tonight.", tr: "Bu akşam ödevini yap.", structure: "imperatives" }
          ]
        },
        {
          id: "t2-l11-what-are-you-wearing",
          title: "Ders 11 - What Are You Wearing? (Kıyafetler)",
          structures: [
            { id: "wearing", label: "Kıyafet anlatma (present continuous + wear)" }
          ],
          sentences: [
            { en: "I am wearing a jacket.", tr: "Ceket giyiyorum.", structure: "wearing" },
            { en: "What is she wearing?", tr: "O ne giyiyor?", structure: "wearing" },
            { en: "They are wearing trainers.", tr: "Onlar spor ayakkabı giyiyor.", structure: "wearing" }
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
          structures: [
            { id: "age-others", label: "Başkasının yaşını söyleme" }
          ],
          sentences: [
            { en: "My brother is thirty years old.", tr: "Erkek kardeşim otuz yaşında.", structure: "age-others" },
            { en: "My grandma is ninety years old.", tr: "Büyükannem doksan yaşında.", structure: "age-others" }
          ]
        },
        {
          id: "t3-l2-what-time-is-it",
          title: "Ders 2 - What Time Is It? (Saatler ve Günün Bölümleri)",
          structures: [
            { id: "telling-time", label: "Saati söyleme (o'clock, half past, quarter)" }
          ],
          sentences: [
            { en: "It is half past six.", tr: "Saat altı buçuk.", structure: "telling-time" },
            { en: "What time is it?", tr: "Saat kaç?", structure: "telling-time" },
            { en: "It is quarter past nine.", tr: "Saat dokuzu çeyrek geçiyor.", structure: "telling-time" }
          ]
        },
        {
          id: "t3-l3-what-do-you-do-on-tuesdays",
          title: "Ders 3 - What Do You Do on Tuesdays? (Haftanın Günleri)",
          structures: [
            { id: "weekly", label: "Haftalık rutin ve sıklık" }
          ],
          sentences: [
            { en: "I play football on Tuesdays.", tr: "Salı günleri futbol oynarım.", structure: "weekly" },
            { en: "We go to the cinema twice a week.", tr: "Haftada iki kez sinemaya gideriz.", structure: "weekly" },
            { en: "She cleans the house on Sundays.", tr: "O pazar günleri evi temizler.", structure: "weekly" }
          ]
        },
        {
          id: "t3-l4-whats-the-weather-like",
          title: "Ders 4 - What's the Weather like Today? (Hava Durumu)",
          structures: [
            { id: "weather", label: "Hava durumunu anlatma" }
          ],
          sentences: [
            { en: "It is rainy today.", tr: "Bugün yağmurlu.", structure: "weather" },
            { en: "What is the weather like today?", tr: "Bugün hava nasıl?", structure: "weather" },
            { en: "It is very windy outside.", tr: "Dışarısı çok rüzgarlı.", structure: "weather" }
          ]
        },
        {
          id: "t3-l5-what-month-is-it",
          title: "Ders 5 - What Month Is It? (Aylar ve Mevsimler)",
          structures: [
            { id: "months", label: "Ay ve mevsim söyleme" }
          ],
          sentences: [
            { en: "My favourite season is summer.", tr: "En sevdiğim mevsim yaz.", structure: "months" },
            { en: "What month is it?", tr: "Hangi aydayız?", structure: "months" },
            { en: "It is cold in winter.", tr: "Kışın hava soğuk olur.", structure: "months" }
          ]
        },
        {
          id: "t3-l7-what-time-do-you",
          title: "Ders 7 - What Time Do You…? (Günlük Rutinler)",
          structures: [
            { id: "daily-routine", label: "Günlük rutin + saat (before, after)" }
          ],
          sentences: [
            { en: "I wake up at seven o'clock.", tr: "Saat yedide uyanırım.", structure: "daily-routine" },
            { en: "I brush my teeth before breakfast.", tr: "Kahvaltıdan önce dişlerimi fırçalarım.", structure: "daily-routine" },
            { en: "She goes to bed early.", tr: "O erken yatar.", structure: "daily-routine" }
          ]
        },
        {
          id: "t3-l8-what-do-you-like-doing",
          title: "Ders 8 - What Do You Like Doing? (Hobiler, like + ing)",
          structures: [
            { id: "like-ing", label: "Hobi anlatma (like + ing)" }
          ],
          sentences: [
            { en: "I like surfing.", tr: "Sörf yapmayı severim.", structure: "like-ing" },
            { en: "What do you like doing?", tr: "Ne yapmayı seversin?", structure: "like-ing" },
            { en: "He likes rock climbing.", tr: "O kaya tırmanışını sever.", structure: "like-ing" }
          ]
        },
        {
          id: "t3-l9-how-often-do-you",
          title: "Ders 9 - How Often Do You…? (Sıklık Zarfları)",
          structures: [
            { id: "frequency", label: "Sıklık zarfları (always, never, often)" }
          ],
          sentences: [
            { en: "I always clean my room.", tr: "Odamı her zaman temizlerim.", structure: "frequency" },
            { en: "How often do you walk the dog?", tr: "Köpeği ne sıklıkla gezdirirsin?", structure: "frequency" },
            { en: "She never visits the dentist.", tr: "O asla dişçiye gitmez.", structure: "frequency" }
          ]
        },
        {
          id: "t3-l10-where-is-the",
          title: "Ders 10 - Where Is The…? (Şehirdeki Yerler ve Edatlar)",
          structures: [
            { id: "place-prepositions", label: "Yer tarifi (opposite, behind, in front of)" }
          ],
          sentences: [
            { en: "The library is next to the hospital.", tr: "Kütüphane hastanenin yanında.", structure: "place-prepositions" },
            { en: "Where is the bus stop?", tr: "Otobüs durağı nerede?", structure: "place-prepositions" },
            { en: "The hotel is opposite the park.", tr: "Otel parkın karşısında.", structure: "place-prepositions" }
          ]
        },
        {
          id: "t3-l11-what-is-there",
          title: "Ders 11 - What Is There? (Otel Odası)",
          structures: [
            { id: "there-is-hotel", label: "Bir odada ne olduğunu anlatma" }
          ],
          sentences: [
            { en: "There is a lamp on the desk.", tr: "Masanın üstünde bir lamba var.", structure: "there-is-hotel" },
            { en: "There are two beds in the room.", tr: "Odada iki yatak var.", structure: "there-is-hotel" },
            { en: "Is there a balcony?", tr: "Balkon var mı?", structure: "there-is-hotel" }
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
          structures: [
            { id: "subjects", label: "Ders tercihi ve sebep belirtme" }
          ],
          sentences: [
            { en: "My favourite subject is science.", tr: "En sevdiğim ders fen bilimleri.", structure: "subjects" },
            { en: "History is very boring for me.", tr: "Tarih benim için çok sıkıcı.", structure: "subjects" },
            { en: "Why is maths difficult?", tr: "Matematik neden zor?", structure: "subjects" }
          ]
        },
        {
          id: "t4-l2-what-did-you-do",
          title: "Ders 2 - What Did You Do Yesterday? (Geçmiş Zaman Fiilleri)",
          structures: [
            { id: "past-simple", label: "Geçmiş zaman (past simple)" }
          ],
          sentences: [
            { en: "I watched a film yesterday.", tr: "Dün bir film izledim.", structure: "past-simple" },
            { en: "What did you do yesterday?", tr: "Dün ne yaptın?", structure: "past-simple" },
            { en: "She baked a cake.", tr: "O bir kek pişirdi.", structure: "past-simple" }
          ]
        },
        {
          id: "t4-l3-was-were",
          title: "Ders 3 - Was/Were (Doğum Günü Partisi)",
          structures: [
            { id: "was-were", label: "to be fiilinin geçmiş hâli (was / were)" }
          ],
          sentences: [
            { en: "The party was amazing.", tr: "Parti harikaydı.", structure: "was-were" },
            { en: "There were many balloons.", tr: "Birçok balon vardı.", structure: "was-were" },
            { en: "No, they were not here.", tr: "Hayır, onlar burada değildi.", structure: "was-were" }
          ]
        },
        {
          id: "t4-l4-where-did-you-go",
          title: "Ders 4 - Where Did You Go? (Düzensiz Fiiller, Yerler)",
          structures: [
            { id: "irregular-past", label: "Düzensiz fiillerle geçmiş anlatma" }
          ],
          sentences: [
            { en: "I went to the zoo.", tr: "Hayvanat bahçesine gittim.", structure: "irregular-past" },
            { en: "Where did you go?", tr: "Nereye gittin?", structure: "irregular-past" },
            { en: "We ate at a restaurant.", tr: "Bir restoranda yemek yedik.", structure: "irregular-past" }
          ]
        },
        {
          id: "t4-l5-you-should-take-medicine",
          title: "Ders 5 - You Should Take Some Medicine! (Sağlık, should)",
          structures: [
            { id: "should", label: "Tavsiye verme (should / shouldn't)" }
          ],
          sentences: [
            { en: "I have a headache.", tr: "Başım ağrıyor.", structure: "should" },
            { en: "You should take some medicine.", tr: "Biraz ilaç almalısın.", structure: "should" },
            { en: "You should not eat that.", tr: "Onu yememelisin.", structure: "should" }
          ]
        },
        {
          id: "t4-l7-a-an",
          title: "Ders 7 - A / An (Deniz Canlıları)",
          structures: [
            { id: "articles", label: "Belirsiz tanımlıklar (a / an)" }
          ],
          sentences: [
            { en: "There is an octopus in the sea.", tr: "Denizde bir ahtapot var.", structure: "articles" },
            { en: "There is a turtle at the aquarium.", tr: "Akvaryumda bir kaplumbağa var.", structure: "articles" },
            { en: "It is an eel.", tr: "O bir yılan balığı.", structure: "articles" }
          ]
        },
        {
          id: "t4-l8-how-much-how-many",
          title: "Ders 8 - How Much? How Many? (Malzemeler)",
          structures: [
            { id: "quantifiers", label: "Sayılabilir/sayılamayan (how much / how many)" }
          ],
          sentences: [
            { en: "How much sugar do we need?", tr: "Ne kadar şekere ihtiyacımız var?", structure: "quantifiers" },
            { en: "How many eggs are there?", tr: "Kaç tane yumurta var?", structure: "quantifiers" },
            { en: "There is a bag of flour.", tr: "Bir paket un var.", structure: "quantifiers" }
          ]
        },
        {
          id: "t4-l9-shes-a-doctor",
          title: "Ders 9 - She's a Doctor (Meslekler)",
          structures: [
            { id: "jobs", label: "Meslek sorma ve söyleme (What does he/she do?)" }
          ],
          sentences: [
            { en: "She is a doctor.", tr: "O bir doktor.", structure: "jobs" },
            { en: "What does he do?", tr: "O ne iş yapar?", structure: "jobs" },
            { en: "They are firefighters.", tr: "Onlar itfaiyeci.", structure: "jobs" }
          ]
        },
        {
          id: "t4-l10-whose-is-this",
          title: "Ders 10 - Whose Is This? (İyelik, Kişisel Eşyalar)",
          structures: [
            { id: "possessive", label: "İyelik eki ('s) ile sahiplik" }
          ],
          sentences: [
            { en: "This is my mother's handbag.", tr: "Bu annemin el çantası.", structure: "possessive" },
            { en: "Whose is this watch?", tr: "Bu kol saati kimin?", structure: "possessive" },
            { en: "That is my brother's scooter.", tr: "O erkek kardeşimin scooter'ı.", structure: "possessive" }
          ]
        },
        {
          id: "t4-l11-how-many-are-there",
          title: "Ders 11 - How Many Are There? (Sayılabilir İsimler)",
          structures: [
            { id: "counting", label: "Sayılabilir isimlerle miktar sorma" }
          ],
          sentences: [
            { en: "There are three tigers at the zoo.", tr: "Hayvanat bahçesinde üç kaplan var.", structure: "counting" },
            { en: "How many seagulls are there?", tr: "Kaç tane martı var?", structure: "counting" },
            { en: "There are many flowers in the garden.", tr: "Bahçede birçok çiçek var.", structure: "counting" }
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
          structures: [
            { id: "will", label: "Gelecek zaman (will / won't)" }
          ],
          sentences: [
            { en: "I will go to the moon.", tr: "Aya gideceğim.", structure: "will" },
            { en: "What will you wear?", tr: "Ne giyeceksin?", structure: "will" },
            { en: "We will not use a rocket.", tr: "Roket kullanmayacağız.", structure: "will" }
          ]
        },
        {
          id: "t5-l2-what-does-she-look-like",
          title: "Ders 2 - What Does She Look Like? (Görünüş)",
          structures: [
            { id: "appearance", label: "Görünüş tarif etme (look like, has got)" }
          ],
          sentences: [
            { en: "She has curly hair.", tr: "Onun kıvırcık saçı var.", structure: "appearance" },
            { en: "What does she look like?", tr: "O neye benziyor?", structure: "appearance" },
            { en: "He is wearing glasses.", tr: "O gözlük takıyor.", structure: "appearance" }
          ]
        },
        {
          id: "t5-l3-have-you-got",
          title: "Ders 3 - Have You Got...? (Alışveriş)",
          structures: [
            { id: "have-got", label: "Sahiplik sorma (Have you got...?)" }
          ],
          sentences: [
            { en: "Have you got a map?", tr: "Haritan var mı?", structure: "have-got" },
            { en: "Yes, we have got a flute.", tr: "Evet, bir flütümüz var.", structure: "have-got" },
            { en: "No, we have not got glue.", tr: "Hayır, yapıştırıcımız yok.", structure: "have-got" }
          ]
        },
        {
          id: "t5-l4-getting-to-know-you",
          title: "Ders 4 - Getting to Know You (Kişisel Sorular)",
          structures: [
            { id: "personal-questions", label: "Kişisel soru sorma (how much / how many)" }
          ],
          sentences: [
            { en: "How many siblings do you have?", tr: "Kaç kardeşin var?", structure: "personal-questions" },
            { en: "How much water do you drink?", tr: "Ne kadar su içersin?", structure: "personal-questions" },
            { en: "I speak two languages.", tr: "İki dil konuşurum.", structure: "personal-questions" }
          ]
        },
        {
          id: "t5-l5-what-do-you-want-to-be",
          title: "Ders 5 - What Do You Want to Be? (Hayaller, Meslekler)",
          structures: [
            { id: "want-to-be", label: "Hayal ve istek belirtme (want to be)" }
          ],
          sentences: [
            { en: "I want to be a singer.", tr: "Şarkıcı olmak istiyorum.", structure: "want-to-be" },
            { en: "What do you want to be?", tr: "Ne olmak istiyorsun?", structure: "want-to-be" },
            { en: "She wants to be an artist.", tr: "O sanatçı olmak istiyor.", structure: "want-to-be" }
          ]
        },
        {
          id: "t5-l7-i-am-taller-than-you",
          title: "Ders 7 - I Am Taller than You (Karşılaştırma)",
          structures: [
            { id: "comparatives", label: "Karşılaştırma sıfatları (-er than)" }
          ],
          sentences: [
            { en: "I am taller than you.", tr: "Senden daha uzunum.", structure: "comparatives" },
            { en: "Who is younger?", tr: "Kim daha genç?", structure: "comparatives" },
            { en: "A teenager is older than a baby.", tr: "Bir ergen bebekten daha büyüktür.", structure: "comparatives" }
          ]
        },
        {
          id: "t5-l8-what-is-the-fastest-animal",
          title: "Ders 8 - What Is the Fastest Animal? (En Üstünlük)",
          structures: [
            { id: "superlatives", label: "En üstünlük sıfatları (the -est)" }
          ],
          sentences: [
            { en: "The cheetah is the fastest animal.", tr: "Çita en hızlı hayvandır.", structure: "superlatives" },
            { en: "What is the fastest animal?", tr: "En hızlı hayvan hangisi?", structure: "superlatives" },
            { en: "The sloth is the slowest animal.", tr: "Tembel hayvan en yavaş hayvandır.", structure: "superlatives" }
          ]
        },
        {
          id: "t5-l9-what-are-you-going-to-do",
          title: "Ders 9 - What Are You Going to Do? (Tatil Planları)",
          structures: [
            { id: "going-to", label: "Plan anlatma (going to)" }
          ],
          sentences: [
            { en: "I am going to stay at a hotel.", tr: "Bir otelde kalacağım.", structure: "going-to" },
            { en: "What are you going to do?", tr: "Ne yapacaksın?", structure: "going-to" },
            { en: "We are going to try new food.", tr: "Yeni yemekler deneyeceğiz.", structure: "going-to" }
          ]
        },
        {
          id: "t5-l10-can-i-have",
          title: "Ders 10 - Can I Have…? (Dünya Mutfağı)",
          structures: [
            { id: "requests", label: "Kibar istek (Can I have...?)" }
          ],
          sentences: [
            { en: "Can I have some ramen, please?", tr: "Biraz ramen alabilir miyim, lütfen?", structure: "requests" },
            { en: "Can I have a kebab?", tr: "Bir kebap alabilir miyim?", structure: "requests" },
            { en: "I would like some pasta.", tr: "Biraz makarna istiyorum.", structure: "requests" }
          ]
        },
        {
          id: "t5-l11-parts-of-speech",
          title: "Ders 11 - Parts of Speech (Sözcük Türleri)",
          structures: [
            { id: "word-classes", label: "Sözcük türleri (isim, sıfat, zarf)" }
          ],
          sentences: [
            { en: "The flower is beautiful.", tr: "Çiçek güzel.", structure: "word-classes" },
            { en: "She sings joyfully.", tr: "O neşeyle şarkı söyler.", structure: "word-classes" },
            { en: "He runs quickly.", tr: "O hızlıca koşar.", structure: "word-classes" }
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
          structures: [
            { id: "intensifiers", label: "Pekiştiricilerle duygu anlatma (very, really, quite, extremely)" }
          ],
          sentences: [
            { en: "I am very tired today.", tr: "Bugün çok yorgunum.", structure: "intensifiers" },
            { en: "She is really happy.", tr: "O gerçekten mutlu.", structure: "intensifiers" },
            { en: "The film was quite good.", tr: "Film oldukça iyiydi.", structure: "intensifiers" },
            { en: "It is extremely cold outside.", tr: "Dışarısı son derece soğuk.", structure: "intensifiers" }
          ]
        },
        {
          id: "t6-l2-making-requests",
          title: "Ders 2 - Making Requests (Otelde Rica Etme)",
          structures: [
            { id: "requests", label: "Kibarca rica etme ve karşılık verme" }
          ],
          sentences: [
            { en: "What would you like?", tr: "Ne istersiniz?", structure: "requests" },
            { en: "Could I have some towels, please?", tr: "Biraz havlu alabilir miyim, lütfen?", structure: "requests" },
            { en: "How can I help you?", tr: "Size nasıl yardımcı olabilirim?", structure: "requests" },
            { en: "I would like room service.", tr: "Oda servisi istiyorum.", structure: "requests" }
          ]
        },
        {
          id: "t6-l3-could-and-couldnt",
          title: "Ders 3 - Could and Couldn't (Geçmişteki Yetenek)",
          structures: [
            { id: "past-ability", label: "Geçmişteki yeteneği anlatma (could / couldn't)" }
          ],
          sentences: [
            { en: "I could climb the tree.", tr: "Ağaca tırmanabiliyordum.", structure: "past-ability" },
            { en: "She couldn't fix the bicycle.", tr: "O bisikleti tamir edemedi.", structure: "past-ability" },
            { en: "We could catch the ball.", tr: "Topu yakalayabiliyorduk.", structure: "past-ability" },
            { en: "He couldn't understand the language.", tr: "O dili anlayamıyordu.", structure: "past-ability" }
          ]
        },
        {
          id: "t6-l4-have-you-been-to-paris",
          title: "Ders 4 - Have You Been to Paris? (Yaşanmışlıklar)",
          structures: [
            { id: "experience", label: "Yaşanmışlık sorma ve anlatma (Have you been...?)" }
          ],
          sentences: [
            { en: "Have you been to Paris?", tr: "Paris'e gittin mi?", structure: "experience" },
            { en: "I have been to London.", tr: "Londra'ya gittim.", structure: "experience" },
            { en: "We have seen a fantastic waterfall.", tr: "Harika bir şelale gördük.", structure: "experience" }
          ]
        },
        {
          id: "t6-l5-i-have-been-living-here",
          title: "Ders 5 - I Have Been Living Here for Three Years (Süre)",
          structures: [
            { id: "duration", label: "Ne zamandır sürdüğünü anlatma (for / how long)" }
          ],
          sentences: [
            { en: "I have been living here for three years.", tr: "Üç yıldır burada yaşıyorum.", structure: "duration" },
            { en: "How long have you been a journalist?", tr: "Ne zamandır gazetecisin?", structure: "duration" },
            { en: "She has been reading about the huge castle.", tr: "O kocaman kale hakkında okuyor.", structure: "duration" }
          ]
        },
        {
          id: "t6-l7-the-bee-flew-to-the-flowers",
          title: "Ders 7 - The Bee Flew to the Flowers (Yer Edatları)",
          structures: [
            { id: "place-prepositions", label: "Yer edatlarıyla anlatma (in, on, along, to)" }
          ],
          sentences: [
            { en: "The bee flew to the flowers.", tr: "Arı çiçeklere uçtu.", structure: "place-prepositions" },
            { en: "The mouse ran along the street.", tr: "Fare sokak boyunca koştu.", structure: "place-prepositions" },
            { en: "The duck is on the boat.", tr: "Ördek teknenin üstünde.", structure: "place-prepositions" }
          ]
        },
        {
          id: "t6-l8-prepositions-of-time",
          title: "Ders 8 - Prepositions of Time (Zaman Edatları)",
          structures: [
            { id: "time-prepositions", label: "Zaman edatlarıyla program anlatma (in, at, on)" }
          ],
          sentences: [
            { en: "I get up in the morning.", tr: "Sabahları kalkarım.", structure: "time-prepositions" },
            { en: "We play football at the weekend.", tr: "Hafta sonu futbol oynarız.", structure: "time-prepositions" },
            { en: "My birthday is in summer.", tr: "Doğum günüm yazın.", structure: "time-prepositions" },
            { en: "She studies at night.", tr: "O geceleri ders çalışır.", structure: "time-prepositions" }
          ]
        },
        {
          id: "t6-l9-adverbs-order",
          title: "Ders 9 - Adverbs Order (Zarf Sıralaması)",
          structures: [
            { id: "adverb-order", label: "Zarfları sıraya koyma (yer, zaman, sıklık, tarz)" }
          ],
          sentences: [
            { en: "He takes pictures carefully in the city.", tr: "Şehirde dikkatlice fotoğraf çeker.", structure: "adverb-order" },
            { en: "The photographer works quickly every morning.", tr: "Fotoğrafçı her sabah hızlıca çalışır.", structure: "adverb-order" },
            { en: "She often puts her tripod on the stairs.", tr: "Tripodunu sık sık merdivene koyar.", structure: "adverb-order" }
          ]
        },
        {
          id: "t6-l10-which-milkshake-did-you-order",
          title: "Ders 10 - Which Milkshake Did You Order? (Geçmiş Zaman Soruları)",
          structures: [
            { id: "past-questions", label: "Geçmiş zamanda soru sorma (which, where, who, why)" }
          ],
          sentences: [
            { en: "Which milkshake did you order?", tr: "Hangi milkshake'i sipariş ettin?", structure: "past-questions" },
            { en: "Where did they eat the pancakes?", tr: "Krepleri nerede yediler?", structure: "past-questions" },
            { en: "Who cooked the meatballs?", tr: "Köfteleri kim pişirdi?", structure: "past-questions" },
            { en: "Why did he buy a mango?", tr: "Neden mango aldı?", structure: "past-questions" }
          ]
        },
        {
          id: "t6-l11-zero-conditional",
          title: "Ders 11 - Zero Conditional (Sıfır Koşul Cümlesi)",
          structures: [
            { id: "zero-conditional", label: "Genel doğruları anlatma (if / when + geniş zaman)" }
          ],
          sentences: [
            { en: "If you run fast, you get tired.", tr: "Hızlı koşarsan yorulursun.", structure: "zero-conditional" },
            { en: "When we win, we get a prize.", tr: "Kazandığımızda ödül alırız.", structure: "zero-conditional" },
            { en: "If he scores a goal, the team cheers.", tr: "Gol atarsa takım tezahürat yapar.", structure: "zero-conditional" }
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
          structures: [
            { id: "phrasal-verbs", label: "Öbek fiillerle günlük olayları anlatma (take up, get to, get over)" }
          ],
          sentences: [
            { en: "She took up volleyball last year.", tr: "Geçen yıl voleybola başladı.", structure: "phrasal-verbs" },
            { en: "He gets to work at eight.", tr: "Sekizde işe varır.", structure: "phrasal-verbs" },
            { en: "She is getting better after her illness.", tr: "Hastalığından sonra iyileşiyor.", structure: "phrasal-verbs" },
            { en: "My parents brought me up in a flat.", tr: "Ailem beni bir dairede büyüttü.", structure: "phrasal-verbs" }
          ]
        },
        {
          id: "t7-l2-first-conditional",
          title: "Ders 2 - First Conditional (Birinci Koşul, Güvenlik)",
          structures: [
            { id: "first-conditional", label: "Olası durumları anlatma (if + geniş zaman, will)" }
          ],
          sentences: [
            { en: "If I don't understand, I will ask you.", tr: "Anlamazsam sana sorarım.", structure: "first-conditional" },
            { en: "If a fire starts, I will leave quickly.", tr: "Yangın çıkarsa hızlıca çıkarım.", structure: "first-conditional" },
            { en: "She will not pass if she doesn't study.", tr: "Çalışmazsa sınıfı geçemeyecek.", structure: "first-conditional" },
            { en: "If you wear a seatbelt, you will be safe.", tr: "Emniyet kemeri takarsan güvende olursun.", structure: "first-conditional" }
          ]
        },
        {
          id: "t7-l3-giving-opinions",
          title: "Ders 3 - Giving Opinions (Film ve Kitap Yorumu)",
          structures: [
            { id: "opinions", label: "Film ve kitap hakkında görüş bildirme" }
          ],
          sentences: [
            { en: "I loved it.", tr: "Bayıldım.", structure: "opinions" },
            { en: "The characters were fascinating.", tr: "Karakterler büyüleyiciydi.", structure: "opinions" },
            { en: "The plot was creative.", tr: "Olay örgüsü yaratıcıydı.", structure: "opinions" },
            { en: "The costumes were not good.", tr: "Kostümler iyi değildi.", structure: "opinions" }
          ]
        },
        {
          id: "t7-l4-making-suggestions",
          title: "Ders 4 - Making Suggestions (Öneride Bulunma)",
          structures: [
            { id: "suggestions", label: "Öneri yapma (could, should, shall)" }
          ],
          sentences: [
            { en: "What should we do on a day off?", tr: "İzin gününde ne yapmalıyız?", structure: "suggestions" },
            { en: "When shall we go sightseeing?", tr: "Ne zaman gezmeye gidelim?", structure: "suggestions" },
            { en: "Who could we invite to the party?", tr: "Partiye kimi davet edebiliriz?", structure: "suggestions" }
          ]
        },
        {
          id: "t7-l5-busy-mondays-at-school",
          title: "Ders 5 - Busy Mondays at School (Edat + Sıfat)",
          structures: [
            { id: "adjective-prepositions", label: "Sıfat + edat kalıpları (good at, worried about, afraid of)" }
          ],
          sentences: [
            { en: "I am good at chemistry.", tr: "Kimyada iyiyim.", structure: "adjective-prepositions" },
            { en: "She is worried about the assignment.", tr: "Ödev konusunda endişeli.", structure: "adjective-prepositions" },
            { en: "He is afraid of the maths test.", tr: "Matematik sınavından korkuyor.", structure: "adjective-prepositions" },
            { en: "They are interested in rugby.", tr: "Ragbi ile ilgileniyorlar.", structure: "adjective-prepositions" }
          ]
        },
        {
          id: "t7-l7-you-dont-have-to-bring-a-blanket",
          title: "Ders 7 - You Don't Have to Bring a Blanket (Zorunluluk)",
          structures: [
            { id: "obligation", label: "Zorunluluk ve yasak (must, have to, mustn't)" }
          ],
          sentences: [
            { en: "You must bring a water bottle.", tr: "Su şişesi getirmelisin.", structure: "obligation" },
            { en: "You don't have to bring a blanket.", tr: "Battaniye getirmek zorunda değilsin.", structure: "obligation" },
            { en: "We mustn't hurt the environment.", tr: "Çevreye zarar vermemeliyiz.", structure: "obligation" },
            { en: "I have to pack my sleeping bag.", tr: "Uyku tulumumu toplamak zorundayım.", structure: "obligation" }
          ]
        },
        {
          id: "t7-l8-negative-future-tense",
          title: "Ders 8 - Negative Future Tense (Olumsuz Gelecek Zaman)",
          structures: [
            { id: "negative-future", label: "Olumsuz gelecek zaman (won't, definitely, probably)" }
          ],
          sentences: [
            { en: "I will not be a pilot.", tr: "Pilot olmayacağım.", structure: "negative-future" },
            { en: "She will definitely win the competition.", tr: "Yarışmayı kesinlikle kazanacak.", structure: "negative-future" },
            { en: "He will probably not finish the race.", tr: "Yarışı muhtemelen bitirmeyecek.", structure: "negative-future" },
            { en: "They won't watch television tonight.", tr: "Bu akşam televizyon izlemeyecekler.", structure: "negative-future" }
          ]
        },
        {
          id: "t7-l9-prepositional-phrase-island",
          title: "Ders 9 - Prepositional Phrase Island (Edat Öbekleri)",
          structures: [
            { id: "prepositional-phrases", label: "Edat öbekleri (above, below, far, since, until, get on/off)" }
          ],
          sentences: [
            { en: "The rainbow is above the skyscraper.", tr: "Gökkuşağı gökdelenin üstünde.", structure: "prepositional-phrases" },
            { en: "We get off the bus at the airport.", tr: "Otobüsten havalimanında ineriz.", structure: "prepositional-phrases" },
            { en: "I have been here since Monday.", tr: "Pazartesiden beri buradayım.", structure: "prepositional-phrases" },
            { en: "The caves are far below the castles.", tr: "Mağaralar kalelerin çok altında.", structure: "prepositional-phrases" }
          ]
        },
        {
          id: "t7-l10-sentence-connectors",
          title: "Ders 10 - Sentence Connectors (Bağlaçlar, İklim)",
          structures: [
            { id: "connectors", label: "Cümleleri bağlama (and, because, then, and then)" }
          ],
          sentences: [
            { en: "Climate change is real, and we must act.", tr: "İklim değişikliği gerçek ve harekete geçmeliyiz.", structure: "connectors" },
            { en: "We use renewable energy because it is clean.", tr: "Yenilenebilir enerji kullanıyoruz çünkü temiz.", structure: "connectors" },
            { en: "Plant trees, and then our carbon footprint falls.", tr: "Ağaç dikin, sonra karbon ayak izimiz düşer.", structure: "connectors" }
          ]
        },
        {
          id: "t7-l11-storytelling",
          title: "Ders 11 - Storytelling (Hikâye Anlatımı)",
          structures: [
            { id: "storytelling", label: "Hikâye ögeleri (karakter, olay örgüsü, mekân)" }
          ],
          sentences: [
            { en: "The main character was a brave king.", tr: "Ana karakter cesur bir kraldı.", structure: "storytelling" },
            { en: "The story is set in a dark castle.", tr: "Hikâye karanlık bir kalede geçiyor.", structure: "storytelling" },
            { en: "A dragon and a witch fought the queen.", tr: "Bir ejderha ve bir cadı kraliçeyle savaştı.", structure: "storytelling" }
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
          structures: [
            { id: "comparatives", label: "Karşılaştırma ve üstünlük (more, -er, the most, as...as)" }
          ],
          sentences: [
            { en: "Krakens are stronger than griffins.", tr: "Krakenler grifonlardan daha güçlüdür.", structure: "comparatives" },
            { en: "I believe they are the most impressive creatures.", tr: "Bence onlar en etkileyici yaratıklar.", structure: "comparatives" },
            { en: "It's as strong as a lion.", tr: "Bir aslan kadar güçlü.", structure: "comparatives" },
            { en: "The griffin is more frightening than the kraken.", tr: "Grifon krakenden daha korkutucu.", structure: "comparatives" }
          ]
        },
        {
          id: "t8-l2-whats-it-like-outside",
          title: "Ders 2 - What's It Like Outside? (Hava Durumu, Olasılık)",
          structures: [
            { id: "probability", label: "Olasılık belirtme (might, may, will, probably)" }
          ],
          sentences: [
            { en: "It might hail tomorrow.", tr: "Yarın dolu yağabilir.", structure: "probability" },
            { en: "It will probably be freezing tonight.", tr: "Bu gece muhtemelen dondurucu olacak.", structure: "probability" },
            { en: "It may be misty in the morning.", tr: "Sabah sisli olabilir.", structure: "probability" }
          ]
        },
        {
          id: "t8-l3-video-games-or-board-games",
          title: "Ders 3 - Video Games or Board Games? (Katılma ve Karşı Çıkma)",
          structures: [
            { id: "agreeing", label: "Katılma ve karşı çıkma kalıpları" }
          ],
          sentences: [
            { en: "I'm on the same page.", tr: "Ben de aynı fikirdeyim.", structure: "agreeing" },
            { en: "That's a good point.", tr: "Bu iyi bir nokta.", structure: "agreeing" },
            { en: "That's true, but the graphics are better.", tr: "Doğru ama grafikler daha iyi.", structure: "agreeing" },
            { en: "I'm not so sure about that.", tr: "Bundan pek emin değilim.", structure: "agreeing" },
            { en: "I'm sorry, but I disagree.", tr: "Üzgünüm ama katılmıyorum.", structure: "agreeing" }
          ]
        },
        {
          id: "t8-l4-what-are-you-doing-this-weekend",
          title: "Ders 4 - What Are You Doing This Weekend? (Gelecekte Sürekli)",
          structures: [
            { id: "future-continuous", label: "Gelecekte sürekli zamanla plan anlatma (will be + -ing)" }
          ],
          sentences: [
            { en: "I will be moving house at the weekend.", tr: "Hafta sonu taşınıyor olacağım.", structure: "future-continuous" },
            { en: "We will be visiting a museum on Sunday.", tr: "Pazar günü müze geziyor olacağız.", structure: "future-continuous" },
            { en: "She will be staying in this weekend.", tr: "Bu hafta sonu evde kalıyor olacak.", structure: "future-continuous" }
          ]
        },
        {
          id: "t8-l5-putting-it-all-together",
          title: "Ders 5 - Putting It All Together (put Öbek Fiilleri)",
          structures: [
            { id: "put-phrasal-verbs", label: "put ile öbek fiiller (put away, put up, put off, put up with)" }
          ],
          sentences: [
            { en: "Han put up two shelves last weekend.", tr: "Han geçen hafta sonu iki raf astı.", structure: "put-phrasal-verbs" },
            { en: "Let's not put off the chores.", tr: "Ev işlerini ertelemeyelim.", structure: "put-phrasal-verbs" },
            { en: "Remember to put away your things.", tr: "Eşyalarını kaldırmayı unutma.", structure: "put-phrasal-verbs" },
            { en: "I'm tired of putting up with the mess.", tr: "Dağınıklığa katlanmaktan yoruldum.", structure: "put-phrasal-verbs" }
          ]
        },
        {
          id: "t8-l7-what-am-i-doing-today",
          title: "Ders 7 - What Am I Doing Today? (should have / might have)",
          structures: [
            { id: "past-modals", label: "Geçmişe yönelik kipler (should have, might have)" }
          ],
          sentences: [
            { en: "I should have cleaned my cluttered room.", tr: "Eşya dolu odamı toplamalıydım.", structure: "past-modals" },
            { en: "She might have gone to the bustling market.", tr: "Hareketli pazara gitmiş olabilir.", structure: "past-modals" },
            { en: "We should have chosen a peaceful place.", tr: "Huzurlu bir yer seçmeliydik.", structure: "past-modals" }
          ]
        },
        {
          id: "t8-l8-hypotheticals",
          title: "Ders 8 - Hypotheticals (2. ve 3. Koşul, Teknoloji)",
          structures: [
            { id: "hypotheticals", label: "İkinci ve üçüncü koşul cümleleri (varsayım)" }
          ],
          sentences: [
            { en: "What would you do if you were a gamer?", tr: "Oyuncu olsan ne yapardın?", structure: "hypotheticals" },
            { en: "If I were a gamer, I would have the best gear.", tr: "Oyuncu olsaydım en iyi ekipmana sahip olurdum.", structure: "hypotheticals" },
            { en: "If I had been faster, I would have won.", tr: "Daha hızlı olsaydım kazanırdım.", structure: "hypotheticals" }
          ]
        },
        {
          id: "t8-l9-a-letter-to-a-pen-pal",
          title: "Ders 9 - A Letter to a Pen Pal (Mektup Yazma)",
          structures: [
            { id: "letter-writing", label: "Mektup kalıpları (Dear..., Best wishes, write back)" }
          ],
          sentences: [
            { en: "Dear Ali, I hope you are well.", tr: "Sevgili Ali, umarım iyisindir.", structure: "letter-writing" },
            { en: "Please write back soon.", tr: "Lütfen yakında cevap yaz.", structure: "letter-writing" },
            { en: "I look forward to hearing back from you.", tr: "Senden haber almayı dört gözle bekliyorum.", structure: "letter-writing" },
            { en: "Best wishes, your pen pal.", tr: "En iyi dileklerimle, mektup arkadaşın.", structure: "letter-writing" }
          ]
        },
        {
          id: "t8-l10-seriously-fun-rides",
          title: "Ders 10 - Seriously Fun Rides (Pekiştiriciler, Lunapark)",
          structures: [
            { id: "intensifiers-adverbs", label: "Pekiştirici ve zarflar (too, enough, totally, absolutely)" }
          ],
          sentences: [
            { en: "The Ferris wheel was tall enough to see the city.", tr: "Dönme dolap şehri görecek kadar yüksekti.", structure: "intensifiers-adverbs" },
            { en: "The water slide was too scary for little kids.", tr: "Su kaydırağı küçük çocuklar için fazla korkutucuydu.", structure: "intensifiers-adverbs" },
            { en: "The theme park was totally crowded at the weekend.", tr: "Lunapark hafta sonu tamamen kalabalıktı.", structure: "intensifiers-adverbs" },
            { en: "I was absolutely amazed by the view.", tr: "Manzara karşısında kesinlikle hayran kaldım.", structure: "intensifiers-adverbs" }
          ]
        },
        {
          id: "t8-l11-looking-around-london",
          title: "Ders 11 - Looking around London (look Öbek Fiilleri)",
          structures: [
            { id: "look-phrasal-verbs", label: "look ile öbek fiiller (look into, look through, look around)" }
          ],
          sentences: [
            { en: "The investigator looked into the mystery.", tr: "Araştırmacı gizemi araştırdı.", structure: "look-phrasal-verbs" },
            { en: "She looked through the old photographs.", tr: "Eski fotoğraflara göz gezdirdi.", structure: "look-phrasal-verbs" },
            { en: "We looked around the house for a clue.", tr: "Bir ipucu için evin içini gezdik.", structure: "look-phrasal-verbs" },
            { en: "Look out for the suspect.", tr: "Şüpheliye dikkat et.", structure: "look-phrasal-verbs" }
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
          structures: [
            { id: "time-prepositions-9", label: "Zaman edatlarıyla olayları sıralama (before, during, since, until)" }
          ],
          sentences: [
            { en: "Before the internet, people sent letters.", tr: "İnternetten önce insanlar mektup gönderirdi.", structure: "time-prepositions-9" },
            { en: "From the 1960s to the 1990s.", tr: "1960'lardan 1990'lara kadar.", structure: "time-prepositions-9" },
            { en: "Since then, the internet has been available to everyone.", tr: "O zamandan beri internet herkese açık.", structure: "time-prepositions-9" },
            { en: "We have been using the internet every day until now.", tr: "Şimdiye kadar her gün interneti kullanıyoruz.", structure: "time-prepositions-9" }
          ]
        },
        {
          id: "t9-l2-lets-help-ourselves-relax",
          title: "Ders 2 - Let's Help Ourselves Relax (Dönüşlü Zamirler)",
          structures: [
            { id: "reflexive-pronouns", label: "Dönüşlü zamirler (myself, yourself, ourselves)" }
          ],
          sentences: [
            { en: "I try to tell myself to relax.", tr: "Kendime rahatlamamı söylemeye çalışıyorum.", structure: "reflexive-pronouns" },
            { en: "It's important to look after ourselves.", tr: "Kendimize iyi bakmamız önemli.", structure: "reflexive-pronouns" },
            { en: "Remember to take care of yourself!", tr: "Kendine iyi bakmayı unutma!", structure: "reflexive-pronouns" }
          ]
        },
        {
          id: "t9-l3-he-said-you-should-visit-the-island",
          title: "Ders 3 - He Said You Should Visit the Island (Aktarma Cümleleri)",
          structures: [
            { id: "reported-speech", label: "Aktarma cümleleri (said, told, mentioned, suggested)" }
          ],
          sentences: [
            { en: "He said that the ferry was late.", tr: "Feribotun geciktiğini söyledi.", structure: "reported-speech" },
            { en: "He suggested visiting the rainforest.", tr: "Yağmur ormanını gezmeyi önerdi.", structure: "reported-speech" },
            { en: "A friend of mine told me about the coasts.", tr: "Bir arkadaşım bana kıyılardan bahsetti.", structure: "reported-speech" },
            { en: "He recommended a tour of the port.", tr: "Limanda bir tur önerdi.", structure: "reported-speech" }
          ]
        },
        {
          id: "t9-l4-sign-up-for-an-online-course",
          title: "Ders 4 - Sign Up for an Online Course (Teknoloji Öbek Fiilleri)",
          structures: [
            { id: "tech-phrasal-verbs", label: "Teknoloji öbek fiilleri (sign up, log in, click on, plug in)" }
          ],
          sentences: [
            { en: "Click on the icon.", tr: "Simgeye tıkla.", structure: "tech-phrasal-verbs" },
            { en: "You can sign up for many online courses.", tr: "Birçok çevrimiçi kursa kaydolabilirsin.", structure: "tech-phrasal-verbs" },
            { en: "Remember to log out of your account.", tr: "Hesabından çıkış yapmayı unutma.", structure: "tech-phrasal-verbs" },
            { en: "Plug in the headphones and scroll down.", tr: "Kulaklığı fişe tak ve aşağı kaydır.", structure: "tech-phrasal-verbs" }
          ]
        },
        {
          id: "t9-l5-ancient-mysteries",
          title: "Ders 5 - Ancient Mysteries (Geçmişe Yönelik Tahmin)",
          structures: [
            { id: "speculation", label: "Geçmişe yönelik tahmin (might have, could have, must have been)" }
          ],
          sentences: [
            { en: "It might have been an ancient civilisation.", tr: "Antik bir uygarlık olmuş olabilir.", structure: "speculation" },
            { en: "The story could have been a myth.", tr: "Hikâye bir efsane olabilirdi.", structure: "speculation" },
            { en: "They must have found new evidence.", tr: "Yeni kanıt bulmuş olmalılar.", structure: "speculation" }
          ]
        },
        {
          id: "t9-l7-the-end-of-school-celebration",
          title: "Ders 7 - The End of School Celebration (Koşullu Teklif)",
          structures: [
            { id: "conditional-offers", label: "Koşullu teklif yapma (If you bring..., I can bring...)" }
          ],
          sentences: [
            { en: "If you bring the refreshments, I can bring the games.", tr: "İkramlıkları sen getirirsen oyunları ben getirebilirim.", structure: "conditional-offers" },
            { en: "If I make the flyers, will you hand them out?", tr: "El ilanlarını ben yaparsam sen dağıtır mısın?", structure: "conditional-offers" },
            { en: "If you put up the balloons, I can help.", tr: "Balonları asarsan yardım edebilirim.", structure: "conditional-offers" }
          ]
        },
        {
          id: "t9-l8-stick-with-it",
          title: "Ders 8 - Stick With It (Spor Öbek Fiilleri)",
          structures: [
            { id: "exercise-phrasal-verbs", label: "Spor öbek fiilleri (warm up, cool down, work out, keep up)" }
          ],
          sentences: [
            { en: "Have you been working out lately?", tr: "Son zamanlarda spor yapıyor musun?", structure: "exercise-phrasal-verbs" },
            { en: "Warm up properly before you start.", tr: "Başlamadan önce düzgünce ısın.", structure: "exercise-phrasal-verbs" },
            { en: "I've been trying to build up my strength.", tr: "Gücümü kademeli olarak artırmaya çalışıyorum.", structure: "exercise-phrasal-verbs" },
            { en: "Maybe we can motivate each other to stick with it.", tr: "Belki bırakmamak için birbirimizi motive ederiz.", structure: "exercise-phrasal-verbs" }
          ]
        },
        {
          id: "t9-l9-has-the-festival-started-already",
          title: "Ders 9 - Has the Festival Started Already? (yet, still, just, already)",
          structures: [
            { id: "present-perfect-adverbs", label: "Yakın geçmiş zarfları (yet, still, just, already)" }
          ],
          sentences: [
            { en: "Have you finished the preparations yet?", tr: "Hazırlıkları bitirdin mi?", structure: "present-perfect-adverbs" },
            { en: "I still have a lot of work to do.", tr: "Hâlâ yapacak çok işim var.", structure: "present-perfect-adverbs" },
            { en: "I've already found a venue.", tr: "Çoktan bir mekân buldum.", structure: "present-perfect-adverbs" },
            { en: "I've just finished my homework.", tr: "Ödevimi yeni bitirdim.", structure: "present-perfect-adverbs" }
          ]
        },
        {
          id: "t9-l10-behind-the-scenes",
          title: "Ders 10 - Behind the Scenes (Ön Ekler)",
          structures: [
            { id: "prefixes", label: "Fiillerde ön ekler (redo, rewrite, underline, re-record)" }
          ],
          sentences: [
            { en: "Please redo the last scene.", tr: "Son sahneyi lütfen yeniden çek.", structure: "prefixes" },
            { en: "Underline the presenter's lines.", tr: "Sunucunun repliklerinin altını çiz.", structure: "prefixes" },
            { en: "We must rewrite this episode.", tr: "Bu bölümü yeniden yazmalıyız.", structure: "prefixes" },
            { en: "The producer asked us to re-record it.", tr: "Yapımcı onu yeniden kaydetmemizi istedi.", structure: "prefixes" }
          ]
        },
        {
          id: "t9-l11-lost-treasure",
          title: "Ders 11 - Lost Treasure (Soru Ekleri)",
          structures: [
            { id: "question-tags", label: "Soru ekleri (is there?, isn't she?, don't you?)" }
          ],
          sentences: [
            { en: "There's nothing strange about that, is there?", tr: "Bunda tuhaf bir şey yok, değil mi?", structure: "question-tags" },
            { en: "She's such a great crew member, isn't she?", tr: "O harika bir mürettebat üyesi, değil mi?", structure: "question-tags" },
            { en: "I think it's a little odd, don't you?", tr: "Bence biraz tuhaf, sence de öyle değil mi?", structure: "question-tags" },
            { en: "We're ready to solve this mystery, aren't we?", tr: "Bu gizemi çözmeye hazırız, değil mi?", structure: "question-tags" }
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
          structures: [
            { id: "imperatives", label: "Emir kipiyle yemek tarifi verme" }
          ],
          sentences: [
            { en: "Take the mat.", tr: "Hasırı al.", structure: "imperatives" },
            { en: "Place the seaweed on top.", tr: "Deniz yosununu üstüne yerleştir.", structure: "imperatives" },
            { en: "Mix the rice and sauce together.", tr: "Pirinci ve sosu birlikte karıştır.", structure: "imperatives" }
          ]
        },
        {
          id: "t10-l2-what-were-people-doing-in-1986",
          title: "Ders 2 - What Were People Doing in 1986? (Geçmişte Sürekli)",
          structures: [
            { id: "past-continuous", label: "Geçmişte sürekli ve geçmiş zamanı birlikte kullanma" }
          ],
          sentences: [
            { en: "The couple was standing under a tree.", tr: "Çift bir ağacın altında duruyordu.", structure: "past-continuous" },
            { en: "I was digging a hole when I hit something hard.", tr: "Bir çukur kazarken sert bir şeye çarptım.", structure: "past-continuous" },
            { en: "People were wearing bright clothes back then.", tr: "İnsanlar o zamanlar parlak kıyafetler giyiyordu.", structure: "past-continuous" }
          ]
        },
        {
          id: "t10-l3-all-on-board-to-the-isle-of-lewis",
          title: "Ders 3 - All On Board to the Isle of Lewis (Yolculuk Edatları)",
          structures: [
            { id: "travel-prepositions", label: "Yolculuk edat ve öbek fiilleri (get on, get off, get in, get out, by)" }
          ],
          sentences: [
            { en: "We packed all our bags in the car.", tr: "Bütün çantalarımızı arabaya yerleştirdik.", structure: "travel-prepositions" },
            { en: "We got on the ferry just in time.", tr: "Feribota tam zamanında bindik.", structure: "travel-prepositions" },
            { en: "It was time to get out of the car.", tr: "Arabadan inme vaktiydi.", structure: "travel-prepositions" },
            { en: "After travelling by sea, it was nice to be on land.", tr: "Deniz yolculuğundan sonra karada olmak güzeldi.", structure: "travel-prepositions" }
          ]
        },
        {
          id: "t10-l4-finding-the-cafe-in-twinklton",
          title: "Ders 4 - Finding the Cafe in Twinklton (Yer Zarfları)",
          structures: [
            { id: "place-adverbs", label: "Yer zarflarıyla yol tarifi (nearby, ahead, across, straight)" }
          ],
          sentences: [
            { en: "What do you see nearby?", tr: "Yakınında ne görüyorsun?", structure: "place-adverbs" },
            { en: "Keep going straight until you reach the corner.", tr: "Köşeye varana kadar düz devam et.", structure: "place-adverbs" },
            { en: "You should see a river ahead.", tr: "İleride bir nehir görmelisin.", structure: "place-adverbs" },
            { en: "The food truck is across the street.", tr: "Yemek arabası caddenin karşısında.", structure: "place-adverbs" }
          ]
        },
        {
          id: "t10-l5-remember-to-order",
          title: "Ders 5 - Remember to Order (Mastar ve -ing Farkı)",
          structures: [
            { id: "gerund-infinitive", label: "Anlamı değiştiren mastar / -ing (remember, forget, stop, try)" }
          ],
          sentences: [
            { en: "I have to remember to order sticky notes.", tr: "Yapışkan not sipariş etmeyi unutmamalıyım.", structure: "gerund-infinitive" },
            { en: "Do you remember ordering the coloured tape?", tr: "Renkli bandı sipariş ettiğini hatırlıyor musun?", structure: "gerund-infinitive" },
            { en: "Try putting the pens next to the diaries.", tr: "Kalemleri ajandaların yanına koymayı dene.", structure: "gerund-infinitive" },
            { en: "I stopped to buy you a little cake.", tr: "Sana küçük bir kek almak için durdum.", structure: "gerund-infinitive" }
          ]
        },
        {
          id: "t10-l7-when-books-are-made-into-movies",
          title: "Ders 7 - When Books Are Made Into Movies (Edilgen Çatı)",
          structures: [
            { id: "passive-voice", label: "Edilgen çatı (is based on, was written by, has been translated)" }
          ],
          sentences: [
            { en: "Many movies are based on books these days.", tr: "Bugünlerde birçok film kitaplara dayanıyor.", structure: "passive-voice" },
            { en: "The script was written by the author.", tr: "Senaryo yazar tarafından yazıldı.", structure: "passive-voice" },
            { en: "The book has been translated into fifty languages.", tr: "Kitap elli dile çevrildi.", structure: "passive-voice" },
            { en: "The plot must be kept secret.", tr: "Olay örgüsü gizli tutulmalı.", structure: "passive-voice" }
          ]
        },
        {
          id: "t10-l8-they-told-us-to-be-calm",
          title: "Ders 8 - They Told Us to Be Calm (Aktarma, Güvenlik)",
          structures: [
            { id: "reported-instructions", label: "Aktarılan talimatlar (told us to, warned us not to, reminded us)" }
          ],
          sentences: [
            { en: "She told us to stay calm.", tr: "Bize sakin kalmamızı söyledi.", structure: "reported-instructions" },
            { en: "The officer warned us not to use lifts.", tr: "Görevli bizi asansör kullanmamamız için uyardı.", structure: "reported-instructions" },
            { en: "She reminded us to check the poster.", tr: "Bize afişi kontrol etmemizi hatırlattı.", structure: "reported-instructions" }
          ]
        },
        {
          id: "t10-l9-i-used-to-love-pottery",
          title: "Ders 9 - I Used to Love Pottery (used to)",
          structures: [
            { id: "used-to", label: "Geçmişteki alışkanlıklar (used to, would)" }
          ],
          sentences: [
            { en: "I used to be super into pottery.", tr: "Eskiden çömlekçiliğe çok meraklıydım.", structure: "used-to" },
            { en: "We would go to art galleries every weekend.", tr: "Her hafta sonu sanat galerilerine giderdik.", structure: "used-to" },
            { en: "I used to like painting sometimes.", tr: "Eskiden bazen resim yapmayı severdim.", structure: "used-to" }
          ]
        },
        {
          id: "t10-l10-where-had-you-been-before",
          title: "Ders 10 - Where Had You Been Before? (Geçmişin Geçmişi)",
          structures: [
            { id: "past-perfect", label: "Geçmişin geçmişi (had + 3. hâl)" }
          ],
          sentences: [
            { en: "By the time we got home, the movie had begun.", tr: "Biz eve vardığımızda film başlamıştı.", structure: "past-perfect" },
            { en: "I missed the bus because I had left home late.", tr: "Otobüsü kaçırdım çünkü evden geç çıkmıştım.", structure: "past-perfect" },
            { en: "She had finished her homework before she went out.", tr: "Dışarı çıkmadan önce ödevini bitirmişti.", structure: "past-perfect" }
          ]
        },
        {
          id: "t10-l11-a-trip-to-the-moon",
          title: "Ders 11 - A Trip to the Moon (Birleşik İsimler)",
          structures: [
            { id: "compound-nouns", label: "Birleşik isimler (space station, solar system, outer space)" }
          ],
          sentences: [
            { en: "Space exploration tells us a lot about our solar system.", tr: "Uzay araştırmaları bize güneş sistemimiz hakkında çok şey anlatır.", structure: "compound-nouns" },
            { en: "We are preparing to visit the space station.", tr: "Uzay istasyonunu ziyaret etmeye hazırlanıyoruz.", structure: "compound-nouns" },
            { en: "I was excited to return home from outer space.", tr: "Uzay boşluğundan eve dönmek için heyecanlıydım.", structure: "compound-nouns" }
          ]
        }
      ]
    }
  };

  // sentences.js yüklenmediyse sessizce çık.
  if (typeof SENTENCES === "undefined") return;

  Object.keys(LEVELS).forEach(function (key) {
    SENTENCES[key] = LEVELS[key];
  });
})();
