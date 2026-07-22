/*
 * Sınıf / ünite bazlı kelime veritabanı. Tüm oyunlar bu dosyayı kullanır.
 *
 * Yeni ünite eklemek için CURRICULUM["<sınıf>"].units dizisine şunu ekle:
 *   { id: "benzersiz-id", title: "Ünite Başlığı", words: [{ en: "word", tr: "anlam" }, ...] }
 *
 * Not: Aşağıdaki kelimeler örnek/başlangıç içeriğidir. Gerçek MEB müfredatındaki
 * ünite sırası yıla ve yayınevine göre değişebilir — kendi sınıfının ünitelerine
 * göre bu listeyi düzenle veya yeni üniteler ekle.
 */
var CURRICULUM = {
  "5": {
    label: "5. Sınıf",
    units: [
      {
        id: "selamlasma",
        title: "Selamlaşma ve Tanışma",
        words: [
          { en: "hello", tr: "merhaba" },
          { en: "goodbye", tr: "hoşça kal" },
          { en: "good morning", tr: "günaydın" },
          { en: "good night", tr: "iyi geceler" },
          { en: "please", tr: "lütfen" },
          { en: "thank you", tr: "teşekkür ederim" },
          { en: "friend", tr: "arkadaş" },
          { en: "name", tr: "isim" }
        ]
      },
      {
        id: "sayilar-renkler",
        title: "Sayılar ve Renkler",
        words: [
          { en: "one", tr: "bir" },
          { en: "two", tr: "iki" },
          { en: "three", tr: "üç" },
          { en: "four", tr: "dört" },
          { en: "red", tr: "kırmızı" },
          { en: "blue", tr: "mavi" },
          { en: "green", tr: "yeşil" },
          { en: "yellow", tr: "sarı" }
        ]
      }
    ]
  }
};
