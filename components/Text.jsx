import React from "react";
import { Text as NativeText } from "react-native"; 


export function Text(props) {
    return <Text {...props} style={[props.style, { fontFamily: props.fontFamily }]} />;
}

