import React from "react";

const LocationSearchPanel = ({
    suggestions,
    setPickup,
    setDestination,
    setPanelOpen,
    activeField,
}) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === "pickup") {
            setPickup(suggestion.description); // Use the `description` field or adjust as per your API response
        } else if (activeField === "destination") {
            setDestination(suggestion.description); // Use the `description` field or adjust as per your API response
        }
        // setPanelOpen(false); // Close the panel after selection
    };

    return (
        <div>
            {suggestions && suggestions.length > 0 ? (
                suggestions.map((suggestion, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
                    >
                        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className="font-medium">
                            {suggestion.description} {/* Adjust field name based on your API */}
                        </h4>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">No suggestions available</p>
            )}
        </div>
    );
};

export default LocationSearchPanel;
