//javascript code
import { DateTime } from "luxon";

const API_KEY = "4f0c2a5915a682f70845286487a7010b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL+"/"+infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY}
    )

    return fetch(url)
    .then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];            //from weather array we need only few info

  return {                                                  //destructuring of data
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};


const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    return {...formattedCurrentWeather};
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Current time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);       //DateTime given in the api inform is in form of timestamps in seconds

const iconUrlFromCode = (code) =>
`http://openweathermap.org/img/wn/${code}@2x.png`;

export {formatToLocalTime, iconUrlFromCode};
export default getFormattedWeatherData;
