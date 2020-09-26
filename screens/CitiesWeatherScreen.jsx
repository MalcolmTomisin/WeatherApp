import React, { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';
import { useStorage } from '../hooks/useStorage';
import ListItem from '../components/List';
import { View, FlatList, Text, StatusBar, ActivityIndicator } from "react-native";
import WEATHER_URL from '../constants/Strings'; 
import { boundGetWeatherDetails, boundFilterCities } from '../redux/store';
import { connect } from "react-redux";
import * as Location from "expo-location";
import UserWeather from '../components/TopHalf';
import { OPEN_WEATHER_URL } from '../constants/Strings';
import { API_KEY_OPENWEATHERMAP } from '../constants/ApiKey';

function CitiesWeatherScreen({ weatherList, navigation }) {
     
    const [input, setInput] = useState("");
    const [data, setData] = useState(false);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
              setErrorMsg("Permission to access location was denied");
            }
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
          fetch(`${OPEN_WEATHER_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${API_KEY_OPENWEATHERMAP}`)
                .then(res => res.json())
                .then(res => {
                    setData(res);
                    setIsVisible(true);
                    console.log('result', res);
                })
                .catch(setError);
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
             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
           >
             <ActivityIndicator size="large" color="blue" />
           </View>
         );
     }
     //const resList = res.result;
    
     console.log('this', res.result);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ListItem
          data={weatherList}
          onChangeText={recieveInput}
          value={input}
          navigation={navigation}
        />
        {data && <UserWeather data={data} visible={isVisible} />}
      </View>
    );
}

const mapStateToProps = ({weatherStateReducer}) => {
  //console.log("state", state);
  return { weatherList: weatherStateReducer };
};

export default connect(mapStateToProps, {
    boundGetWeatherDetails,boundFilterCities
})(CitiesWeatherScreen);