import { updateFooterInfo } from "./footer.js";
import { initNavMenu } from "./navigation.js";

initNavMenu();

updateFooterInfo();

document.addEventListener("DOMContentLoaded", () => {
    
    const params = new URLSearchParams(window.location.search);

    document.getElementById("name").textContent = params.get("name") || "";
    document.getElementById("email").textContent = params.get("email") || "";
    document.getElementById("favorite").textContent = params.get("favorite") || "";
    document.getElementById("message").textContent = params.get("message") || "";

    console.log("Form data loaded into thankyou.html");
});