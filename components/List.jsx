import React from "react";
import { FlatList, View, StyleSheet, Image, Pressable } from "react-native";
import Icons from './Icons';
import {Text} from './Text';
import Layout from '../constants/Layout';
import SearchBar from './SearchBar';


export default function ListItem (props) {
    const _renderItem = ({ item }) => (
      <Pressable key={item.key} style={styles.item}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Text style={styles.text}>{item.LocalizedName}</Text>
          <Icons
            uri={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon}-s.png`}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View>
          <Text
            style={[styles.text, {textAlign: "center"}]}
          >{`${item.Temperature.Metric.Value}°C`}</Text>
        </View>
      </Pressable>
    );
  
  const _keyExtractor = (item, index) => item.key;

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
    // fontFamily: "SF UI Display",
    fontSize: 22,
  },
});