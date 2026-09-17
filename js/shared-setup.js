/*
 * Tüm oyunların paylaştığı kurulum ekranı mantığı.
 *
 * Neden var: sınıf/seviye açılır listesi, ünite onay kutuları, "Tümünü Seç /
 * Temizle" düğmeleri ve ekran geçişi 8 oyunda birebir aynıydı. Twinkl
 * seviyeleri için <optgroup> desteği eklenirken 8 dosyaya ayrı ayrı dokunmak
 * gerekti; bu dosya o tekrarı bitiriyor.
 *
 * "Her oyun bağımsızdır" kuralı korunuyor: burada yalnızca **kurulum ekranı**
 * var, oyun mantığı yok. Tıpkı `css/style.css` gibi hub'ın ortak varlığı.
 * Oyunlar kendi `script.js`'lerinden ÖNCE bunu yükler:
 *   <script src="../../js/shared-setup.js"></script>
 *
 * Kullanım:
 *   var showScreen = HubSetup.screenSwitcher();          // basit hâli
 *   var picker = HubSetup.unitPicker({
 *     source: CURRICULUM,          // veya SENTENCES
 *     onChange: updateWordCount    // seçim değişince çağrılır
 *   });
 *   picker.start();                // listeleri doldurur (atamadan SONRA çağır)
 *   picker.grade()            -> seçili sınıf/seviye kaydı
 *   picker.checkedUnits()     -> işaretli ünite nesneleri
 *   picker.checkedUnitIds()   -> işaretli ünite id'leri
 */
var HubSetup = (function () {

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  }

  /*
   * `.screen` bölümleri arasında geçiş yapan fonksiyonu üretir.
   * afterShow: ekrana özel iş yapması gereken oyunlar için isteğe bağlı kanca
   * (örn. Çiz Bakalım tuvali yeniden boyutlandırıyor).
   */
  function screenSwitcher(afterShow) {
    var screens = document.querySelectorAll(".screen");
    return function (id) {
      screens.forEach(function (el) { el.hidden = el.id !== id; });
      if (afterShow) afterShow(id);
    };
  }

  function unitPicker(options) {
    var source = options.source;
    var onChange = options.onChange || function () {};
    var gradeSelect = document.getElementById("grade-select");
    var unitBox = document.getElementById("unit-checkboxes");

    // Sınıf listesi iki kaynaktan gelebilir (MEB ve Twinkl), bu yüzden
    // kayıtlardaki `group` alanına göre <optgroup> başlıkları altında
    // toplanır. `group` taşımayan kayıtlar doğrudan listeye eklenir.
    function populateGrades() {
      var groups = {};
      Object.keys(source).forEach(function (key) {
        var groupName = source[key].group || "";
        var parent = gradeSelect;
        if (groupName) {
          if (!groups[groupName]) {
            groups[groupName] = document.createElement("optgroup");
            groups[groupName].label = groupName;
            gradeSelect.appendChild(groups[groupName]);
          }
          parent = groups[groupName];
        }
        var option = document.createElement("option");
        option.value = key;
        option.textContent = source[key].label;
        parent.appendChild(option);
      });
      populateUnits();
    }

    // Üniteler işaretsiz başlar: öğretmen genelde tek bir ders çalıştırıyor,
    // "hepsi seçili"den başlamak fazladan bir "Temizle" dokunuşu demek olurdu.
    function populateUnits() {
      unitBox.innerHTML = "";
      source[gradeSelect.value].units.forEach(function (unit) {
        var label = document.createElement("label");
        label.className = "unit-checkbox";

        var input = document.createElement("input");
        input.type = "checkbox";
        input.value = unit.id;
        input.addEventListener("change", function () {
          label.classList.toggle("checked", input.checked);
          onChange();
        });

        var span = document.createElement("span");
        span.textContent = unit.title;

        label.appendChild(input);
        label.appendChild(span);
        unitBox.appendChild(label);
      });
      onChange();
    }

    function checkedUnitIds() {
      return Array.prototype.slice
        .call(unitBox.querySelectorAll("input:checked"))
        .map(function (input) { return input.value; });
    }

    function setAll(checked) {
      unitBox.querySelectorAll("input").forEach(function (input) {
        input.checked = checked;
        input.closest(".unit-checkbox").classList.toggle("checked", checked);
      });
      onChange();
    }

    gradeSelect.addEventListener("change", populateUnits);

    var selectAllBtn = document.getElementById("select-all-units");
    var clearAllBtn = document.getElementById("clear-all-units");
    if (selectAllBtn) selectAllBtn.addEventListener("click", function () { setAll(true); });
    if (clearAllBtn) clearAllBtn.addEventListener("click", function () { setAll(false); });

    // populateGrades BURADA çağrılmaz: onChange geri çağrısı oyunun `picker`
    // değişkenini kullanıyor ve o değişken bu fonksiyon dönmeden atanmıyor.
    // Oyun, picker'ı atadıktan sonra picker.start() çağırır.
    return {
      start: populateGrades,
      gradeKey: function () { return gradeSelect.value; },
      grade: function () { return source[gradeSelect.value]; },
      checkedUnitIds: checkedUnitIds,
      checkedUnits: function () {
        var ids = checkedUnitIds();
        return source[gradeSelect.value].units.filter(function (u) {
          return ids.indexOf(u.id) !== -1;
        });
      }
    };
  }

  return {
    shuffle: shuffle,
    screenSwitcher: screenSwitcher,
    unitPicker: unitPicker
  };
})();
