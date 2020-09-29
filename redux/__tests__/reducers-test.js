import {
    weatherStateReducer, CitiesDetailIndex
} from "../reducers";
import {
  WEATHER_OF_CITIES,
  SET_INDEX_OF_DETAILSCREEN,
  REMOVE_FROM_LIST,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVORITE,
} from "../actions";

describe('mutates parts of global state', () => {
    it('initialize store', () => {
        expect(weatherStateReducer(undefined, {})).toEqual([]);
    });
    it('populates weather state', () => {
        expect(
            weatherStateReducer(undefined, {
                type: WEATHER_OF_CITIES,
                item: [1, 2, 3, 4]
          })
        ).toEqual([1, 2, 3, 4]);
    });
    it('returns index number', () => {
        let index = 2;
        expect(
            CitiesDetailIndex(undefined, {
                type: SET_INDEX_OF_DETAILSCREEN,
                index
            })
        ).toEqual(2);
    });
    it('removes index from state', () => {
        let index = 2;
        expect(weatherStateReducer([0, 1, 2, 3, 4], {
            type: REMOVE_FROM_LIST,
            index
        })).toEqual([0, 1, 3, 4]);
    });
    it('add favourite field to obj at index', () => {
        let index = 2;
        const initialState = [
            {
                LocalizedName: "Mark",
                favorite: true
            },
            {
                LocalizedName: "Mark",
            },
            {
                LocalizedName: "Zaddy"
            },
            {
                LocalizedName: "Mark",
            },
            {
                LocalizedName: "Adim",
            },
            {
                LocalizedName: "Mark",
            },
        ];
        expect(
            weatherStateReducer(initialState, {
                type: ADD_TO_FAVOURITES,
                favorite: true,
                index,
            })
        ).toEqual([
            {
                LocalizedName: "Mark",
                favorite: true,
            },
            {
                LocalizedName: "Zaddy",
                favorite: true,
            },
            {
                LocalizedName: "Mark",
            },
            {
                LocalizedName: "Mark",
            },
            {
                LocalizedName: "Adim",
            },
            {
                LocalizedName: "Mark",
            },
        ]);
    });
    it('makes favorite field at index false', () => {
        const index = 1;
        const INTIAL_STATE = [
          {
            LocalizedName: "Mark",
            favorite: true,
          },
          {
            LocalizedName: "Zaddy",
            favorite: true,
          },
          {
            LocalizedName: "Mark",
          },
          {
            LocalizedName: "Mark",
          },
          {
            LocalizedName: "Adim",
          },
          {
            LocalizedName: "Mark",
          },
        ];
        expect(weatherStateReducer(INTIAL_STATE, {
            type: REMOVE_FROM_FAVORITE,
            index
        })).toEqual([
          {
            LocalizedName: "Mark",
            favorite: true,
          },
          {
            LocalizedName: "Adim",
          },
          {
            LocalizedName: "Mark",
          },
          {
            LocalizedName: "Mark",
          },
          {
            LocalizedName: "Mark",
          },
          {
            LocalizedName: "Zaddy",
            favorite: false,
          },
        ]);
    })
})