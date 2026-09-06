const API_KEY = "a8e3b33daeb5a286af7483b5ab7eb668";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const weatherResult = document.getElementById("weatherResult");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("errorMsg");
const animationContainer = document.getElementById("weather-animation");

const ICON_SUN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4.6"/><path d="M12 2.5v2.4M12 19.1v2.4M4.2 12H1.8M22.2 12h-2.4M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7"/></svg>';
const ICON_CLOUD =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 18h11a4 4 0 0 0 .4-7.98A5.5 5.5 0 0 0 7.2 8.6 4.2 4.2 0 0 0 6.5 18Z"/></svg>';
const ICON_RAIN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.8 14.5h10.6a3.8 3.8 0 0 0 .4-7.58A5.3 5.3 0 0 0 7.5 5.2a4 4 0 0 0-.7 9.3Z"/><path d="M8.5 17.5 7 20.5M12.5 17.5 11 20.5M16.5 17.5 15 20.5"/></svg>';
const ICON_THUNDER =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.8 13.5h10.6a3.8 3.8 0 0 0 .4-7.58A5.3 5.3 0 0 0 7.5 4.2a4 4 0 0 0-.7 9.3Z"/><path d="M13 13.5 10 18.5h3l-1.5 4.8 5-6.8h-3.2Z" fill="currentColor" stroke="none"/></svg>';
const ICON_SNOW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.8 13h10.6a3.8 3.8 0 0 0 .4-7.58A5.3 5.3 0 0 0 7.5 3.7a4 4 0 0 0-.7 9.3Z"/><circle cx="8.5" cy="18.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="12" cy="20.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="15.5" cy="18.5" r="0.9" fill="currentColor" stroke="none"/></svg>';
const ICON_MIST =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 8h13M4 12h16M4 16h11M17 16h3"/></svg>';
const ICON_WIND =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 8h11.5a2.5 2.5 0 1 0-2.3-3.5M3 12.5h15a2.8 2.8 0 1 1-2.6 3.9M3 17h9"/></svg>';
const ICON_TORNADO =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 5h16M6 9h13M8 13h9.5M10 17h5.5M11.5 21h2"/></svg>';
const ICON_ASH =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19 9 7l3.2 5.8L15 9l6 10Z"/><circle cx="7" cy="4" r="0.8" fill="currentColor" stroke="none"/><circle cx="10.5" cy="3" r="0.8" fill="currentColor" stroke="none"/><circle cx="14" cy="4.5" r="0.8" fill="currentColor" stroke="none"/></svg>';
const ICON_DEFAULT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 14.2V5a1.6 1.6 0 1 0-3.2 0v9.2a3.6 3.6 0 1 0 3.2 0Z"/></svg>';
const ICON_MOON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 14.7A8.4 8.4 0 1 1 9.3 3.8a7 7 0 0 0 10.9 10.9Z"/></svg>';

const WEATHER_ICONS = {
  Thunderstorm: ICON_THUNDER,
  Drizzle: ICON_RAIN,
  Rain: ICON_RAIN,
  Snow: ICON_SNOW,
  Mist: ICON_MIST,
  Smoke: ICON_MIST,
  Haze: ICON_MIST,
  Fog: ICON_MIST,
  Sand: ICON_WIND,
  Dust: ICON_WIND,
  Ash: ICON_ASH,
  Squall: ICON_WIND,
  Tornado: ICON_TORNADO,
  Clear: ICON_SUN,
  Clouds: ICON_CLOUD,
};

