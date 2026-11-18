/*
 * Gramer veritabanı (MEB 5-8) — Gramer Kulesi oyununun kaynağı.
 *
 * Yapı: GRAMMAR[sınıf].units[] = {
 *   id, title:  curriculum.js'teki aynı ünite ile BİREBİR aynı,
 *   topic:      ünitenin hedef dil yapısı (oyunda rozet olarak görünür),
 *   rule:       yanlış cevaptan sonra gösterilen kısa Türkçe kural,
 *   items:      [ [cümle, doğru, çeldirici1, çeldirici2], ... ]
 * }
 * Cümledeki boşluk "___" ile yazılır. Doğru cevap HER ZAMAN ikinci
 * elemandır; oyun şıkları karıştırır.
 *
 * Kural: Çeldiriciler dilbilgisel olarak YANLIŞ olmalı — "anlamca tuhaf
 * ama doğru" bir çeldirici iki doğru şık demektir (örn. "Do I borrow...?"
 * yerine "Am I borrow...?"). Yeni madde eklerken bunu kontrol et.
 *
 * ⚠️ TASLAK (2026-11-18): Ünite-yapı eşleştirmesi genel MEB öğretim programı
 * bilgisiyle yapıldı (5. sınıf 2024 tema yapısı dahil), kitaptaki resmi
 * kazanım listesiyle karşılaştırılıp öğretmen tarafından onaylanmadı.
 */
