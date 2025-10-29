import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserPreferencesSummary from "../../components/ResultComp/UserPreferencesSummary";

export default function RecommendationResult() {
    const navigate = useNavigate();

    // //Mock data
    // data = {
    //     "status": "success",
    //     "user_preferences": {
    //         "userBudget": 15000000,
    //         "totalTravelDays": 3,
    //         "user_scenery_requirement": [
    //             "City Life",
    //             "Mountain",
    //             "Seafood",
    //             "Food"
    //         ],
    //         "user_activity_preference": [
    //             "Swimming",
    //             "Nightlife",
    //             "surfing",
    //             "shopping",
    //             "Natural"
    //         ],
    //         "user_weather_preference": {
    //             "avg_temp": 25,
    //             "humidity": 30,
    //             "weather_type": "Sunny"
    //         },
    //         "travel_month": "Aug"
    //     },
    //     "content": [
    //         {
    //             "place_id": 26,
    //             "place_name": "Chamonix",
    //             "total_score": 2.539,
    //             "detailed_scores": {
    //                 "budget_score": 0.886,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.653
    //             }
    //         },
    //         {
    //             "place_id": 29,
    //             "place_name": "Aspen",
    //             "total_score": 2.515,
    //             "detailed_scores": {
    //                 "budget_score": 0.662,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0.753
    //             }
    //         },
    //         {
    //             "place_id": 1,
    //             "place_name": "Vũng Tàu",
    //             "total_score": 2.467,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.7,
    //                 "weather_score": 0.267
    //             }
    //         },
    //         {
    //             "place_id": 5,
    //             "place_name": "Hà Nội",
    //             "total_score": 2.45,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.6,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0.25
    //             }
    //         },
    //         {
    //             "place_id": 27,
    //             "place_name": "Cusco",
    //             "total_score": 2.45,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.7,
    //                 "weather_score": 0.25
    //             }
    //         },
    //         {
    //             "place_id": 30,
    //             "place_name": "Leh",
    //             "total_score": 2.403,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0.303
    //             }
    //         },
    //         {
    //             "place_id": 28,
    //             "place_name": "Zermatt",
    //             "total_score": 2.402,
    //             "detailed_scores": {
    //                 "budget_score": 0.785,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.617
    //             }
    //         },
    //         {
    //             "place_id": 24,
    //             "place_name": "Pokhara",
    //             "total_score": 2.4,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0.3
    //             }
    //         },
    //         {
    //             "place_id": 2,
    //             "place_name": "Hồ Chí Minh City",
    //             "total_score": 2.367,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0.267
    //             }
    //         },
    //         {
    //             "place_id": 21,
    //             "place_name": "Interlaken",
    //             "total_score": 2.347,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0.247
    //             }
    //         },
    //         {
    //             "place_id": 3,
    //             "place_name": "Đà Lạt",
    //             "total_score": 2.333,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0.233
    //             }
    //         },
    //         {
    //             "place_id": 23,
    //             "place_name": "Banff",
    //             "total_score": 2.2649999999999997,
    //             "detailed_scores": {
    //                 "budget_score": 0.985,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.28
    //             }
    //         },
    //         {
    //             "place_id": 14,
    //             "place_name": "Bangkok",
    //             "total_score": 2.233,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.233
    //             }
    //         },
    //         {
    //             "place_id": 16,
    //             "place_name": "Bali (South Bali)",
    //             "total_score": 2.222,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.722
    //             }
    //         },
    //         {
    //             "place_id": 22,
    //             "place_name": "Queenstown",
    //             "total_score": 2.1,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0.6,
    //                 "weather_score": 0
    //             }
    //         },
    //         {
    //             "place_id": 18,
    //             "place_name": "Gold Coast",
    //             "total_score": 1.807,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.307
    //             }
    //         },
    //         {
    //             "place_id": 4,
    //             "place_name": "Sapa",
    //             "total_score": 1.783,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0,
    //                 "weather_score": 0.283
    //             }
    //         },
    //         {
    //             "place_id": 13,
    //             "place_name": "Luang Prabang",
    //             "total_score": 1.783,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.283
    //             }
    //         },
    //         {
    //             "place_id": 8,
    //             "place_name": "Nha Trang",
    //             "total_score": 1.767,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.267
    //             }
    //         },
    //         {
    //             "place_id": 15,
    //             "place_name": "Chiang Mai",
    //             "total_score": 1.767,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0,
    //                 "weather_score": 0.267
    //             }
    //         },
    //         {
    //             "place_id": 10,
    //             "place_name": "Cần Thơ",
    //             "total_score": 1.75,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0,
    //                 "weather_score": 0.25
    //             }
    //         },
    //         {
    //             "place_id": 6,
    //             "place_name": "Huế",
    //             "total_score": 1.733,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0,
    //                 "weather_score": 0.233
    //             }
    //         },
    //         {
    //             "place_id": 11,
    //             "place_name": "Phnom Penh",
    //             "total_score": 1.733,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0.5,
    //                 "weather_score": 0.233
    //             }
    //         },
    //         {
    //             "place_id": 20,
    //             "place_name": "Maui",
    //             "total_score": 1.733,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0,
    //                 "weather_score": 0.733
    //             }
    //         },
    //         {
    //             "place_id": 7,
    //             "place_name": "Hội An",
    //             "total_score": 1.717,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0.5,
    //                 "activity_score": 0,
    //                 "weather_score": 0.217
    //             }
    //         },
    //         {
    //             "place_id": 19,
    //             "place_name": "Santorini",
    //             "total_score": 1.462,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0,
    //                 "weather_score": 0.462
    //             }
    //         },
    //         {
    //             "place_id": 9,
    //             "place_name": "Phú Quốc",
    //             "total_score": 1.267,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0,
    //                 "weather_score": 0.267
    //             }
    //         },
    //         {
    //             "place_id": 17,
    //             "place_name": "Malé / Maldives (North Atoll access)",
    //             "total_score": 1.2530000000000001,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0,
    //                 "weather_score": 0.253
    //             }
    //         },
    //         {
    //             "place_id": 12,
    //             "place_name": "Siem Reap",
    //             "total_score": 1.233,
    //             "detailed_scores": {
    //                 "budget_score": 1,
    //                 "scenery_score": 0,
    //                 "activity_score": 0,
    //                 "weather_score": 0.233
    //             }
    //         }
    //     ]
    // }
    const location = useLocation();

    // Get the data passed from the form page
    const data = location.state?.response;
    console.log("Received data:\n", data)

    if (!data || !data.content) {
        return <p className="text-center text-gray-500">No results found.</p>;
    }

    const { user_preferences, content } = data;
    console.log("Contenttttttttttt\n", content, "\n\n\n\n\n")
    const topPlace = content[0];
    console.log("Topppppppppp\n", topPlace, "\n\n\n\n\n")

    const otherPlaces = content.slice(1);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Page Header */}
            <h1 className="text-3xl font-bold text-center mb-4">
                Travel Recommendations
            </h1>

            <UserPreferencesSummary user_preferences={user_preferences} />

            {/* Top Recommendation */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                    🌟 Top Recommendation
                </h2>
                <h3 className="text-2xl font-bold text-gray-800">
                    {topPlace.place_name}
                </h3>
                <p className="text-gray-600 mb-4">
                    Total Score:{" "}
                    <span className="font-semibold text-blue-700">
                        {topPlace.total_score.toFixed(3)}
                    </span>
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    {Object.entries(topPlace.detailed_scores).map(([key, value]) => (
                        <div
                            key={key}
                            className="bg-white rounded-xl shadow-sm p-3 border border-gray-100"
                        >
                            <p className="text-sm font-medium text-gray-500">
                                {key.replace("_score", "").replace(/_/g, " ")}
                            </p>
                            <p className="text-lg font-semibold text-blue-700">
                                {value.toFixed(3)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Other Matches Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Other Matches</h2>

                {/* Scrollable container with height limit */}
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                    {otherPlaces.map((place, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg border shadow-sm hover:bg-gray-50 transition text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{place.place_name}</span>
                                <span className="text-gray-600">(Total: {place.total_score.toFixed(3)})</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                    B: {place.detailed_scores.budget_score.toFixed(2)}
                                </span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                    S: {place.detailed_scores.scenery_score.toFixed(2)}
                                </span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                    A: {place.detailed_scores.activity_score.toFixed(2)}
                                </span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                    W: {place.detailed_scores.weather_score.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate("/form")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
                    >
                        ← Back to Form
                    </button>
                </div>
            </div>
        </div>
    );
}
