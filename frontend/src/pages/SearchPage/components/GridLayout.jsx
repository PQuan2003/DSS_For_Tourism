import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

const GridLayout = ({ items, onCardClick }) => {
    const grid_col = 3 //TODO: see how to make it dynamically
    const numberOfItems = items?.length;
    const fullRows = Math.floor(numberOfItems / grid_col);
    const leftoverItems = items?.slice(fullRows * grid_col);

    const calculateLeftOverLayout = () => {
        const columns = leftoverItems.length;
        return `grid-cols-${columns <= grid_col ? columns : grid_col}`;
    }



    return (
        <div className="w-full overflow-auto">
            {numberOfItems === 0 && <div className='justify-center items-center'>No item to display</div>}
            {numberOfItems !== 0 && (
                <div className={`grid grid-cols-${grid_col} gap-3 items-center mx-6 justify-center`}>
                    {items?.slice(0, fullRows * grid_col).map((place) => (
                        <Card
                            key={place.place_id}
                            className="max-w-xs w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            onClick={() => onCardClick(place.place_name)}
                        >
                            {/* Image with responsive fit and rounded corners */}
                            <div className="w-full h-48 relative">
                                <img
                                    src="https://placeholdit.com/300x300/dddddd/999999"
                                    alt="placeholder"
                                    className="w-full h-full object-cover rounded-t-lg"
                                />
                            </div>

                            {/* Card content with padding */}
                            <CardHeader className="p-4 bg-white">
                                <div>
                                    {/* Title with bold and larger text */}
                                    <CardTitle className="text-xl font-semibold text-gray-800">{place.place_name}</CardTitle>
                                    {/* Description with subtle gray text for better contrast */}
                                    <CardDescription className="text-sm text-gray-600">{place.place_description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>

                    ))}

                    {/* Second grid for leftover items */}
                    <div className='col-span-full'>
                        {leftoverItems.length > 0 && (
                            <div className={`grid ${calculateLeftOverLayout()} w-3/4 gap-1 items-center justify-center justify-items-center mx-auto`}>
                                {leftoverItems.map((place) => (
                                    <Card
                                        key={place.place_id}
                                        className="max-w-xs w-full mx-auto"
                                        onClick={() => onCardClick(place.place_name)}
                                    >
                                        <img
                                            src="https://placeholdit.com/300x300/dddddd/999999"
                                            alt="placeholder"
                                            className="w-full h-auto object-cover"
                                        />
                                        <CardHeader>
                                            <div>
                                                <CardTitle>{place.place_name}</CardTitle>
                                                <CardDescription>{place.place_description}</CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div >
    )
}

export default GridLayout