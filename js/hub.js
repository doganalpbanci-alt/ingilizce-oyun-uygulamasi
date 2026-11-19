(function () {
  var gameGrid = document.getElementById("game-grid");
  var toolGrid = document.getElementById("tool-grid");
  var skillFilterEl = document.getElementById("skill-filter");
  var activeSkill = "all";

  function skillLabel(skill) {
    return (typeof SKILL_LABELS !== "undefined" && SKILL_LABELS[skill]) || skill;
  }

  // `skill` tek bir kod ya da kod dizisi olabilir (Halat Çekme hem kelime
  // hem gramer çalıştırıyor).
  function skillsOf(item) {
    if (!item.skill) return [];
    return Array.isArray(item.skill) ? item.skill : [item.skill];
  }

  // Kelime sayısı müfredata (group) göre ayrı ayrı da tutulur: rozet
  // "1758 kelime (MEB 1181 · Twinkl 577)" gibi okunur.
  function countWords() {
    var result = { total: 0, byGroup: {} };
    if (typeof CURRICULUM === "undefined") return result;
    Object.keys(CURRICULUM).forEach(function (gradeKey) {
      var group = CURRICULUM[gradeKey].group || "";
      var short = group.indexOf("Twinkl") === 0 ? "Twinkl" : (group.indexOf("MEB") === 0 ? "MEB" : group);
      CURRICULUM[gradeKey].units.forEach(function (unit) {
        result.total += unit.words.length;
        result.byGroup[short] = (result.byGroup[short] || 0) + unit.words.length;
      });
    });
    return result;
  }

  function cardHtml(item, index) {
    var delay = (index * 0.06).toFixed(2);
    var tags = (item.tags || []).map(function (t) {
      return '<span class="card-tag">' + t + "</span>";
    }).join("");

    return (
      '<a class="game-card" href="' + item.path + '" style="--card-color:' + item.color + '; animation-delay:' + delay + 's">' +
        '<span class="game-icon">' + item.icon + "</span>" +
        "<h3>" + item.title + "</h3>" +
        "<p>" + item.description + "</p>" +
        '<div class="card-tags">' + tags + "</div>" +
        '<span class="play-link">Aç →</span>' +
      "</a>"
    );
  }

  function renderInto(grid, items, emptyText) {
    if (items.length === 0) {
      grid.innerHTML = '<p class="empty-state">' + emptyText + "</p>";
      return;
    }
    grid.innerHTML = items.map(cardHtml).join("");
  }

  function renderSkillFilter() {
    if (!skillFilterEl) return;

    var skills = [];
    GAMES.forEach(function (g) {
      skillsOf(g).forEach(function (s) {
        if (skills.indexOf(s) === -1) skills.push(s);
      });
    });

    // Sekmeler SKILL_LABELS'taki sırayla dizilir (registry sırasından bağımsız).
    var order = typeof SKILL_LABELS !== "undefined" ? Object.keys(SKILL_LABELS) : [];
    skills.sort(function (a, b) {
      var ia = order.indexOf(a), ib = order.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    // Tek beceri varken (bugünkü durum: sadece "kelime") sekme satırı
    // gösterilmez, gereksiz tek butonluk bir sıra oluşmaz. Yeni bir skill
    // (örn. "cumle-kurma") eklenip GAMES'te ikinci farklı değer belirdiği an
    // otomatik olarak sekmeler görünür hale gelir.
    if (skills.length <= 1) {
      skillFilterEl.hidden = true;
      skillFilterEl.innerHTML = "";
      return;
    }

    skillFilterEl.hidden = false;
    var chips = [
      '<button type="button" class="skill-chip' + (activeSkill === "all" ? " active" : "") +
        '" data-skill="all">Tümü</button>'
    ];
    skills.forEach(function (s) {
      chips.push(
        '<button type="button" class="skill-chip' + (activeSkill === s ? " active" : "") +
          '" data-skill="' + s + '">' + skillLabel(s) + "</button>"
      );
    });
    skillFilterEl.innerHTML = chips.join("");
  }

  function render() {
    var visible = activeSkill === "all"
      ? GAMES
      : GAMES.filter(function (g) { return skillsOf(g).indexOf(activeSkill) !== -1; });

    var games = visible.filter(function (g) { return g.category !== "arac"; });
    var tools = visible.filter(function (g) { return g.category === "arac"; });

    document.getElementById("game-count").textContent = games.length;
    document.getElementById("tool-count").textContent = tools.length;
    var words = countWords();
    document.getElementById("word-count").textContent = words.total;
    var split = document.getElementById("word-split");
    var groups = Object.keys(words.byGroup);
    if (split) {
      split.textContent = groups.length > 1
        ? "(" + groups.map(function (g) { return g + " " + words.byGroup[g]; }).join(" · ") + ")"
        : "";
    }

    renderSkillFilter();
    renderInto(gameGrid, games, "Bu beceride henüz oyun yok.");
    renderInto(toolGrid, tools, "Bu beceride henüz araç yok.");
  }

  if (skillFilterEl) {
    skillFilterEl.addEventListener("click", function (event) {
      var btn = event.target.closest(".skill-chip");
      if (!btn) return;
      activeSkill = btn.getAttribute("data-skill");
      render();
    });
  }

  render();
})();
