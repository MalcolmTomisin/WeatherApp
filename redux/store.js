import { createStore } from "redux";
import GlobalState,{ weatherStateReducer } from './reducers';
import {
    getWeatherDetails,
    filterCities,
    setDetailScreen,
    removeFromList
} from './actions';
import { removedIndex } from '../constants/Strings';
import AsyncStorage from '@react-native-community/async-storage';
const store = createStore(GlobalState);

export default store;

export const boundGetWeatherDetails = (list) => store.dispatch(getWeatherDetails(list));
export const boundFilterCities = (city) => store.dispatch(filterCities(city));
export const boundSetDetailScreen = (index) => store.dispatch(setDetailScreen(index));
export const boundRemoveFromList = async (index) => {
    let stringDeletedList = await AsyncStorage.getItem(removedIndex);
    let deletedList = JSON.parse(stringDeletedList);
    if (Array.isArray(deletedList)) {
        try {
            deletedList.push(index);
            AsyncStorage.setItem(removedIndex, JSON.stringify(deletedList));
        }
        catch (e) {
            
        }
    }
    else {
        try {
            AsyncStorage.setItem(removedIndex, JSON.stringify([index]));
        }
        catch (e) { }
    }
    store.dispatch(removeFromList(index));
};