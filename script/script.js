function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#now-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#nowTimeDate");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
  timeElement.innerHTML = `${hours}:${minutes}`;
  fullDateElement.innerHTML = `${day}, ${month} ${dayDate}`;
}

let apiKey = "af800718d3a8f4106f6f5a11754d006c";
let unitsM = "metric";
let unitsI = "imperial";
let city = "Moscow";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitsI}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
