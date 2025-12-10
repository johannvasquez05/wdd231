import { updateFooterInfo } from "./footer.js";
import { initNavMenu } from "./navigation.js";

initNavMenu();

updateFooterInfo();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contactForm");

    form.addEventListener("submit", () => {
        console.log("Submitting contact form...");
    });
});