import { createStore } from "redux";
import GlobalState,{ weatherStateReducer } from './reducers';
import {
    getWeatherDetails, filterCities, setDetailScreen
} from './actions';

const store = createStore(GlobalState);

export default store;

export const boundGetWeatherDetails = (list) => store.dispatch(getWeatherDetails(list));
export const boundFilterCities = (city) => store.dispatch(filterCities(city));
export const boundSetDetailScreen = (index) => store.dispatch(setDetailScreen(index));
