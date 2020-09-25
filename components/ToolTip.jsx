import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ToolTip(props) {
    const addToFavourites = () => {
        props.addToFav(props.index);
    };
    const removeFromList = () => {
        props.removeFromList(props.index);
    };
    return (
      <View style={props.style}>
        <TouchableOpacity onPress={addToFavourites}>
          <Text style={styles.action}>Favourite</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={removeFromList}>
          <Text style={styles.action}>Remove</Text>
        </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: "400",
      color: "#95989a",
  },
});