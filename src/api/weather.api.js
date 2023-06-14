import axios from "axios";

const BASE_WEATHER_URL = process.env.REACT_APP_BASE_WEATHER_URL;
const apikey = process.env.REACT_APP_API_KEY;

export const getWeatherInformation = (cordinates) => {
    return axios.get(
        `${BASE_WEATHER_URL}/weather?lat=${cordinates.lat}&lon=${cordinates.long}&appid=${apikey}`
      );
};