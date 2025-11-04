document.addEventListener("DOMContentLoaded", () => {
    const courses = [
        { subject: 'CSE', number: 110, credits: 2, completed: true },
        { subject: 'CSE', number: 111, credits: 2, completed: true },
        { subject: 'CSE', number: 210, credits: 2, completed: false },
        { subject: 'WDD', number: 130, credits: 2, completed: true },
        { subject: 'WDD', number: 131, credits: 2, completed: true },
        { subject: 'WDD', number: 231, credits: 2, completed: false }
    ];

    const section = document.getElementById("courses");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("course-filters");
    buttonContainer.innerHTML = `
        <button id="all">All</button>
        <button id="cse">CSE</button>
        <button id="wdd">WDD</button>
    `;
    section.appendChild(buttonContainer);

    const courseContainer = document.createElement("div");
    courseContainer.classList.add("course-container");
    section.appendChild(courseContainer);

    const totalCredits = document.createElement("p");
    totalCredits.classList.add("total-credits");
    section.appendChild(totalCredits);

    function displayCourses(list) {
        courseContainer.innerHTML = "";

        list.forEach(course => {
            const div = document.createElement("div");
            div.classList.add("course-item");
            if (course.completed) div.classList.add("completed");
            div.textContent = `${course.subject} ${course.number}`;
            courseContainer.appendChild(div);
        });

        const total = list.reduce((sum, c) => sum + c.credits, 0);
        totalCredits.textContent = `The total credits for course listed above is ${total}`;
    }

    displayCourses(courses);

    document.getElementById("all").addEventListener("click", () => displayCourses(courses));
    document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));
    document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));
});