
import { places } from '../data/interest.mjs';

document.addEventListener('DOMContentLoaded', () => {
    buildCards();
    buildModals();
    setupLastVisitMessage();
    setupInteractions();


    function buildCards() {
        const grid = document.getElementById('grid');

        places.forEach((place, idx) => {
            const areaClass = `a${idx + 1}`;

            const article = document.createElement('article');
            article.className = `card ${areaClass}`;
            article.setAttribute('tabindex', '0');

            article.innerHTML = `
            <h2>${escapeHtml(place.name)}</h2>
            <figure>
                <img src="${escapeHtml(place.image)}" 
                     alt="${escapeHtml(place.name)}" 
                     loading="lazy">
            </figure>
            <address>${escapeHtml(place.address)}</address>
            <p>${escapeHtml(place.description)}</p>
            <button class="open-modal" data-id="${place.id}">
                Learn more
            </button>
        `;

            grid.appendChild(article);
        });
    }

    function buildModals() {
        const modals = document.getElementById('modals');

        places.forEach(place => {
            const dialog = document.createElement('dialog');
            dialog.id = place.id;

            dialog.innerHTML = `
            <h2>${escapeHtml(place.name)}</h2>
            <p><strong>Address:</strong> ${escapeHtml(place.address)}</p>
            <p>${escapeHtml(place.description2)}</p>

            <button class="close-modal">Close</button>
        `;

            modals.appendChild(dialog);
        });
    }

    function setupLastVisitMessage() {
        const KEY = 'discover_last_visit';
        const visitMessage = document.getElementById('visitMessage');

        const now = Date.now();
        const last = parseInt(localStorage.getItem(KEY), 10);

        if (!last) {
            visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const days = Math.floor((now - last) / (1000 * 60 * 60 * 24));

            if (days === 0) visitMessage.textContent = "Back so soon! Awesome!";
            else if (days === 1) visitMessage.textContent = "You last visited 1 day ago.";
            else visitMessage.textContent = `You last visited ${days} days ago.`;
        }

        localStorage.setItem(KEY, now);
    }

    function setupInteractions() {
        const grid = document.getElementById('grid');

        grid.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-modal')) {
                const id = e.target.dataset.id;
                const dialog = document.getElementById(id);
                dialog.showModal();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal')) {
                const dialog = e.target.closest('dialog');
                dialog.close();
            }
        });
    }

    function escapeHtml(str = '') {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
});