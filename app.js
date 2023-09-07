//State
let currCity = "Paris";
let units = "metric";

//Selectors
let city = document.querySelector(".weather-city");
let daytime = document.querySelector(".weather-daytime");
let forecast = document.querySelector(".weather-forecast");
let temperature = document.querySelector(".weather-temperature");
let icon = document.querySelector(".weather-icon");
let minmax = document.querySelector(".weather-minmax");
let feel = document.querySelector(".weather-realfeel");
let humidity = document.querySelector(".weather-humidity");
let wind = document.querySelector(".weather-wind");
let pressure = document.querySelector(".weather-pressure");

//Search the city
document.querySelector(".weather-search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather-search--form");
  //prevent default action
  e.preventDefault();
  //change current city
  currCity = search.value;
  //get weather forecast
  getWeather();
});

function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600;
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

//Convert country code to name
//function convertCountryCode(country) {
// let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
//return regionNames.of(country);
//}

function getWeather() {
  const API_KEY = "0f3f1424c42911931fe859a83f46bfe5";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name}`;
      daytime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
      temperature.innerHTML = `${data.main.temp.toFixed()}&#176C`;
      icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
      minmax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()}&#176C</p><p>Max:${data.main.temp_max.toFixed()}&#176C</p>`;
      feel.innerHTML = `${data.main.feels_like.toFixed()}&#176C`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}m/s`;
      pressure.innerHTML = `${data.main.pressure}hPa`;
    });
}
document.body.addEventListener("load", getWeather());
