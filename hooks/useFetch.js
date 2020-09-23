import React, { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);
    
    return {
        loading,
        data,
        error
    };
}