import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export function useStorage() {
    
}

export async function isNotFirstTime() {
    const [error, setError] = useState();
    const [response, setResponse] = useState();

    useEffect(() => {
        AsyncStorage.getItem('@NotFirstTime')
            .then(val => val != null ? JSON.parse(val): null)
            .then(setResponse)
            .catch(setError);
    });

    return {
        response,
        error
    };
}