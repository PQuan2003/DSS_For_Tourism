import { useState, useEffect, useRef } from 'react';

const useFetchData = (url) => {
    const abortControllerRef = useRef(null);

    const fetchPosts = async () => {
        const [data, setData] = useState()
        const [error, setError] = useState()
        const [isLoading, setIsLoading] = useState(true)

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setIsLoading(true);

        try {
            const response = await fetch(url, {
                signal: abortControllerRef.current.signal,
            });
            const data = await response.json();
            setData(data);
        } catch (e) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }

            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    return {}

};

export default useFetchData;
