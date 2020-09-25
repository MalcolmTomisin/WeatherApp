import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function ToolTip(props) {
    const addToFavourites = () => {
        props.addToFav(props.index);
    };
    const removeFromList = () => {
        props.removeFromList(props.index);
    };
    return (
      <View style={props.style}>
        <Text style={styles.action} onPress={addToFavourites}>Favourite</Text>
        <View style={styles.line}></View>
        <Text style={styles.action} onPress={removeFromList}>Remove</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: 60,
    backgroundColor: "#95989a",
  },
  action: {
    fontSize: 14,
    fontWeight: "400",
      color: "#95989a",
  },
});