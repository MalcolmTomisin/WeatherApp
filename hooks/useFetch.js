import React, { useState, useEffect } from "react";
import WEATHER_URL from '../constants/Strings';

export function useFetch(url, param = null) {
    const [result, setResult] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;
        if (param) {
            fetch(url, param)
              .then((res) => res.json())
              .then(setResult)
              .catch(setError)
              .finally(() => setLoading(false));
        }
        else {
            fetch(url)
              .then((res) => res.json())
              .then(setResult)
              .catch(setError)
              .finally(() => setLoading(false));
        }
    }, [url]);
    
    return {
        loading,
        result,
        error
    };
}

export function composeURL(arr) {
    const [urlQuery, setUrlQuery] = useState("");

    useEffect(() => {
        let arrString = arr.map((val, i) => {
            let coordinates = Object.values(val).pop();
            return coordinates;
        });
        let queryString = arrString.join(";");
        setUrlQuery(queryString);
    });

    return WEATHER_URL + urlQuery;

}