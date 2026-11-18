/*
 * Hub içerik listesi. Yeni bir oyun/araç eklerken buraya bir kayıt ekle.
 *
 * category: "oyun"  -> Oyunlar bölümünde görünür
 *           "arac"  -> Çalışma Araçları bölümünde görünür
 * skill:    hangi İngilizce becerisini pratik ettiriyor (tek kod ya da
 *           birden çok beceri çalıştıran oyunlar için dizi: ["kelime", "gramer"]). hub.js bu alandan
 *           farklı değerler görürse otomatik olarak bir filtre/sekme satırı
 *           gösterir (tek skill varken satır gizli kalır). Yeni bir skill
 *           kodu eklerken SKILL_LABELS'a görünür ad karşılığını da ekle.
 * tags:     kartın altında rozet olarak görünen kısa etiketler
 */
var SKILL_LABELS = {
  kelime: "Kelime",
  "cumle-kurma": "Cümle Kurma",
  yazim: "Yazım",
  gramer: "Gramer"
};

var GAMES = [
  {
    id: "dogru-yanlis",
    title: "Doğru mu Yanlış mı?",
    description: "Süreye karşı hızlı karar: kelime-anlam eşleşmesi ya da gramer cümlesi doğru mu? Seri yap, puanı katla. Ders başı ısınması için ideal.",
    icon: "⚡",
    path: "games/dogru-yanlis/index.html",
    color: "#4338ca",
    category: "oyun",
    skill: ["kelime", "gramer"],
    tags: ["Tek kişi", "Hız", "Isınma"]
  },
  {
    id: "gramer-kulesi",
    title: "Gramer Kulesi",
    description: "Ünitenin dil yapısına göre boşluğa doğru kalıbı seç; her doğru cevap kuleye bir kat ekler. Yanlışta kısa kural çıkar.",
    icon: "🧱",
    path: "games/gramer-kulesi/index.html",
    color: "#ea580c",
    category: "oyun",
    skill: "gramer",
    tags: ["Tek kişi", "Takımlı", "Gramer"]
  },
  {
    id: "harf-karistir",
    title: "Harf Karıştır",
    description: "Türkçe ipucuna bak, karışık harflerden İngilizce kelimeyi doğru yaz. Yazım (spelling) pratiği; tek başına ya da takımlı.",
    icon: "🔠",
    path: "games/harf-karistir/index.html",
    color: "#0d9488",
    category: "oyun",
    skill: "yazim",
    tags: ["Tek kişi", "Takımlı", "Yazım"]
  },
  {
    id: "kelime-carki",
    title: "Kelime Çarkı",
    description: "Çarkı çevir, görevi kap: Türkçesini söyle, hecele, cümle kur, canlandır ya da çiz. Sınıfı konuşturan takım oyunu.",
    icon: "🎡",
    path: "games/kelime-carki/index.html",
    color: "#be185d",
    category: "oyun",
    skill: "kelime",
    tags: ["Sınıfça", "Konuşma", "Takımlı"]
  },
  {
    id: "cumle-kurma",
    title: "Cümle Kurma",
    description: "Karışık kelimelerden ünitenin yapısına uygun doğru cümleyi kur. Tek başına pratik yap ya da sınıfça takım takım yarış.",
    icon: "🔤",
    path: "games/cumle-kurma/index.html",
    color: "#7c3aed",
    category: "oyun",
    skill: "cumle-kurma",
    tags: ["Tek kişi", "Takımlı", "Gramer"]
  },
  {
    id: "halat-cekme",
    title: "Halat Çekme",
    description: "İki takım tahtanın iki yanında aynı soruya yarışır; ilk doğru cevabı veren ipi kendi tarafına çeker. Kelime ya da gramer.",
    icon: "🪢",
    path: "games/halat-cekme/index.html",
    color: "#dc2626",
    category: "oyun",
    skill: ["kelime", "gramer"],
    tags: ["Takımlı", "Akıllı tahta", "Hız"]
  },
  {
    id: "kelime-yakala",
    title: "Kelime Yakala",
    description: "Sevimli baykuşu yönet, doğru anlamı yakala, yanlışlardan kaç.",
    icon: "🦉",
    path: "games/kelime-yakala/index.html",
    color: "#7c5cff",
    category: "oyun",
    skill: "kelime",
    tags: ["Tek kişi", "Aksiyon"]
  },
  {
    id: "kelime-turnuvasi",
    title: "Kelime Turnuvası",
    description: "1'e 1 turnuva usulü kelime yarışması. Turları geç, şampiyon ol.",
    icon: "🏆",
    path: "games/kelime-turnuvasi/index.html",
    color: "#f59e0b",
    category: "oyun",
    skill: "kelime",
    tags: ["Sınıfça", "Turnuva"]
  },
  {
    id: "adam-asmaca",
    title: "Adam Asmaca",
    description: "Türkçe ipucundan yola çıkıp İngilizce kelimeyi harf harf bul.",
    icon: "🎯",
    path: "games/adam-asmaca/index.html",
    color: "#ef4444",
    category: "oyun",
    skill: "kelime",
    tags: ["Sınıfça", "Klasik"]
  },
  {
    id: "ciz-bakalim",
    title: "Çiz Bakalım",
    description: "Kelimeyi tahtaya çiz, takımın tahmin etsin. Süreyle yarış!",
    icon: "🎨",
    path: "games/ciz-bakalim/index.html",
    color: "#ec4899",
    category: "oyun",
    skill: "kelime",
    tags: ["Takımlı", "Akıllı tahta"]
  },
  {
    id: "kelime-avi",
    title: "Kelime Avı",
    description: "Harflerin arasına gizlenen İngilizce kelimeleri bul. Süreye karşı yarış!",
    icon: "🔎",
    path: "games/kelime-avi/index.html",
    color: "#14b8a6",
    category: "oyun",
    skill: "kelime",
    tags: ["Sınıfça", "Bulmaca"]
  },
  {
    id: "kelime-eslestirme",
    title: "Kelime Eşleştirme",
    description: "Hafıza kartlarıyla İngilizce kelimeleri anlamlarıyla eşleştir.",
    icon: "🧩",
    path: "games/kelime-eslestirme/index.html",
    color: "#4f8cff",
    category: "oyun",
    skill: "kelime",
    tags: ["Tek kişi", "Hafıza"]
  },
  {
    id: "kelime-kartlari",
    title: "Kelime Kartları",
    description: "Ünite ünite kelime listesi incele veya flashcard ile kendini test et.",
    icon: "📚",
    path: "games/kelime-kartlari/index.html",
    color: "#0ea5e9",
    category: "arac",
    skill: "kelime",
    tags: ["Çalışma", "Flashcard"]
  },
  {
    id: "icerik-inceleme",
    title: "İçerik İnceleme",
    description: "Öğretmen için: ünite ünite kelime, cümle ve gramer maddelerini gözden geçir, sorunlu olanı işaretleyip not al, listeyi kopyala ya da yazdır.",
    icon: "📋",
    path: "games/icerik-inceleme/index.html",
    color: "#475569",
    category: "arac",
    skill: ["kelime", "cumle-kurma", "gramer"],
    tags: ["Öğretmen", "Onay", "Yazdır"]
  }
];
