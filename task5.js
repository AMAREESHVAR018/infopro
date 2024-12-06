// OpenWeatherMap API Key and URL
const API_KEY = "your_api_key";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// HTML Elements
const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const currentLocationBtn = document.getElementById('current-location');

// Fetch weather data
async function fetchWeather(query) {
    const url = `${BASE_URL}?${query}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Display weather information
function displayWeather(data) {
    const { name, main, weather } = data;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels Like: ${main.feels_like}°C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(`q=${location}`);
        locationInput.value = '';
    }
});

// Get weather by current location
currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(`lat=${latitude}&lon=${longitude}`);
            },
            (error) => {
                weatherInfo.innerHTML = `<p>Unable to retrieve location. Error: ${error.message}</p>`;
            }
        );
    } else {
        weatherInfo.innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
    }
});
