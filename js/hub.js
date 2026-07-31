(function () {
  var gameGrid = document.getElementById("game-grid");
  var toolGrid = document.getElementById("tool-grid");

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

  function render() {
    var games = GAMES.filter(function (g) { return g.category !== "arac"; });
    var tools = GAMES.filter(function (g) { return g.category === "arac"; });

    document.getElementById("game-count").textContent = games.length;
    document.getElementById("tool-count").textContent = tools.length;
    document.getElementById("word-count").textContent = countWords();

    renderInto(gameGrid, games, "Henüz oyun eklenmedi.");
    renderInto(toolGrid, tools, "Henüz araç eklenmedi.");
  }

  render();
})();
