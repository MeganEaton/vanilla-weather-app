function displayWeatherIcon(icon) {
  let iconClass = "";
  if (icon === "01d") {
    iconClass = "wi wi-day-sunny";
  } else if (icon === "01n") {
    iconClass = "wi wi-night-clear";
  } else if (icon === "02d") {
    iconClass = "wi wi-day-cloudy";
  } else if (icon === "02n") {
    iconClass = "wi wi-night-alt-cloudy";
  } else if (icon === "03d") {
    iconClass = "wi wi-cloud";
  } else if (icon === "03n") {
    iconClass = "wi wi-cloud";
  } else if (icon === "04d") {
    iconClass = "wi wi-cloudy";
  } else if (icon === "04n") {
    iconClass = "wi wi-cloudy";
  } else if (icon === "09d") {
    iconClass = "wi wi-showers";
  } else if (icon === "09n") {
    iconClass = "wi wi-showers";
  } else if (icon === "10d") {
    iconClass = "wi wi-day-rain";
  } else if (icon === "10n") {
    iconClass = "wi wi-night-alt-rain";
  } else if (icon === "11d") {
    iconClass = "wi wi-thunderstorm";
  } else if (icon === "11n") {
    iconClass = "wi wi-thunderstorm";
  } else if (icon === "13d") {
    iconClass = "wi wi-snow";
  } else if (icon === "13n") {
    iconClass = "wi wi-snow";
  } else if (icon === "50d") {
    iconClass = "wi wi-fog";
  } else if (icon === "50n") {
    iconClass = "wi wi-fog";
  }
  return iconClass;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "af800718d3a8f4106f6f5a11754d006c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getMoreDescription(coordinates) {
  console.log(coordinates);
  let apiKey = "af800718d3a8f4106f6f5a11754d006c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayMoreDescription);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#now-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let feelsLikeElement = document.querySelector("#feels-like");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  formatDate(response.data.dt * 1000);
  iconElement.innerHTML = `<i class="${displayWeatherIcon(
    response.data.weather[0].icon
  )}"></i>`;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  formatSunriseTime(response.data.sys.sunrise * 1000);
  formatSunsetTime(response.data.sys.sunset * 1000);

  getForecast(response.data.coord);
  getMoreDescription(response.data.coord);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let timeElement = document.querySelector("#time");
  let fullDateElement = document.querySelector("#date");
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayDate = date.getDate();
  timeElement.innerHTML = ` ${hours}:${minutes} `;
  fullDateElement.innerHTML = ` ${day}, ${month} ${dayDate}`;
}

function formatSunriseTime(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = `${hours}:${minutes}`;
}
function formatSunsetTime(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "af800718d3a8f4106f6f5a11754d006c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "af800718d3a8f4106f6f5a11754d006c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row gx-0 bg-transparent text-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (0 < index && index < 7) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-sm-2">
              <div class="card border-0 bg-transparent rounded-0">
                <div class="card-body">
                  <ul class="nextDay1">
                    <li class="weekday">${formatDay(forecastDay.dt)}</li>
                    <li><i class="${displayWeatherIcon(
                      forecastDay.weather[0].icon
                    )}" alt="forecast icon"></i></li>
                    <li class="forecastHighLow">
                      <span class="forecastHigh" id="forecast-high">${Math.round(
                        forecastDay.temp.max
                      )}</span>/<span class="forecastLow" id="forecast-low">${Math.round(
          forecastDay.temp.min
        )}</span>
                    </li>
                  </ul>
                </div>
              </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayMoreDescription(response) {
  console.log(response);
  let todaysHighElement = document.querySelector("#todays-high");
  let todaysLowElement = document.querySelector("#todays-low");
  formatMoonriseTime(response.data.daily[0].moonrise * 1000);
  formatMoonsetTime(response.data.daily[0].moonset * 1000);

  todaysHighElement.innerHTML = Math.round(response.data.daily[0].temp.max);
  todaysLowElement.innerHTML = Math.round(response.data.daily[0].temp.min);
}

function formatMoonriseTime(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let moonriseElement = document.querySelector("#moonrise");
  moonriseElement.innerHTML = `${hours}:${minutes}`;
}
function formatMoonsetTime(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let moonsetElement = document.querySelector("#moonset");
  moonsetElement.innerHTML = `${hours}:${minutes}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Montreal");