var GRAMMAR = {
  "5": {
    label: "5. Sınıf",
    group: "MEB Ortaokul (5-8. Sınıf)",
    units: [
      {
        id: "theme1-school-life",
        title: "Ünite 1 - School Life (Okul Hayatı)",
        topic: "to be: am / is / are",
        rule: "I → am · he / she / it → is · you / we / they → are. Soru: Are you...? Is she...?",
        items: [
          ["I ___ a new student.", "am", "is", "are"],
          ["She ___ from Germany.", "is", "am", "are"],
          ["We ___ in the same class.", "are", "is", "am"],
          ["___ you from Türkiye?", "Are", "Is", "Am"],
          ["My teacher ___ very kind.", "is", "are", "am"],
          ["They ___ my classmates.", "are", "is", "am"],
          ["Where ___ he from?", "is", "are", "am"],
          ["He ___ not in my class.", "is", "am", "are"]
        ]
      },
      {
        id: "theme2-classroom-life",
        title: "Ünite 2 - Classroom Life (Sınıf Hayatı)",
        topic: "Emir cümleleri, Can I...?, there is / are",
        rule: "Emir cümlesi fiilin yalın hâliyle başlar (Open..., Don't run). Rica: Can I + fiil? Tekil: there is, çoğul: there are.",
        items: [
          ["___ your books, please.", "Open", "Opens", "Opening"],
          ["Don't ___ in the classroom.", "run", "runs", "running"],
          ["___ I borrow your pencil?", "Can", "Am", "Is"],
          ["Please ___ quiet.", "be", "is", "are"],
          ["Can I ___ to the toilet, please?", "go", "goes", "going"],
          ["___ talk during the exam.", "Don't", "Doesn't", "Not"],
          ["There ___ a board in our classroom.", "is", "are", "am"],
          ["There ___ twenty desks in the classroom.", "are", "is", "am"]
        ]
      },
      {
        id: "theme3-personal-life",
        title: "Ünite 3 - Personal Life (Kişisel Hayat)",
        topic: "can / can't, like / don't like, have got",
        rule: "can + fiilin yalın hâli (I can swim). Olumsuz beğeni: I don't like / he doesn't like. Sahiplik: have got / has got.",
        items: [
          ["I can ___ the guitar.", "play", "plays", "playing"],
          ["She can't ___ fast.", "swim", "swims", "swimming"],
          ["___ you ride a bike? Yes, I can.", "Can", "Do", "Are"],
          ["I ___ like spinach.", "don't", "doesn't", "not"],
          ["My brother ___ like football.", "doesn't", "don't", "isn't"],
          ["Do you like cats? Yes, I ___.", "do", "am", "like"],
          ["He has ___ brown eyes.", "got", "get", "have"]
        ]
      },
      {
        id: "theme4-family-life",
        title: "Ünite 4 - Family Life (Aile Hayatı)",
        topic: "his / her, iyelik 's, What does he do?",
        rule: "Erkek için his / he, kadın için her / she. Sahiplik: Ali's bag. Meslek sorusu: What does he / she do?",
        items: [
          ["This is my sister. ___ name is Elif.", "Her", "His", "Its"],
          ["My father is a doctor. ___ works in a hospital.", "He", "She", "His"],
          ["What ___ your mother do?", "does", "do", "is"],
          ["This is ___ bag.", "Ali's", "Alis", "Ali is"],
          ["My grandparents ___ on a farm.", "live", "lives", "living"],
          ["My uncle ___ a police officer.", "is", "are", "am"],
          ["My brother and I ___ twins.", "are", "is", "am"]
        ]
      },
      {
        id: "theme5-neighbourhood-city",
        title: "Ünite 5 - Life in the Neighbourhood and City (Mahalle ve Şehir Hayatı)",
        topic: "Yol tarifi ve yer edatları",
        rule: "Yol tarifi: Go straight, turn left / right. next to = yanında, between = arasında, in front of = önünde, opposite = karşısında.",
        items: [
          ["___ straight and turn left.", "Go", "Goes", "Going"],
          ["The bank is ___ the school and the park.", "between", "next", "in front"],
          ["The bakery is next ___ the post office.", "to", "of", "at"],
          ["Is there ___ hospital near here?", "a", "an", "some"],
          ["There ___ two parks in my neighbourhood.", "are", "is", "am"],
          ["Turn ___ at the traffic lights.", "right", "rights", "righting"],
          ["The museum is ___ front of the cinema.", "in", "at", "on"]
        ]
      },
      {
        id: "theme6-life-in-the-world",
        title: "Ünite 6 - Life in the World (Dünyada Hayat)",
        topic: "Geniş zaman (Simple Present)",
        rule: "I / you / we / they + fiil; he / she / it + fiil-s (lives, speaks). Soru: Do / Does...? Olumsuz: don't / doesn't.",
        items: [
          ["People in Japan ___ with chopsticks.", "eat", "eats", "eating"],
          ["Maria ___ Spanish and English.", "speaks", "speak", "speaking"],
          ["___ he live in London?", "Does", "Do", "Is"],
          ["They ___ live in a big city.", "don't", "doesn't", "aren't"],
          ["What language ___ people speak in Brazil?", "do", "does", "are"],
          ["It ___ a lot in London.", "rains", "rain", "raining"],
          ["My pen friend ___ in Canada.", "lives", "live", "living"]
        ]
      },
      {
        id: "theme7-life-in-nature",
        title: "Ünite 7 - Life in Nature (Doğada Hayat)",
        topic: "Şimdiki zaman (Present Continuous)",
        rule: "Şu anda olan: am / is / are + fiil-ing (The cat is sleeping). Soru: What are you doing?",
        items: [
          ["Look! The birds are ___.", "flying", "fly", "flies"],
          ["The cat ___ sleeping under the tree.", "is", "are", "am"],
          ["We ___ walking in the forest now.", "are", "is", "am"],
          ["What ___ you doing?", "are", "is", "do"],
          ["She is ___ photos of flowers.", "taking", "take", "takes"],
          ["Monkeys can ___ trees.", "climb", "climbs", "climbing"],
          ["The children ___ not swimming in the lake.", "are", "is", "am"]
        ]
      },
      {
        id: "theme8-universe-and-future",
        title: "Ünite 8 - Life in the Universe and Future (Evrende ve Gelecekte Hayat)",
        topic: "Gelecek tahmini: will / won't",
        rule: "Tahmin: will + fiilin yalın hâli (People will live on Mars). Olumsuz: won't. Soru: Will we...?",
        items: [
          ["People ___ live on Mars one day.", "will", "are", "was"],
          ["Robots will ___ our homework.", "do", "does", "doing"],
          ["I think it ___ rain tomorrow.", "will", "is", "are"],
          ["___ we travel to the Moon in the future?", "Will", "Are", "Is"],
          ["Cars won't ___ petrol in the future.", "use", "uses", "using"],
          ["The Sun ___ a star.", "is", "are", "will"],
          ["There ___ be flying cars in the future.", "will", "are", "is"]
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
        topic: "Günlük rutinler: geniş zaman + saat",
        rule: "he / she / it + fiil-s / -es (gets, brushes, has). Saat: at seven o'clock. Soru: Does he...?",
        items: [
          ["I ___ up at seven o'clock.", "get", "gets", "getting"],
          ["My brother ___ his teeth every morning.", "brushes", "brush", "brushing"],
          ["She ___ breakfast at 7:30.", "has", "have", "having"],
          ["We go to school ___ eight o'clock.", "at", "on", "in"],
          ["___ your father work on Saturdays?", "Does", "Do", "Is"],
          ["Ali ___ watch TV in the morning.", "doesn't", "don't", "isn't"],
          ["They ___ to bed at ten.", "go", "goes", "going"]
        ]
      },
      {
        id: "unit2-yummy-breakfast",
        title: "Ünite 2 - Yummy Breakfast (Nefis Kahvaltı)",
        topic: "Would you like...? some / any, much / many",
        rule: "Teklif: Would you like...? — Yes, please. Olumlu cümlede some, olumsuz cümlede any. Sayılamayana much, sayılabilene many.",
        items: [
          ["There isn't ___ milk in the fridge.", "any", "some", "many"],
          ["I'd like ___ cheese, please.", "some", "any", "many"],
          ["Do you like olives? No, I ___.", "don't", "doesn't", "am not"],
          ["My sister ___ like eggs.", "doesn't", "don't", "isn't"],
          ["___ you like some honey? Yes, please.", "Would", "Do", "Are"],
          ["Are there ___ tomatoes on the table?", "any", "a", "much"],
          ["She ___ jam and butter for breakfast.", "eats", "eat", "eating"]
        ]
      },
      {
        id: "unit3-downtown",
        title: "Ünite 3 - Downtown (Şehir Merkezi)",
        topic: "Karşılaştırma: -er than / more ... than",
        rule: "Kısa sıfat: -er than (bigger than, cheaper than). Uzun sıfat: more ... than (more crowded than).",
        items: [
          ["The city is ___ than the village.", "bigger", "big", "more big"],
          ["The shopping mall is more ___ than the market.", "crowded", "crowdeder", "crowd"],
          ["Ankara is ___ than my hometown.", "more modern", "moderner", "modern"],
          ["The bus is ___ than a taxi.", "cheaper", "cheap", "more cheap"],
          ["The museum is ___ interesting than the zoo.", "more", "most", "very"],
          ["The park is ___ than the city centre.", "safer", "safe", "more safe"],
          ["Istanbul is bigger ___ Izmir.", "than", "that", "then"]
        ]
      },
      {
        id: "unit4-weather-emotions",
        title: "Ünite 4 - Weather and Emotions (Hava Durumu ve Duygular)",
        topic: "Hava durumu ve duygular",
        rule: "Hava: What's the weather like? — It is sunny / snowy. Duygu: I feel happy / She feels sad (sıfat kullanılır).",
        items: [
          ["What's the weather ___ today?", "like", "likes", "liking"],
          ["It ___ snowy today.", "is", "are", "am"],
          ["I ___ happy when it is sunny.", "feel", "feels", "feeling"],
          ["She feels ___ because it's raining.", "sad", "sadly", "sadness"],
          ["It is ___ outside. Wear your coat.", "cold", "colds", "coldly"],
          ["How ___ you feel today?", "do", "does", "are"]
        ]
      },
      {
        id: "unit5-at-the-fair",
        title: "Ünite 5 - At the Fair (Panayırda)",
        topic: "-ing / -ed sıfatlar, fikir bildirme",
        rule: "Bir şeyin nasıl olduğu: exciting, boring, amazing. Kişinin nasıl hissettiği: excited, bored, scared.",
        items: [
          ["The roller coaster is ___.", "exciting", "excited", "excite"],
          ["I'm ___ of the ghost train.", "scared", "scary", "scare"],
          ["The big wheel is ___ than the carousel.", "more exciting", "excitinger", "exciting"],
          ["I think the fair is ___.", "amazing", "amazed", "amaze"],
          ["The queue was very long. I felt ___.", "bored", "boring", "bore"],
          ["Let's ___ the haunted house!", "try", "trying", "tries"]
        ]
      },
      {
        id: "unit6-occupations",
        title: "Ünite 6 - Occupations (Meslekler)",
        topic: "Meslekler: a / an, What does he do?",
        rule: "Meslek: He is a doctor / She is an engineer (sesli harften önce an). Soru: What does she do? Where does he work?",
        items: [
          ["My aunt is ___ engineer.", "an", "a", "any"],
          ["He is ___ doctor.", "a", "an", "any"],
          ["Where ___ your father work?", "does", "do", "is"],
          ["She ___ in a hospital.", "works", "work", "working"],
          ["I want ___ a pilot.", "to be", "be", "being"],
          ["What ___ he do? He is a chef.", "does", "do", "is"],
          ["Firefighters ___ people.", "help", "helps", "helping"]
        ]
      },
      {
        id: "unit7-holidays",
        title: "Ünite 7 - Holidays (Tatiller)",
        topic: "Geçmiş zaman: was / were, did",
        rule: "Geçmiş: I / he / she / it was, you / we / they were. Fiil: stayed, went. Soru ve olumsuzda did + fiilin yalın hâli.",
        items: [
          ["Where ___ you go last summer?", "did", "do", "were"],
          ["Last year we ___ to Antalya.", "went", "go", "goes"],
          ["The weather ___ hot last week.", "was", "were", "is"],
          ["Last year we ___ in a hotel.", "stayed", "stay", "staying"],
          ["___ you swim in the sea? Yes, I did.", "Did", "Do", "Were"],
          ["My parents ___ very happy on our last holiday.", "were", "was", "be"],
          ["I didn't ___ a camera.", "take", "took", "taking"]
        ]
      },
      {
        id: "unit8-bookworms",
        title: "Ünite 8 - Bookworms (Kitap Kurtları)",
        topic: "Geçmiş zaman: was / were",
        rule: "was: I / he / she / it — were: you / we / they. Soru: Were you at the library? — Yes, I was.",
        items: [
          ["___ you at the library yesterday?", "Were", "Was", "Did"],
          ["Were you at home? Yes, I ___.", "was", "were", "did"],
          ["The book ___ very exciting. I loved it.", "was", "were", "did"],
          ["Where ___ Ali last weekend?", "was", "were", "did"],
          ["My friends ___ at the bookshop yesterday.", "were", "was", "are"],
          ["I ___ a fairy tale last night.", "read", "reads", "reading"],
          ["Fifty years ago there ___ only a few books here.", "were", "was", "are"]
        ]
      },
      {
        id: "unit9-saving-the-planet",
        title: "Ünite 9 - Saving the Planet (Gezegeni Kurtarmak)",
        topic: "should / shouldn't, Don't...",
        rule: "Öneri: should / shouldn't + fiilin yalın hâli (We should recycle). Yasak: Don't + fiil.",
        items: [
          ["We ___ recycle paper and glass.", "should", "shoulds", "should to"],
          ["You shouldn't ___ water.", "waste", "wastes", "wasting"],
          ["___ leave the lights on!", "Don't", "Doesn't", "Not"],
          ["We should ___ trees.", "plant", "plants", "planting"],
          ["People ___ use public transport.", "should", "should to", "shoulds"],
          ["Turn ___ the tap when you brush your teeth.", "off", "of", "out"],
          ["Plastic bags ___ bad for the environment.", "are", "is", "am"]
        ]
      },
      {
        id: "unit10-democracy",
        title: "Ünite 10 - Democracy (Demokrasi)",
        topic: "vote for, because, will",
        rule: "Oy vermek: vote for + kişi. Neden: because. Söz / gelecek: I will + fiil.",
        items: [
          ["I will vote ___ Elif.", "for", "to", "at"],
          ["If I am the class president, I ___ help everyone.", "will", "am", "would"],
          ["I will choose her ___ she is fair.", "because", "so", "but"],
          ["Every student ___ one vote.", "has", "have", "having"],
          ["The election ___ last Monday.", "was", "were", "is"],
          ["Who ___ you vote for?", "did", "were", "was"]
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
        topic: "Görünüş: has got, is; karşılaştırma",
        rule: "Görünüş: She has got curly hair / He is tall. Soru: What does he look like? Karşılaştırma: taller than, more patient than.",
        items: [
          ["She ___ long curly hair.", "has got", "have got", "is got"],
          ["What does he ___ like?", "look", "looks", "looking"],
          ["Mert is ___ than his brother.", "taller", "tall", "more tall"],
          ["My sister is more ___ than me.", "patient", "patienter", "patiently"],
          ["He ___ got a beard.", "has", "have", "is"],
          ["Elif is ___ friendly than Ayşe.", "more", "most", "very"],
          ["They ___ tall and slim.", "are", "is", "has"]
        ]
      },
      {
        id: "unit2-sports",
        title: "Ünite 2 - Sports (Spor)",
        topic: "play / go / do, sıklık zarfları",
        rule: "play + top oyunları (football), go + -ing sporlar (swimming), do + karate / yoga. Sıklık: How often...? — once / twice a week.",
        items: [
          ["I ___ swimming on Sundays.", "go", "play", "do"],
          ["They ___ basketball after school.", "play", "go", "do"],
          ["She ___ karate twice a week.", "does", "plays", "goes"],
          ["How ___ do you play tennis?", "often", "much", "many"],
          ["I ___ go jogging in the morning.", "usually", "usual", "usuals"],
          ["We go cycling ___ a week.", "once", "one", "first"],
          ["Does she ___ volleyball?", "play", "plays", "playing"]
        ]
      },
      {
        id: "unit3-biographies",
        title: "Ünite 3 - Biographies (Biyografiler)",
        topic: "Geçmiş zaman: was born, düzenli / düzensiz fiiller",
        rule: "Doğum: was born in + yıl / yer. Düzenli fiil -ed (started), düzensiz fiil ezberlenir (wrote, became). Soru: When did...?",
        items: [
          ["Atatürk ___ born in 1881.", "was", "were", "is"],
          ["She ___ her first novel in 1950.", "wrote", "writes", "written"],
          ["Mozart ___ playing the piano at the age of four.", "started", "starts", "start"],
          ["When ___ he die?", "did", "was", "does"],
          ["Einstein didn't ___ his school very much.", "like", "liked", "likes"],
          ["He became a famous scientist ___ 1905.", "in", "on", "at"],
          ["Where ___ Picasso born?", "was", "did", "were"]
        ]
      },
      {
        id: "unit4-animals",
        title: "Ünite 4 - Animals (Hayvanlar)",
        topic: "Genel doğrular (geniş zaman), should",
        rule: "Genel doğrular geniş zamanla: Elephants eat plants / A cheetah runs fast. Koruma önerisi: We should protect...",
        items: [
          ["Elephants ___ plants.", "eat", "eats", "eating"],
          ["A cheetah ___ very fast.", "runs", "run", "running"],
          ["We ___ protect endangered animals.", "should", "should to", "shoulds"],
          ["People shouldn't ___ wild animals.", "hunt", "hunts", "hunting"],
          ["Polar bears ___ in cold places.", "live", "lives", "living"],
          ["Does a penguin ___?", "fly", "flies", "flying"],
          ["Cheetahs are ___ than lions.", "faster", "fast", "more fast"]
        ]
      },
      {
        id: "unit5-television",
        title: "Ünite 5 - Television (Televizyon)",
        topic: "Tercihler: prefer ... to, like / hate + -ing",
        rule: "Tercih: I prefer cartoons to the news. Sevme / sevmeme: like, love, hate, can't stand + fiil-ing.",
        items: [
          ["I prefer cartoons ___ the news.", "to", "than", "from"],
          ["My dad likes ___ documentaries.", "watching", "watch", "watches"],
          ["What time ___ the quiz show start?", "does", "do", "is"],
          ["She ___ soap operas. She thinks they are boring.", "hates", "hate", "hating"],
          ["The news ___ at 7 p.m.", "starts", "start", "starting"],
          ["I can't stand ___ reality shows.", "watching", "watch", "to watched"],
          ["___ your favourite TV programme?", "What's", "Who's", "How's"]
        ]
      },
      {
        id: "unit6-celebrations",
        title: "Ünite 6 - Celebrations (Kutlamalar)",
        topic: "Hazırlık (şimdiki zaman), davet",
        rule: "Şu an yapılan hazırlık: We are decorating the room. Davet: Would you like to come...? Ret: Sorry, I can't.",
        items: [
          ["We ___ preparing for the party now.", "are", "is", "do"],
          ["Would you like ___ to my birthday party?", "to come", "come", "coming"],
          ["My mom is ___ a cake.", "baking", "bake", "bakes"],
          ["Can you ___ the balloons?", "blow up", "blows up", "blowing up"],
          ["Sorry, I ___ come. I'm busy.", "can't", "not", "isn't"],
          ["They ___ sending invitations at the moment.", "are", "is", "does"],
          ["We celebrate New Year's Eve ___ 31st December.", "on", "in", "at"]
        ]
      },
      {
        id: "unit7-future-plans",
        title: "Ünite 7 - Future Plans (Gelecek Planları)",
        topic: "be going to, will, want to",
        rule: "Plan: am / is / are going to + fiil. Tahmin: I think I will... İstek: want to + fiil.",
        items: [
          ["I am going ___ study medicine.", "to", "for", "at"],
          ["She ___ going to be a vet.", "is", "are", "am"],
          ["What are you going to ___ after school?", "do", "does", "doing"],
          ["I want ___ an astronaut.", "to be", "be", "being"],
          ["They ___ going to travel abroad.", "are", "is", "am"],
          ["I think I ___ be a teacher in the future.", "will", "am", "going"],
          ["He isn't going to ___ a lawyer.", "become", "becomes", "becoming"]
        ]
      },
      {
        id: "unit8-places-in-town",
        title: "Ünite 8 - Places in Town (Şehirdeki Yerler)",
        topic: "Yol tarifi, geçmişte nerede (was / were)",
        rule: "Yol tarifi: Go along the street, it's on your left. Geçmişte nerede: I was at the bank / We were at the cinema.",
        items: [
          ["Where ___ you yesterday afternoon?", "were", "was", "did"],
          ["I ___ at the post office yesterday.", "was", "were", "am"],
          ["Go ___ the street and turn right.", "along", "at", "between"],
          ["The pharmacy is ___ your left.", "on", "in", "at"],
          ["Excuse me, how ___ I get to the museum?", "can", "am", "is"],
          ["We ___ at the cinema last Saturday.", "were", "was", "are"],
          ["Is there a bank ___ here?", "near", "nearly", "next"]
        ]
      },
      {
        id: "unit9-environment",
        title: "Ünite 9 - Environment (Çevre)",
        topic: "must / mustn't, should, if ... will",
        rule: "Zorunluluk: must, yasak: mustn't, öneri: should (hepsi + fiilin yalın hâli). Koşul: If we save water, we will...",
        items: [
          ["We ___ throw litter on the ground.", "mustn't", "mustn't to", "don't must"],
          ["We must ___ energy.", "save", "saves", "saving"],
          ["If we cut down trees, animals ___ lose their homes.", "will", "are", "would"],
          ["Factories ___ pollute rivers.", "shouldn't", "shouldn't to", "don't should"],
          ["Recycling ___ the environment.", "helps", "help", "helping"],
          ["If we ___ water, we will help the planet.", "save", "will save", "saved"],
          ["Air pollution ___ a big problem in cities.", "is", "are", "be"]
        ]
      },
      {
        id: "unit10-space",
        title: "Ünite 10 - Space (Uzay)",
        topic: "Geçmiş zaman, en üstünlük (-est)",
        rule: "Geçmiş olay: Armstrong walked on the Moon in 1969. Karşılaştırma: smaller than. En üstünlük: the biggest, the hottest.",
        items: [
          ["Neil Armstrong ___ on the Moon in 1969.", "walked", "walks", "walking"],
          ["Jupiter is the ___ planet in our solar system.", "biggest", "bigger", "big"],
          ["Mars is ___ than Earth.", "smaller", "small", "more small"],
          ["Did they ___ a rocket into space?", "send", "sent", "sending"],
          ["Venus is the ___ planet.", "hottest", "hotter", "hot"],
          ["Do you think people ___ live on Mars?", "will", "are", "was"],
          ["The first astronaut ___ Yuri Gagarin.", "was", "were", "did"]
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
        topic: "Davet: kabul / ret, have to",
        rule: "Davet: Would you like to + fiil? Kabul: Sure / I'd love to. Ret: Sorry, I can't. I have to + fiil.",
        items: [
          ["Would you like ___ to the cinema with me?", "to come", "come", "coming"],
          ["Sorry, I can't. I have ___ study for the exam.", "to", "for", "at"],
          ["That sounds great. I'd love ___!", "to", "too", "two"],
          ["A true friend ___ secrets.", "keeps", "keep", "keeping"],
          ["She has to ___ her grandmother.", "visit", "visits", "visiting"],
          ["I'm sorry, but I ___ come to your party.", "can't", "don't can", "not can"],
          ["My best friend always ___ me when I'm sad.", "supports", "support", "supporting"]
        ]
      },
      {
        id: "unit2-teen-life",
        title: "Ünite 2 - Teen Life (Genç Yaşam)",
        topic: "Tercihler: keen on, fond of, prefer, would rather",
        rule: "be keen on / be fond of / can't stand + fiil-ing. prefer A to B. would rather + fiilin yalın hâli.",
        items: [
          ["I'm keen ___ playing computer games.", "on", "in", "at"],
          ["She is fond ___ reading novels.", "of", "on", "at"],
          ["I can't stand ___ to rap music.", "listening", "listen", "listens"],
          ["I prefer pop music ___ rock.", "to", "than", "from"],
          ["I'd rather ___ at home tonight.", "stay", "to stay", "staying"],
          ["My brother ___ going shopping.", "hates", "hate", "hating"],
          ["Teenagers usually ___ time with their friends.", "spend", "spends", "spending"]
        ]
      },
      {
        id: "unit3-in-the-kitchen",
        title: "Ünite 3 - In the Kitchen (Mutfakta)",
        topic: "Tarif anlatma: emir + miktar (much / many)",
        rule: "Tarif adımları emir kipiyle: Chop, stir, serve. Miktar: a cup of milk. How much + sayılamayan, How many + sayılabilen.",
        items: [
          ["Add a cup ___ milk.", "of", "from", "with"],
          ["___ the onions into small pieces.", "Chop", "Chops", "Chopping"],
          ["After that, ___ the mixture for five minutes.", "stir", "stirs", "stirring"],
          ["Pour the milk ___ a bowl.", "into", "onto", "at"],
          ["How ___ sugar do we need?", "much", "many", "lot"],
          ["How ___ eggs do we need?", "many", "much", "lot"],
          ["Don't ___ too much salt.", "add", "adds", "adding"],
          ["Finally, ___ it hot.", "serve", "serves", "serving"]
        ]
      },
      {
        id: "unit4-on-the-phone",
        title: "Ünite 4 - On the Phone (Telefonda)",
        topic: "Telefon kalıpları, will",
        rule: "Can I speak to...? / Hold on, please. / Could you call me back? / Can I leave a message? Söz: I'll call you.",
        items: [
          ["Can I ___ to Ali, please?", "speak", "speaks", "speaking"],
          ["Hold ___, please.", "on", "in", "at"],
          ["___ you call me back later?", "Could", "Are", "Is"],
          ["I ___ call you tomorrow.", "will", "am", "does"],
          ["Can I leave a ___?", "message", "messages", "messaging"],
          ["Who's ___, please?", "calling", "call", "calls"],
          ["Sorry, she ___ here right now.", "isn't", "doesn't", "aren't"]
        ]
      },
      {
        id: "unit5-the-internet",
        title: "Ünite 5 - The Internet (İnternet)",
        topic: "should, agree, use ... to / for",
        rule: "Öneri: You should / shouldn't + fiil. Amaç: use the Internet to + fiil / for + fiil-ing. Fikir: I agree (am agree YOK).",
        items: [
          ["You ___ share your password with anyone.", "shouldn't", "don't should", "shouldn't to"],
          ["I use the Internet ___ do my homework.", "to", "for", "at"],
          ["I use the Internet for ___ with my friends.", "chatting", "chat", "chats"],
          ["We should ___ our personal information online.", "protect", "protects", "protecting"],
          ["I ___ with you. Social media can be dangerous.", "agree", "am agree", "agrees"],
          ["How often ___ you go online?", "do", "does", "are"],
          ["Cyberbullying ___ a serious problem.", "is", "are", "be"]
        ]
      },
      {
        id: "unit6-adventures",
        title: "Ünite 6 - Adventures (Maceralar)",
        topic: "Karşılaştırma ve en üstünlük, would rather",
        rule: "more dangerous than / the most exciting · harder than / the best. Tercih: I'd rather + fiil, I prefer + fiil-ing.",
        items: [
          ["Rafting is ___ than hiking.", "more dangerous", "dangerouser", "most dangerous"],
          ["Bungee jumping is the ___ activity.", "most exciting", "more exciting", "excitingest"],
          ["Rock climbing is ___ than camping.", "harder", "hard", "more hard"],
          ["I'd rather ___ rock climbing.", "try", "to try", "trying"],
          ["I prefer ___ to swimming.", "canoeing", "canoe", "to canoe"],
          ["This is the ___ adventure of my life!", "best", "better", "good"],
          ["Mountain biking is ___ exciting than jogging.", "more", "most", "much"]
        ]
      },
      {
        id: "unit7-tourism",
        title: "Ünite 7 - Tourism (Turizm)",
        topic: "Deneyim: Have you ever...? (Present Perfect)",
        rule: "Deneyim: have / has + fiilin 3. hâli (been, visited, eaten). Have you ever been to...? — I have never visited...",
        items: [
          ["Have you ever ___ to Paris?", "been", "go", "went"],
          ["I have ___ visited Cappadocia.", "never", "ever", "yet"],
          ["She ___ been to Italy twice.", "has", "have", "is"],
          ["Have you ever ___ sushi?", "eaten", "ate", "eat"],
          ["We ___ seen the Galata Tower.", "have", "has", "are"],
          ["I prefer travelling ___ train.", "by", "with", "on"],
          ["___ you ever stayed in a hostel?", "Have", "Did", "Do"]
        ]
      },
      {
        id: "unit8-chores",
        title: "Ünite 8 - Chores (Ev İşleri)",
        topic: "have to / don't have to, responsible for",
        rule: "Zorunluluk: have to / has to. Gerek yok: don't / doesn't have to. Sorumluluk: I'm responsible for + fiil-ing.",
        items: [
          ["I ___ to tidy my room every day.", "have", "has", "am"],
          ["My brother ___ to take out the rubbish.", "has", "have", "is"],
          ["She ___ have to cook. Her mother cooks.", "doesn't", "don't", "isn't"],
          ["I'm responsible for ___ the table.", "setting", "set", "sets"],
          ["___ you have to do the washing-up?", "Do", "Does", "Are"],
          ["We don't ___ to clean the windows.", "have", "has", "having"],
          ["My father ___ the dishes after dinner.", "washes", "wash", "washing"]
        ]
      },
      {
        id: "unit9-science",
        title: "Ünite 9 - Science (Bilim)",
        topic: "Edilgen yapı (Passive Voice)",
        rule: "Şimdi: is / are + fiilin 3. hâli (Paper is made from wood). Geçmiş: was / were + 3. hâl (It was invented by Bell).",
        items: [
          ["The telephone ___ invented by Alexander Graham Bell.", "was", "were", "did"],
          ["Paper is ___ from wood.", "made", "make", "making"],
          ["These experiments ___ done in a laboratory.", "are", "is", "was"],
          ["Penicillin was ___ by Alexander Fleming.", "discovered", "discover", "discovers"],
          ["Light bulbs ___ invented in the 19th century.", "were", "was", "are"],
          ["The results ___ checked by scientists every day.", "are", "is", "was"],
          ["Who ___ the light bulb?", "invented", "was invented", "inventing"]
        ]
      },
      {
        id: "unit10-natural-forces",
        title: "Ünite 10 - Natural Forces (Doğal Afetler)",
        topic: "Tahmin: will / might, if ... will",
        rule: "Tahmin: will / might + fiilin yalın hâli. Koşul: If + geniş zaman, will + fiil (If it rains a lot, there will be a flood).",
        items: [
          ["If it rains a lot, there ___ be a flood.", "will", "is", "would"],
          ["Scientists think there ___ be a storm tomorrow.", "will", "is", "are"],
          ["If a tsunami ___, people will move to high places.", "comes", "will come", "came"],
          ["There might ___ a drought this summer.", "be", "is", "been"],
          ["Floods ___ a lot of damage every year.", "cause", "causes", "causing"],
          ["We ___ prepare an emergency kit.", "should", "should to", "shoulds"],
          ["The volcano ___ in 2010.", "erupted", "erupts", "erupting"]
        ]
      }
    ]
  }
};
