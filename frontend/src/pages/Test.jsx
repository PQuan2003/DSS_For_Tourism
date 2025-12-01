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




// const mock_data = {
//     "status": "success",
//     "content": [
//         {
//             "tags": [
//                 "Beach",
//                 "Seafood",
//                 "Relaxation",
//                 "Weekend Trip"
//             ],
//             "place_id": 1,
//             "place_name": "Vũng Tàu",
//             "country": "Vietnam",
//             "money_unit": "VND",
//             "avg_cost_per_day": "1350000.00",
//             "place_description": "A coastal city famous for beaches, seafood, and weekend getaways from Hồ Chí Minh City.",
//             "place_img": "https://example.com/img/vungtau.jpg",
//             "tourist_density": "Medium",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-11-25T22:37:31.000Z"
//         },
//         {
//             "tags": [
//                 "Culture",
//                 "Food",
//                 "Beach",
//                 "History"
//             ],
//             "place_id": 7,
//             "place_name": "Hội An",
//             "country": "Vietnam",
//             "money_unit": "VND",
//             "avg_cost_per_day": "1450000.00",
//             "place_description": "Charming old town with lanterns, riverside cafes, and beaches nearby.",
//             "place_img": "https://example.com/img/hoian.jpg",
//             "tourist_density": "High",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-11-25T22:37:31.000Z"
//         },
//         {
//             "tags": [
//                 "Beach",
//                 "Nightlife",
//                 "Diving"
//             ],
//             "place_id": 8,
//             "place_name": "Nha Trang",
//             "country": "Vietnam",
//             "money_unit": "VND",
//             "avg_cost_per_day": "1650000.00",
//             "place_description": "Coastal resort city known for beaches, diving, and nightlife.",
//             "place_img": "https://example.com/img/nhatrang.jpg",
//             "tourist_density": "High",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-11-25T22:37:31.000Z"
//         },
//         {
//             "tags": [
//                 "Beach",
//                 "Island",
//                 "Relaxation"
//             ],
//             "place_id": 9,
//             "place_name": "Phú Quốc",
//             "country": "Vietnam",
//             "money_unit": "VND",
//             "avg_cost_per_day": "2000000.00",
//             "place_description": "Island paradise famous for beaches, resorts, and seafood.",
//             "place_img": "https://example.com/img/phuquoc.jpg",
//             "tourist_density": "Medium",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-11-25T22:37:31.000Z"
//         },
//         {
//             "tags": [
//                 "City",
//                 "Nightlife",
//                 "Food",
//                 "Temples"
//             ],
//             "place_id": 14,
//             "place_name": "Bangkok",
//             "country": "Thailand",
//             "money_unit": "THB",
//             "avg_cost_per_day": "1800000.00",
//             "place_description": "Bustling capital of Thailand, famous for street food, temples, and nightlife.",
//             "place_img": "https://example.com/img/bangkok.jpg",
//             "tourist_density": "High",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-10-10T01:50:45.000Z"
//         },
//         {
//             "tags": [
//                 "Beach",
//                 "Surf",
//                 "Culture",
//                 "Temple"
//             ],
//             "place_id": 16,
//             "place_name": "Bali (South Bali)",
//             "country": "Indonesia",
//             "money_unit": "IDR",
//             "avg_cost_per_day": "1750000.00",
//             "place_description": "Famous island with beaches, temples, surf spots, and lively tourism areas (Kuta, Seminyak, Uluwatu).",
//             "place_img": "https://example.com/img/bali.jpg",
//             "tourist_density": "High",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-10-10T01:51:50.000Z"
//         },
//         {
//             "tags": [
//                 "Island",
//                 "Luxury",
//                 "Diving",
//                 "Beach"
//             ],
//             "place_id": 17,
//             "place_name": "Malé / Maldives (North Atoll access)",
//             "country": "Maldives",
//             "money_unit": "USD",
//             "avg_cost_per_day": "1750000.00",
//             "place_description": "Tropical atolls, luxury resorts, coral reefs, ideal for diving and honeymooners.",
//             "place_img": "https://example.com/img/maldives.jpg",
//             "tourist_density": "Medium",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-10-10T01:58:41.000Z"
//         },
//         {
//             "tags": [
//                 "Beach",
//                 "Surf",
//                 "Nightlife",
//                 "Family"
//             ],
//             "place_id": 18,
//             "place_name": "Gold Coast",
//             "country": "Australia",
//             "money_unit": "AUD",
//             "avg_cost_per_day": "2750000.00",
//             "place_description": "Long sandy beaches, surf culture, theme parks and vibrant nightlife.",
//             "place_img": "https://example.com/img/goldcoast.jpg",
//             "tourist_density": "High",
//             "createdAt": "2025-10-03T02:00:38.000Z",
//             "updatedAt": "2025-10-10T01:53:15.000Z"
//         }
//     ]
// }