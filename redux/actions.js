export const WEATHER_OF_CITIES = 'WEATHER OF CITIES';
export const FILTER_CITY = 'FILTER CITY';
export const SET_INDEX_OF_DETAILSCREEN = 'INDEX';
export const REMOVE_FROM_LIST = 'REMOVE_INDEX';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVS';
export const MY_WEATHER = 'MY WEATHER';
export const REMOVE_FROM_FAVORITE = 'REMOVE FROM FAVORITE';

export function getWeatherDetails(item) {
    return {
        type: WEATHER_OF_CITIES,
        item
    };
}

export function filterCities(city) {
    return {
        type: FILTER_CITY,
        city
    };
}

export function setDetailScreen(index) {
    return {
        type: SET_INDEX_OF_DETAILSCREEN,
        index
    };
}

export function removeFromList(index) {
    return {
        type: REMOVE_FROM_LIST,
        index
    };
}

export function addToFavourites(index) {
    return {
        type: ADD_TO_FAVOURITES,
        index,
        favorite: true,
    };
}

export function getMyWeather(item) {
    return {
        type: MY_WEATHER,
        item,
    };
}

export function removeFromFavorite(index) {
    return {
        type: REMOVE_FROM_FAVORITE,
        index,
    };
}