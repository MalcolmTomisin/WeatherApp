import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function SearchBar(props) {
    return (
        <TextInput
            onChangeText={props.onChangeText}
            value={props.value}
            onSubmitEditing={props.onSubmitEditing}
            style={styles.searchBar}
            accessibile={true}
            accessibilityLabel="Search"
            accessibilityHint="Search weather of a city"
        />
    );
}

const styles = StyleSheet.create({
    searchBar: {
        fontSize: 24,
        margin: 10,
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        // position: 'absolute',
        // top: 15,
        // left: 5
    },
});