import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavigationBar/NavBar";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import { ArrowUpIcon, Search } from "lucide-react"
import GridLayout from "./components/GridLayout";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogOverlay } from "@radix-ui/react-dialog";
import useDebound from "@/hooks/useDebound";



function Destination() {
    const queryParams = new URLSearchParams(location.search);

    const [placeData, setPlaceData] = useState()

    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedDensity, setSelectedDensity] = useState([]);

    const [filters, setFilters] = useState()
    const [selectedFilters, setSelectedFilters] = useState(
        {
            country: [],
            tags: [],
            tourist_density: [],
        }
    );
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebound({ value: search, custom_debounce: 1000 })

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const [selectedPlace, setSelectedPlace] = useState(queryParams.get('place_name'))

    const [isLoadingModal, setIsLoadingModal] = useState(false)
    const [selectedPlaceData, setSelectedPlaceData] = useState();

    const updateURL = (params = {}) => {
        const url = new URL(window.location);

        Object.keys(params).forEach(key => {
            if (params[key] !== null) {
                url.searchParams.set(key, params[key]);
            } else {
                url.searchParams.delete(key);
            }
        });

        window.history.pushState({}, '', url);
    };

    const handleCardClick = (place) => {
        setSelectedPlace(place)
        updateURL({ place_name: place });
    }

    const handleCloseModel = () => {
        setIsOpen(false);
        setSelectedPlace(null);
        updateURL({ place_name: null });
    }

    const [showCountryFilter, setShowCountryFilter] = useState(false);
    const [showTagFilter, setShowTagFilter] = useState(false);
    const [showDensityFilter, setShowDensityFilter] = useState(false);

    // Use refs to detect clicks outside
    const countryRef = useRef(null);
    const tagRef = useRef(null);
    const densityRef = useRef(null);

    const toggleCountryFilter = () => setShowCountryFilter(!showCountryFilter);
    const toggleTagFilter = () => setShowTagFilter(!showTagFilter);
    const toggleDensityFilter = () => setShowDensityFilter(!showDensityFilter);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryRef.current && !countryRef.current.contains(event.target)) {
                setShowCountryFilter(false);
            }
            if (tagRef.current && !tagRef.current.contains(event.target)) {
                setShowTagFilter(false);
            }
            if (densityRef.current && !densityRef.current.contains(event.target)) {
                setShowDensityFilter(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectionChange = (setter) => (value) => {
        setter((prevState) =>
            prevState.includes(value)
                ? prevState.filter((item) => item !== value) // Deselect
                : [...prevState, value] // Select
        );
    };

    useEffect(() => {
        setSelectedFilters(
            {
                country: selectedCountries,
                tags: selectedTags,
                tourist_density: selectedDensity,
            }
        )
    }, [selectedCountries, selectedTags, selectedDensity])

    useEffect(() => {
        const fetchFilters = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:8080/places/filters");
                const data = await response.json();
                setFilters(data);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchPlaceData = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams
                if (selectedFilters) {
                    if (selectedFilters.country?.length > 0) {
                        // single or multiple countries → join with comma
                        params.append("country", selectedFilters.country.join(","));
                    }

                    if (selectedFilters.tags?.length > 0) {
                        params.append("tags", selectedFilters.tags.join(","));
                    }

                    if (selectedFilters.tourist_density?.length > 0) {
                        params.append("density", selectedFilters.tourist_density.join(","));
                        // adjust the key based on your API ("density" in your sample)
                    }
                }
                if (debouncedSearch) {
                    params.append("search", debouncedSearch)
                }
                const response = await fetch(`http://localhost:8080/places?${params.toString()}`);
                const data = await response.json();
                // console.log("New dataaaaaa", data)
                setPlaceData(data);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaceData();
    }, [selectedFilters, debouncedSearch]);

    useEffect(() => {
        const fetchSelectedPlace = async () => {
            setIsLoadingModal(true);
            if (selectedPlace) {
                try {
                    const response = await fetch(`http://localhost:8080/places/name/${selectedPlace}`);
                    const data = await response.json();
                    setSelectedPlaceData(data)
                } catch (e) {
                    setError(e);
                } finally {
                    setIsLoadingModal(false);
                }
            }
        };

        fetchSelectedPlace();
    }, [selectedPlace]);

    useEffect(() => {
        setIsOpen(selectedPlaceData ? true : false)
    }, [selectedPlaceData])

    // Handle loading, error, and empty state
    // if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!placeData) return <div>No data available</div>;

    return (
        <>
            <NavBar />
            <div className="flex flex-col mx-6 my-4 gap-6 pt-4">
                <div className="flex justify-center gap-3">
                    <InputGroup className="max-w-xl">
                        <InputGroupInput
                            placeholder="Search..."
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            {placeData.content.length}
                        </InputGroupAddon>
                    </InputGroup>

                    <div className="flex gap-4">
                        {/* Country Filter */}
                        <div className="relative" ref={countryRef}>
                            <button onClick={toggleCountryFilter} className="w-[200px] bg-gray-200 p-2 rounded max-h-10 overflow-hidden">
                                {selectedCountries.length > 0
                                    ? `Countries: [${selectedCountries.length}]`
                                    : 'Select countries'}
                            </button>
                            {showCountryFilter && (
                                <div className="absolute mt-2 px-4 bg-white shadow-lg border border-gray-300 rounded z-50 max-h-[500px] overflow-y-auto min-w-full">
                                    <div className="sticky top-0 bg-white py-2 z-10">
                                        <h3 className="font-bold mb-2">Country</h3>
                                        <hr />
                                    </div>
                                    {filters.country.map((country) => (
                                        <div key={country} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={country}
                                                checked={selectedCountries.includes(country)}
                                                onChange={() => handleSelectionChange(setSelectedCountries, selectedCountries)(country)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={country}>{country}</label>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setSelectedCountries([])}
                                        className="mt-4 w-full py-2 text-red-600 border-t border-gray-300 hover:bg-gray-100 rounded"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>


                        <div className="relative" ref={tagRef}>
                            <button onClick={toggleTagFilter} className="w-[200px] bg-gray-200 p-2 rounded max-h-10 overflow-hidden">
                                {selectedTags.length > 0
                                    ? `Tags [${selectedTags.length}]`
                                    : 'Select tags'}
                            </button>
                            {showTagFilter && (
                                <div className="absolute mt-2 px-4 bg-white shadow-lg border border-gray-300 rounded z-50 max-h-[500px] overflow-y-auto min-w-full">
                                    <div className="sticky top-0 bg-white py-2 z-10">
                                        <h3 className="font-bold mb-2">Tags</h3>
                                        <hr />
                                    </div>
                                    {filters.tags.map((tag) => (
                                        <div key={tag} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={tag}
                                                checked={selectedTags.includes(tag)}
                                                onChange={() => handleSelectionChange(setSelectedTags, selectedTags)(tag)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={tag}>{tag}</label>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setSelectedTags([])}
                                        className="mt-4 w-full py-2 text-red-600 border-t border-gray-300 hover:bg-gray-100 rounded"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={densityRef}>
                            <button onClick={toggleDensityFilter} className="w-[200px] bg-gray-200 p-2 rounded">
                                {selectedDensity.length > 0
                                    ? `Density [${selectedDensity.length}]`
                                    : 'Select tourist density'}
                            </button>
                            {showDensityFilter && (
                                <div className="absolute mt-2 px-4 bg-white shadow-lg border border-gray-300 rounded z-50 max-h-[500px] overflow-y-auto min-w-full">
                                    <div className="sticky top-0 bg-white py-2 z-10">
                                        <h3 className="font-bold mb-2">Tourist Density</h3>
                                        <hr />
                                    </div>
                                    {filters.tourist_density.map((density) => (
                                        <div key={density} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={density}
                                                checked={selectedDensity.includes(density)}
                                                onChange={() => handleSelectionChange(setSelectedDensity, selectedDensity)(density)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={density}>{density}</label>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setSelectedDensity([])}
                                        className="mt-4 w-full py-2 text-red-600 border-t border-gray-300 hover:bg-gray-100 rounded"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isLoading && (
                    <div className="text-center py-6 text-gray-500">
                        Fetching places...
                    </div>
                )}

                {!isLoading && (
                    <GridLayout items={placeData.content} onCardClick={handleCardClick} />
                )}

                <Dialog open={isOpen} onClose={handleCloseModel} onOpenChange={handleCloseModel}>
                    <DialogOverlay className="fixed inset-0 bg-black/50" onClick={handleCloseModel} />

                    <DialogContent
                        className="
                            fixed top-1/2 left-1/2 
                            transform -translate-x-1/2 -translate-y-1/2
                            w-[95%] max-w-4xl
                            max-h-[92vh]
                            bg-white rounded-lg shadow-xl
                            overflow-y-auto p-0
                        "
                    >
                        {isLoadingModal && (
                            <div className="p-6 text-center text-lg font-medium">Loading...</div>
                        )}

                        {!isLoadingModal && selectedPlaceData && (
                            <>
                                {/* Hero Image */}
                                <img
                                    src={selectedPlaceData.place.place_img}
                                    alt={selectedPlaceData.place.place_name}
                                    className="w-full h-72 object-cover rounded-t-lg"
                                />

                                <div className="p-6">

                                    {/* Title + Country */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            {selectedPlaceData.place.place_name}
                                        </h2>
                                        <p className="text-gray-600 mt-2 sm:mt-0">
                                            <span className="font-semibold">{selectedPlaceData.place.country}</span>
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="mt-3 text-gray-700 leading-relaxed">
                                        {selectedPlaceData.place.place_description}
                                    </p>

                                    {/* Tags */}
                                    {selectedPlaceData.place.tags?.length > 0 && (
                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPlaceData.place.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div className="border-t my-6"></div>

                                    {/* Cost & Density */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">Average Cost per Day</h4>
                                            <p className="mt-1 text-gray-900 font-bold">
                                                {selectedPlaceData.place.avg_cost_per_day} {selectedPlaceData.place.money_unit}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">Tourist Density</h4>
                                            <p className="mt-1 text-gray-900 capitalize font-medium">
                                                {selectedPlaceData.place.tourist_density}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t my-6"></div>

                                    {/* Hotels Section */}
                                    {selectedPlaceData.availableHotel?.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Hotels</h3>

                                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                                {selectedPlaceData.availableHotel.map((hotel) => (
                                                    <div
                                                        key={hotel.hotel_id}
                                                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                                                    >
                                                        <img
                                                            src={hotel.hotel_img}
                                                            alt={hotel.hotel_name}
                                                            className="w-full h-40 object-cover rounded-md"
                                                        />

                                                        <h4 className="mt-3 text-lg font-semibold">{hotel.hotel_name}</h4>

                                                        <p className="text-sm text-gray-700">
                                                            {hotel.hotel_description}
                                                        </p>

                                                        {/* Star Rating */}
                                                        <p className="mt-2 text-yellow-500 font-medium">
                                                            {"★".repeat(hotel.star_rating)}
                                                            {"☆".repeat(5 - hotel.star_rating)}
                                                        </p>

                                                        <p className="text-gray-600 text-sm mt-1">{hotel.address}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div className="border-t my-6"></div>

                                    {/* WEATHER SECTION */}
                                    {selectedPlaceData.weather_data?.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Weather by Month</h3>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                                {selectedPlaceData.weather_data.map((w) => (
                                                    <div
                                                        key={w.weather_id}
                                                        className="p-3 border rounded-lg bg-gray-50 shadow-sm text-center"
                                                    >
                                                        <p className="font-semibold">{w.month}</p>
                                                        <p className="text-gray-700 text-sm">
                                                            {w.avg_temp}°{w.temp_unit}
                                                        </p>
                                                        <p className="text-xs text-gray-500">Humidity: {w.humidity}%</p>
                                                        <p className="text-blue-600 text-sm font-medium">
                                                            {w.weather_type}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div className="border-t my-6"></div>

                                    {/* POIs Section */}
                                    {selectedPlaceData.pois?.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Popular Attractions</h3>

                                            <div className="mt-4 space-y-6">
                                                {selectedPlaceData.pois.map((poi, idx) => (
                                                    <div key={idx} className="p-4 border rounded-lg shadow-sm">
                                                        <h4 className="text-xl font-semibold text-gray-800">
                                                            {poi.poi_name}
                                                        </h4>

                                                        <p className="mt-1 text-gray-700">{poi.poi_description}</p>

                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Opening Hours: {poi.opening_hour}
                                                        </p>

                                                        <p className="text-sm text-gray-600">
                                                            Entry Fee: {poi.entry_fee} THB
                                                        </p>

                                                        <p className="text-yellow-500 font-medium mt-1">
                                                            Rating: {poi.rating}★
                                                        </p>

                                                        {/* POI Tags */}
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {poi.tags.map((tag, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-2 py-1 bg-green-50 text-green-700 rounded-full border text-xs"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Activities */}
                                                        {poi.activities?.length > 0 && (
                                                            <div className="mt-3">
                                                                <h5 className="font-semibold text-gray-800">Activities</h5>

                                                                <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                                                                    {poi.activities.map((act) => (
                                                                        <li key={act.activity_id}>
                                                                            <span className="font-medium">{act.activity_name}</span>:{" "}
                                                                            {act.activity_description}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Close Button */}
                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={handleCloseModel}
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md shadow"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default Destination

