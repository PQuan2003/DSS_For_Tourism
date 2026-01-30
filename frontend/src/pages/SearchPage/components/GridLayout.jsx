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
    const numberOfItems = items?.length;

    return (
        <div className="w-full overflow-auto">
            {numberOfItems === 0 && <div className='justify-center items-center'>No item to display</div>}
            {numberOfItems !== 0 && (
                <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] px-10 pb-10">
                    {items?.map((place) => (
                        <Card
                            key={place.place_id}
                            className="max-w-xs w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            onClick={() => onCardClick(place.place_name)}
                        >
                            <div className="w-full h-48 relative">
                                <img
                                    src={place.place_img}
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
                    {/* <div className='col-span-full'>
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
                    </div> */}
                </div>
            )}

        </div >
    )
}

export default GridLayout