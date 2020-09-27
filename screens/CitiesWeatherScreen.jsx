import React, { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';
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
  boundFilterCities,
  boundGetMyWeather
} from '../redux/store';
import { connect } from "react-redux";
import * as Location from "expo-location";
import UserWeather from '../components/TopHalf';
import {
  OPEN_WEATHER_URL, REJECTED_PERMISSION_PROMPT
} from '../constants/Strings';
import { API_KEY_OPENWEATHERMAP } from '../constants/ApiKey';

function CitiesWeatherScreen({ weatherList, navigation, myWeather }) {
     
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [searchData, setSearchData] = useState();
  
  const closeUserWeather = () => {
    setIsVisible(false);
  };

  const closeUserWeather2 = () => {
    setIsVisible2(false);
  };

  const searchCity = () => {
    if (input !== "") {
      setLoading(true);
      fetch(
        `${OPEN_WEATHER_URL}q=${input}&units=metric&appid=${API_KEY_OPENWEATHERMAP}`
      )
        .then(res => res.json())
        .then(res => {
          setSearchData(res);
          setIsVisible2(true);
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }
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
            //console.log('res', res);
            boundGetMyWeather(res);
            setIsVisible(true);
            //console.log("result", res);
          })
          .catch(setError);
      }
    })();
  }, []);

  const recieveInput = (text) => {  
    //boundFilterCities(text);
    setInput(text);
  };
    
  let res = useFetch(WEATHER_URL);
  if (res.loading || loading) {
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
  
  if (error || res.error) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 14 }}>Sorry about that glitch, please try again another time</Text>
      </View>
    );
  }
     
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ListItem
          importantForAccessibilty="yes"
          data={weatherList}
          onChangeText={recieveInput}
          value={input}
          onSubmitEditing={searchCity}
          navigation={navigation}
        />
        {myWeather && (
          <UserWeather
            importantForAccessibilty="auto"
            data={myWeather}
            visible={isVisible}
            onRequestClose={closeUserWeather}
          />
        )}
        {searchData && (
          <UserWeather
            importantForAccessibilty="auto"
            data={searchData}
            visible={isVisible2}
            onRequestClose={closeUserWeather2}
          />
        )}
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

const mapStateToProps = ({weatherStateReducer, myWeatherReducer}) => {
  //console.log("state", myWeatherReducer);
  return {
    weatherList: weatherStateReducer,
    myWeather: myWeatherReducer
  };
};

export default connect(mapStateToProps, {
    boundGetWeatherDetails,boundFilterCities, boundGetMyWeather
})(CitiesWeatherScreen);

