document.addEventListener("DOMContentLoaded", () => {

    function getMembershipLabel(level) {
        switch (level) {
            case 3: return "Gold Member";
            case 2: return "Silver Member";
            case 1: return "Bronze Member";
            default: return "Member";
        }
    }

    async function loadSpotlights() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();

            const businesses = data.businesses;

            let eligible = businesses.filter(biz => biz.membershipLevel === 2 || biz.membershipLevel === 3);

            eligible = eligible.sort(() => Math.random() - 0.5);

            const selected = eligible.slice(0, 3);

            const spotlightContainer = document.querySelector("#spotlight-container");
            spotlightContainer.innerHTML = "";

            selected.forEach(biz => {
                const card = document.createElement("div");
                card.classList.add("member-card");

                const membershipLabel = getMembershipLabel(biz.membershipLevel);

                card.innerHTML = `
                    <img src="images/${biz.image}" alt="${biz.name} logo" loading="lazy">
                    <h3>${biz.name}</h3>
                    <p><strong>${biz.category}</strong> </p>
                    <p><strong>Phone:</strong> ${biz.phone}</p>
                    <p><a href="${biz.website}" target="_blank">Visit Website</a></p>
                    <p class="membership" style="text-decoration: underline;"><strong>${membershipLabel}</strong></p>
                `;

                spotlightContainer.appendChild(card);
            });

        } catch (error) {
            console.error("Error loading spotlight members:", error);
        }
    }

    loadSpotlights();
});