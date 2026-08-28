(function () {
  var gameGrid = document.getElementById("game-grid");
  var toolGrid = document.getElementById("tool-grid");
  var skillFilterEl = document.getElementById("skill-filter");
  var activeSkill = "all";

  function skillLabel(skill) {
    return (typeof SKILL_LABELS !== "undefined" && SKILL_LABELS[skill]) || skill;
  }

  function countWords() {
    if (typeof CURRICULUM === "undefined") return 0;
    var total = 0;
    Object.keys(CURRICULUM).forEach(function (gradeKey) {
      CURRICULUM[gradeKey].units.forEach(function (unit) {
        total += unit.words.length;
      });
    });
    return total;
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
      if (g.skill && skills.indexOf(g.skill) === -1) skills.push(g.skill);
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
      : GAMES.filter(function (g) { return g.skill === activeSkill; });

    var games = visible.filter(function (g) { return g.category !== "arac"; });
    var tools = visible.filter(function (g) { return g.category === "arac"; });

    document.getElementById("game-count").textContent = games.length;
    document.getElementById("tool-count").textContent = tools.length;
    document.getElementById("word-count").textContent = countWords();

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