const BG_GRADIENTS = {
  Thunderstorm: "linear-gradient(165deg, #10141c 0%, #1c2636 55%, #2b3a4c 100%)",
  Rain: "linear-gradient(165deg, #16232f 0%, #223b52 55%, #3c5872 100%)",
  Drizzle: "linear-gradient(165deg, #1c3550 0%, #35618a 55%, #6b9ec0 100%)",
  Clouds: "linear-gradient(165deg, #14497f 0%, #2f77b0 40%, #6badd6 75%, #cbe8f5 100%)",
  Clear: "linear-gradient(165deg, #0f4c86 0%, #1f74b9 35%, #4fa3d9 65%, #a9d8ef 100%)",
  Mist: "linear-gradient(165deg, #46545f 0%, #71828d 55%, #a8b7bf 100%)",
  Fog: "linear-gradient(165deg, #46545f 0%, #71828d 55%, #a8b7bf 100%)",
  Haze: "linear-gradient(165deg, #4d4738 0%, #7d715a 55%, #b7a988 100%)",
  Snow: "linear-gradient(165deg, #6f8ba1 0%, #a9c4d4 55%, #e9f4f8 100%)",
};

const SHADOW_TINTS = {
  Thunderstorm: "rgba(8, 11, 18, 0.55)",
  Rain: "rgba(10, 16, 25, 0.5)",
  Drizzle: "rgba(18, 28, 38, 0.45)",
  Clouds: "rgba(24, 33, 45, 0.4)",
  Clear: "rgba(10, 32, 52, 0.45)",
  Mist: "rgba(30, 32, 35, 0.35)",
  Fog: "rgba(30, 32, 35, 0.35)",
  Haze: "rgba(35, 31, 25, 0.35)",
  Snow: "rgba(60, 75, 90, 0.3)",
};

// Position & intensity of the hazy light source behind #bg-overlay, per condition.
const GLOW = {
  Thunderstorm: { x: "50%", y: "8%", strength: 0.06 },
  Rain: { x: "50%", y: "8%", strength: 0.1 },
  Drizzle: { x: "55%", y: "8%", strength: 0.2 },
  Clouds: { x: "50%", y: "4%", strength: 0.18 },
  Clear: { x: "70%", y: "10%", strength: 0.55 },
  Mist: { x: "50%", y: "8%", strength: 0.28 },
  Fog: { x: "50%", y: "8%", strength: 0.28 },
  Haze: { x: "50%", y: "8%", strength: 0.3 },
  Snow: { x: "55%", y: "8%", strength: 0.42 },
};

// Night variants: a dark starlit sky instead of the bright daytime look.
// Conditions not listed here (Rain, Thunderstorm) already read dark enough as-is.
const BG_GRADIENTS_NIGHT = {
  Clear: "linear-gradient(165deg, #04060b 0%, #0a111e 40%, #151d2f 75%, #202a3e 100%)",
  Clouds: "linear-gradient(165deg, #090d15 0%, #141a27 45%, #212939 80%, #313c50 100%)",
  Drizzle: "linear-gradient(165deg, #0c1320 0%, #1a2537 55%, #2c3b50 100%)",
  Mist: "linear-gradient(165deg, #10141a 0%, #1e242c 55%, #333c46 100%)",
  Fog: "linear-gradient(165deg, #10141a 0%, #1e242c 55%, #333c46 100%)",
  Haze: "linear-gradient(165deg, #14110d 0%, #292317 55%, #443b28 100%)",
  Snow: "linear-gradient(165deg, #121a27 0%, #212c3e 55%, #364457 100%)",
};

const GLOW_NIGHT = {
  Clear: { x: "50%", y: "6%", strength: 0.05 },
  Clouds: { x: "50%", y: "6%", strength: 0.04 },
  Drizzle: { x: "50%", y: "6%", strength: 0.05 },
  Mist: { x: "50%", y: "6%", strength: 0.05 },
  Fog: { x: "50%", y: "6%", strength: 0.05 },
  Haze: { x: "50%", y: "6%", strength: 0.05 },
  Snow: { x: "50%", y: "6%", strength: 0.08 },
};

function isNightAt(data) {
  return data.dt < data.sys.sunrise || data.dt > data.sys.sunset;
}

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
  const night = isNightAt(data);

  document.getElementById("cityName").textContent = name;
  document.getElementById("countryCode").textContent = sys.country;
  document.getElementById("weatherIcon").innerHTML =
    type === "Clear" && night ? ICON_MOON : WEATHER_ICONS[type] || ICON_DEFAULT;
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

  updateBackground(type, night);
}

