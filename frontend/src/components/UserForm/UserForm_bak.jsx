import { useState, useEffect } from 'react'
import CheckBox_Component from './CheckBox_Component/CheckBox_Component'
import './style_UserForm.css'

function UserForm() {

    //Todo: dont hard code this
    const allSceneryPreferences = [
        { icon: "beach_access", label: "Beach", isChecked: false },
        { icon: "landscape", label: "Mountains", isChecked: false },
        { icon: "location_city", label: "City", isChecked: false },
        { icon: "forest", label: "Forest", isChecked: false },
        { icon: "terrain", label: "Desert", isChecked: false },
        { icon: "agriculture", label: "Countryside", isChecked: false }
    ]

    const allTransportPreferences = [
        { icon: "flight", label: "Plane", isChecked: false },
        { icon: "train", label: "Train", isChecked: false },
        { icon: "directions_car", label: "Car", isChecked: false },
        { icon: "directions_bus", label: "Bus", isChecked: false },
        { icon: "landscape", label: "Ship/Ferry", isChecked: false },
    ]


    //Combine sceneryCheckBoxHandler and transportCheckBoxHandler sometime later
    const sceneryCheckBoxHandler = (index) => {
        setSceneryPreference(
            scenery.map((scenery, currentIndex) => {
                return (currentIndex === index)
                    ? { ...scenery, isChecked: !scenery.isChecked }
                    : scenery
            })
        )
    }
    const transportCheckBoxHandler = (index) => {
        setTransportPreference(
            transport.map((transport, currentIndex) => {
                return (currentIndex === index)
                    ? { ...transport, isChecked: !transport.isChecked }
                    : transport
            })
        )
    }

    const [budget, setBudget] = useState(0)
    const [weather, setWeather] = useState('')
    const [month, setMonth] = useState('')
    const [scenery, setSceneryPreference] = useState(allSceneryPreferences)
    const [transport, setTransportPreference] = useState(allTransportPreferences)
    const [activity, setActivity] = useState('')
    const [accommodation, setAccommodation] = useState('')

    const [chosenPreference, setChosenPreference] = useState('normal')
    const [preferenceWeight, setPreferenceWeight] = useState([1, 1, 1, 1, 1, 1, 1])

    useEffect(() => {
        switch (chosenPreference) {

            //Provided option for user, user can choose this, or use customize weight 
            case "budget": {
                setPreferenceWeight([5, 3, 4, 4, 4, 3, 4])
                break;
            }
            case "luxury": {
                setPreferenceWeight([1, 3, 1, 5, 2, 5])
                break;
            }
            case "unique": {
                setPreferenceWeight([3, 3, 3, 5, 5, 5, 2])
                break;
            }
            default: {
                setPreferenceWeight([1, 1, 1, 1, 1, 1, 1])
            }
        }
    }, [chosenPreference])

    const handleIndividualChangeWeightValue = (index, newValue) => {
        const nextPref = preferenceWeight.map((pw, i) => {
            if (i === index) {
                return newValue;
            } else {
                return pw;
            }
        });
        setPreferenceWeight(nextPref);
    }

    const handleSubmitForm = (e) => {
        const user_budget = (budget) ? budget : "any"
        const user_weather = (weather) ? weather : "any"
        const user_month = (month) ? month : "any"
        const user_activity = (activity) ? activity : "any"
        const user_accommodation = (accommodation) ? accommodation : "any"
        e.preventDefault()
        let sceneryPreference = []
        if (scenery.length === 0 || scenery.length === allSceneryPreferences.length) {
            sceneryPreference.push('any')
        } else {
            for (const p of scenery) {
                if (p.isChecked) sceneryPreference.push(p.label)
            }
        }

        let transportPreference = []
        if (transport.length === 0 || transport.length === allTransportPreferences.length) {
            transportPreference.push('any')
        } else {
            for (const p of transport) {
                if (p.isChecked) transportPreference.push(p.label)
            }
        }
        const ticket = {
            budget: user_budget,
            weather: user_weather,
            month: user_month,
            sceneryPreference,
            transportPreference,
            activity: user_activity,
            accommodation: user_accommodation,
            preferenceWeight
        }
        console.log(ticket)
    }

    return (
        <div id="form_component" className='form_component relative'>
            <div className="form-body w-[1024px] p-8 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg font-sans absolute-t10rem">
                <h1>{chosenPreference}</h1>
                <h1 className="text-3xl font-bold mb-6 text-primary-700">Travel Preference Form </h1>
                <p className="text-gray-600 mb-8">
                    Tell us about your dream vacation and we'll help you find the perfect destination.
                </p>
                <form
                    className="space-y-8"
                    onSubmit={handleSubmitForm}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Budget Section */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <label htmlFor="budget" className="block text-sm font-medium mb-2">
                                Your Budget
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                    <span className="material-symbols-outlined">payments</span>
                                </span>
                                <input
                                    type="number"
                                    className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                                    id="budget"
                                    onChange={(e) => setBudget(e.target.value)}
                                    value={budget}
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Budget Range</label>
                                <input
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="1"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$0</span>
                                    <span>$10,000+</span>
                                </div>
                            </div>
                        </div>

                        {/* Weather & Month */}
                        <div className="col-span-1">
                            <label htmlFor="weather" className="block text-sm font-medium mb-2">
                                Weather Preference
                            </label>
                            <div className="relative">
                                <select
                                    id="weather"
                                    className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                                    value={weather}
                                    onChange={(e) => setWeather(e.target.value)}
                                >
                                    <option value="" disabled>Select weather type</option>
                                    <option value="hot">Hot & Sunny</option>
                                    <option value="warm">Warm & Pleasant</option>
                                    <option value="mild">Mild & Comfortable</option>
                                    <option value="cool">Cool & Refreshing</option>
                                    <option value="cold">Cold & Snowy</option>
                                    <option value="any">I don't mind</option>
                                </select>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                    <span className="material-symbols-outlined">wb_sunny</span>
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </span>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="month" className="block text-sm font-medium mb-2">
                                    Travel Month
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </span>
                                    <select
                                        className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                                        id="month"
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                    >
                                        <option value="">Select month</option>
                                        <option value="january">January</option>
                                        <option value="february">February</option>
                                        <option value="march">March</option>
                                        <option value="april">April</option>
                                        <option value="may">May</option>
                                        <option value="june">June</option>
                                        <option value="july">July</option>
                                        <option value="august">August</option>
                                        <option value="september">September</option>
                                        <option value="october">October</option>
                                        <option value="november">November</option>
                                        <option value="december">December</option>
                                        <option value="any">I don't mind</option>
                                    </select>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Scenery */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium mb-2">Scenery Preference</label>
                            <div className="grid grid-cols-2 gap-3 justify-center">
                                {allSceneryPreferences.map((preference, index) => {
                                    return <CheckBox_Component
                                        icon={preference.icon}
                                        label={preference.label}
                                        isChecked={preference.isChecked}
                                        index={index}
                                        key={index}
                                        checkBoxHandler={() => { sceneryCheckBoxHandler(index) }}
                                        style="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all duration-200"
                                        iconStyle="material-symbols-outlined mr-2 text-gray-500 peer-checked:text-primary-600"
                                        checkboxType="scenery"
                                    />
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Transport */}
                    <div className="border-t border-gray-200 pt-6 ">
                        <h2 className="text-xl font-semibold mb-4">Transportation Preference</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {allTransportPreferences.map((preference, index) => {
                                return <CheckBox_Component
                                    icon={preference.icon}
                                    label={preference.label}
                                    isChecked={preference.isChecked}
                                    index={index}
                                    key={index}
                                    checkBoxHandler={() => { transportCheckBoxHandler(index) }}
                                    style="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all duration-200 h-full"
                                    iconStyle="material-symbols-outlined text-4xl mb-2 text-gray-500 peer-checked:text-primary-600"
                                    checkboxType="transport"
                                />
                            })}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <details className="group cursor-pointer">
                            <summary className="flex items-center text-xl font-semibold mb-4 focus:outline-none">
                                <span>Additional Preferences</span>
                                <span className="ml-auto material-symbols-outlined transform group-open:rotate-180 transition-transform duration-200">
                                    expand_more
                                </span>
                            </summary>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pb-4 animate-fadeIn">
                                <div>
                                    <label htmlFor="activities" className="block text-sm font-medium mb-2">
                                        Activities Interest
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <span className="material-symbols-outlined">sports_score</span>
                                        </span>
                                        <select
                                            id="activities"
                                            className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                                            value={activity}
                                            onChange={(e) => setActivity(e.currentTarget.value)}
                                        >
                                            <option value="any">Doesn't mind</option>
                                            <option value="adventure">Adventure & Sports</option>
                                            <option value="cultural">Cultural Experiences</option>
                                            <option value="relaxation">Relaxation & Wellness</option>
                                            <option value="food">Food & Culinary</option>
                                            <option value="history">Historical Sites</option>
                                            <option value="nightlife">Nightlife & Entertainment</option>
                                        </select>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="accommodation" className="block text-sm font-medium mb-2">
                                        Accommodation Type
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <span className="material-symbols-outlined">hotel</span>
                                        </span>
                                        <select
                                            id="accommodation"
                                            className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                                            value={accommodation}
                                            onChange={(e) => setAccommodation(e.currentTarget.value)}
                                        >
                                            <option value="any">Anything work</option>
                                            <option value="hotel">Luxury Hotel</option>
                                            <option value="resort">Resort</option>
                                            <option value="apartment">Apartment/Airbnb</option>
                                            <option value="hostel">Hostel</option>
                                            <option value="camping">Camping/Glamping</option>
                                            <option value="budget">Budget-friendly</option>
                                        </select>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="weight" className="block text-sm font-medium mb-2">
                                        Special - Preference Importance
                                    </label>
                                    <select
                                        id="weight"
                                        className="w-hf py-3 pl-10 pr-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                                        value={chosenPreference}
                                        onChange={(e) => setChosenPreference(e.currentTarget.value)}
                                    >
                                        <option value="any" >Normal</option>
                                        <option value="budget" >Budget-Conscious</option>
                                        <option value="luxury" >Luxury Seeker with Time</option>
                                        <option value="unique"> Off-the-Beaten-Path Adventurer</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                    {/* <h1>{preferenceWeight}</h1> */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
                                        <div className='flex flex-col'>
                                            <label htmlFor="budget-weight">Budget</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={5}
                                                id="budget-weight"
                                                value={preferenceWeight[0]}
                                                disabled={chosenPreference !== 'custom'}
                                                onChange={(e) => handleIndividualChangeWeightValue(0, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="weather-weight">Weather</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={5}
                                                id="weather-weight"
                                                value={preferenceWeight[1]}
                                                disabled={chosenPreference !== 'custom'}
                                                onChange={(e) => handleIndividualChangeWeightValue(1, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="month-weight">Month</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={5}
                                                id="month-weight"
                                                value={preferenceWeight[2]}
                                                disabled={chosenPreference !== 'custom'}
                                                onChange={(e) => handleIndividualChangeWeightValue(2, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="scenery-weight">Scenery</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={5}
                                                id="scenery-weight"
                                                value={preferenceWeight[3]}
                                                disabled={chosenPreference !== 'custom'}
                                                onChange={(e) => handleIndividualChangeWeightValue(3, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="transport-weight">Transport</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={5}
                                                id="transport-weight"
                                                value={preferenceWeight[4]}
                                                disabled={chosenPreference !== 'custom'}
                                                onChange={(e) => handleIndividualChangeWeightValue(4, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="activity-weight">Activity</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={5}
                                                id="activity-weight"
                                                value={preferenceWeight[5]}
                                                disabled={chosenPreference !== 'custom'}
                                                onChange={(e) => handleIndividualChangeWeightValue(5, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="accommodation-weight">Accommodation</label>
                                            <input
                                                type="number"
                                                id="accommodation-weight"
                                                value={preferenceWeight[1]}
                                                disabled={chosenPreference !== 'custom'}
                                                onChange={(e) => handleIndividualChangeWeightValue(1, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
                        >
                            <span className="material-symbols-outlined mr-2">travel_explore</span>
                            Find My Perfect Destination
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm