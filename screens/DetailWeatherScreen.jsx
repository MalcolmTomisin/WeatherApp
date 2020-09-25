import React,{useState, useEffect, useRef} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TextInput,
    Modal
} from 'react-native';
import Layout from '../constants/Layout';
import {Text} from '../components/Text';
import WeatherIcons, {
    BackButton,
    CameraButton,
    CameraRoll
} from '../components/Icons';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

function DetailWeatherScreen({ navigation, detail }) {
    const [note, setNote] = useState("");
    const [permission, askForPermission] = usePermissions(Permissions.CAMERA, {
      ask: true,
    });
    const [ready, setReady] = useState(false);
    const [cameraError, setCameraError] = useState();
    const camera = useRef(null);
    
    const getCameraPermissions = () => {
        if (!permission || permission.status !== 'granted') {
            askForPermission();
        }
    };

    const takePhoto = () => {

    };
    const signalCameraReady = () => {
        setReady(true);
    };
    const signalCameraError = e => {
        setCameraError(e.message);
    };

    useEffect(() => {
        (async () => {
            try {
                let text = await AsyncStorage.getItem(detail.Key);
                setNote(text);
            }
            catch (e) {
                //handle error
            }
            
        })();
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    multiline
                    value={note}
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing}
                    style={styles.noteArea}
                />
                <View style={styles.buttonContainer}>
                    <CameraButton />
                    <CameraRoll />
                </View>
            </View>
            <Modal style={{flex: 1}}>
                <Camera
                    style={{ flex: 1 }}
                    onCameraReady={signalCameraReady}
                    flashMode="auto"
                    autoFocus={Camera.Constants.AutoFocus}
                    onMountError={signalCameraError}
                    ref={camera}
                ></Camera>
            </Modal>
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
    width: Layout.DEVICE_WIDTH * 0.9,
    height: Layout.DEVICE_HEIGHT * 0.5,
    elevation: 3,
    padding: 20,
    textAlignVertical: "top",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
      justifyContent: "space-evenly",
    padding: 10,
  },
});

const mapStateToProps = ({ CitiesDetailIndex, weatherStateReducer }) => {
  //console.log("state", state);
  return { detail: weatherStateReducer[CitiesDetailIndex] };
};

export default connect(mapStateToProps,{})(DetailWeatherScreen);
