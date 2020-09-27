import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import GlobalState,{ weatherStateReducer } from './reducers';
import {
    getWeatherDetails,
    filterCities,
    setDetailScreen,
    removeFromList,
    addToFavourites
} from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import { removedIndex, favouriteIndex } from '../constants/Strings';
import StorageUtil from '../util/StorageUtil';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, GlobalState);
const store = createStore(persistedReducer);


export default store;
export const persistor = persistStore(store);

export const boundGetWeatherDetails = (list) => store.dispatch(getWeatherDetails(list));
export const boundFilterCities = (city) => store.dispatch(filterCities(city));
export const boundSetDetailScreen = (index) => store.dispatch(setDetailScreen(index));
export const boundRemoveFromList = (index) => {
    //StorageUtil(removedIndex, index);  
    store.dispatch(removeFromList(index));
};
export const boundAddToFavourites = (index) => {
    //let numOfFavs = await StorageUtil(favouriteIndex, index);
    store.dispatch(addToFavourites(index));
};