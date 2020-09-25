import { createStore } from "redux";
import GlobalState,{ weatherStateReducer } from './reducers';
import {
    getWeatherDetails,
    filterCities,
    setDetailScreen,
    removeFromList,
    addToFavourites
} from './actions';
import { removedIndex, favouriteIndex } from '../constants/Strings';
import StorageUtil from '../util/StorageUtil';
const store = createStore(GlobalState);

export default store;

export const boundGetWeatherDetails = (list) => store.dispatch(getWeatherDetails(list));
export const boundFilterCities = (city) => store.dispatch(filterCities(city));
export const boundSetDetailScreen = (index) => store.dispatch(setDetailScreen(index));
export const boundRemoveFromList = (index) => {
    StorageUtil(removedIndex, index);  
    store.dispatch(removeFromList(index));
};
export const boundAddToFavourites = async (index) => {
    let numOfFavs = await StorageUtil(favouriteIndex, index);
    store.dispatch(addToFavourites(index, numOfFavs));
};