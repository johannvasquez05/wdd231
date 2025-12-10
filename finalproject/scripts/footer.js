export function updateFooterInfo() {
    const currentYear = document.getElementById("currentyear");
    const lastModified = document.getElementById("lastmodified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}