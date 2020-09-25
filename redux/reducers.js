import { WEATHER_OF_CITIES, FILTER_CITY } from './actions';

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

        default:
            return state;
    }
}

