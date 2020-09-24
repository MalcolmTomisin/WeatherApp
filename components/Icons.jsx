import React from "react";
import { Image } from "react-native";
import ic_humidity from '../assets/icons/ic_humidity.png';
import ic_wind from '../assets/icons/ic_wind.png';

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