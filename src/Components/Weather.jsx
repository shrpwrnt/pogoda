import axios from 'axios';
import { useState, useRef } from 'react';
// import Map from './Map';
import MapboxGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  // const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  console.log(weather);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get('city');
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
        .then((response) => {
          // if (response.data?.coord) {
          //   mapRef.current.panTo(response.data.coord);
          // }
          setWeather(response.data);
          // setViewport(response.data.coord);
          // console.log(viewport);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <h1>Погода</h1>
      <form id="search" onSubmit={handleFormSubmit}>
        <input name="city" type="text" placeholder="Введите город" />
        <button type="submit" value="Найти">
          Найти
        </button>
      </form>
      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Описание: {weather.weather[0].description}</p>
        </div>
      )}
      {/* <Map ref={mapRef} coord={weather?.coord} /> */}
      <MapboxGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/shrpwrnt/cloeb6xgd002z01o58jmt8ygd"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        style={{ width: 800, height: 600 }}
      ></MapboxGL>
    </div>
  );
};

export default Weather;
