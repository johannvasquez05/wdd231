export function renderGameCard(game) {
    return `
        <div class="game-card">
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <h3>${game.title}</h3>
            <p><strong>Genre:</strong> ${game.genre}</p>
            <p><strong>Year:</strong> ${game.year}</p>
            <p><strong>Rating:</strong> ⭐ ${game.rating}</p>
        </div>
    `;
}

export function displayFeaturedGames(games, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = games.map(g => renderGameCard(g)).join("");
}