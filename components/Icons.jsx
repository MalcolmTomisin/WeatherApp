import React from "react";
import { Image, TouchableOpacity } from "react-native";
import ic_humidity from '../assets/icons/ic_humidity.png';
import ic_wind from '../assets/icons/ic_wind.png';
import ic_back from "../assets/icons/ic_back.png";

export default function WeatherIcons(props) {
    return <Image
        style={props.style}
        source={{ uri: props.uri }}
    />;
}

export function HumidityIcon() {
    return <Image
        source={ic_humidity}
        style={{width: 17, height: 17}}
    />;
}

export function WindIcon() {
    return <Image
        source={ic_wind}
        style={{ width: 21, height: 16 }}
    />;
}

export function BackButton(props) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Image
          source={ic_back}
          style={[{ width: 25, height: 20 }, props.style]}
        />
      </TouchableOpacity>
    );
}