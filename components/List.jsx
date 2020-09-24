import React from "react";
import { FlatList, View, StyleSheet, Image } from "react-native";
import Icons from './Icons';
import Text from './Text';


export default function ListItem (props) {
    const _renderItem = ({ item }) => (
      <View>
        <View>
          <Text>{item.city}</Text>
          <Icons uri={item.weather_icons[0]} />
        </View>
        <View>
          <Text>{`${item.temp}°C`}</Text>
        </View>
      </View>
  );
  
  const _keyExtractor = (item, index) => item.id;

  return (
    <FlatList
      data={props.data}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
    />
  );

}