import {
  WEATHER_OF_CITIES,
  getWeatherDetails,
  SET_INDEX_OF_DETAILSCREEN,
  setDetailScreen,
  REMOVE_FROM_LIST,
  removeFromList,
  addToFavourites,
  ADD_TO_FAVOURITES,
  MY_WEATHER,
  getMyWeather,
  removeFromFavorite,
  REMOVE_FROM_FAVORITE,
} from "../actions";

describe('actions', () => {
    it('should create an action to set state with weather details', () => {
        const arrayOfWeatherConditions = [{}, {}, {}, {}];
        const expectedAction = {
            type: WEATHER_OF_CITIES,
            item: arrayOfWeatherConditions,
        };
        expect(getWeatherDetails(arrayOfWeatherConditions)).toEqual(expectedAction);
    });
    it("should set index of array when a weather of a city is selected", () => {
      const index = 2;
      const expectedAction = {
        type: SET_INDEX_OF_DETAILSCREEN,
        index,
      };
      expect(setDetailScreen(index)).toEqual(expectedAction);
    });
    it("should remove index from state", () => {
        const index = 2;
        const expectedAction = {
            type: REMOVE_FROM_LIST,
            index,
        };
        expect(removeFromList(index)).toEqual(expectedAction);
    });
    it("should add a key 'favourite to object at index", () => {
        const index = 2;
        const expectedAction = {
            type: ADD_TO_FAVOURITES,
            index,
            favorite: true
        }
        expect(addToFavourites(index)).toEqual(expectedAction);
    });
    it("should make object at index have favourite:false field", () => {
        const index = 2;
        const expectedAction = {
            type: REMOVE_FROM_FAVORITE,
            index,
        }
        expect(removeFromFavorite(index)).toEqual(expectedAction);
    })
})