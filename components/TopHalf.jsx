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
      <StatusBar backgroundColor="#333333cc" barStyle="light-content" />
      {data.name && (
        <View style={styles.topHalfScreen}>
          <BackButton onPress={onRequestClose} />
          <View style={styles.bold}>
            <Text style={styles.boldText} fontFamily="lato-semibold">
              {data.name}
            </Text>

            <WeatherIcons
              style={{ height: 72, width: 72 }}
              uri={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            />
          </View>
          <View style={styles.weatherDetailsContainer}>
            <View>
              <Text
                style={styles.temperature}
                fontFamily="lato-bold"
              >{`${Math.round(data.main.temp)}°C`}</Text>
              <Text
                fontFamily="lato-regular"
                style={styles.seaLevel}
              >{`Feels like ${Math.round(data.main.feels_like)}°C`}</Text>
            </View>
            <View style={styles.weatherDetails}>
              <HumidityIcon />
              <Text
                fontFamily="lato-regular"
                style={styles.seaLevel}
              >{`${data.main.humidity}%`}</Text>
            </View>
            <View style={styles.windIconContainer}>
              <WindIcon />
              <Text
                fontFamily="lato-regular"
                style={styles.seaLevel}
              >{`${Math.round(data.wind.speed)} m/s`}</Text>
            </View>
          </View>
        </View>
      )}
      {data.sys && (
        <View>
          <View style={styles.listContainer}>
            <View style={styles.listItems}>
              <Text fontFamily="lato-medium" style={styles.item}>
                Cloud Coverage
              </Text>
              <Text
                fontFamily="lato-medium"
                style={styles.item}
              >{`${data.clouds.all}%`}</Text>
            </View>
            <View style={styles.listItems}>
              <Text fontFamily="lato-medium" style={styles.item}>
                Visibility
              </Text>
              <Text
                fontFamily="lato-medium"
                style={styles.item}
              >{`${data.visibility} m`}</Text>
            </View>
            <View style={styles.listItems}>
              <Text fontFamily="lato-medium" style={styles.item}>
                Weather Summary
              </Text>
              <Text
                fontFamily="lato-medium"
                style={styles.item}
              >{`${data.weather[0].description}`}</Text>
            </View>
            <View style={styles.listItems}>
              <Text fontFamily="lato-medium" style={styles.item}>
                Pressure
              </Text>
              <Text
                fontFamily="lato-medium"
                style={styles.item}
              >{`${data.main.pressure} hPa`}</Text>
            </View>
          </View>
        </View>
      )}
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
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    width: Layout.DEVICE_WIDTH,
  },
  item: {
    textAlign: "center",
    fontSize: 16,
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
