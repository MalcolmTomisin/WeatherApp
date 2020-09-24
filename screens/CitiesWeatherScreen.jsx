import React, { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';
import { useStorage } from '../hooks/useStorage';
import ListItem from '../components/List';
import { View, FlatList, Text, StatusBar, ActivityIndicator } from "react-native";
import WEATHER_URL from '../constants/Strings'; 
import { boundGetWeatherDetails } from '../redux/store';
import { connect } from "react-redux";

 function CitiesWeatherScreen({weatherList}) {
    
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
     //const weatherList = res.result;

     //console.log('this', res.result);
    return (
      <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ListItem data={weatherList} />
      </View>
    );
}

const mapStateToProps = (state) => {
  //console.log("state", state);
  return { weatherList: state };
};

export default connect(mapStateToProps, {
    boundGetWeatherDetails,
})(CitiesWeatherScreen);