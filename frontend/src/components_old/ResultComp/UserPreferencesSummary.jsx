import { useState } from "react";

export default function UserPreferencesSummary({ user_preferences }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderValue = (value) => {
        if (value === null || value === undefined) return "N/A";
        if (Array.isArray(value)) return value.length ? value : "N/A";
        return value;
    };

    const weather = user_preferences?.user_weather_preference;

    const hasWeatherData =
        weather &&
        (weather.weather_type ||
            weather.avg_temp !== null ||
            weather.humidity !== null);


    return (
        <div className="mt-10 rounded-2xl border border-blue-200 bg-white shadow-sm overflow-hidden">
            {/* Header / Toggle */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-5 text-left text-lg font-semibold text-blue-800 hover:bg-blue-50 transition"
            >
                <span>Your Preferences</span>
                <span
                    className={`transform transition-transform duration-300 text-blue-600 ${isExpanded ? "rotate-180" : ""
                        }`}
                >
                    ▼
                </span>
            </button>

            {/* Collapsible Content */}
            {isExpanded && (
                <div className="p-6 border-t border-blue-100 bg-blue-50/30">
                    <ul className="space-y-3 text-sm text-gray-700">
                        {/* Budget */}
                        <li className="flex flex-wrap gap-2 items-center">
                            <span className="font-medium text-gray-600">Budget</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                                {user_preferences?.userBudget != null
                                    ? `${user_preferences.userBudget.toLocaleString()} VND`
                                    : "N/A"}
                            </span>
                        </li>

                        {/* Travel Days */}
                        <li className="flex flex-wrap gap-2 items-center">
                            <span className="font-medium text-gray-600">Travel Days</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
                                {renderValue(user_preferences?.totalTravelDays)}
                            </span>
                        </li>

                        {/* Travel Month */}
                        <li className="flex flex-wrap gap-2 items-center">
                            <span className="font-medium text-gray-600">Travel Month</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-medium">
                                {renderValue(user_preferences?.travel_month)}
                            </span>
                        </li>

                        {/* Scenery */}
                        <li className="flex flex-wrap gap-2 items-start">
                            <span className="font-medium text-gray-600">Scenery</span>
                            <div className="flex flex-wrap gap-2">
                                {renderValue(user_preferences?.user_scenery_requirement) === "N/A" ? (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg font-medium">
                                        N/A
                                    </span>
                                ) : (
                                    user_preferences.user_scenery_requirement.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg font-medium"
                                        >
                                            {item}
                                        </span>
                                    ))
                                )}
                            </div>
                        </li>

                        {/* Activities */}
                        <li className="flex flex-wrap gap-2 items-start">
                            <span className="font-medium text-gray-600">Activities</span>
                            <div className="flex flex-wrap gap-2">
                                {renderValue(user_preferences?.user_activity_preference) === "N/A" ? (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg font-medium">
                                        N/A
                                    </span>
                                ) : (
                                    user_preferences.user_activity_preference.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg font-medium"
                                        >
                                            {item}
                                        </span>
                                    ))
                                )}
                            </div>
                        </li>

                        {/* Weather */}
                        <li className="flex flex-wrap gap-2 items-start">
                            <span className="font-medium text-gray-600">Weather</span>

                            {!hasWeatherData ? (
                                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg font-medium">
                                    N/A
                                </span>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {weather.weather_type && (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg font-medium">
                                            {weather.weather_type}
                                        </span>
                                    )}
                                    {weather.avg_temp != null && (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg font-medium">
                                            {weather.avg_temp}°C
                                        </span>
                                    )}
                                    {weather.humidity != null && (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg font-medium">
                                            {weather.humidity}% humidity
                                        </span>
                                    )}
                                </div>
                            )}
                        </li>
                    </ul>

                </div>
            )}
        </div>

    );
}
