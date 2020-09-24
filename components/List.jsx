import React from "react";
import { FlatList, View, StyleSheet, Image } from "react-native";
import Icons from './Icons';
import {Text} from './Text';


export default function ListItem (props) {
    const _renderItem = ({ item }) => (
      <View key={item.key}>
        <View>
          <Text>{item.LocalizedName}</Text>
          <Icons
            uri={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon}-s.png`}
            style={{width: 50, height: 50}}
          />
        </View>
        <View>
          <Text>{`${item.Temperature.Metric.Value}°C`}</Text>
        </View>
      </View>
    );
  
  const _keyExtractor = (item, index) => item.key;

  return (
    <FlatList
      data={props.data}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
    />
  );

}