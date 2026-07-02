const sky = document.getElementById("sky");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

const locationEl = document.getElementById("location");
const weatherEl = document.getElementById("weather");
const tempEl = document.getElementById("temp");

// 🌍 météo API (Open-Meteo gratuit)
async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);
  const data = await res.json();

  const w = data.current_weather;

  tempEl.innerText = "Température: " + w.temperature + "°C";
  weatherEl.innerText = "Vent: " + w.windspeed + " km/h";

  updateSky(w.time);
}

// 📍 localisation
navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  locationEl.innerText = `Lat: ${lat.toFixed(2)} | Lon: ${lon.toFixed(2)}`;

  await getWeather(lat, lon);
});

// 🌗 cycle jour / nuit
function updateSky(time) {
  const hour = new Date().getHours();

  if (hour >= 7 && hour <= 18) {
    // jour
    sky.style.background = "linear-gradient(to top, #4facfe, #00f2fe)";
    sun.style.top = "20%";
    sun.style.left = "70%";
    moon.style.opacity = "0";
  } else {
    // nuit
    sky.style.background = "linear-gradient(to top, #0f2027, #203a43, #2c5364)";
    sun.style.opacity = "0";
    moon.style.top = "30%";
    moon.style.left = "30%";
    moon.style.opacity = "1";
  }
}
