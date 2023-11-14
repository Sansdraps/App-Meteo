import { useCallback, useEffect, useState } from 'react';
import formatWeatherDataDaily from './utils/formatWeatherDataDaily';
import Today from './components/Today';
import WeekDay from './components/WeekDay';
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [geoLoc, setGeoLoc] = useState({ latitude: 0, longitude: 0 });
  const [weatherUnits, setWeatherUnits] = useState();
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeather = useCallback(async (url) => {
    setError(false);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (Object.keys(data).length === 0) {
        setError(true);
      } else {
        // formatted daily data
        const frormatedDailyData = formatWeatherDataDaily(data.daily);
        setWeatherData(frormatedDailyData);

        // unités
        setWeatherUnits({
          rain: data.daily_units.precipitation_sum,
          temperature: data.daily_units.temperature_2m_max,
          wind: data.daily_units.windspeed_10m_max,
        });
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      window.alert(
        'Votre navigateur ne permet pas la géolocalisation pour utiliser cette application'
      );
    }

    getGeolocalisation();

    fetchWeather(
      `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon`
    ).then(() => setIsLoading(false));
  }, [fetchWeather, geoLoc.latitude, geoLoc.longitude]);

  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLoc({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setError(true);
      }
    );
  };

  // si chargement
  if (isLoading) {
    return (
      <div className="min-h-screen h-max bg-cyan-600 flex justify-center items-start p-8 md:px-20 ">
        <p className="text-center">Chargement ...</p>
      </div>
    );
  }

  // si error
  if (error) {
    return (
      <div className="min-h-screen h-max bg-cyan-600 flex justify-center items-start p-8 md:px-20 ">
        <p className="text-center text-red-500">
          Une erreur est survenue lors de la récupérations des prévisions
          météo...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-max bg-cyan-600 flex justify-center items-start p-8 md:px-20 ">
      <div className="w-full max-w-7xl bg-gradient-to-r from-cyan-500 to to-blue-500 rounded-lg shadow-lg p-4 md:px-12 md:py-8 xl:py-12 xl:px-28">
        <Today data={weatherData[0]} weatherUnits={weatherUnits} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-col-6">
          {weatherData &&
            weatherData
              .slice(1, weatherData.length)
              .map((data, index) => (
                <WeekDay key={index} data={data} weatherUnits={weatherUnits} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
