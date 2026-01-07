import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchData from '@/hooks/useFetchData';
import useDebound from '@/hooks/useDebound';
import { BUDGET_MIN, BUDGET_MAX } from '@/constants/constants';

import SearchableMultiSelect from "./SearchableMultiSelect";


function UserForm() {
    const navigate = useNavigate();

    // Replace `loadingFetch` with `loading` from `useFetchData` hook
    const [availableActivity, setAvailableActivity] = useState([]);
    const [availableTag, setAvailableTag] = useState([]);

    const [budget, setBudget] = useState(5000000);
    const debouncedBudget = useDebound({ value: budget });

    const [travelMonth, setTravelMonth] = useState("");
    const [avgTemp, setAvgTemp] = useState("");
    const [humidity, setHumidity] = useState("");
    const [weatherType, setWeatherType] = useState("");
    const [totalDays, setTotalDays] = useState("");

    const [showTravelDays, setShowTravelDays] = useState(false);

    const [scenery, setScenery] = useState([]);
    const [activities, setActivities] = useState([]);

    const [showOptional, setShowOptional] = useState(false);
    const [weights, setWeights] = useState({
        budget: 1,
        scenery: 1,
        activity: 1,
        weather: 1,
    });

    const { data: form_data, loading, error } = useFetchData("http://localhost:8080/form");

    const handleSetNumericInput = ({ setNumber, value, min, max }) => {
        // if (min !== undefined && value < min) {
        //     return setNumber(min);
        // }

        // if (max !== undefined && value > max) {
        //     return setNumber(max);
        // }

        setNumber(value);
    };

    const handleWeatherChange = (field, value) => {
        if (field === "temp") setAvgTemp(value);
        if (field === "humidity") setHumidity(value);
        if (field === "type") setWeatherType(value);

        setShowTravelDays(value !== "" || avgTemp || humidity || weatherType);
    };

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setWeights((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userBudget: Number(debouncedBudget),
            totalTravelDays: Number(totalDays) || null,
            travel_month: travelMonth || null,
            user_scenery_requirement: scenery,
            user_activity_preference: activities,
            user_weather_preference: {
                avg_temp: avgTemp ? Number(avgTemp) : null,
                humidity: humidity ? Number(humidity) : null,
                weather_type: weatherType || null,
            },
            weights,
        };

        console.log("Sending payload:", payload);

        try {
            const res = await fetch("http://localhost:8080/results/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to submit");

            const data = await res.json();
            console.log("Server response:", data);

            navigate("/result", { state: { response: data } });
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to submit preference.");
        }
    };

    useEffect(() => {
        if (form_data?.status === "success") {
            console.log("Initial fetch data: ", form_data)
            const activityNames = form_data.available_activities.map(activity => activity.activity_name);
            setAvailableActivity(activityNames);
            setAvailableTag(form_data.tags);
        }
    }, [form_data]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <div>Error fetching data</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
            <h2 className="text-center text-2xl font-bold">Travel Preference Form</h2>

            {/* Budget Section */}
            <div className="space-y-2">
                <label className="font-medium text-gray-800">Budget (VND)</label>

                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => handleSetNumericInput({
                            setNumber: setBudget,
                            value: Number(e.target.value),
                            min: BUDGET_MIN,
                            max: BUDGET_MAX
                        })}
                        onBlur={() => handleSetNumericInput({
                            setNumber: setBudget,
                            value: budget,
                            min: BUDGET_MIN,
                            max: BUDGET_MAX
                        })}
                        className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min:BUDGET_MIN
                        max:BUDGET_MAX
                        step="100000"
                    />

                    {/* Range Slider with Min & Max Display */}
                    <div className="w-1/2 flex flex-col items-center gap-2">
                        <div className="w-full flex justify-between text-xs text-gray-500">
                            <span>{new Intl.NumberFormat("vi-VN").format(BUDGET_MIN)} ₫</span>
                            <span>{new Intl.NumberFormat("vi-VN").format(BUDGET_MAX)} ₫</span>
                        </div>
                        <input
                            type="range"
                            min={BUDGET_MIN}
                            max={BUDGET_MAX}
                            step="500000"
                            value={budget}
                            onChange={(e) => handleSetNumericInput({
                                setNumber: setBudget,
                                value: Number(e.target.value),
                                min: BUDGET_MIN,
                                max: BUDGET_MAX
                            })}
                            className="w-full accent-blue-500 cursor-pointer"
                        />
                    </div>
                </div>


                <div className="pt-3">
                    <label className="block text-sm font-medium">Total Travel Days</label>
                    <input
                        type="number"
                        value={totalDays}
                        onChange={(e) => setTotalDays(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>


            <SearchableMultiSelect
                label="Scenery Requirement"
                options={loading ? [] : availableTag}
                selected={scenery}
                setSelected={setScenery}
            />

            <SearchableMultiSelect
                label="Activity Preference"
                options={loading ? [] : availableActivity}
                selected={activities}
                setSelected={setActivities}
            />

            {/* Weather Section */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Weather Preference</h3>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Avg Temp (°C)</label>
                        <input
                            type="number"
                            value={avgTemp}
                            onChange={(e) => handleWeatherChange("temp", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Humidity (%)</label>
                        <input
                            type="number"
                            value={humidity}
                            onChange={(e) => handleWeatherChange("humidity", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Weather Type</label>
                        <select
                            value={weatherType}
                            onChange={(e) => handleWeatherChange("type", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="Sunny">Sunny</option>
                            <option value="Rainy">Rainy</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Windy">Windy</option>
                        </select>
                    </div>
                </div>

                {showTravelDays && (
                    <div className="pt-2">
                        <label className="block text-sm font-medium">Travel Month</label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setTravelMonth(e.target.value)}
                        >
                            <option value="">Select Month</option>
                            {[
                                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>


            {/* Optional Section */}
            <div className="border-t pt-4">
                <button
                    type="button"
                    className="flex items-center justify-between w-full font-semibold text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setShowOptional((prev) => !prev)}
                >
                    Optional Preferences
                    <span>{showOptional ? "▲" : "▼"}</span>
                </button>

                {showOptional && (
                    <div className="mt-4 space-y-6">
                        <p className="text-sm text-gray-500">
                            Adjust how important each factor is to you.
                            <br />
                            <span className="font-medium text-gray-600">(1 = least important, 9 = most important)</span>
                        </p>

                        {Object.entries(weights).map(([key, value]) => (
                            <div key={key}>
                                <label className="block font-medium text-gray-700 mb-1 capitalize">
                                    {key} Importance
                                </label>
                                <input
                                    type="range"
                                    name={key}
                                    min="1"
                                    max="9"
                                    step="1"
                                    value={value}
                                    onChange={handleSliderChange}
                                    className="w-full"
                                />
                                <div className="text-sm text-gray-500">
                                    Value: <span className="font-medium">{value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
                <button
                    onClick={(e) => handleSubmit(e)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                    Submit Preferences
                </button>
            </div>
        </div>
    );
}

export default UserForm;
