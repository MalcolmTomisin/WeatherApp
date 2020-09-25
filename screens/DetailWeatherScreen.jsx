import React,{useState, useEffect} from 'react';
import {
    View, StyleSheet, StatusBar, TextInput
} from 'react-native';
import Layout from '../constants/Layout';
import {Text} from '../components/Text';
import WeatherIcons,{ BackButton } from '../components/Icons';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

function DetailWeatherScreen({ navigation, detail }) {
    const [note, setNote] = useState("");

    useEffect(async () => {
        let text = await AsyncStorage.getItem(detail.Key);
        setNote(text);
    }, []);
    
    const onChangeText = (text) => setNote(text);
    const onEndEditing = () => {
        if (note.length > 0) {
            AsyncStorage.setItem(detail.Key, note);
        }
    };
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#0090ffc2" barStyle="light-content" />
        <View style={styles.topHalfScreen}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.bold}>
            <Text style={styles.boldText}>{detail.LocalizedName}</Text>
            <WeatherIcons
              style={{ height: 72, width: 72 }}
              uri={`https://developer.accuweather.com/sites/default/files/${detail.WeatherIcon}-s.png`}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center' }}
          >
            <Text
              style={styles.temperature}
            >{`${detail.Temperature.Metric.Value}°C`}</Text>
                    <Text style={styles.seaLevel}>{`${detail.GeoPosition.Elevation.Metric.Value} m`}</Text>
                    <Text style={styles.seaLevel}>{`${detail.WeatherText}`}</Text>
          </View>
            </View>
            <View>
                <TextInput
                    multiline
                    value={note}
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing}
                    style={styles.noteArea}
                />
            </View>
      </View>
    );
}

const styles = StyleSheet.create({
  topHalfScreen: {
    width: Layout.DEVICE_WIDTH,
    height: Layout.DEVICE_HEIGHT * 0.3,
    backgroundColor: "#0090ffc2",
    padding: 10,
    justifyContent: "space-evenly",
  },
  bold: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  temperature: {
    color: "#ffffff",
    // fontFamily: "SF UI Display",
    fontSize: 28,
  },
  seaLevel: {
    color: "#ffffff",
    //fontFamily: "SF UI Text",
    fontSize: 15,
    fontWeight: "400",
  },
  back: {},
  boldText: {
    color: "#ffffff",
    //fontFamily: "SF UI Display",
    fontSize: 28,
    fontWeight: "700",
    },
    noteArea: {
        width: Layout.DEVICE_WIDTH,
        height: DEVICE_HEIGHT * 0.5,
  }
});

const mapStateToProps = ({ CitiesDetailIndex, weatherStateReducer }) => {
  //console.log("state", state);
  return { detail: weatherStateReducer[CitiesDetailIndex] };
};

export default connect(mapStateToProps,{})(DetailWeatherScreen);
