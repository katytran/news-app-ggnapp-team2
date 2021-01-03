// SELECT ELEMENTS
const name_location = document.querySelector(".name_location");
const getLocation = document.querySelector(".getLocation");
const noti = document.querySelector(".notification");
const dayInfo = document.querySelector(".dayInfo");
const temp = document.querySelector(".temp");
const weatherIcon = document.querySelector(".icon");

// App data
const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
const APIkey = "d1032fab5119ba55d9fe5f5cab2967f0";

defaultLocation();

function defaultLocation() {
  let lat = 21.0278;
  let long = 105.83;
  getWeather(lat, long);
}

//Checking for permission
checkPermission = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

getLocation.addEventListener("click", checkPermission);

function success(pos) {
  getLocation.style.display = "none";
  var crd = pos.coords;

  // console.log("Your current position is:");
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);

  getWeather(crd.latitude, crd.longitude);
}

function error(err) {
  noti.style.display = "block";
  noti.innerHTML = `<p>${err.message}</p>`;
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function getWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  weather.temperature.value = Math.floor(data.main.temp - KELVIN);
  weather.description = data.weather[0].main;
  weather.iconId = data.weather[0].icon;
  weather.city = data.name;
  weather.country = data.sys.country;
  fetchWeather();
}

function fetchWeather() {
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png" alt="" />`;
  temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  dayInfo.innerHTML = weather.description;
  name_location.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
temp.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    temp.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
