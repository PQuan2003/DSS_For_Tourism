import React from "react";

const handleSetFilter = (params) => {
    if (!(params instanceof URLSearchParams)) {
        console.warn("handleSetFilter: invalid params", params);
        return {};
    }

    const newFilters = {};

    const filteredColumn = params.getAll("filtered_column");
    const filteredValue = params.getAll("filtered_value");

    if (
        filteredColumn &&
        filteredValue &&
        filteredColumn.length === filteredValue.length
    ) {
        filteredColumn.forEach((column, index) => {
            const value = filteredValue[index];
            newFilters[column] = [value]; // Add to filters object
        });
    }
    return newFilters;
};

export default handleSetFilter;