// ── Background & animations ──────────────────────────────────────────────────

function updateBackground(type, night) {
  const gradients = night ? BG_GRADIENTS_NIGHT : BG_GRADIENTS;
  document.body.style.background =
    gradients[type] || BG_GRADIENTS[type] || "linear-gradient(165deg, #1c4569 0%, #3f7ea3 45%, #8ec3d9 80%, #cfe8ef 100%)";
  document.documentElement.style.setProperty(
    "--shadow-tint",
    SHADOW_TINTS[type] || "rgba(10, 18, 30, 0.4)"
  );

  const glowMap = night ? GLOW_NIGHT : GLOW;
  const glow = glowMap[type] || GLOW[type] || { x: "50%", y: "10%", strength: 0.3 };
  document.documentElement.style.setProperty("--glow-x", glow.x);
  document.documentElement.style.setProperty("--glow-y", glow.y);
  document.documentElement.style.setProperty("--glow-strength", glow.strength);

  createWeatherEffect(type, night);
}

function createWeatherEffect(type, night) {
  animationContainer.innerHTML = "";

  if (["Rain", "Drizzle", "Thunderstorm"].includes(type)) {
    createRain(type === "Thunderstorm");
  } else if (type === "Clouds") {
    if (night) createStars(35);
    createClouds(night);
  } else if (type === "Clear") {
    if (night) createStars(90);
    else createSun();
  } else if (["Mist", "Fog", "Haze", "Smoke"].includes(type)) {
    createFog();
  } else if (type === "Snow") {
    createSnow();
  }
}

// ── Stars ────────────────────────────────────────────────────────────────────

function ensureStarKeyframes() {
  if (document.getElementById("star-keyframes")) return;
  const styleTag = document.createElement("style");
  styleTag.id = "star-keyframes";
  styleTag.textContent = `
    @keyframes starTwinkle {
      0%, 100% { opacity: var(--star-min, 0.15); }
      50% { opacity: var(--star-max, 0.85); }
    }
  `;
  document.head.appendChild(styleTag);
}

