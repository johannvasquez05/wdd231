import { updateFooterInfo } from "./footer.js";
import { displayFeaturedGames } from "./render.js";
import { initNavMenu } from "./navigation.js";

initNavMenu();

updateFooterInfo();

async function loadGames() {
    try {
        const response = await fetch("./data/games.json");

        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.status} ${response.statusText}`);
        }

        const games = await response.json();

        const featured = games.slice(0, 3);

        displayFeaturedGames(featured, "gameGrid");

    } catch (error) {
        console.error("Error loading games:", error);
    }
}
loadGames();