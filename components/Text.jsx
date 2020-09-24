import React from "react";
import { Text as NativeText } from "react-native"; 


export function Text(props) {
    return <NativeText {...props} style={[props.style, { fontFamily: props.fontFamily }]} />;
}

