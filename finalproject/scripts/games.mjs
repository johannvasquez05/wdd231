import { updateFooterInfo } from "./footer.js";
import { initNavMenu } from "./navigation.js";

initNavMenu();
updateFooterInfo();

const container = document.querySelector("#games-container");
const modal = document.querySelector("#game-modal");

const modalImg = document.querySelector("#modal-img");
const modalTitle = document.querySelector("#modal-title");
const modalGenre = document.querySelector("#modal-genre");
const modalYear = document.querySelector("#modal-year");
const modalRating = document.querySelector("#modal-rating");
const modalDesc = document.querySelector("#modal-desc");
const favBtn = document.querySelector("#fav-btn");

const closeBtn = document.querySelector(".close-btn");

async function loadGames() {
    try {
        const res = await fetch("./data/games.json");
        if (!res.ok) throw new Error("Failed to load games.json");

        return await res.json();
    } catch (err) {
        console.error("Error loading games:", err);
        return [];
    }
}

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function toggleFavorite(game) {
    let favorites = getFavorites();
    const exists = favorites.some(g => g.id === game.id);

    favorites = exists
        ? favorites.filter(g => g.id !== game.id)
        : [...favorites, game];

    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(gameId) {
    return getFavorites().some(g => g.id === gameId);
}

function openModal(game) {
    modalImg.src = game.image;
    modalTitle.textContent = game.title;
    modalGenre.textContent = game.genre;
    modalYear.textContent = game.year;
    modalRating.textContent = game.rating;
    modalDesc.textContent = game.description;

    favBtn.classList.toggle("active", isFavorite(game.id));

    favBtn.onclick = () => {
        toggleFavorite(game);
        favBtn.classList.toggle("active");
        updateCardHearts();
    };

    modal.classList.add("show");
}

closeBtn.addEventListener("click", () => modal.classList.remove("show"));

modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.remove("show");
});

function renderGames(games) {
    container.innerHTML = "";

    games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        const gameIsFav = isFavorite(game.id);

        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <h2>${game.title}</h2>
            <p>${game.genre} • ${game.year}</p>
            <span class="rating">⭐ ${game.rating}</span>

            <button class="fav-btn card-fav" data-id="${game.id}">
                <span class="heart ${gameIsFav ? "active" : ""}">❤</span>
            </button>
        `;

        card.addEventListener("click", e => {
            if (!e.target.classList.contains("heart")) {
                openModal(game);
            }
        });

        container.append(card);
    });

    setupCardFavoriteButtons(games);
}

function setupCardFavoriteButtons(games) {
    document.querySelectorAll(".card-fav").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();

            const id = Number(btn.dataset.id);
            const game = games.find(g => g.id === id);
            const heart = btn.querySelector(".heart");

            toggleFavorite(game);
            heart.classList.toggle("active");

            if (modal.classList.contains("show")) {
                favBtn.classList.toggle("active", isFavorite(id));
            }
        });
    });
}

function updateCardHearts() {
    document.querySelectorAll(".card-fav").forEach(btn => {
        const id = Number(btn.dataset.id);
        const heart = btn.querySelector(".heart");
        heart.classList.toggle("active", isFavorite(id));
    });
}

loadGames().then(renderGames);
