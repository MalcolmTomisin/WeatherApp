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
  const [image, setImage] = useState('');
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState({});
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
              AsyncStorage.multiGet(
                [detail.Key, `coordinates${detail.Key}`, `image${detail.Key}`],
                (err, stores) => {
                  console.log("store", stores);
                  stores.map((result, i, store) => {
                    if (i === 0 && result[1]) {
                      setNote(result[1]);
                    } else if (i === 1 && result[1]) {
                      setLocation(JSON.parse(result[1]));
                    } else {
                      if (result[1]) {
                        setImage(result[1]);
                      }
                    }
                  });
                }
              );
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
      let dir;
      try {
        dir = await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + "weather/"
        );
      } catch (e) {
        
      }
      if (!dir.isDirectory) {
       await FileSystem.makeDirectoryAsync(
         FileSystem.documentDirectory + "weather/"
       ); 
      }
      let location = await Location.getCurrentPositionAsync();
      const imageName = `${Date.now()}`;
      let result = await ImagePicker.launchCameraAsync(imageConfig);
      if (!result.cancelled) {
        setImage(result.uri);
        setLocation(location);
        await FileSystem.copyAsync({
          from: result.uri,
          to: FileSystem.documentDirectory + `weather/${imageName}.png`
        });
        AsyncStorage.multiSet([
          [`coordinates${detail.Key}`, JSON.stringify(location)],
          [`image${detail.Key}`, FileSystem.documentDirectory + `weather/${imageName}.png`],
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
              <CameraTrigger onPress={takePhoto} />
              <CameraRoll />
            </View>
            <View style={{paddingVertical: 15}}>
              {image ? (
                <TouchableOpacity onPress={openImageModal}>
                  <View style={styles.pin}>
                    <Pin />
                    {typeof location.coords !== 'undefined' && 
                      <Text>{`Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`}</Text>
                    }
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
        {typeof image === 'string' && (
          <ImageModal
            visible={visible}
            onRequestClose={closeImageModal}
            uri={image}
            longitude={location.coords.longitude}
            latitude={location.coords.latitude}
          />
        )}
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
    marginHorizontal: 15,
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
