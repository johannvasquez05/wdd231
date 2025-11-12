document.addEventListener("DOMContentLoaded", () => {

    const membersContainer = document.querySelector("#members");

    async function getMembers() {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.businesses);
    }

    function getMembershipLabel(level) {
        switch (level) {
            case 1:
                return "Member";
            case 2:
                return "Silver Member";
            case 3:
                return "Gold Member";
        }
    }

    function displayMembers(businesses) {
        membersContainer.innerHTML = "";

        businesses.forEach(biz => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            const membershipLabel = getMembershipLabel(biz.membershipLevel);

            card.innerHTML = `
      <img src="images/${biz.image}" alt="${biz.name} logo loading="lazy"">
      <h3>${biz.name}</h3>
      <p><strong>Category:</strong> ${biz.category}</p>
      <p class= description><strong>Description:</strong> ${biz.description}</p>
      <p><strong>Address:</strong> ${biz.address}</p>
      <p><strong>Phone:</strong> ${biz.phone}</p>
      <p><a href="${biz.website}" target="_blank">Visit Website</a></p>
      <p class= membership style="text-decoration: underline;"><strong>${membershipLabel}</strong></p>
    `;

            membersContainer.appendChild(card);
        });
    }

    document.querySelector("#grid").addEventListener("click", () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
    });

    document.querySelector("#list").addEventListener("click", () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
    });

    getMembers();
});