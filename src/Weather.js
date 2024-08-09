// src/Weather.js
import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza esto con tu API key de OpenWeatherMap

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"4e6b82d3b35304e55c97709bdd49e3cc"}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px' }}>
        Get Weather
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
