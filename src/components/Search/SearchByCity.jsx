import React, { useState, useEffect } from "react";
import axios from "axios";
import SevenDayForecast from "../SevenDayForecast";

// search api by city name
const SearchByCity = (props) => {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TRANSLATE UTC TIME TO TIMEZONE TIME
  // MAKE MAP FOR DAILY MIN MAX AND DAY TEMP

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await axios(
          "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=7ec29f6bc7d7288b19154e672f2f3d75"
        );
        console.log(weatherData);
        setCityData(weatherData.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No weather for today! :(</div>;
  }
  console.log(cityData);

  function unixTimeConverter(unixTime) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let unixMilliseconds = unixTime * 1000;
    let dataObject = new Date(unixMilliseconds);

    let humanDateFormat = dataObject.toLocaleDateString("en-US", options);

    return humanDateFormat;
  }

  return (
    <div className="forecast-container">
      {cityData.daily.map((item) => {
        console.log(unixTimeConverter(item.dt));
        return (
          <div className="forecast-data" key={item.dt}>
            {unixTimeConverter(cityData.current.dt) ===
            unixTimeConverter(item.dt) ? (
              <h2>Today</h2>
            ) : (
              <h2>{unixTimeConverter(item.dt)}</h2>
            )}

            <p>Minimum Temperature: {item.temp.min}</p>
            <p>
              {unixTimeConverter(cityData.current.dt) ===
              unixTimeConverter(item.dt)
                ? `Current Temperature: ${cityData.current.temp}`
                : null}
            </p>

            <p>Maximum Temperature: {item.temp.max}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchByCity;
