const apiKey = "a8e3b33daeb5a286af7483b5ab7eb668";

document.getElementById("searchBtn").addEventListener("click", getWeather);
document
  .getElementById("cityInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        document.getElementById("weatherResult").innerHTML = "City not found!";
        return;
      }

      const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
      `;
      document.getElementById("weatherResult").innerHTML = weather;

      // Call background update
      updateBackground(data.weather[0].main);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      document.getElementById("weatherResult").innerHTML =
        "Error loading weather data.";
    });
}

function updateBackground(weatherType) {
  const body = document.body;
  const animationDiv = document.getElementById("weather-animation");
  animationDiv.innerHTML = "";

  switch (weatherType) {
    case "Rain":
    case "Drizzle":
    case "Thunderstorm":
      body.style.background = "linear-gradient(to bottom, #1a1a1a, #000000)";
      break;

    case "Clouds":
      body.style.background = "linear-gradient(to bottom, #83accdff, #b0c4de)";
      break;

    case "Clear":
      body.style.background = "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
      break;

    case "Mist":
    case "Fog":
      body.style.background = "linear-gradient(to bottom, #bfcdd2, #e0e3e4)";
      break;

    case "Snow":
      body.style.background = "linear-gradient(to bottom, #dfe9f3, #ffffff)";
      break;

    default:
      body.style.background = "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
  }

  // Create the animation for the matching weather
  createWeatherEffect(weatherType, animationDiv);
}

// 🌦️ MASTER WEATHER EFFECT FUNCTION
function createWeatherEffect(type, container) {
  container.innerHTML = ""; // clear old animation

  switch (type) {
    // ☔ RAIN
    case "Rain":
    case "Drizzle":
    case "Thunderstorm": {
      const drops = [];
      for (let i = 0; i < 120; i++) {
        const drop = document.createElement("div");
        drop.style.position = "absolute";
        drop.style.width = "1.5px";
        drop.style.height = 30 + Math.random() * 20 + "px";
        drop.style.background = "rgba(173, 216, 230, 0.8)";
        drop.style.left = Math.random() * window.innerWidth + "px";
        drop.style.top = Math.random() * window.innerHeight + "px";
        drop.style.borderRadius = "50%";
        drop.style.filter = "blur(0.5px)";
        container.appendChild(drop);

        drops.push({ el: drop, speed: 10 + Math.random() * 8 });
      }

      function animateRain() {
        for (const d of drops) {
          let top = parseFloat(d.el.style.top);
          top += d.speed;
          if (top > window.innerHeight) {
            top = -40;
            d.el.style.left = Math.random() * window.innerWidth + "px";
          }
          d.el.style.top = top + "px";
        }
        requestAnimationFrame(animateRain);
      }
      requestAnimationFrame(animateRain);
      break;
    }

    // ☁️ CLOUDS
    case "Clouds": {
      const clouds = [];
      for (let i = 0; i < 10; i++) {
        const cloud = document.createElement("div");
        cloud.style.position = "absolute";
        cloud.style.width = 150 + Math.random() * 100 + "px";
        cloud.style.height = 80 + Math.random() * 40 + "px";
        cloud.style.background = "rgba(255,255,255,0.8)";
        cloud.style.borderRadius = "50%";
        cloud.style.filter = "blur(10px)";
        cloud.style.top = 50 + Math.random() * 200 + "px";
        cloud.style.left = Math.random() * window.innerWidth + "px";
        container.appendChild(cloud);

        clouds.push({ el: cloud, speed: 0.2 + Math.random() * 0.3 });
      }

      function animateClouds() {
        for (const c of clouds) {
          let left = parseFloat(c.el.style.left);
          left += c.speed;
          if (left > window.innerWidth + 200) {
            left = -200;
            c.el.style.top = 50 + Math.random() * 200 + "px";
          }
          c.el.style.left = left + "px";
        }
        requestAnimationFrame(animateClouds);
      }
      requestAnimationFrame(animateClouds);
      break;
    }

    // 🌞 CLEAR
    case "Clear": {
      const sun = document.createElement("div");
      sun.style.position = "absolute";
      sun.style.top = "60px";
      sun.style.right = "80px";
      sun.style.width = "120px";
      sun.style.height = "120px";
      sun.style.borderRadius = "50%";
      sun.style.background =
        "radial-gradient(circle, #fff200 50%, #ffcc00 80%)";
      sun.style.boxShadow = "0 0 50px 20px rgba(255, 230, 100, 0.6)";
      container.appendChild(sun);

      let angle = 0;
      function animateSun() {
        angle += 0.2;
        sun.style.transform = `rotate(${angle}deg)`;
        requestAnimationFrame(animateSun);
      }
      requestAnimationFrame(animateSun);
      break;
    }

    // 🌫️ FOG / MIST
    case "Mist":
    case "Fog": {
      const fogLayers = [];
      for (let i = 0; i < 3; i++) {
        const fog = document.createElement("div");
        fog.style.position = "absolute";
        fog.style.top = "0";
        fog.style.left = "0";
        fog.style.width = "200%";
        fog.style.height = "100%";
        fog.style.background = "rgba(255, 255, 255, 0.2)";
        fog.style.filter = "blur(40px)";
        container.appendChild(fog);

        fogLayers.push({
          el: fog,
          speed: 0.2 + Math.random() * 0.3,
          direction: i % 2 === 0 ? 1 : -1,
        });
      }

      function animateFog() {
        for (const layer of fogLayers) {
          const currentX = parseFloat(layer.el.style.left) || 0;
          let newX = currentX + layer.speed * layer.direction;
          if (newX > 50 || newX < -50) layer.direction *= -1;
          layer.el.style.transform = `translateX(${newX}px)`;
        }
        requestAnimationFrame(animateFog);
      }
      requestAnimationFrame(animateFog);
      break;
    }

    // ❄️ SNOW
    case "Snow": {
      const flakes = [];
      for (let i = 0; i < 100; i++) {
        const flake = document.createElement("div");
        flake.style.position = "absolute";
        flake.style.width = 4 + Math.random() * 3 + "px";
        flake.style.height = flake.style.width;
        flake.style.background = "white";
        flake.style.borderRadius = "50%";
        flake.style.opacity = 0.8;
        flake.style.left = Math.random() * window.innerWidth + "px";
        flake.style.top = Math.random() * window.innerHeight + "px";
        flake.style.filter = "blur(0.5px)";
        container.appendChild(flake);

        flakes.push({
          el: flake,
          speedY: 1 + Math.random() * 1.5,
          driftX: Math.random() * 0.5 - 0.25,
        });
      }

      function animateSnow() {
        for (const f of flakes) {
          let top = parseFloat(f.el.style.top);
          let left = parseFloat(f.el.style.left);
          top += f.speedY;
          left += f.driftX;

          if (top > window.innerHeight) {
            top = -10;
            left = Math.random() * window.innerWidth;
          }
          if (left > window.innerWidth) left = 0;
          if (left < 0) left = window.innerWidth;

          f.el.style.top = top + "px";
          f.el.style.left = left + "px";
        }
        requestAnimationFrame(animateSnow);
      }
      requestAnimationFrame(animateSnow);
      break;
    }

    default:
      container.innerHTML = "";
  }
}
