import React, { useEffect, useState } from "react";
import { emojis } from "../utils/emojis";
import { formatDateToHoursMinutes } from "../utils/formatDateToHoursMinutes";
import { getEmojis } from "../utils/getemojis";

const TodayCard = ({ data, weatherUnits }) => {
  const [weatherEmojis, setWeatherEmojis] = useState("");

  useEffect(() => {
    if (!data) return;

    const avTemp = (
      (data.temperature_2m_max + data.temperature_2m_min) /
      2
    ).toFixed(1);

    const weatherEmojis = getEmojis(
      avTemp,
      data.precipitation_sum,
      data.windspeed_10m_max
    );

    setWeatherEmojis(weatherEmojis);
  }, [data]);

  if (!data || !weatherUnits) {
    return (
      <div>
        Aucune données. Affichage impossible.
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <div>
            {weatherEmojis}
          </div>
          <div>
            Aujourd'hui, {data.day}
          </div>
        </div>
        <div>
          <p>
            {emojis.calendar} Jour : {data.day}
          </p>
          <p>
            {emojis.rain} Pluie : {data.precipitation_sum} {weatherUnits.rain}
          </p>
          <p>
            {emojis.sunrise} Lever du soleil :{" "}
            {formatDateToHoursMinutes(new Date(data.sunrise))}
          </p>
          <p>
            {emojis.sunset} Coucher du soleil :{" "}
            {formatDateToHoursMinutes(new Date(data.sunset))}
          </p>
          <p>
            {emojis.hot} Température Max : {data.temperature_2m_max}{" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.cold} Température Min : {data.temperature_2m_min}{" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.wind} Vent : {data.windspeed_10m_max} {weatherUnits.wind}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayCard;