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
            { en: "They are apples.", tr: "Onlar elmalar.", structure: "they-are" },
            { en: "What are they?", tr: "Onlar nedir?", structure: "they-are" },
            { en: "They are potatoes.", tr: "Onlar patatesler.", structure: "they-are" }
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
            { en: "Those are bikes.", tr: "Onlar bisikletler.", structure: "demonstratives" },
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
            { en: "She baked a cake.", tr: "O kek yaptı.", structure: "past-simple" }
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
            { en: "We saw a big whale.", tr: "Büyük bir balina gördük.", structure: "irregular-past" }
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
    }
  };

  // sentences.js yüklenmediyse sessizce çık.
  if (typeof SENTENCES === "undefined") return;

  Object.keys(LEVELS).forEach(function (key) {
    SENTENCES[key] = LEVELS[key];
  });
})();
