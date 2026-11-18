/*
 * Sınıf/ünite bazlı "Cümle Kurma" veritabanı. `curriculum.js`'teki kelime
 * havuzunun aksine burada tam cümleler var; her cümle o ünitenin
 * kazanımındaki bir dil yapısına/işlevine (`structure`) bağlanır — amaç
 * rastgele kelime karmaşası değil, ünitenin öğrettiği kalıbı pratik
 * ettirmek (örn. "be from + ülke", "there is/are", emir cümleleri).
 *
 * Kapsam: MEB 5-8. sınıfların 38 ünitesinin tamamı (5/Ünite 1: 2026-08-28,
 * kalan 37 ünite: 2026-11-18 — gramer veritabanıyla aynı yapı eşleştirmesi,
 * bkz. data/grammar.js).
 *
 * ⚠️ TASLAK: Yapı/işlev ataması ve cümleler genel
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
    group: "MEB Ortaokul (5-8. Sınıf)",
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
      },
      {
        id: "theme2-classroom-life",
        title: "Ünite 2 - Classroom Life (Sınıf Hayatı)",
        structures: [
          { id: "commands", label: "Sınıf kuralları ve emir cümleleri (Open..., Don't...)" },
          { id: "requests", label: "İzin isteme (Can I...?)" },
          { id: "classroom", label: "Sınıfı anlatma (There is / there are)" }
        ],
        sentences: [
          { en: "Open your books, please.", tr: "Lütfen kitaplarınızı açın.", structure: "commands" },
          { en: "Don't run in the classroom.", tr: "Sınıfta koşmayın.", structure: "commands" },
          { en: "Listen to your teacher carefully.", tr: "Öğretmenini dikkatle dinle.", structure: "commands" },
          { en: "Can I borrow your eraser?", tr: "Silgini ödünç alabilir miyim?", structure: "requests" },
          { en: "Can I open the window, please?", tr: "Pencereyi açabilir miyim, lütfen?", structure: "requests" },
          { en: "There are twenty desks in our classroom.", tr: "Sınıfımızda yirmi sıra var.", structure: "classroom" },
          { en: "There is a map on the wall.", tr: "Duvarda bir harita var.", structure: "classroom" }
        ]
      },
      {
        id: "theme3-personal-life",
        title: "Ünite 3 - Personal Life (Kişisel Hayat)",
        structures: [
          { id: "ability", label: "Yetenekleri söyleme (can / can't)" },
          { id: "likes", label: "Sevdiklerini / sevmediklerini söyleme" },
          { id: "looks", label: "Görünüşü anlatma (has got)" }
        ],
        sentences: [
          { en: "I can play the guitar.", tr: "Gitar çalabilirim.", structure: "ability" },
          { en: "My sister can't swim.", tr: "Kız kardeşim yüzemez.", structure: "ability" },
          { en: "I like playing chess with my dad.", tr: "Babamla satranç oynamayı severim.", structure: "likes" },
          { en: "He doesn't like spinach.", tr: "O ıspanak sevmez.", structure: "likes" },
          { en: "She has got long brown hair.", tr: "Onun uzun kahverengi saçları var.", structure: "looks" },
          { en: "I have got blue eyes.", tr: "Mavi gözlerim var.", structure: "looks" }
        ]
      },
      {
        id: "theme4-family-life",
        title: "Ünite 4 - Family Life (Aile Hayatı)",
        structures: [
          { id: "family", label: "Aile üyelerini tanıtma (my, his, her, 's)" },
          { id: "jobs", label: "Meslekleri sorma ve söyleme (What does he do?)" }
        ],
        sentences: [
          { en: "This is my grandmother.", tr: "Bu benim büyükannem.", structure: "family" },
          { en: "My father's name is Murat.", tr: "Babamın adı Murat.", structure: "family" },
          { en: "Her brother is a police officer.", tr: "Onun erkek kardeşi polis memuru.", structure: "jobs" },
          { en: "What does your mother do?", tr: "Annen ne iş yapar?", structure: "jobs" },
          { en: "My uncle works in a hospital.", tr: "Amcam bir hastanede çalışır.", structure: "jobs" },
          { en: "My grandparents live on a farm.", tr: "Büyükannemle büyükbabam bir çiftlikte yaşar.", structure: "family" }
        ]
      },
      {
        id: "theme5-neighbourhood-city",
        title: "Ünite 5 - Life in the Neighbourhood and City (Mahalle ve Şehir Hayatı)",
        structures: [
          { id: "directions", label: "Yol tarifi verme (Go straight, turn left)" },
          { id: "places", label: "Yerlerin konumunu söyleme (next to, between)" }
        ],
        sentences: [
          { en: "Go straight and turn left.", tr: "Düz git ve sola dön.", structure: "directions" },
          { en: "Turn right at the traffic lights.", tr: "Trafik ışıklarında sağa dön.", structure: "directions" },
          { en: "The bakery is next to the bank.", tr: "Fırın bankanın yanında.", structure: "places" },
          { en: "The park is between the school and the hospital.", tr: "Park, okul ile hastanenin arasında.", structure: "places" },
          { en: "Is there a pharmacy near here?", tr: "Buralarda bir eczane var mı?", structure: "places" },
          { en: "The museum is in front of the cinema.", tr: "Müze sinemanın önünde.", structure: "places" }
        ]
      },
      {
        id: "theme6-life-in-the-world",
        title: "Ünite 6 - Life in the World (Dünyada Hayat)",
        structures: [
          { id: "world", label: "Farklı ülkelerdeki yaşamı anlatma (geniş zaman)" }
        ],
        sentences: [
          { en: "People in Japan eat with chopsticks.", tr: "Japonya'da insanlar yemek çubuğuyla yer.", structure: "world" },
          { en: "Maria lives in Spain.", tr: "Maria İspanya'da yaşar.", structure: "world" },
          { en: "Many people speak English in Canada.", tr: "Kanada'da birçok insan İngilizce konuşur.", structure: "world" },
          { en: "Does your pen friend live in Germany?", tr: "Mektup arkadaşın Almanya'da mı yaşıyor?", structure: "world" },
          { en: "It rains a lot in London.", tr: "Londra'da çok yağmur yağar.", structure: "world" },
          { en: "They don't live in a big city.", tr: "Onlar büyük bir şehirde yaşamıyor.", structure: "world" }
        ]
      },
      {
        id: "theme7-life-in-nature",
        title: "Ünite 7 - Life in Nature (Doğada Hayat)",
        structures: [
          { id: "now", label: "Doğada şu an olanları anlatma (am / is / are + -ing)" },
          { id: "animals", label: "Hayvanların yeteneklerini söyleme (can)" }
        ],
        sentences: [
          { en: "The birds are flying over the lake.", tr: "Kuşlar gölün üzerinde uçuyor.", structure: "now" },
          { en: "The cat is sleeping under the tree.", tr: "Kedi ağacın altında uyuyor.", structure: "now" },
          { en: "We are walking in the forest.", tr: "Ormanda yürüyoruz.", structure: "now" },
          { en: "What are the children doing?", tr: "Çocuklar ne yapıyor?", structure: "now" },
          { en: "Monkeys can climb trees.", tr: "Maymunlar ağaçlara tırmanabilir.", structure: "animals" },
          { en: "Penguins can't fly.", tr: "Penguenler uçamaz.", structure: "animals" }
        ]
      },
      {
        id: "theme8-universe-and-future",
        title: "Ünite 8 - Life in the Universe and Future (Evrende ve Gelecekte Hayat)",
        structures: [
          { id: "future", label: "Gelecekle ilgili tahmin (will / won't)" }
        ],
        sentences: [
          { en: "People will live on Mars one day.", tr: "İnsanlar bir gün Mars'ta yaşayacak.", structure: "future" },
          { en: "Robots will help us at home.", tr: "Robotlar evde bize yardım edecek.", structure: "future" },
          { en: "There will be flying cars in the future.", tr: "Gelecekte uçan arabalar olacak.", structure: "future" },
          { en: "I think it will rain tomorrow.", tr: "Bence yarın yağmur yağacak.", structure: "future" },
          { en: "We won't use petrol in the future.", tr: "Gelecekte benzin kullanmayacağız.", structure: "future" }
        ]
      }
    ]
  },
  "6": {
    label: "6. Sınıf",
    group: "MEB Ortaokul (5-8. Sınıf)",
    units: [
      {
        id: "unit1-life",
        title: "Ünite 1 - Life (Hayat)",
        structures: [
          { id: "routines", label: "Günlük rutinleri anlatma (geniş zaman + saat)" }
        ],
        sentences: [
          { en: "I get up at seven o'clock.", tr: "Saat yedide kalkarım.", structure: "routines" },
          { en: "My brother brushes his teeth every morning.", tr: "Erkek kardeşim her sabah dişlerini fırçalar.", structure: "routines" },
          { en: "She has breakfast at half past seven.", tr: "O, yedi buçukta kahvaltı yapar.", structure: "routines" },
          { en: "We go to school by bus.", tr: "Okula otobüsle gideriz.", structure: "routines" },
          { en: "Does your father work on Saturdays?", tr: "Baban cumartesi günleri çalışır mı?", structure: "routines" },
          { en: "They go to bed at ten.", tr: "Onlar saat onda yatar.", structure: "routines" }
        ]
      },
      {
        id: "unit2-yummy-breakfast",
        title: "Ünite 2 - Yummy Breakfast (Nefis Kahvaltı)",
        structures: [
          { id: "offers", label: "İkram etme ve isteme (Would you like...? / I'd like...)" },
          { id: "breakfast", label: "Kahvaltı alışkanlıklarını anlatma" }
        ],
        sentences: [
          { en: "Would you like some tea?", tr: "Biraz çay ister misin?", structure: "offers" },
          { en: "Yes, please. I'd like some cheese.", tr: "Evet, lütfen. Biraz peynir isterim.", structure: "offers" },
          { en: "There isn't any milk in the fridge.", tr: "Buzdolabında hiç süt yok.", structure: "breakfast" },
          { en: "I don't like olives.", tr: "Zeytin sevmem.", structure: "breakfast" },
          { en: "My sister eats honey and butter for breakfast.", tr: "Kız kardeşim kahvaltıda bal ve tereyağı yer.", structure: "breakfast" }
        ]
      },
      {
        id: "unit3-downtown",
        title: "Ünite 3 - Downtown (Şehir Merkezi)",
        structures: [
          { id: "compare", label: "Şehirdeki yerleri karşılaştırma (-er than / more ... than)" }
        ],
        sentences: [
          { en: "The city is bigger than the village.", tr: "Şehir köyden daha büyük.", structure: "compare" },
          { en: "The shopping mall is more crowded than the market.", tr: "Alışveriş merkezi pazardan daha kalabalık.", structure: "compare" },
          { en: "The museum is more interesting than the zoo.", tr: "Müze hayvanat bahçesinden daha ilginç.", structure: "compare" },
          { en: "My street is quieter than your street.", tr: "Benim sokağım seninkinden daha sakin.", structure: "compare" },
          { en: "The bus is cheaper than a taxi.", tr: "Otobüs taksiden daha ucuz.", structure: "compare" }
        ]
      },
      {
        id: "unit4-weather-emotions",
        title: "Ünite 4 - Weather and Emotions (Hava Durumu ve Duygular)",
        structures: [
          { id: "weather", label: "Hava durumunu sorma ve söyleme" },
          { id: "feelings", label: "Duyguları ifade etme (I feel...)" }
        ],
        sentences: [
          { en: "What's the weather like today?", tr: "Bugün hava nasıl?", structure: "weather" },
          { en: "It is sunny and warm.", tr: "Hava güneşli ve ılık.", structure: "weather" },
          { en: "Take your umbrella because it's rainy.", tr: "Şemsiyeni al çünkü hava yağmurlu.", structure: "weather" },
          { en: "I feel happy when it is sunny.", tr: "Hava güneşli olduğunda mutlu hissederim.", structure: "feelings" },
          { en: "She feels sad because it's raining.", tr: "Yağmur yağdığı için üzgün hissediyor.", structure: "feelings" }
        ]
      },
      {
        id: "unit5-at-the-fair",
        title: "Ünite 5 - At the Fair (Panayırda)",
        structures: [
          { id: "fair", label: "Panayırdaki yerleri anlatma ve fikir bildirme" }
        ],
        sentences: [
          { en: "The roller coaster is really exciting.", tr: "Hız treni gerçekten heyecan verici.", structure: "fair" },
          { en: "I'm scared of the ghost train.", tr: "Hayalet treninden korkuyorum.", structure: "fair" },
          { en: "The big wheel is more exciting than the carousel.", tr: "Dönme dolap atlı karıncadan daha heyecan verici.", structure: "fair" },
          { en: "Let's try the bumper cars!", tr: "Hadi çarpışan arabaları deneyelim!", structure: "fair" },
          { en: "I think the fair is amazing.", tr: "Bence panayır harika.", structure: "fair" }
        ]
      },
      {
        id: "unit6-occupations",
        title: "Ünite 6 - Occupations (Meslekler)",
        structures: [
          { id: "jobs", label: "Meslekleri ve iş yerlerini anlatma" }
        ],
        sentences: [
          { en: "My aunt is an engineer.", tr: "Teyzem bir mühendis.", structure: "jobs" },
          { en: "Where does your father work?", tr: "Baban nerede çalışıyor?", structure: "jobs" },
          { en: "She works in a hospital.", tr: "O bir hastanede çalışıyor.", structure: "jobs" },
          { en: "I want to be a pilot.", tr: "Pilot olmak istiyorum.", structure: "jobs" },
          { en: "Firefighters help people every day.", tr: "İtfaiyeciler her gün insanlara yardım eder.", structure: "jobs" }
        ]
      },
      {
        id: "unit7-holidays",
        title: "Ünite 7 - Holidays (Tatiller)",
        structures: [
          { id: "past", label: "Tatil anlatma (geçmiş zaman)" }
        ],
        sentences: [
          { en: "Where did you go last summer?", tr: "Geçen yaz nereye gittin?", structure: "past" },
          { en: "We went to Antalya with my family.", tr: "Ailemle Antalya'ya gittik.", structure: "past" },
          { en: "The weather was very hot.", tr: "Hava çok sıcaktı.", structure: "past" },
          { en: "We stayed in a hotel near the beach.", tr: "Plaja yakın bir otelde kaldık.", structure: "past" },
          { en: "Did you swim in the sea?", tr: "Denizde yüzdün mü?", structure: "past" }
        ]
      },
      {
        id: "unit8-bookworms",
        title: "Ünite 8 - Bookworms (Kitap Kurtları)",
        structures: [
          { id: "was", label: "Geçmişte nerede / nasıl (was / were)" }
        ],
        sentences: [
          { en: "Were you at the library yesterday?", tr: "Dün kütüphanede miydin?", structure: "was" },
          { en: "The story was very exciting.", tr: "Hikâye çok heyecanlıydı.", structure: "was" },
          { en: "I read a fairy tale last night.", tr: "Dün gece bir masal okudum.", structure: "was" },
          { en: "My friends were at the bookshop.", tr: "Arkadaşlarım kitapçıdaydı.", structure: "was" },
          { en: "Who was your favourite character?", tr: "En sevdiğin karakter kimdi?", structure: "was" }
        ]
      },
      {
        id: "unit9-saving-the-planet",
        title: "Ünite 9 - Saving the Planet (Gezegeni Kurtarmak)",
        structures: [
          { id: "should", label: "Çevre için öneri ve uyarı (should / Don't...)" }
        ],
        sentences: [
          { en: "We should recycle paper and glass.", tr: "Kâğıt ve camı geri dönüştürmeliyiz.", structure: "should" },
          { en: "You shouldn't waste water.", tr: "Suyu israf etmemelisin.", structure: "should" },
          { en: "Don't leave the lights on.", tr: "Işıkları açık bırakma.", structure: "should" },
          { en: "Turn off the tap when you brush your teeth.", tr: "Dişlerini fırçalarken musluğu kapat.", structure: "should" },
          { en: "Plastic bags are bad for the environment.", tr: "Plastik poşetler çevre için kötüdür.", structure: "should" }
        ]
      },
      {
        id: "unit10-democracy",
        title: "Ünite 10 - Democracy (Demokrasi)",
        structures: [
          { id: "election", label: "Seçim ve oy verme hakkında konuşma" }
        ],
        sentences: [
          { en: "I will vote for Elif.", tr: "Elif'e oy vereceğim.", structure: "election" },
          { en: "Every student has one vote.", tr: "Her öğrencinin bir oyu var.", structure: "election" },
          { en: "We chose our class president yesterday.", tr: "Dün sınıf başkanımızı seçtik.", structure: "election" },
          { en: "I will help everyone in the class.", tr: "Sınıftaki herkese yardım edeceğim.", structure: "election" },
          { en: "She is a good candidate because she is fair.", tr: "O iyi bir aday çünkü adil.", structure: "election" }
        ]
      }
    ]
  },
  "7": {
    label: "7. Sınıf",
    group: "MEB Ortaokul (5-8. Sınıf)",
    units: [
      {
        id: "unit1-appearance-personality",
        title: "Ünite 1 - Appearance and Personality (Görünüş ve Kişilik)",
        structures: [
          { id: "looks", label: "Görünüş ve kişiliği anlatma" },
          { id: "compare", label: "İnsanları karşılaştırma (-er than / more ... than)" }
        ],
        sentences: [
          { en: "She has got long curly hair.", tr: "Onun uzun kıvırcık saçları var.", structure: "looks" },
          { en: "What does your brother look like?", tr: "Erkek kardeşin nasıl görünüyor?", structure: "looks" },
          { en: "He is friendly and generous.", tr: "O arkadaş canlısı ve cömert.", structure: "looks" },
          { en: "Mert is taller than his brother.", tr: "Mert erkek kardeşinden daha uzun.", structure: "compare" },
          { en: "My sister is more patient than me.", tr: "Kız kardeşim benden daha sabırlı.", structure: "compare" }
        ]
      },
      {
        id: "unit2-sports",
        title: "Ünite 2 - Sports (Spor)",
        structures: [
          { id: "sports", label: "Spor alışkanlıkları ve sıklık (play / go / do, How often)" }
        ],
        sentences: [
          { en: "I go swimming on Sundays.", tr: "Pazar günleri yüzmeye giderim.", structure: "sports" },
          { en: "They play basketball after school.", tr: "Okuldan sonra basketbol oynarlar.", structure: "sports" },
          { en: "She does karate twice a week.", tr: "Haftada iki kez karate yapar.", structure: "sports" },
          { en: "How often do you play tennis?", tr: "Ne sıklıkla tenis oynarsın?", structure: "sports" },
          { en: "I usually go jogging in the morning.", tr: "Genellikle sabahları koşuya giderim.", structure: "sports" }
        ]
      },
      {
        id: "unit3-biographies",
        title: "Ünite 3 - Biographies (Biyografiler)",
        structures: [
          { id: "bio", label: "Hayat hikâyesi anlatma (was born, geçmiş zaman)" }
        ],
        sentences: [
          { en: "Atatürk was born in 1881.", tr: "Atatürk 1881'de doğdu.", structure: "bio" },
          { en: "She wrote her first novel in 1950.", tr: "İlk romanını 1950'de yazdı.", structure: "bio" },
          { en: "Mozart started playing the piano at the age of four.", tr: "Mozart dört yaşında piyano çalmaya başladı.", structure: "bio" },
          { en: "When did he become a famous scientist?", tr: "Ne zaman ünlü bir bilim insanı oldu?", structure: "bio" },
          { en: "Where was Picasso born?", tr: "Picasso nerede doğdu?", structure: "bio" }
        ]
      },
      {
        id: "unit4-animals",
        title: "Ünite 4 - Animals (Hayvanlar)",
        structures: [
          { id: "facts", label: "Hayvanlarla ilgili genel doğrular" },
          { id: "protect", label: "Hayvanları koruma önerileri (should)" }
        ],
        sentences: [
          { en: "Elephants eat plants and fruit.", tr: "Filler bitki ve meyve yer.", structure: "facts" },
          { en: "A cheetah runs very fast.", tr: "Çita çok hızlı koşar.", structure: "facts" },
          { en: "Polar bears live in cold places.", tr: "Kutup ayıları soğuk yerlerde yaşar.", structure: "facts" },
          { en: "We should protect endangered animals.", tr: "Nesli tükenmekte olan hayvanları korumalıyız.", structure: "protect" },
          { en: "People shouldn't hunt wild animals.", tr: "İnsanlar vahşi hayvanları avlamamalı.", structure: "protect" }
        ]
      },
      {
        id: "unit5-television",
        title: "Ünite 5 - Television (Televizyon)",
        structures: [
          { id: "prefer", label: "TV tercihlerini söyleme (prefer, like + -ing)" }
        ],
        sentences: [
          { en: "I prefer cartoons to the news.", tr: "Çizgi filmleri haberlere tercih ederim.", structure: "prefer" },
          { en: "My dad likes watching documentaries.", tr: "Babam belgesel izlemeyi sever.", structure: "prefer" },
          { en: "What time does the quiz show start?", tr: "Bilgi yarışması saat kaçta başlıyor?", structure: "prefer" },
          { en: "I can't stand watching reality shows.", tr: "Realite şovları izlemeye dayanamam.", structure: "prefer" },
          { en: "The news starts at seven o'clock.", tr: "Haberler saat yedide başlar.", structure: "prefer" }
        ]
      },
      {
        id: "unit6-celebrations",
        title: "Ünite 6 - Celebrations (Kutlamalar)",
        structures: [
          { id: "prepare", label: "Parti hazırlığını anlatma (şimdiki zaman)" },
          { id: "invite", label: "Davet etme, kabul ve ret" }
        ],
        sentences: [
          { en: "We are preparing for the party.", tr: "Parti için hazırlanıyoruz.", structure: "prepare" },
          { en: "My mom is baking a birthday cake.", tr: "Annem doğum günü pastası pişiriyor.", structure: "prepare" },
          { en: "Would you like to come to my party?", tr: "Partime gelmek ister misin?", structure: "invite" },
          { en: "Can you help me with the decorations?", tr: "Süslemelerde bana yardım edebilir misin?", structure: "invite" },
          { en: "Sorry, I can't come because I'm busy.", tr: "Üzgünüm, gelemem çünkü meşgulüm.", structure: "invite" }
        ]
      },
      {
        id: "unit7-future-plans",
        title: "Ünite 7 - Future Plans (Gelecek Planları)",
        structures: [
          { id: "plans", label: "Gelecek planları (be going to, will, want to)" }
        ],
        sentences: [
          { en: "I am going to study medicine.", tr: "Tıp okuyacağım.", structure: "plans" },
          { en: "She is going to be a vet.", tr: "O veteriner olacak.", structure: "plans" },
          { en: "What are you going to do after school?", tr: "Okuldan sonra ne yapacaksın?", structure: "plans" },
          { en: "I want to be an astronaut.", tr: "Astronot olmak istiyorum.", structure: "plans" },
          { en: "I think I will be a teacher.", tr: "Sanırım öğretmen olacağım.", structure: "plans" }
        ]
      },
      {
        id: "unit8-places-in-town",
        title: "Ünite 8 - Places in Town (Şehirdeki Yerler)",
        structures: [
          { id: "where", label: "Geçmişte nerede olduğunu söyleme (was / were)" },
          { id: "directions", label: "Yol tarifi alma ve verme" }
        ],
        sentences: [
          { en: "Where were you yesterday afternoon?", tr: "Dün öğleden sonra neredeydin?", structure: "where" },
          { en: "I was at the post office.", tr: "Postanedeydim.", structure: "where" },
          { en: "Go along the street and turn right.", tr: "Cadde boyunca git ve sağa dön.", structure: "directions" },
          { en: "The pharmacy is on your left.", tr: "Eczane solunda.", structure: "directions" },
          { en: "How can I get to the museum?", tr: "Müzeye nasıl gidebilirim?", structure: "directions" }
        ]
      },
      {
        id: "unit9-environment",
        title: "Ünite 9 - Environment (Çevre)",
        structures: [
          { id: "rules", label: "Çevre kuralları (must / mustn't / should)" },
          { id: "if", label: "Neden-sonuç (If ..., ... will)" }
        ],
        sentences: [
          { en: "We mustn't throw litter on the ground.", tr: "Yere çöp atmamalıyız.", structure: "rules" },
          { en: "We must save energy.", tr: "Enerji tasarrufu yapmalıyız.", structure: "rules" },
          { en: "Factories shouldn't pollute rivers.", tr: "Fabrikalar nehirleri kirletmemeli.", structure: "rules" },
          { en: "If we cut down trees, animals will lose their homes.", tr: "Ağaçları kesersek hayvanlar yuvalarını kaybeder.", structure: "if" },
          { en: "Recycling helps the environment.", tr: "Geri dönüşüm çevreye yardımcı olur.", structure: "rules" }
        ]
      },
      {
        id: "unit10-space",
        title: "Ünite 10 - Space (Uzay)",
        structures: [
          { id: "space", label: "Uzay olayları ve gezegenler (geçmiş zaman, karşılaştırma)" }
        ],
        sentences: [
          { en: "Neil Armstrong walked on the Moon in 1969.", tr: "Neil Armstrong 1969'da Ay'da yürüdü.", structure: "space" },
          { en: "Jupiter is the biggest planet in our solar system.", tr: "Jüpiter güneş sistemimizdeki en büyük gezegendir.", structure: "space" },
          { en: "Mars is smaller than Earth.", tr: "Mars Dünya'dan daha küçüktür.", structure: "space" },
          { en: "Do you think people will live on Mars?", tr: "Sence insanlar Mars'ta yaşayacak mı?", structure: "space" },
          { en: "Venus is the hottest planet.", tr: "Venüs en sıcak gezegendir.", structure: "space" }
        ]
      }
    ]
  },
  "8": {
    label: "8. Sınıf",
    group: "MEB Ortaokul (5-8. Sınıf)",
    units: [
      {
        id: "unit1-friendship",
        title: "Ünite 1 - Friendship (Arkadaşlık)",
        structures: [
          { id: "invite", label: "Davet etme, kabul ve ret (Would you like to...?)" },
          { id: "friends", label: "İyi bir arkadaşı anlatma" }
        ],
        sentences: [
          { en: "Would you like to come to the cinema?", tr: "Sinemaya gelmek ister misin?", structure: "invite" },
          { en: "Sorry, I can't because I have to study.", tr: "Üzgünüm, gelemem çünkü ders çalışmam gerek.", structure: "invite" },
          { en: "I'd love to come with you.", tr: "Seninle gelmeyi çok isterim.", structure: "invite" },
          { en: "A true friend keeps your secrets.", tr: "Gerçek bir arkadaş sırlarını saklar.", structure: "friends" },
          { en: "My best friend always supports me.", tr: "En iyi arkadaşım beni her zaman destekler.", structure: "friends" }
        ]
      },
      {
        id: "unit2-teen-life",
        title: "Ünite 2 - Teen Life (Genç Yaşam)",
        structures: [
          { id: "prefer", label: "Tercih ve beğeni (keen on, fond of, prefer, would rather)" }
        ],
        sentences: [
          { en: "I'm keen on playing computer games.", tr: "Bilgisayar oyunları oynamaya meraklıyım.", structure: "prefer" },
          { en: "She is fond of reading novels.", tr: "O roman okumayı çok sever.", structure: "prefer" },
          { en: "I can't stand listening to rap music.", tr: "Rap müzik dinlemeye dayanamam.", structure: "prefer" },
          { en: "I prefer pop music to rock.", tr: "Pop müziği rock müziğe tercih ederim.", structure: "prefer" },
          { en: "I'd rather stay at home tonight.", tr: "Bu akşam evde kalmayı tercih ederim.", structure: "prefer" }
        ]
      },
      {
        id: "unit3-in-the-kitchen",
        title: "Ünite 3 - In the Kitchen (Mutfakta)",
        structures: [
          { id: "recipe", label: "Tarif anlatma (First, Then, After that, Finally)" }
        ],
        sentences: [
          { en: "First, chop the onions into small pieces.", tr: "Önce soğanları küçük parçalar halinde doğra.", structure: "recipe" },
          { en: "Then, add a cup of milk.", tr: "Sonra bir bardak süt ekle.", structure: "recipe" },
          { en: "After that, stir the mixture for five minutes.", tr: "Ondan sonra karışımı beş dakika karıştır.", structure: "recipe" },
          { en: "How many eggs do we need?", tr: "Kaç yumurtaya ihtiyacımız var?", structure: "recipe" },
          { en: "Finally, serve it hot.", tr: "Son olarak sıcak servis yap.", structure: "recipe" }
        ]
      },
      {
        id: "unit4-on-the-phone",
        title: "Ünite 4 - On the Phone (Telefonda)",
        structures: [
          { id: "phone", label: "Telefon konuşması kalıpları" }
        ],
        sentences: [
          { en: "Can I speak to Ali, please?", tr: "Ali ile görüşebilir miyim, lütfen?", structure: "phone" },
          { en: "Hold on, please.", tr: "Lütfen bekleyin.", structure: "phone" },
          { en: "Could you call me back later?", tr: "Beni daha sonra geri arayabilir misin?", structure: "phone" },
          { en: "Can I leave a message?", tr: "Mesaj bırakabilir miyim?", structure: "phone" },
          { en: "Sorry, she isn't here right now.", tr: "Üzgünüm, o şu anda burada değil.", structure: "phone" }
        ]
      },
      {
        id: "unit5-the-internet",
        title: "Ünite 5 - The Internet (İnternet)",
        structures: [
          { id: "internet", label: "İnternet kullanımı ve güvenlik önerileri (should)" }
        ],
        sentences: [
          { en: "You shouldn't share your password with anyone.", tr: "Şifreni kimseyle paylaşmamalısın.", structure: "internet" },
          { en: "I use the Internet to do my homework.", tr: "Ödevimi yapmak için interneti kullanırım.", structure: "internet" },
          { en: "We should protect our personal information online.", tr: "İnternette kişisel bilgilerimizi korumalıyız.", structure: "internet" },
          { en: "I agree with you.", tr: "Sana katılıyorum.", structure: "internet" },
          { en: "How often do you go online?", tr: "Ne sıklıkla internete girersin?", structure: "internet" }
        ]
      },
      {
        id: "unit6-adventures",
        title: "Ünite 6 - Adventures (Maceralar)",
        structures: [
          { id: "compare", label: "Maceraları karşılaştırma ve tercih bildirme" }
        ],
        sentences: [
          { en: "Rafting is more dangerous than hiking.", tr: "Rafting doğa yürüyüşünden daha tehlikeli.", structure: "compare" },
          { en: "Bungee jumping is the most exciting activity.", tr: "Bungee jumping en heyecan verici aktivitedir.", structure: "compare" },
          { en: "I'd rather try rock climbing.", tr: "Kaya tırmanışını denemeyi tercih ederim.", structure: "compare" },
          { en: "I prefer canoeing to swimming.", tr: "Kanoyu yüzmeye tercih ederim.", structure: "compare" },
          { en: "This is the best adventure of my life!", tr: "Bu hayatımın en iyi macerası!", structure: "compare" }
        ]
      },
      {
        id: "unit7-tourism",
        title: "Ünite 7 - Tourism (Turizm)",
        structures: [
          { id: "ever", label: "Deneyimleri anlatma (Have you ever...?)" }
        ],
        sentences: [
          { en: "Have you ever been to Paris?", tr: "Hiç Paris'e gittin mi?", structure: "ever" },
          { en: "I have never visited Cappadocia.", tr: "Kapadokya'yı hiç ziyaret etmedim.", structure: "ever" },
          { en: "She has been to Italy twice.", tr: "O iki kez İtalya'ya gitti.", structure: "ever" },
          { en: "Have you ever eaten sushi?", tr: "Hiç suşi yedin mi?", structure: "ever" },
          { en: "I prefer travelling by train.", tr: "Trenle seyahat etmeyi tercih ederim.", structure: "ever" }
        ]
      },
      {
        id: "unit8-chores",
        title: "Ünite 8 - Chores (Ev İşleri)",
        structures: [
          { id: "haveto", label: "Ev işleri ve sorumluluklar (have to / don't have to)" }
        ],
        sentences: [
          { en: "I have to tidy my room every day.", tr: "Her gün odamı toplamak zorundayım.", structure: "haveto" },
          { en: "My brother has to take out the rubbish.", tr: "Erkek kardeşim çöpü çıkarmak zorunda.", structure: "haveto" },
          { en: "She doesn't have to cook dinner.", tr: "Akşam yemeği pişirmek zorunda değil.", structure: "haveto" },
          { en: "I'm responsible for setting the table.", tr: "Sofrayı kurmaktan ben sorumluyum.", structure: "haveto" },
          { en: "Do you have to do the washing-up?", tr: "Bulaşıkları yıkamak zorunda mısın?", structure: "haveto" }
        ]
      },
      {
        id: "unit9-science",
        title: "Ünite 9 - Science (Bilim)",
        structures: [
          { id: "passive", label: "Buluş ve süreçleri anlatma (edilgen yapı)" }
        ],
        sentences: [
          { en: "The telephone was invented by Bell.", tr: "Telefon Bell tarafından icat edildi.", structure: "passive" },
          { en: "Paper is made from wood.", tr: "Kâğıt odundan yapılır.", structure: "passive" },
          { en: "Penicillin was discovered by Alexander Fleming.", tr: "Penisilin Alexander Fleming tarafından keşfedildi.", structure: "passive" },
          { en: "These experiments are done in a laboratory.", tr: "Bu deneyler bir laboratuvarda yapılır.", structure: "passive" },
          { en: "Light bulbs were invented in the 19th century.", tr: "Ampuller 19. yüzyılda icat edildi.", structure: "passive" }
        ]
      },
      {
        id: "unit10-natural-forces",
        title: "Ünite 10 - Natural Forces (Doğal Afetler)",
        structures: [
          { id: "predict", label: "Doğal afetlerle ilgili tahmin ve öneri (will, might, should)" }
        ],
        sentences: [
          { en: "If it rains a lot, there will be a flood.", tr: "Çok yağmur yağarsa sel olur.", structure: "predict" },
          { en: "There might be a drought this summer.", tr: "Bu yaz kuraklık olabilir.", structure: "predict" },
          { en: "We should prepare an emergency kit.", tr: "Bir acil durum çantası hazırlamalıyız.", structure: "predict" },
          { en: "Floods cause a lot of damage.", tr: "Seller çok fazla hasara neden olur.", structure: "predict" },
          { en: "Scientists think there will be a storm tomorrow.", tr: "Bilim insanları yarın fırtına olacağını düşünüyor.", structure: "predict" }
        ]
      }
    ]
  }
};
