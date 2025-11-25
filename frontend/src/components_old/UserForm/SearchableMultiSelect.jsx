import React, { useState, useRef, useEffect } from "react";

const SearchableMultiSelect = ({ label, options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };


    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="space-y-1 relative" ref={dropdownRef}>
            <label className="font-medium">{label}</label>

            {/* Dropdown Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
            >
                <div className="flex flex-wrap gap-1">
                    {selected.length > 0 ? (
                        selected.map((item) => (
                            <span
                                key={item}
                                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-sm"
                            >
                                {item}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">Select options...</span>
                    )}
                </div>
                <span className="text-gray-400">▼</span>
            </div>

            {/* Dropdown List */}
            {isOpen && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg w-full mt-1 max-h-48 overflow-y-auto">
                    {/* Search Box */}
                    <div className="flex items-center border-b border-gray-200 px-2 py-1 sticky top-0 bg-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full outline-none text-sm px-1 py-1"
                        />
                    </div>

                    {/* Option List */}
                    <ul className="text-sm">
                        {filteredOptions.map((option) => {
                            const isSelected = selected.includes(option);
                            return (
                                <li
                                    key={option}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOption(option);
                                    }}
                                    className={`px-3 py-2 cursor-pointer ${isSelected
                                        ? "bg-blue-100 text-blue-700 font-medium"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {option}
                                </li>
                            );
                        })}
                        {filteredOptions.length === 0 && (
                            <li className="px-3 py-2 text-gray-400 text-sm">
                                No matches found
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableMultiSelect;
