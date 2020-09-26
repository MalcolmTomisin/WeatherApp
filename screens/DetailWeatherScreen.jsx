import React,{useState, useEffect, useRef} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TextInput,
    Modal,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import Layout from '../constants/Layout';
import {Text} from '../components/Text';
import WeatherIcons, {
    BackButton,
    CameraButton,
    CameraRoll,
    CameraTrigger,
    Pin
} from '../components/Icons';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import ImageModal from '../components/ImageModal';

function DetailWeatherScreen({ navigation, detail }) {
    const [note, setNote] = useState("");
    const [permission, askForPermission] = Permissions.usePermissions(Permissions.CAMERA, {
      ask: true,
    });
    const [ready, setReady] = useState(false);
    const [cameraError, setCameraError] = useState();
    const camera = useRef(null);
    const [image, setImage] = useState(null);
    const [isVisible, setVisible] = useState(false);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    
    const getCameraPermissions = () => {
        if (!permission || permission.status !== 'granted') {
            askForPermission();
            if (!permission || permission.status !== 'granted') {
                setPermissionDenied(true);
                return;
            }
        }
        setVisible(true);
    };
    const showImageModal = () => {
        setImageModal(true);
    };

    const takePhoto = async () => {
        setIsLoading(true);
        let photo = await camera.current.takePictureAsync({
            quality: 0
        });
        setImage(photo);
        setIsLoading(false);
        setVisible(false);
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
        <StatusBar
          backgroundColor="#0090ffc2"
          barStyle="light-content" />
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
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text
              style={styles.temperature}
            >{`${detail.Temperature.Metric.Value}°C`}</Text>
            <Text
              style={styles.seaLevel}
            >{`${detail.GeoPosition.Elevation.Metric.Value} m`}</Text>
            <Text style={styles.seaLevel}>{`${detail.WeatherText}`}</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              multiline
              value={note}
              onChangeText={onChangeText}
              onEndEditing={onEndEditing}
              style={styles.noteArea}
            />
            <View style={styles.buttonContainer}>
              <CameraButton onPress={getCameraPermissions} />
              <CameraRoll />
                    </View>
                    <View>
                        {image ? (<TouchableOpacity
                            onPress={showImageModal}>
                            <View style={styles.pin}>
                                <Pin />
                                <Text>Put Coordinates here</Text>
                            </View>
                        </TouchableOpacity>)
                            : null}
                    </View>        
        </View>
        </ScrollView>
        <Modal style={{ flex: 1 }} visible={isVisible}>
          <Camera
            style={styles.camera}
            onCameraReady={signalCameraReady}
            flashMode="auto"
            autoFocus={Camera.Constants.AutoFocus.on}
            onMountError={signalCameraError}
            ref={camera}
          >
            {isLoading ? (
              <ActivityIndicator
                color="#0090ffc2"
                size="small"
                style={{ margin: 5 }}
              />
            ) : (
                <CameraTrigger
                  onPress={takePhoto} style={{ margin: 5 }} />
            )}
          </Camera>
            </Modal>
        {
          image.uri && <ImageModal visible={imageModal} uri={image.uri} />}
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
    width: Layout.DEVICE_WIDTH,
  },
  camera: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  pin: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    borderRadius: 5,
    width: Layout.DEVICE_WIDTH * 0.8,
    marginVertical: 5,
  },
  weatherDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

const mapStateToProps = ({ CitiesDetailIndex, weatherStateReducer }) => {
  //console.log("state", state);
  return { detail: weatherStateReducer[CitiesDetailIndex] };
};

export default connect(mapStateToProps,{})(DetailWeatherScreen);
