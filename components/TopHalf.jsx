import React from "react";
import { View, StyleSheet, Modal, StatusBar } from "react-native";
import Layout from "../constants/Layout";
import WeatherIcons, {
  BackButton,
  CameraButton,
  CameraRoll,
  CameraTrigger,
    Pin,
    WindIcon,
  HumidityIcon
} from "./Icons";
import { Text } from './Text';

export default function UserWeather({data, visible, onRequestClose}) {
  return (
    <Modal
      style={{ flex: 1 }}
      visible={visible}
      onRequestClose={onRequestClose}    
    >
      <StatusBar
        backgroundColor="#333333cc"
        barStyle="light-content" />
      <View style={styles.topHalfScreen}>
        <BackButton onPress={onRequestClose} />
        <View style={styles.bold}>
          <Text style={styles.boldText}>{data.name}</Text>
          <WeatherIcons
            style={{ height: 72, width: 72 }}
            uri={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
        </View>
        <View
          style={styles.weatherDetailsContainer}
        >
          <View>
            <Text
              style={styles.temperature}>{`${Math.round(
              data.main.temp
            )}°C`}</Text>
            <Text
              style={styles.seaLevel}>{`Feels like ${Math.round(
              data.main.feels_like
            )}°C`}</Text>
          </View>
          <View
            style={styles.weatherDetails}
          >
            <HumidityIcon />
            <Text
              style={styles.seaLevel}>{`${data.main.humidity}%`}</Text>
          </View>
          <View
            style={styles.windIconContainer}>
            <WindIcon />
            <Text style={styles.seaLevel}>{`${Math.round(
              data.wind.speed
            )} m/s`}</Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={styles.listContainer}
        >
          <View style={styles.listItems}>
            <Text style={styles.item}>Cloud Coverage</Text>
            <Text style={styles.item}>{`${data.clouds.all}`}</Text>
          </View>
          <View style={styles.listItems}>
            <Text style={styles.item}>Sunrise</Text>
            <Text style={styles.item}>{`${data.sys.sunrise}`}</Text>
          </View>
          <View style={styles.listItems}>
            <Text style={styles.item}>Sunset</Text>
            <Text style={styles.item}>{`${data.sys.sunset}`}</Text>
          </View>
          <View style={styles.listItems}>
            <Text style={styles.item}>Pressure</Text>
            <Text style={styles.item}>{`${data.main.pressure}`}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  topHalfScreen: {
    width: Layout.DEVICE_WIDTH,
    height: Layout.DEVICE_HEIGHT * 0.4,
    backgroundColor: "#333333cc",
    padding: 10,
    justifyContent: "space-evenly",
  },
  bold: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  boldText: {
    color: "#ffffff",
    //fontFamily: "SF UI Display",
    fontSize: 28,
    fontWeight: "700",
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
    marginHorizontal: 2,
  },
  backButton: {
    marginLeft: 5,
  },
  listItems: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
  listContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  weatherDetails: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  weatherDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  windIconContainer: {
    flexDirection: "row",
    padding: 10,
  },
});
