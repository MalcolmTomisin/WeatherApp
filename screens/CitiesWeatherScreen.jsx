import React, { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';
import { useStorage } from '../hooks/useStorage';
import ListItem from '../components/List';
import { View, FlatList, Text, StatusBar } from "react-native";
import WEATHER_URL from '../constants/Strings'; 

export default function CitiesWeatherScreen() {
    
    

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {/* <ListItem data={cities} /> */}
      </View>
    );
}