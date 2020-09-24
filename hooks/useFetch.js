import React, { useState, useEffect } from "react";
import WEATHER_URL from '../constants/Strings';
import { boundGetWeatherDetails } from "../redux/store";

export function useFetch(url, param = null) {
    const [result, setResult] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;
            fetch(url, param)
              .then((res) => res.json())
                .then(res => {
                    if (url === WEATHER_URL && Array.isArray(res)) {
                        let newArr = res.splice(0, 15);
                        newArr.sort((a, b) => {
                            let localizedNameA = a.LocalizedName.toUpperCase();
                            let localizedNameB = b.LocalizedName.toUpperCase();
                            
                            if (localizedNameA < localizedNameB) {
                                return -1;
                            }
                            if (localizedNameA > localizedNameB) {
                                return 1;
                            }

                            // names must be equal
                            return 0;
                        });
                        boundGetWeatherDetails(newArr); 
                        return;   
                    } 
                    setResult(res);
              })
              .catch(setError)
            .finally(() => setLoading(false));
    }, []);
    
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