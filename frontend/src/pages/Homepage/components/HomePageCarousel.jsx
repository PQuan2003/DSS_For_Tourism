import React from 'react'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import p1 from '@/assets/picture/sand.jpg'
import p2 from '@/assets/picture/testing.jpg'
import p3 from '@/assets/picture/vinh_ha_long.jpg'


const HomePageCarousel = () => {
    const pictures = [
        {
            id: 1,
            content: p1
        },
        {
            id: 2,
            content: p2
        },
        {
            id: 3,
            content: p3
        },
    ]
    return (
        <Carousel className="w-full max-w-xs bg-red-500">
            <CarouselContent>
                {pictures.map((pic) => (
                    <CarouselItem key={pic.id} className="flex justify-center items-center">
                        <div className="flex justify-center items-center w-full h-full">
                            <img
                                src={pic.content}
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

