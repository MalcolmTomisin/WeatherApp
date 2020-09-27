import React, {useState} from "react";
import { FlatList, View, StyleSheet, Image, Pressable } from "react-native";
import Icons from './Icons';
import {Text} from './Text';
import Layout from '../constants/Layout';
import SearchBar from './SearchBar';
import {
  boundSetDetailScreen,
  boundRemoveFromList,
  boundAddToFavourites,
  boundRemoveFromFavorites
} from '../redux/store';
import ToolTip from './ToolTip';
import ic_star from '../assets/icons/star.png';


export default function ListItem(props) {

  const [longPress, setLongPress] = useState(false);
  const [itemIndex, setItemIndex] = useState();

  const add = (index) => {
    boundAddToFavourites(index);
    setLongPress(false);
  };

  const removeFromFav = (index) => {
    boundRemoveFromFavorites(index);
    setLongPress(false);
  };

  const remove = (index) => {
    boundRemoveFromList(index);
    setLongPress(false);
  };
  
  const _renderItem = ({ item, index }) => (
    <View>
      <Pressable
        accessible="true"
        accessibilityLabel="Tap or press me down"
        accessibilityHint={`Navigates to the weather information screen on ${item.LocalizedName} or hold to add Weather of ${item.LocalizedName} to favorites or remove`}
        key={item.Key}
        style={styles.item}
        onLongPress={() => {
          setLongPress(true);
          setItemIndex(index);
        }}
        onPress={() => {
          setLongPress(false);
          boundSetDetailScreen(index);
          props.navigation.navigate("Details");
        }}
      >
        <View style={styles.iconContainer}>
          <Text fontFamily="lato-bold" style={styles.text}>
            {item.LocalizedName}
          </Text>
          <Icons
            uri={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon}-s.png`}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Text
            fontFamily="lato-medium"
            style={[styles.text, { textAlign: "center" }]}
          >{`${Math.round(item.Temperature.Metric.Value)}°C`}</Text>
          {item.favorite && (
            <Image
              source={ic_star}
              style={{
                width: 25,
                height: 25,
                marginRight: 10,
              }}
            />
          )}
        </View>

        {longPress && itemIndex === index ? (
          <ToolTip
            index={index}
            addToFav={add}
            removeFromList={remove}
            fav={item.favorite}
            style={styles.toolTip}
            removeFromFav={removeFromFav}
          />
        ) : null}
      </Pressable>
    </View>
  );
  
  const _keyExtractor = (item, index) => item.Key;

  return (
    <FlatList
      data={props.data}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      ListHeaderComponent={<SearchBar {...props} />}
    />
  );

}

const styles = StyleSheet.create({
  item: {
    width: Layout.DEVICE_WIDTH * 0.91,
    padding: 10,
    elevation: 5,
    marginVertical: 5,
    backgroundColor: "#0090ffc2",
  },
  text: {
    color: "#ffffff",
    fontSize: 22,
  },
  toolTip: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: 5,
    height: 100,
    zIndex: 10,
    elevation: 4,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
});