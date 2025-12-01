import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserPreferencesSummary from "../../components_old/ResultComp/UserPreferencesSummary";
import { NavBar } from "@/components/NavigationBar/NavBar";

export default function RecommendationResult() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get the data passed from the form page``
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
        <div>
            <NavBar />
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
                            {topPlace?.total_score?.toFixed(3)}
                        </span>
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        {Object.entries(topPlace?.detailed_scores).map(([key, value]) => (
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
                                    <span className="font-semibold">{place?.place_name}</span>
                                    <span className="text-gray-600">(Total: {place?.total_score?.toFixed(3)})</span>
                                </div>

                                <div className="flex items-center gap-2 text-xs">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                        B: {place?.detailed_scores?.budget_score?.toFixed(2)}
                                    </span>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                        S: {place?.detailed_scores?.scenery_score?.toFixed(2)}
                                    </span>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                        A: {place?.detailed_scores?.activity_score?.toFixed(2)}
                                    </span>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                                        W: {place?.detailed_scores?.weather_score?.toFixed(2)}
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
        </div>
    );
}
