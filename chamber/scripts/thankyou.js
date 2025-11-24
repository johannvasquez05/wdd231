document.addEventListener("DOMContentLoaded", () => {

    const stored = localStorage.getItem("formData");

    if (!stored) {
        document.querySelector("main").innerHTML =
            "<p>No submission data found.</p>";
        return;
    }

    const data = JSON.parse(stored);

    document.getElementById("firstName").textContent = data.firstName || "Not provided";
    document.getElementById("lastName").textContent = data.lastName || "Not provided";
    document.getElementById("email").textContent = data.email || "Not provided";
    document.getElementById("phone").textContent = data.phone || "Not provided";
    document.getElementById("business").textContent = data.organization || "Not provided";

    if (data.timestamp) {
        const date = new Date(data.timestamp);
        const formatted = date.toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "short"
        });
        document.getElementById("timestamp").textContent = formatted;
    } else {
        document.getElementById("timestamp").textContent = "Not provided";
    }
});