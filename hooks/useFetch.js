import React, { useState, useEffect } from "react";

export function useFetch(url, param = null) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;
        if (param) {
            fetch(url, param)
              .then((res) => res.json())
              .then(setData)
              .catch(setError)
              .finally(() => setLoading(false));
        }
        else {
            fetch(url)
              .then((res) => res.json())
              .then(setData)
              .catch(setError)
              .finally(() => setLoading(false));
        }
    }, [url]);
    
    return {
        loading,
        data,
        error
    };
}