const API_KEY = "a8e3b33daeb5a286af7483b5ab7eb668";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const weatherResult = document.getElementById("weatherResult");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("errorMsg");
const animationContainer = document.getElementById("weather-animation");
const bgOverlay = document.getElementById("bg-overlay");

const WEATHER_ICONS = {
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Rain: "🌧️",
  Snow: "❄️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌫️",
  Fog: "🌫️",
  Sand: "🌬️",
  Dust: "🌬️",
  Ash: "🌋",
  Squall: "💨",
  Tornado: "🌪️",
  Clear: "☀️",
  Clouds: "☁️",
};

const BG_IMAGES = {
  Rain: "images/rain.jpg",
  Drizzle: "images/rain.jpg",
  Thunderstorm: "images/rain.jpg",
  Clouds: "images/clouds.jpg",
  Clear: "images/clear.jpg",
  Mist: "images/mist.jpg",
  Fog: "images/mist.jpg",
  Haze: "images/mist.jpg",
};

const BG_GRADIENTS = {
  Thunderstorm: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  Rain: "linear-gradient(135deg, #1c1c2e 0%, #16213e 100%)",
  Drizzle: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
  Clouds: "linear-gradient(135deg, #3a4a6b 0%, #5a7fa8 100%)",
  Clear: "linear-gradient(135deg, #1565c0 0%, #42a5f5 60%, #80d8ff 100%)",
  Mist: "linear-gradient(135deg, #4a5568 0%, #718096 100%)",
  Fog: "linear-gradient(135deg, #4a5568 0%, #718096 100%)",
  Haze: "linear-gradient(135deg, #5d4e37 0%, #8d7156 100%)",
  Snow: "linear-gradient(135deg, #89c4e1 0%, #c5dae8 60%, #e8f4f8 100%)",
};

// ── UI helpers ──────────────────────────────────────────────────────────────

