(function () {
  var grid = document.getElementById("game-grid");
  var countEl = document.getElementById("game-count");

  function renderGames() {
    if (countEl) {
      countEl.textContent = GAMES ? GAMES.length : 0;
    }

    if (!GAMES || GAMES.length === 0) {
      grid.innerHTML = '<p class="empty-state">Henüz oyun eklenmedi.</p>';
      return;
    }

    grid.innerHTML = GAMES.map(function (game, index) {
      var delay = (index * 0.06).toFixed(2);
      return (
        '<a class="game-card" href="' + game.path + '" style="--card-color:' + game.color + '; animation-delay:' + delay + 's">' +
          '<span class="game-icon">' + game.icon + '</span>' +
          "<h2>" + game.title + "</h2>" +
          "<p>" + game.description + "</p>" +
          '<span class="play-link">Oyna →</span>' +
        "</a>"
      );
    }).join("");
  }

  renderGames();
})();
