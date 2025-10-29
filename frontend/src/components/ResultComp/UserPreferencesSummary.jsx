import { useState } from "react";

export default function UserPreferencesSummary({ user_preferences }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mt-10 bg-gray-50 rounded-xl border border-gray-200">
            {/* Header / Toggle */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-t-xl"
            >
                <span>Your Preferences</span>
                <span
                    className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                        }`}
                >
                    ▼
                </span>
            </button>

            {/* Collapsible Content */}
            {isExpanded && (
                <div className="p-5 border-t border-gray-200">
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                            <strong>Budget:</strong>{" "}
                            {user_preferences.userBudget.toLocaleString()} ₫
                        </li>
                        <li>
                            <strong>Travel Days:</strong> {user_preferences.totalTravelDays}
                        </li>
                        <li>
                            <strong>Travel Month:</strong> {user_preferences.travel_month}
                        </li>
                        <li>
                            <strong>Scenery Requirements:</strong>{" "}
                            {user_preferences.user_scenery_requirement.join(", ")}
                        </li>
                        <li>
                            <strong>Activity Preferences:</strong>{" "}
                            {user_preferences.user_activity_preference.join(", ")}
                        </li>
                        <li>
                            <strong>Weather Preference:</strong>{" "}
                            {user_preferences.user_weather_preference.weather_type} (
                            {user_preferences.user_weather_preference.avg_temp}°C,{" "}
                            {user_preferences.user_weather_preference.humidity}% humidity)
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
