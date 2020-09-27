import React, { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';
import { useStorage } from '../hooks/useStorage';
import ListItem from '../components/List';
import {
  View,
  FlatList,
  Text,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Alert
} from "react-native";
import WEATHER_URL from '../constants/Strings'; 
import {
  boundGetWeatherDetails,
  boundFilterCities
} from '../redux/store';
import { connect } from "react-redux";
import * as Location from "expo-location";
import UserWeather from '../components/TopHalf';
import {
  OPEN_WEATHER_URL, REJECTED_PERMISSION_PROMPT
} from '../constants/Strings';
import { API_KEY_OPENWEATHERMAP } from '../constants/ApiKey';

function CitiesWeatherScreen({ weatherList, navigation }) {
     
    const [input, setInput] = useState("");
    const [data, setData] = useState(false);
    const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const closeUserWeather = () => {
    setIsVisible(false);
  };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
              Alert.alert(REJECTED_PERMISSION_PROMPT);
            } else {
             let location = await Location.getCurrentPositionAsync({});
             fetch(
               `${OPEN_WEATHER_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${API_KEY_OPENWEATHERMAP}`
             )
               .then((res) => res.json())
               .then((res) => {
                 setData(res);
                 setIsVisible(true);
                 //console.log("result", res);
               })
               .catch(setError); 
            }
        })();
    },[]);

    const recieveInput = (text) => {
       
        boundFilterCities(text);
        setInput(text);
    };
    
     let res = useFetch(WEATHER_URL);
     if (res.loading) {
         return (
           <View
             style={styles.container}
           >
             <ActivityIndicator
               size="large"
               color="blue" />
           </View>
         );
     }
     //const resList = res.result;
    
   //  console.log('this', res.result);
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content" />
        <ListItem
          data={weatherList}
          onChangeText={recieveInput}
          value={input}
          navigation={navigation}
        />
        {data && <UserWeather
          data={data}
          visible={isVisible}
          onRequestClose={closeUserWeather}
        />}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = ({weatherStateReducer}) => {
  //console.log("state", state);
  return { weatherList: weatherStateReducer };
};

export default connect(mapStateToProps, {
    boundGetWeatherDetails,boundFilterCities
})(CitiesWeatherScreen);

