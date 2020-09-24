import React from "react";
import { FlatList, View, StyleSheet, Image } from "react-native";
import Icons from './Icons';
import Text from './Text';


export default function (props) {
    const _renderItem = ({ item }) => (
      <View>
        <View>
          <Text></Text>
                <Icons uri={item.weather_icons[0]} />
            </View>
            <View>
                <Text></Text>
                <View>

                </View>
            </View>
      </View>
    );
}