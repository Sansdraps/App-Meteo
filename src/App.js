import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      window.alert(
        'Votre navigateur ne permet pas la géolocalisation pour utiliser cette application'
      );
    }

    getGeolocalisation();
  }, []);

  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  };
  return (
    // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon
    <div className="App"> Hello </div>
  );
}

export default App;
