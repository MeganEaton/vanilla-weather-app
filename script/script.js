function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#now-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "af800718d3a8f4106f6f5a11754d006c";
let unitsM = "metric";
let unitsI = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Boston&units=${unitsI}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