function showLoader() {
  loader.classList.remove("hidden");
  weatherResult.classList.add("hidden");
  errorMsg.classList.add("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function showError(msg) {
  hideLoader();
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  weatherResult.classList.add("hidden");
}

// ── API calls ────────────────────────────────────────────────────────────────

async function fetchWeather(url) {
  showLoader();
  try {
    const res = await fetch(url);
    if (res.status === 404) throw new Error("City not found. Try another name.");
    if (!res.ok) throw new Error("Failed to fetch weather data.");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
}

function getWeatherByCoords(lat, lon) {
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
}

// ── Display ──────────────────────────────────────────────────────────────────

function displayWeather(data) {
  hideLoader();
  const { name, sys, main, weather, wind } = data;
  const type = weather[0].main;

  document.getElementById("cityName").textContent = name;
  document.getElementById("countryCode").textContent = sys.country;
  document.getElementById("weatherIcon").textContent = WEATHER_ICONS[type] || "🌡️";
  document.getElementById("temp").textContent = Math.round(main.temp);
  document.getElementById("weatherDesc").textContent = weather[0].description;
  document.getElementById("feelsLike").textContent = `${Math.round(main.feels_like)}°C`;
  document.getElementById("humidity").textContent = `${main.humidity}%`;
  document.getElementById("windSpeed").textContent = `${Math.round(wind.speed * 3.6)} km/h`;
  document.getElementById("pressure").textContent = `${main.pressure} hPa`;

  // Re-trigger animation
  weatherResult.style.animation = "none";
  weatherResult.offsetHeight; // reflow
  weatherResult.style.animation = "";
  weatherResult.classList.remove("hidden");

  updateBackground(type);
}

// ── Background & animations ──────────────────────────────────────────────────

function updateBackground(type) {
  document.body.style.background =
    BG_GRADIENTS[type] || "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";

  const img = BG_IMAGES[type];
  if (img) {
    bgOverlay.style.backgroundImage = `url('${img}')`;
    bgOverlay.style.opacity = "1";
  } else {
    bgOverlay.style.opacity = "0";
  }

  createWeatherEffect(type);
}

function createWeatherEffect(type) {
  animationContainer.innerHTML = "";

  if (["Rain", "Drizzle", "Thunderstorm"].includes(type)) {
    createRain(type === "Thunderstorm");
  } else if (type === "Clouds") {
    createClouds();
  } else if (type === "Clear") {
    createSun();
  } else if (["Mist", "Fog", "Haze", "Smoke"].includes(type)) {
    createFog();
  } else if (type === "Snow") {
    createSnow();
  }
}

// ── Rain ─────────────────────────────────────────────────────────────────────

function createRain(isThunder) {
  const drops = [];
  for (let i = 0; i < 140; i++) {
    const drop = document.createElement("div");
    const h = 20 + Math.random() * 30;
    drop.style.cssText = `
      position:absolute;
      width:1.5px;
      height:${h}px;
      background:rgba(174,214,241,0.55);
      border-radius:2px;
      left:0; top:0;
    `;
    animationContainer.appendChild(drop);
    drops.push({
      el: drop,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.6 + Math.random() * 0.5,
    });
  }

  let lastFlash = 0;

  function animate(t) {
    for (const d of drops) {
      d.y += d.speed;
      if (d.y > 102) { d.y = -4; d.x = Math.random() * 100; }
      d.el.style.transform = `translate(${d.x}vw, ${d.y}vh)`;
    }
    if (isThunder && t - lastFlash > 3000 + Math.random() * 6000) {
      lastFlash = t;
      animationContainer.style.background = "rgba(255,255,255,0.07)";
      setTimeout(() => (animationContainer.style.background = ""), 90);
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ── Clouds ────────────────────────────────────────────────────────────────────

function createClouds() {
  for (let i = 0; i < 9; i++) {
    const w = 160 + Math.random() * 140;
    const h = w * 0.5;
    const cloud = document.createElement("div");
    const speed = 0.12 + Math.random() * 0.28;
    let x = -w + Math.random() * (window.innerWidth + w);

    cloud.style.cssText = `
      position:absolute;
      width:${w}px;
      height:${h}px;
      background:rgba(255,255,255,${0.05 + Math.random() * 0.07});
      border-radius:50%;
      top:${3 + Math.random() * 48}%;
      filter:blur(${14 + Math.random() * 10}px);
    `;
    animationContainer.appendChild(cloud);

    (function move() {
      x += speed;
      if (x > window.innerWidth + w) x = -w;
      cloud.style.left = x + "px";
      requestAnimationFrame(move);
    })();
  }
}

// ── Sun ───────────────────────────────────────────────────────────────────────

function createSun() {
  const styleTag = document.createElement("style");
  styleTag.textContent = `
    @keyframes sunPulse {
      0%,100% { box-shadow: 0 0 60px 20px rgba(255,200,0,.3), 0 0 120px 50px rgba(255,160,0,.15); }
      50%      { box-shadow: 0 0 90px 35px rgba(255,200,0,.42), 0 0 180px 80px rgba(255,160,0,.22); }
    }
    @keyframes sunRays {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleTag);

  const sun = document.createElement("div");
  sun.style.cssText = `
    position:absolute;
    width:130px; height:130px;
    top:8%; right:10%;
    border-radius:50%;
    background:radial-gradient(circle, #fff9c4 0%, #ffca28 50%, rgba(255,152,0,0) 72%);
    animation: sunPulse 4s ease-in-out infinite;
  `;
  animationContainer.appendChild(sun);
}

// ── Fog ───────────────────────────────────────────────────────────────────────

function createFog() {
  for (let i = 0; i < 5; i++) {
    const fog = document.createElement("div");
    const speed = (0.18 + Math.random() * 0.25) * (i % 2 === 0 ? 1 : -1);
    let x = Math.random() * window.innerWidth;

    fog.style.cssText = `
      position:absolute;
      width:75%; height:110px;
      background:rgba(255,255,255,0.07);
      top:${8 + i * 17}%;
      border-radius:50%;
      filter:blur(40px);
    `;
    animationContainer.appendChild(fog);

    (function move() {
      x += speed;
      if (x > window.innerWidth) x = -window.innerWidth * 0.75;
      if (x < -window.innerWidth * 0.75) x = window.innerWidth;
      fog.style.left = x + "px";
      requestAnimationFrame(move);
    })();
  }
}

// ── Snow ──────────────────────────────────────────────────────────────────────

function createSnow() {
  const flakes = [];
  for (let i = 0; i < 110; i++) {
    const size = 3 + Math.random() * 4;
    const flake = document.createElement("div");
    flake.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      background:rgba(255,255,255,0.85);
      border-radius:50%;
      filter:blur(${size > 5 ? 1 : 0}px);
      left:0; top:0;
    `;
    animationContainer.appendChild(flake);
    flakes.push({
      el: flake,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.08 + Math.random() * 0.18,
      drift: (Math.random() - 0.5) * 0.06,
    });
  }

  function animate() {
    for (const f of flakes) {
      f.y += f.speed;
      f.x += f.drift;
      if (f.y > 101) { f.y = -2; f.x = Math.random() * 100; }
      if (f.x > 100) f.x = 0;
      if (f.x < 0) f.x = 100;
      f.el.style.transform = `translate(${f.x}vw, ${f.y}vh)`;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ── Event listeners ───────────────────────────────────────────────────────────

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }
  showLoader();
  navigator.geolocation.getCurrentPosition(
    (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    () => showError("Unable to retrieve your location.")
  );
});
