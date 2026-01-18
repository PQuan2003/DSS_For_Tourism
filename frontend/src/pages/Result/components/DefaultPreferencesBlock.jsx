const DefaultPreferencesBlock = () => {
    return (
        <div className="mt-10 bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
                Popular Destinations
            </h3>

            <p className="text-sm text-gray-600 mt-2">
                You didn’t set any travel preferences.
                These recommendations are based on overall popularity
                and general traveler interest.
            </p>

            <div className="mt-4 flex justify-center gap-3">
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    Popular
                </span>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    Trending
                </span>
                <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                    Recommended
                </span>
            </div>
        </div>
    );
};

export default DefaultPreferencesBlock;
