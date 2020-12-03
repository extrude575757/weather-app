import React, { useState, useEffect } from "react";
import axios from "axios";
import SevenDayForecast from "../SevenDayForecast";

// search api by city name
const SearchByCity = (props) => {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FIND DIFFERENT API WITH ONLY DAILY TEMPS, NOT HOURLY INCREMENTS, TRY https://openweathermap.org/forecast16#16days
  // FIGURE OUT HOW DISPLAY DATES

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await axios(
          "https://api.openweathermap.org/data/2.5/forecast?q=Brentwood,us&units=imperial&cnt=6&appid=7ec29f6bc7d7288b19154e672f2f3d75"
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

  return (
    <div className="forecast-container">
      {cityData.list.map((item) => {
        return (
          <div className="forecast-data" key={item.dt}>
            <h3>{item.dt_txt}</h3>
            <p>{item.main.temp_max}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchByCity;
