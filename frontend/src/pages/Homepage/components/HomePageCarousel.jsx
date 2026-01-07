import React from 'react'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


import useFetchData from '@/hooks/useFetchData'


const HomePageCarousel = () => {


    const { data: carouselData, loading, error } = useFetchData("http://localhost:8080/places/images");

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <div>Error fetching data</div>;
    }

    return (
        <Carousel className="w-full max-w-xs bg-red-500">
            <CarouselContent>
                {carouselData && carouselData.imgs.map((pic) => (
                    <CarouselItem key={pic.place_id} className="flex justify-center items-center">
                        <div className="flex justify-center items-center w-full h-full">
                            <img
                                src={pic.place_img}
                                alt="Place Image"
                                className="object-cover max-w-[200px] max-h-[200px]"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default HomePageCarousel

