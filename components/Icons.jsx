import React from "react";
import { Image, TouchableOpacity } from "react-native";
import ic_humidity from '../assets/icons/ic_humidity.png';
import ic_wind from '../assets/icons/ic_wind.png';
import ic_back from "../assets/icons/ic_back.png";
import ic_camera from '../assets/icons/ic_camera.png';
import ic_roll from '../assets/icons/ic_camera_roll.png';
import ic_take_photo from '../assets/icons/ic_take_picture.png';

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

export function CameraButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image
                source={ic_camera}
                style={[{ width: 40, height: 40 }, props.style]}
            />
        </TouchableOpacity>
    );
}

export function CameraRoll(props) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Image
          source={ic_roll}
          style={[{ width: 40, height: 40 }, props.style]}
        />
      </TouchableOpacity>
    );
}

export function CameraTrigger(props) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Image
          source={ic_take_photo}
          style={[{ width: 40, height: 40 }, props.style]}
        />
      </TouchableOpacity>
    );
}