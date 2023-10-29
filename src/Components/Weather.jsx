import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Map from './Map';

const Weather = () => {
  const [city, setCity] = useState('');
  const [tempCity, setTempCity] = useState('');
  const [weather, setWeather] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
        .then((response) => {
          if (response.data?.coord) {
            mapRef.current.panTo(response.data.coord);
            // mapRef.current.zoomTo(10);
          }
          setWeather(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [city, mapRef]);

  const handleCityChange = (event) => {
    setTempCity(event.target.value);
  };

  return (
    <div>
      <h1>Погода</h1>
      <input
        type="text"
        placeholder="Введите город"
        value={tempCity}
        onChange={handleCityChange}
      />
      <button onClick={() => setCity(tempCity)}>Найти</button>
      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Описание: {weather.weather[0].description}</p>
        </div>
      )}
      <Map ref={mapRef} coord={weather?.coord} />
    </div>
  );
};

export default Weather;
