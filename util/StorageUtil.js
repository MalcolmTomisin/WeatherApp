import AsyncStorage from '@react-native-community/async-storage';
import { favouriteIndex } from "../constants/Strings";
const ONLY_ONE_FAVOURITE_ITEM = 1;

const StorageUtil = async (key, value) => {
    let stringList = await AsyncStorage.getItem(key);
    let parsedList = JSON.parse(stringList);
    if (Array.isArray(parsedList)) {
        try {
            let num = parsedList.push(value);
            AsyncStorage.setItem(key, JSON.stringify(parsedList));
            if (key === favouriteIndex) {
                return num;
            }
        }
        catch (e) {
            
        }
    }
    else {
        try {
            AsyncStorage.setItem(key, JSON.stringify([value]));
            if (key === favouriteIndex) {
                return ONLY_ONE_FAVOURITE_ITEM;    
            }
        }
        catch (e) { }
    }
};

export default StorageUtil;