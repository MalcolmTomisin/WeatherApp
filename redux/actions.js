export const WEATHER_OF_CITIES = 'WEATHER OF CITIES';
export const FILTER_CITY = 'FILTER CITY';

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