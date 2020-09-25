import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Layout from '../constants/Layout';
import Text from '../components/Text';
import WeatherIcons,{ BackButton } from '../components/Icons';


function DetailWeatherScreen({navigation}) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topHalfScreen}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.bold}>
            <Text></Text>
            <WeatherIcons style={{ height: 52, width: 52 }} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.temperature}>40c</Text>{" "}
            <Text style={styles.seaLevel}>Cloudy</Text>{" "}
            <Text style={styles.seaLevel}>GMT+3</Text>
          </View>
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
    alignItems: "center",
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
});