function createStars(count) {
  ensureStarKeyframes();
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    const size = 1 + Math.random() * 1.6;
    const minOpacity = 0.15 + Math.random() * 0.15;
    const maxOpacity = 0.6 + Math.random() * 0.4;
    const duration = 1.8 + Math.random() * 2.5;
    const delay = Math.random() * 4;
    star.style.cssText = `
      position:absolute;
      top:${Math.random() * 75}%; left:${Math.random() * 100}%;
      width:${size}px; height:${size}px;
      background:#fff;
      border-radius:50%;
      --star-min:${minOpacity}; --star-max:${maxOpacity};
      animation: starTwinkle ${duration}s ease-in-out ${delay}s infinite;
    `;
    animationContainer.appendChild(star);
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

// A cumulus silhouette: several overlapping puffs plus a wide flat base.
const CLOUD_PUFFS = [
  { x: 0.1, y: 0.58, r: 0.3 },
  { x: 0.26, y: 0.36, r: 0.4 },
  { x: 0.46, y: 0.22, r: 0.48 },
  { x: 0.66, y: 0.32, r: 0.42 },
  { x: 0.85, y: 0.54, r: 0.28 },
  { x: 0.46, y: 0.64, r: 0.56 },
];

function createClouds(night) {
  for (let i = 0; i < 6; i++) {
    const scale = 0.8 + Math.random() * 0.9;
    const w = 260 * scale;
    const h = w * 0.56;
    const top = 4 + Math.random() * 46;
    const speed = 0.08 + Math.random() * 0.16;
    let x = -w + Math.random() * (window.innerWidth + w);

    const cluster = document.createElement("div");
    cluster.style.cssText = `position:absolute; width:${w}px; height:${h}px; top:${top}%;`;

    // Shaded underside: solid overlapping circles, blurred as ONE group so
    // the whole composited shape gets one smooth soft edge (no per-circle seams).
    const shade = document.createElement("div");
    const shadeColor = night ? "rgba(20, 26, 38, 0.45)" : "rgba(88, 112, 138, 0.4)";
    shade.style.cssText = `position:absolute; inset:0; filter:blur(${Math.max(14, w * 0.07)}px); transform:translateY(10%);`;
    CLOUD_PUFFS.forEach(({ x: px, y: py, r }) => {
      const size = w * r;
      const puff = document.createElement("div");
      puff.style.cssText = `
        position:absolute; left:${px * 100}%; top:${py * 100}%;
        width:${size}px; height:${size}px; transform:translate(-50%,-50%);
        border-radius:50%; background:${shadeColor};
      `;
      shade.appendChild(puff);
    });
    cluster.appendChild(shade);

    // Bright body, same technique: solid circles, blurred once as a group.
    const body = document.createElement("div");
    const bodyGradient = night
      ? "radial-gradient(circle at 35% 30%, #97a4b8, rgba(151,164,184,0.88) 55%, rgba(120,133,155,0.82) 100%)"
      : "radial-gradient(circle at 35% 30%, #ffffff, rgba(255,255,255,0.92) 55%, rgba(220,233,244,0.85) 100%)";
    body.style.cssText = `position:absolute; inset:0; filter:blur(${Math.max(9, w * 0.045)}px);`;
    CLOUD_PUFFS.forEach(({ x: px, y: py, r }) => {
      const size = w * r;
      const puff = document.createElement("div");
      puff.style.cssText = `
        position:absolute; left:${px * 100}%; top:${py * 100}%;
        width:${size}px; height:${size}px; transform:translate(-50%,-50%);
        border-radius:50%;
        background:${bodyGradient};
      `;
      body.appendChild(puff);
    });
    cluster.appendChild(body);

    animationContainer.appendChild(cluster);

    (function move() {
      x += speed;
      if (x > window.innerWidth + w) x = -w;
      cluster.style.left = x + "px";
      requestAnimationFrame(move);
    })();
  }
}

// ── Sun ───────────────────────────────────────────────────────────────────────

function createSun() {
  const styleTag = document.createElement("style");
  styleTag.textContent = `
    @keyframes sunPulse {
      0%,100% { box-shadow: 0 0 60px 20px rgba(255,235,180,.28), 0 0 140px 60px rgba(255,210,140,.14); }
      50%      { box-shadow: 0 0 85px 30px rgba(255,235,180,.38), 0 0 190px 90px rgba(255,210,140,.2); }
    }
  `;
  document.head.appendChild(styleTag);

  const sun = document.createElement("div");
  sun.style.cssText = `
    position:absolute;
    width:120px; height:120px;
    top:calc(${GLOW.Clear.y} - 4%);
    left:calc(${GLOW.Clear.x} - 5%);
    border-radius:50%;
    background:radial-gradient(circle, #fffdf5 0%, #ffedb0 45%, rgba(255,210,120,0) 72%);
    animation: sunPulse 5s ease-in-out infinite;
  `;
  animationContainer.appendChild(sun);

  // Faint lens-flare ghosts along the diagonal from the sun, for a shot-through-glass feel
  const ghosts = [
    { d: 0.32, size: 22, o: 0.1 },
    { d: 0.52, size: 12, o: 0.08 },
    { d: 0.75, size: 34, o: 0.06 },
  ];
  ghosts.forEach(({ d, size, o }) => {
    const ghost = document.createElement("div");
    ghost.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      top:calc(${GLOW.Clear.y} + ${d * 55}%);
      left:calc(${GLOW.Clear.x} - ${d * 45}%);
      border-radius:50%;
      background:radial-gradient(circle, rgba(255,244,214,${o}) 0%, rgba(255,244,214,0) 70%);
    `;
    animationContainer.appendChild(ghost);
  });
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
