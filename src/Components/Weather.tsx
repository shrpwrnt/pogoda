import axios from 'axios'
import { useState } from 'react'
import MapboxGL from 'react-map-gl'
import { WeatherProps } from './Weather.types'

const Weather = () => {
  const [weather, setWeather] = useState<WeatherProps | null>(null)
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  })

  const handleFormSubmit = (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const city = formData.get('city')

    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
            import.meta.env.VITE_OPEN_WEATHER_API_KEY
          }&units=metric`
        )
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => console.error(error))
    }
  }

  return (
    <div>
      <h1>Погода</h1>
      <form id='search' onSubmit={handleFormSubmit}>
        <input name='city' type='text' placeholder='Введите город' />
        <button type='submit' value='Найти'>
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
        onMove={evt => setViewState(evt.viewState)}
        mapStyle='mapbox://styles/shrpwrnt/cloeb6xgd002z01o58jmt8ygd'
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: 800, height: 600 }}
      />
    </div>
  )
}

export default Weather
