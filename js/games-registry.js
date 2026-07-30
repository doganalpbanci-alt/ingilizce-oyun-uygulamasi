/*
 * Hub içerik listesi. Yeni bir oyun/araç eklerken buraya bir kayıt ekle.
 *
 * category: "oyun"  -> Oyunlar bölümünde görünür
 *           "arac"  -> Çalışma Araçları bölümünde görünür
 * tags:     kartın altında rozet olarak görünen kısa etiketler
 */
var GAMES = [
  {
    id: "kelime-yakala",
    title: "Kelime Yakala",
    description: "Sevimli baykuşu yönet, doğru anlamı yakala, yanlışlardan kaç.",
    icon: "🦉",
    path: "games/kelime-yakala/index.html",
    color: "#7c5cff",
    category: "oyun",
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
    tags: ["Takımlı", "Akıllı tahta"]
  },
  {
    id: "kelime-eslestirme",
    title: "Kelime Eşleştirme",
    description: "Hafıza kartlarıyla İngilizce kelimeleri anlamlarıyla eşleştir.",
    icon: "🧩",
    path: "games/kelime-eslestirme/index.html",
    color: "#4f8cff",
    category: "oyun",
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
    tags: ["Çalışma", "Flashcard"]
  }
];
