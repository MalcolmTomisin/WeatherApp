import React, { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';
import { useStorage } from '../hooks/useStorage';
import ListItem from '../components/List';
import { View, FlatList, Text, StatusBar, ActivityIndicator } from "react-native";
import WEATHER_URL from '../constants/Strings'; 
import { boundGetWeatherDetails, boundFilterCities } from '../redux/store';
import { connect } from "react-redux";

function CitiesWeatherScreen({ weatherList, navigation }) {
     
    const [input, setInput] = useState("");


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
      <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
            <ListItem
                data={weatherList}
                onChangeText={recieveInput}
                value={input}
                navigation={navigation}
            />
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