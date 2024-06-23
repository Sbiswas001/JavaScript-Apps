let apiKey = "6ee46a1fcf6003db9a6579a598294e25";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".error").style.display = "none";
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "../assets/images/weather-app/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "../assets/images/weather-app/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "../assets/images/weather-app/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "../assets/images/weather-app/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "../assets/images/weather-app/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "../assets/images/weather-app/snow.png";
        }
        document.querySelector(".weather").style.display = "block";
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})