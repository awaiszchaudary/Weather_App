import React, { useLayoutEffect, useState } from "react";
import { getWeatherInformation } from "../../api/weather.api";
import { weekday, day, date, monthh, monname, year } from "../../utils/constants.util";
import "./index.css";

const App = () => {
  const [cordinates, setCordinates] = useState({ lat: 0, long: 0 });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCordinates({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { status, data } = await getWeatherInformation(cordinates);
      if (status === 200) data && setResponse(data);
      else alert("Oops! Something went wrong while getting the information");
    } catch (error) {
      console.error("Error in catch :: ", error);
      
    } finally {
      setLoading(false);
    }
  };

  let country = response?.sys?.country;
  let place = response?.name;
  let celcius = response?.main?.temp - 273.15;
  let cel = parseInt(celcius);
  let weath = response?.weather[0]?.main;

  return (
    <div className="container">
      {response===null ? (
        <p>Loading Data</p>
      ) : (
        <React.Fragment>
          <div className="weather-side">
            <div className="weather-gradient"></div>
            <div className="date-container">
              <h2 className="date-dayname">{day}</h2>
              <span className="date-day">
                {date} {monname} {year}
              </span>
              <i className="location-icon" data-feather="map-pin"></i>
              <span className="location">
                {place}, {country}
              </span>
            </div>
            <div className="weather-container">
              <i className="weather-icon" data-feather="sun"></i>
              <h1 className="weather-temp">{cel}°C</h1>
              <h3 className="weather-desc">{weath}</h3>
            </div>
          </div>
          <div className="info-side">
            <div className="today-info-container">
              <div className="today-info">
                <div className="precipitation">
                  {" "}
                  <span className="title">PRECIPITATION</span>
                  <span className="value">0 %</span>
                  <div className="clear"></div>
                </div>
                <div className="humidity">
                  {" "}
                  <span className="title">HUMIDITY</span>
                  <span className="value">{response.main.humidity}</span>
                  <div className="clear"></div>
                </div>
                <div className="wind">
                  {" "}
                  <span className="title">WIND</span>
                  <span className="value">0 km/h</span>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
            <div className="week-container">
              <ul className="week-list">
                <li className="active">
                  <i className="day-icon" data-feather="sun"></i>
                  <span className="day-name">Tue</span>
                  <span className="day-temp">29°C</span>
                </li>
                <li>
                  <i className="day-icon" data-feather="cloud"></i>
                  <span className="day-name">Wed</span>
                  <span className="day-temp">21°C</span>
                </li>
                <li>
                  <i className="day-icon" data-feather="cloud-snow"></i>
                  <span className="day-name">Thu</span>
                  <span className="day-temp">08°C</span>
                </li>
                <li>
                  <i className="day-icon" data-feather="cloud-rain"></i>
                  <span className="day-name">Fry</span>
                  <span className="day-temp">19°C</span>
                </li>
                <div className="clear"></div>
              </ul>
            </div>
            <div className="location-container">
              <button className="location-button">
                {" "}
                <i data-feather="map-pin"></i>
                <span>Change location</span>
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
