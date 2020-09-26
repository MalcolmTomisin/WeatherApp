import React,{useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TextInput,
    Modal,
    ActivityIndicator,
    ScrollView,
    Image,
  TouchableOpacity,
    Alert
} from 'react-native';
import Layout from '../constants/Layout';
import {REJECTED_PERMISSION_PROMPT} from '../constants/Strings';
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
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ImageModal from '../components/ImageModal';
import * as Location from "expo-location";

function DetailWeatherScreen({ navigation, detail }) {
    const [note, setNote] = useState("");
    const [permission, askForPermission] = Permissions.usePermissions([Permissions.CAMERA, Permissions.CAMERA_ROLL], {
      ask: true,
    });
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(null);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const imageConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
    

    useEffect(() => {
      (async () => {
          const {
            status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(REJECTED_PERMISSION_PROMPT);
        }
            try {
              let text = await AsyncStorage.getItem(detail.Key);
              AsyncStorage.multiGet([detail.Key, "coordinates", "image"],
                (err, stores) => {
                  stores.map((result, i, store) => {
                    if (i === 0) {
                      setNote(result);
                    } else if (i === 1) {
                      setLocation(JSON.parse(result));
                    }
                    else {
                      setImage(result);
                    }
                  });
                });
            }
            catch (e) {
                //handle error
            }   
        })();
    }, []);
  
  const getCameraPermissions = () => {
    if (!permission || permission.status !== "granted") {
      askForPermission();
      if (!permission || permission.status !== "granted") {
        setPermissionDenied(true);
        return false;
      }
    }
    return true;
  };

  const takePhoto = async () => {
    let granted = getCameraPermissions();
    if (granted) {
      let result = ImagePicker.launchCameraAsync(imageConfig);
      if (!result.cancelled) {
        setImage(result.uri);
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const imageName = `${new Date().now()}`;
        setLocation(location);
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "images/"
        );
        await FileSystem.copyAsync({
          from: result.uri,
          to: FileSystem.documentDirectory + `images/${imageName}.png`
        });
        AsyncStorage.multiSet([
          ["coordinates", JSON.stringify(location)],
          ["image", FileSystem.documentDirectory + `images/${imageName}.png`],
        ]);
      }
    }
  };
    
  const pickImage = async () => {
    let granted = getCameraPermissions();
    if (granted) {
     let result = await ImagePicker.launchImageLibraryAsync(imageConfig);
     if (!result.cancelled) {
       setImage(result.uri);
     } 
    }
  };
    const onChangeText = (text) => setNote(text);
    const onEndEditing = () => {
        if (note.length > 0) {
            AsyncStorage.setItem(detail.Key, note);
        }
  };
  const openImageModal = () => setVisible(true);
  const closeImageModal = () => setVisible(false);
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
              {image ? (
                <TouchableOpacity onPress={openImageModal}>
                  <View style={styles.pin}>
                    <Pin />
                    <Text>{`Lat: ${location.coords.latitude}, 
                            Lon: ${location.coords.longitude}`}</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
        {image && <ImageModal
          visible={imageModal}
          onRequestClose={closeImageModal}
          uri={image} />}
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
