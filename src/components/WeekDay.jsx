import React, { useEffect, useState } from 'react'

const WeekDay = ({ data, weatherUnits }) => {
  const [weatherEmojis, setWeatherEmojis] = useState("")
  const [averageTemperature, setAverageTemperature] = useState(0)

  useEffect(() => {
    if (!data) return;

    const avTemp = ((data.temperature_2m_max + data.temperature_2m_min) / 2
    ).toFixed(1);

    const weatherEmojis = getEmojis();
  }, [])

  return (
    <div>WeekDay</div>
  )
}

export default WeekDay;