import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserPreferencesSummary from "../../components_old/ResultComp/UserPreferencesSummary";
import { NavBar } from "@/components/NavigationBar/NavBar";
import { Search } from "lucide-react";
import DefaultPreferencesBlock from "./components/DefaultPreferencesBlock"
import useFetchData from '@/hooks/useFetchData';

export default function RecommendationResult() {
    const navigate = useNavigate();
    const location = useLocation();



    const data = location.state?.response;


    if (!data || !data.content) {
        return <p className="text-center text-gray-500">No results found.</p>;
    }

    const { user_preferences, content } = data;

    const topPlace = content[0];
    const { data: top_place_img, loading, error } = useFetchData(
        topPlace?.place_id
            ? `http://localhost:8080/places/images/${topPlace.place_id}`
            : null
    );
    const imageUrl = top_place_img?.imgs?.[0]?.place_img;


    const otherPlaces = content.slice(1);

    const handleSearchClick = (destination) => {
        navigate(`/destination?place_name=${destination}`);
    };

    return (
        <div>
            <NavBar />
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Page Header */}
                <h1 className="text-3xl font-bold text-center mb-4">
                    Travel Recommendations
                </h1>

                {/* <UserPreferencesSummary user_preferences={user_preferences} /> */}
                {user_preferences ? (
                    <UserPreferencesSummary user_preferences={user_preferences} />
                ) : (
                    <DefaultPreferencesBlock />
                )}

                {/* Top Recommendation */}
                <div
                    className="relative flex border border-blue-200 rounded-2xl shadow-lg overflow-hidden"
                    style={{
                        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

                    {/* Content */}
                    <div className="relative flex w-full p-6">
                        <div>
                            <h2 className="text-xl font-semibold text-yellow-300 mb-2">
                                Top Recommendation
                            </h2>

                            <h3 className="text-2xl font-bold text-white drop-shadow">
                                {topPlace.place_name}
                            </h3>

                            {topPlace?.detailed_scores ?
                                <>
                                    <p className="text-gray-200 mb-4">
                                        Total Score:{" "}
                                        <span className="font-semibold text-yellow-300">
                                            {topPlace?.total_score?.toFixed(3)}
                                        </span>
                                    </p>
                                </>
                                : <>
                                    <p className="text-gray-200 mb-4">Popularity:{" "}
                                        <span className="font-medium text-yellow-300">
                                            {topPlace?.appearance_count?.toFixed(0)}
                                        </span>
                                    </p>
                                </>}

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                {
                                    topPlace?.detailed_scores
                                        ?
                                        Object.entries(topPlace?.detailed_scores).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="bg-white/90 rounded-xl shadow-sm p-3"
                                            >
                                                <p className="text-sm font-medium text-gray-600">
                                                    {key
                                                        .replace("_score", "")
                                                        .replace(/_/g, " ")
                                                        .replace(/^\w/, (c) => c.toUpperCase())}
                                                </p>

                                                <p className="text-lg font-semibold text-blue-700">
                                                    {value.toFixed(3)}
                                                </p>
                                            </div>
                                        ))
                                        : null
                                }
                            </div>
                        </div>

                        <button
                            className="ml-auto mt-auto p-4 flex items-center gap-2 bg-white/90 hover:bg-white rounded-xl shadow"
                            onClick={() => handleSearchClick(topPlace.place_name)}
                        >
                            <Search />
                            <p className="font-medium">More info</p>
                        </button>
                    </div>
                </div>


                {/* Other Matches Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">
                        Other Matches
                    </h2>

                    {/* Scrollable container */}
                    <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                        {otherPlaces.map((place, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white shadow-sm hover:shadow-md hover:bg-blue-50/50 transition"
                            >
                                {/* Left */}
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {place?.place_name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {place?.total_score ? (
                                            <>
                                                Total Score:{" "}
                                                <span className="font-medium text-blue-700">
                                                    {place?.total_score?.toFixed(3)}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                Popularity:{" "}
                                                <span className="font-medium text-blue-700">
                                                    {place?.appearance_count?.toFixed(0)}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>

                                {/* Scores */}
                                {place?.total_score && (
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium">
                                            Budget {place?.detailed_scores?.budget_score?.toFixed(2)}
                                        </span>
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
                                            Scenery {place?.detailed_scores?.scenery_score?.toFixed(2)}
                                        </span>
                                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-medium">
                                            Activity {place?.detailed_scores?.activity_score?.toFixed(2)}
                                        </span>
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg font-medium">
                                            Weather {place?.detailed_scores?.weather_score?.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Back button */}
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
