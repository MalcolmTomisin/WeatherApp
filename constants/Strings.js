import API_KEY from './ApiKey';
const WEATHER_URL = `http://dataservice.accuweather.com/currentconditions/v1/topcities/50?apikey=${API_KEY}`;
export const removedIndex = "@removedIndex";
export const favouriteIndex = "@favIndex";
export const OPEN_WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?`;
export const REJECTED_PERMISSION_PROMPT =
  "Please grant permission to Weather to give you accurate Weather info";
export default WEATHER_URL;