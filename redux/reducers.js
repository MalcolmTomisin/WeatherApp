import { WEATHER_OF_CITIES } from './actions';

export function weatherStateReducer(state = [], action) {
    switch (action.type) {
        case WEATHER_OF_CITIES:
            return [...state, ...action.item];
        default:
            return state;
    }
}

