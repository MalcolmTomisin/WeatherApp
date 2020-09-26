import {
    WEATHER_OF_CITIES,
    FILTER_CITY,
    SET_INDEX_OF_DETAILSCREEN,
    REMOVE_FROM_LIST,
    ADD_TO_FAVOURITES,
} from './actions';
import SortCities from '../util/SortCities';

import { combineReducers } from "redux";

export function weatherStateReducer(state = [], action) {
    switch (action.type) {
        case WEATHER_OF_CITIES:
            return [ ...action.item];
        case FILTER_CITY:
            let lowerCity = action.city.toLowerCase();
            let newState = state.filter(item => {
                return item.LocalizedName.toLowerCase().match(lowerCity);
            });
            if (!lowerCity || lowerCity === '') { return state; }
            if (!Array.isArray(newState) || !newState.length) {
                return state;
            }
            else if (Array.isArray(newState)) {
                return newState;
            }
        case REMOVE_FROM_LIST:
            let sieveState = [...state];
            sieveState.splice(action.index, 1);
            return sieveState;
        case ADD_TO_FAVOURITES:
            /* case for adding cities to favourites and sorting alphabetically  */
            
            //already a fav
            if (typeof state[action.index].favorite !== 'undefined') {
                return state;
            }
            let favState = state.splice(action.index, 1);
            favState[0].favorite = true;
            if (action.numberOfFavs === 1) {
                state.unshift(...favState);
                return state;
            }
            let topFavs = state.splice(0, action.numberOfFavs - 1);
            state.unshift(...[...topFavs, ...favState].sort(SortCities));
            return state;
        default:
            return state;
    }
}

export function CitiesDetailIndex(state = 0, action) {
    switch (action.type) {
        case SET_INDEX_OF_DETAILSCREEN:
            return action.index;
        default:
            return state;
    }
}

const GlobalState = combineReducers({
    weatherStateReducer, CitiesDetailIndex
});

export default GlobalState;