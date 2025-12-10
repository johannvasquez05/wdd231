export function initNavMenu() {
    document.addEventListener("DOMContentLoaded", () => {
        const navbutton = document.querySelector('#ham-btn');
        const navlinks = document.querySelector('#nav-bar');

        if (!navbutton || !navlinks) return;

        navbutton.addEventListener('click', () => {
            navbutton.classList.toggle('show');
            navlinks.classList.toggle('show');
        });
    });
}