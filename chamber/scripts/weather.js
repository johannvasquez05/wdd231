document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "5aa3fa30deba8561b3baf54e9f1a69be";
    const lat = 8.9824;
    const lon = -79.5199;

    async function getWeather() {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("API response error");
            }

            const data = await response.json();

            displayCurrentWeather(data);
            displayForecast(data);

        } catch (error) {
            console.error("Weather API Error:", error);
        }
    }

    function displayCurrentWeather(data) {

        const current = data.list[0];
        const temp = Math.round(current.main.temp);
        const description = capitalize(current.weather[0].description);
        const icon = current.weather[0].icon;

        document.querySelector("#temp").textContent = `${temp}°C`;
        document.querySelector("#description").textContent = description;

        document.querySelector("#current-weather").innerHTML += `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        `;
    }

    function displayForecast(data) {
        const forecastDiv = document.querySelector("#forecast");
        forecastDiv.innerHTML = ""; 

        const indexes = [8, 16, 24];

        indexes.forEach((i) => {
            if (!data.list[i]) return;

            const day = new Date(data.list[i].dt * 1000).toLocaleDateString("en-US", {
                weekday: "long"
            });

            const temp = Math.round(data.list[i].main.temp);

            forecastDiv.innerHTML += `
                <p><strong>${day}:</strong> ${temp}°C</p>
            `;
        });
    }

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    getWeather();
});