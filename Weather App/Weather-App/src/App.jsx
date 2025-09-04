import { useState } from "react";
import "./App.css";

function App() {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState(null);

  const fetchWeather = async () => {
    const apikey = "6df7a31f34bf5fa0538e19cb0029bf24";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setweather(data);
    console.log(data);
  };

  return (
    <>
      <div className="container">
        <h1>Weather App</h1>

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setcity(e.target.value)}
        />

        <button onClick={fetchWeather}>Search</button>

        {weather && weather.main && (
          <div className="weather-info">
            <h3>{weather.name}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
