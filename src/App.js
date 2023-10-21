import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [geoLoc, setGeoLoc] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      window.alert(
        'Votre navigateur ne permet pas la géolocalisation pour utiliser cette application'
      );
    }

    getGeolocalisation();
    fetchWeather(
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon'
    );
  }, []);

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

  const fetchWeather = async (url) => {
    setError(false);

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };

  return <div className="App"> Hello </div>;
}

export default App;
