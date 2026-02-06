import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import './App.css';
import { getCurrentWeather, reverseGeoCode, getCurrentLocation } from './services/weather';

function App() {
  const [weatherData, setWeatherData] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    async function fetchData() {
      let coords = await getCurrentLocation();
      let wData = await getCurrentWeather(coords) || "";
      let loc = await reverseGeoCode(coords);
      setWeatherData(wData);
      setLocation(loc);
    }
    fetchData();
  }, [])

  return (
    <>
    Units

    Switch to Imperial/Metric

    Temperature

    Celsius (°C)
    Fahrenheit (°F)

    Wind Speed

    km/h
    mph

    Precipitation

    Millimeters (mm)
    Inches (in)

    How's the sky looking today?

    Search for a city, e.g., New York
    Search
    {weatherData && <CurrentWeather wData={weatherData} loc={location} />}
    Feels like

    Humidity

    Wind

    Precipitation

    Daily forecast

    Hourly forecast
    </>
  )
}

export default App
