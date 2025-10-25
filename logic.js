const apikey = "e8236f72f0788ed57696b6870d21643f";
let curLoc = document.querySelector(".current-location");
let curdate = document.querySelector(".current-date");
let curtemp = document.querySelector(".current-temp");
let curWeath = document.querySelector(".current-weather");
let curfells = document.querySelector(".current-feels-like");
let mainimage = document.querySelector(".current-weather-image");
let curHumidity = document.querySelector(".current-humidity");
let curWind = document.querySelector(".current-windspeed");
let curVisibile = document.querySelector(".current-visibility");
let curPress = document.querySelector(".current-Pressure");
let sunrise = document.querySelector(".sunrise-knowledge");
let sunset = document.querySelector(".sunset-knowledge");
let search = document.querySelector("#city-search");
let curLocBtn = document.querySelector(".location-btn");

let data;

function updateCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    async function lat_long() {
      try {
        const reponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
        );
        data = await reponse.json();
        console.log(data);
        update(data);
      } catch (error) {
        console.log(error);
      }
    }
    lat_long();
  });
}

function update(data) {
  curLoc.innerHTML = `<img src="assets/icons/location.png" alt="pic">
        <span>${data.name}, ${data.sys.country}</span>`;

  curdate.innerHTML = `<img src="assets/icons/calender.png" alt="pic">
        <span>${new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}</span>`;

  curWeath.innerHTML = `${data.weather[0].description}`;

  curtemp.innerHTML = `${Math.round(data.main.temp - 273.15).toFixed(
    0
  )}<sup>&deg;</sup>C`;

  curfells.innerHTML = `Fells Like ${Math.round(
    data.main.feels_like - 273.15
  ).toFixed(0)}<sup>&deg;</sup>C`;

  curHumidity.innerHTML = `${data.main.humidity}%`;

  curWind.innerHTML = `${Math.floor(data.wind.speed * 3.6).toFixed(0)}Km/h`;

  curVisibile.innerHTML = `${data.visibility}Km`;

  curPress.innerHTML = `${data.main.pressure} hPa`;

  sunrise.innerHTML = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  )}`;

  sunset.innerHTML = `${new Date(data.sys.sunset * 1000).toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  )}`;
  if (curWeath.innerHTML.includes("clear")) {
    mainimage.innerHTML = `<img src="assets/weather-report/sunny.png" alt="pic">`;
  } else if (curWeath.innerHTML.includes("rain")) {
    mainimage.innerHTML = `<img src="assets/weather-report/rainy-day.png" alt="pic">`;
  } else if (curWeath.innerHTML.includes("haze")) {
    mainimage.innerHTML = `<img src="assets/weather-report/haze.png" alt="pic">`;
  } else if (curWeath.innerHTML.includes("cloud")) {
    mainimage.innerHTML = `<img src="assets/weather-report/cloud.png" alt="pic">`;
  } else if (curWeath.innerHTML.includes("thunder")) {
    mainimage.innerHTML = `<img src="assets/weather-report/thunder.png" alt="pic">`;
  }else if (curWeath.innerHTML.includes("drizzle")) {
    mainimage.innerHTML = `<img src="assets/weather-report/drizzle.png" alt="pic">`;
  }else if (curWeath.innerHTML.includes("snow")) {
    mainimage.innerHTML = `<img src="assets/weather-report/snowflake.png" alt="pic">`;
  }else if (curWeath.innerHTML.includes("mist") || curWeath.innerHTML.includes("fog")) {
    mainimage.innerHTML = `<img src="assets/weather-report/fog.png" alt="pic">`;
  }else if (curWeath.innerHTML.includes("smoke")) {
    mainimage.innerHTML = `<img src="assets/weather-report/smoke.png" alt="pic">`;
	}else if (curWeath.innerHTML.includes("dust") || curWeath.innerHTML.includes("sand")) {
    mainimage.innerHTML = `<img src="assets/weather-report/sand-storm.png" alt="pic">`;
  }else if (curWeath.innerHTML.includes("ash")) {
    mainimage.innerHTML = `<img src="assets/weather-report/ash.png" alt="pic">`;
	}
}

async function enterthen(city) {
  try {
    const reponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    );
    data = await reponse.json();
    update(data);
  } catch (error) {
    console.log(error);
  }
}

if (search.value === "") {
  updateCurrentLocation();
}

search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (search.value === "") {
      updateCurrentLocation();
    }
    enterthen(search.value.toLowerCase());
  }
});

curLocBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateCurrentLocation();
  search.value = "";
});
