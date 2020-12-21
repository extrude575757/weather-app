import React, { useState } from "react";
import Main from "./Main";
import Search from "./Search/Search";
var zipcodes = require("zipcodes");

// display seven day forecast using the Search components
// render searchByCity and searchByZip on a submit handler

const SevenDayForecast = (props) => {
  const [userLocation, setUserLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [returnedData, setReturnedData] = useState({
    lat: "",
    lon: "",
  });

  const locationChangeHandler = (event) => {
    console.log(event.target.value);
    setUserLocation(event.target.value);
  };

  // MAKE SUBMIT HANLDER WITH LONGITUDE AND LATITUDE CONVERTER USING API/NPM PACKAGE
  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitted(!submitted);
    let zipCodeData = zipcodes.lookup(userLocation);
    console.log(zipCodeData);
    setReturnedData({
      lat: zipCodeData.latitude,
      lon: zipCodeData.longitude,
    });
  };

  return (
    <div>
      <h1> Your Seven Day Forecast </h1>
      <form onSubmit={submitHandler}>
        <label>Search Zip Code</label>
        <input
          type="text"
          id="zipCode"
          placeholder="Enter Zip Code"
          value={userLocation.value}
          onChange={locationChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <Search returnedData={returnedData} />}
    </div>
  );
};
export default SevenDayForecast;
