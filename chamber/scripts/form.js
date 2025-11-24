document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("formTimestamp");
    timestampField.value = new Date().toISOString();

    const form = document.getElementById("joinForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {
            firstName: form.querySelector('input[name="first-name"]').value,
            lastName: form.querySelector('input[name="last-name"]').value,
            orgTitle: form.querySelector('input[name="org-title"]').value,
            email: form.querySelector('input[name="email"]').value,
            phone: form.querySelector('input[name="phone"]').value,
            organization: form.querySelector('input[name="organization"]').value,
            membership: form.querySelector('select[name="membership"]').value,
            description: form.querySelector('textarea[name="description"]').value,
            timestamp: timestampField.value
        };

        localStorage.setItem("formData", JSON.stringify(formData));

        window.location.href = "thankyou.html";
    });

    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    openButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.dataset.target;
            const dialog = document.getElementById(modalId);
            if (dialog) dialog.showModal();
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const dialog = btn.closest("dialog");
            if (dialog) dialog.close();
        });
    });

    const allDialogs = document.querySelectorAll("dialog");

    allDialogs.forEach(dialog => {
        dialog.addEventListener("click", (event) => {
            const dialogRect = dialog.getBoundingClientRect();
            const inside =
                event.clientX >= dialogRect.left &&
                event.clientX <= dialogRect.right &&
                event.clientY >= dialogRect.top &&
                event.clientY <= dialogRect.bottom;

            if (!inside) dialog.close();
        });
    });
});