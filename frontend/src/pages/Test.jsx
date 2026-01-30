import { useState, useEffect, useRef } from 'react';

const MyComponent = () => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:8080/places`, {
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

        fetchPosts();
    }, []);

    if (error) {
        return <div>Something went wrong! Please try again.</div>;
    }

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
                <div>
                    <h1>Fetched Data:</h1>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    {/* <pre>{data}</pre> */}
                </div>}
        </div>
    );
};

export default MyComponent;
