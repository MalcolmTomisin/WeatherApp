import { createStore } from "redux";
import { weatherStateReducer } from './reducers';
import { getWeatherDetails, filterCities } from './actions';

const store = createStore(weatherStateReducer );

export default store;

export const boundGetWeatherDetails = (list) => store.dispatch(getWeatherDetails(list));
export const boundFilterCities = (city) => store.dispatch(filterCities(city));
