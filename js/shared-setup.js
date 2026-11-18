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
 *   picker.grade()            -> seçili sınıf/seviye kaydı ("karışık" seçiliyse
 *                                o müfredatın tüm ünitelerini taşıyan sanal kayıt)
 *   picker.checkedUnits()     -> işaretli ünite nesneleri
 *   picker.checkedUnitIds()   -> işaretli ünite id'leri
 *   picker.setSource(OBJ)     -> içerik kaynağını değiştirir (sınıf korunur)
 */
var HubSetup = (function () {

  var MIX_PREFIX = "mix:";

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
      buildGradeOptions();
      populateUnits();
    }

    function buildGradeOptions() {
      gradeSelect.innerHTML = "";
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

      // Birden çok sınıf/seviyesi olan her müfredatın sonuna "karışık"
      // seçeneği: tekrar dersinde Level 1+2+3 ya da 5.+6. sınıf birlikte.
      Object.keys(groups).forEach(function (groupName) {
        if (groups[groupName].children.length < 2) return;
        var mix = document.createElement("option");
        mix.value = MIX_PREFIX + groupName;
        mix.textContent = "🔀 Karışık (birden çok " + (groupName.indexOf("Twinkl") === 0 ? "seviye" : "sınıf") + ")";
        groups[groupName].appendChild(mix);
      });
    }

    // Seçili kaydı döndürür. "Karışık" seçiliyse o müfredatın tüm
    // sınıflarındaki üniteleri tek bir sanal kayıtta toplar; ünite başlığına
    // sınıf adı eklenir ("Level 2 · Ders 3 - ..."). Ünite id'leri müfredat
    // içinde benzersiz olduğu için oyunlar farkı görmez.
    var mixCache = {};
    function currentGrade() {
      var key = gradeSelect.value;
      if (key.indexOf(MIX_PREFIX) !== 0) return source[key];
      if (mixCache[key] && mixCache[key].source === source) return mixCache[key].grade;
      var groupName = key.slice(MIX_PREFIX.length);
      var units = [];
      Object.keys(source).forEach(function (k) {
        if (source[k].group !== groupName) return;
        var prefix = source[k].label.split(/ \(| —/)[0];
        source[k].units.forEach(function (u) {
          var copy = {};
          for (var f in u) if (Object.prototype.hasOwnProperty.call(u, f)) copy[f] = u[f];
          copy.title = prefix + " · " + u.title;
          units.push(copy);
        });
      });
      var grade = { label: "Karışık — " + groupName, group: groupName, units: units };
      mixCache[key] = { source: source, grade: grade };
      return grade;
    }

    // Üniteler işaretsiz başlar: öğretmen genelde tek bir ders çalıştırıyor,
    // "hepsi seçili"den başlamak fazladan bir "Temizle" dokunuşu demek olurdu.
    function populateUnits() {
      unitBox.innerHTML = "";
      currentGrade().units.forEach(function (unit) {
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

    // Aynı oyunda iki içerik kaynağı arasında geçiş (örn. Halat Çekme:
    // kelime <-> gramer). Seçili sınıf yeni kaynakta da varsa korunur.
    function setSource(newSource) {
      var previous = gradeSelect.value;
      source = newSource;
      buildGradeOptions();
      if (source[previous] || (previous.indexOf(MIX_PREFIX) === 0 &&
          gradeSelect.querySelector('option[value="' + previous + '"]'))) {
        gradeSelect.value = previous;
      }
      populateUnits();
    }

    // populateGrades BURADA çağrılmaz: onChange geri çağrısı oyunun `picker`
    // değişkenini kullanıyor ve o değişken bu fonksiyon dönmeden atanmıyor.
    // Oyun, picker'ı atadıktan sonra picker.start() çağırır.
    return {
      start: populateGrades,
      setSource: setSource,
      gradeKey: function () { return gradeSelect.value; },
      grade: currentGrade,
      isMixed: function () { return gradeSelect.value.indexOf(MIX_PREFIX) === 0; },
      checkedUnitIds: checkedUnitIds,
      checkedUnits: function () {
        var ids = checkedUnitIds();
        return currentGrade().units.filter(function (u) {
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
