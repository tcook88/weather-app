let now = new Date();

let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let days = ["Sunday",
"Monday",
"Tuesday", 
"Wednesday",
"Thursday",
"Friday",
"Saturday"];
let day = days[now.getDay()];
    

let currentTime = document.querySelector(".current-time");

currentTime.innerHTML = `${day} ${hours}:${minutes}`;

let cityInput = document.querySelector("#city-input");
let newCity = document.querySelector(".city");

function searchWeather(event) {
    event.preventDefault();
    newCity.innerHTML = `${cityInput.value}`;
    let city = cityInput.value
    let unit = "imperial";
    
    let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
    let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#city-search");

form.addEventListener("submit", searchWeather);

let currentTemp = document.querySelector("#current-temp");
let currentHigh = document.querySelector("#current-high");
let currentLow = document.querySelector("#current-low");
let currentHumidity = document.querySelector("#current-humidity");
let currentWind = document.querySelector("#current-wind");
let currentDescription = document.querySelector("#current-description");




function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = temp; 
  let maxTemp = Math.round(response.data.main.temp_max);
  currentHigh.innerHTML = maxTemp;
  let minTemp = Math.round(response.data.main.temp_min);
  currentLow.innerHTML = minTemp;
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = wind;
  currentDescription.innerHTML = response.data.weather[0].main;
  currentHumidity.innerHTML = response.data.main.humidity;

  console.log(response.data);
}


function showLocationTemperature(response) { 
  let temp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = temp; 
  let maxTemp = Math.round(response.data.main.temp_max);
  currentHigh.innerHTML = maxTemp;
  let minTemp = Math.round(response.data.main.temp_min);
  currentLow.innerHTML = minTemp;
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = wind;
  currentDescription.innerHTML = response.data.weather[0].main;
  currentHumidity.innerHTML = response.data.main.humidity;
  newCity.innerHTML = response.data.name;
}

function showLocation(position) {
    console.log('position', position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let unit = "imperial";
    let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showLocationTemperature);
    
}

function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showLocation);
}


let locationButton = document.querySelector(".location-button");
locationButton.addEventListener("click", getLocation);


//function changeTempToFaren() {
    currentTemp.innerHTML = 57;
//}

//function changeTempToCel() {
 //   currentTemp.innerHTML = 14;
//}



let faren = document.querySelector("#faren");
let cel = document.querySelector("#cel");

// faren.addEventListener("click", changeTempToFaren);
// cel.addEventListener("click", changeTempToCel);