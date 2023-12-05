const KEY = "bde06e7599fba48d9ae2395cd4032408";

const weather = {
  clear: {
    name: "Ясно",
    picture: "./images/Clear.png",
  },
  clouds: {
    name: "Облачно",
    picture: "./images/Clouds.png",
  },
  drizzle: {
    name: "Морось",
    picture: "./images/Drizzle.png",
  },
  mist: {
    name: "Туман",
    picture: "./images/Mist.png",
  },
  rain: {
    name: "Дождь",
    picture: "./images/Rain.png",
  },
  snow: {
    name: "Снег",
    picture: "./images/Snow.png",
  },
  thunderstorm: {
    name: "Гроза",
    picture: "./images/Thunderstorm.png",
  },
};

const button = document.querySelector(".button");
const input = document.querySelector(".input");
let weatherContainer = document.querySelector(".weather");
let locationElement = document.querySelector(".select-location");
let notfound = document.querySelector(".notfound");
let refresh = document.querySelector(".refresh");
const reload = refresh.querySelector("svg");

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod !== 200) {
        console.error(`Error: ${json.message}`);
        notfound.style.display = "";
        return;
      }
      const city = json.name;
      const temp = json.main.temp;
      const pressure = json.main.pressure;
      const windSpeed = json.wind.speed;
      const description = json.weather[0].main.toLowerCase();
      let image = weather[description].picture;
      let weatherDescription = weather[description].name;

      weatherContainer.querySelector(".city").textContent = city;
      weatherContainer.querySelector(".weather-img img").src = image;
      weatherContainer.querySelector(".temp").textContent = `${parseInt(temp)}°С`;
      weatherContainer.querySelector(".descr").textContent = weatherDescription;
      weatherContainer.querySelector(
        ".windspeed"
      ).textContent = `${windSpeed} м/с`;
      weatherContainer.querySelector(
        ".pressure"
      ).textContent = `${pressure} мм р.с.`;

      locationElement.style.display = "none";
      weatherContainer.style.display = "flex";
      refresh.style.display = "";
    });
}

button.addEventListener("click", () => {
  getWeather(input.value);
});

input.addEventListener("focus", () => {
  input.setAttribute("placeholder", "");
  notfound.style.display = "none";
});

input.addEventListener("focusout", () => {
  if (input.value === "") {
    input.setAttribute("placeholder", "Enter location");
  }
});

reload.addEventListener("click", () => location.reload());
