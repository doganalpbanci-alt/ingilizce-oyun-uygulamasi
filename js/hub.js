(function () {
  var grid = document.getElementById("game-grid");

  function renderGames() {
    if (!GAMES || GAMES.length === 0) {
      grid.innerHTML = '<p class="empty-state">Henüz oyun eklenmedi.</p>';
      return;
    }

    grid.innerHTML = GAMES.map(function (game) {
      return (
        '<a class="game-card" href="' + game.path + '" style="--card-color:' + game.color + '">' +
          '<span class="game-icon">' + game.icon + '</span>' +
          "<h2>" + game.title + "</h2>" +
          "<p>" + game.description + "</p>" +
        "</a>"
      );
    }).join("");
  }

  renderGames();
})();
