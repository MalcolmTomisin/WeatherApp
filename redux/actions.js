export const WEATHER_OF_CITIES = 'WEATHER OF CITIES';

export function getWeatherDetails(item) {
    return {
        type: WEATHER_OF_CITIES,
        item
    };
}