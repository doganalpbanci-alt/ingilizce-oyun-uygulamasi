/*
 * Oyun ekranlarının ortak yardımcıları (konfeti, takım listesi, skor tablosu).
 *
 * shared-setup.js kurulum ekranını, bu dosya oyun içi tekrar eden küçük
 * parçaları toplar. Yeni oyunlar kullanır; oyun mantığı burada değil.
 *
 *   HubPlay.confetti()                         -> #confetti-container'a konfeti
 *   HubPlay.escapeHtml(str)
 *   HubPlay.parseTeams(textareaEl)             -> [{name, score:0}] (boş satırlar atlanır)
 *   HubPlay.renderScoreboard(el, teams, final) -> sıralı skor satırları
 *   HubPlay.pickFresh(pool, used)              -> tekrar etmeyen rastgele öğe
 */
var HubPlay = (function () {

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function confetti() {
    var container = document.getElementById("confetti-container");
    if (!container) return;
    var colors = ["#facc15", "#22c55e", "#3b82f6", "#ef4444", "#a855f7", "#14b8a6"];
    for (var i = 0; i < 45; i++) {
      var piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2.2 + Math.random() * 1.6) + "s";
      piece.style.animationDelay = (Math.random() * 0.6) + "s";
      container.appendChild(piece);
      (function (el) { setTimeout(function () { el.remove(); }, 4500); })(piece);
    }
  }

  function parseTeams(textarea) {
    return textarea.value
      .split("\n")
      .map(function (n) { return n.trim(); })
      .filter(function (n) { return n.length > 0; })
      .map(function (n) { return { name: n, score: 0 }; });
  }

  function renderScoreboard(el, teams, showRanking) {
    var sorted = teams.slice().sort(function (a, b) { return b.score - a.score; });
    var top = sorted.length ? sorted[0].score : 0;
    el.innerHTML = sorted.map(function (team, i) {
      var leader = showRanking && team.score === top && top > 0;
      var medal = i === 0 ? "🥇" : (i === 1 ? "🥈" : (i === 2 ? "🥉" : (i + 1) + "."));
      return (
        '<div class="score-row' + (leader ? " leader" : "") + '">' +
          '<span class="score-rank">' + medal + "</span>" +
          '<span class="score-name">' + escapeHtml(team.name) + "</span>" +
          '<span class="score-points">' + team.score + "</span>" +
        "</div>"
      );
    }).join("");
  }

  // Havuzdan daha önce çıkmamış bir öğe seçer; hepsi çıktıysa baştan başlar.
  function pickFresh(pool, used) {
    var available = pool.filter(function (x) { return used.indexOf(x) === -1; });
    if (available.length === 0) {
      used.length = 0;
      available = pool;
    }
    var pick = available[Math.floor(Math.random() * available.length)];
    used.push(pick);
    return pick;
  }

  return {
    escapeHtml: escapeHtml,
    confetti: confetti,
    parseTeams: parseTeams,
    renderScoreboard: renderScoreboard,
    pickFresh: pickFresh
  };
})();
