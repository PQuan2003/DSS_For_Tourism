import React from 'react'
import { NavBar } from '@/components/NavigationBar/NavBar'
import HomePageCarousel from './components/HomePageCarousel'

const Homepage = () => {
    return (
        <div>
            <NavBar />
            <div className='p-48'>

                <HomePageCarousel />
            </div>
        </div>
    )
}

export default Homepage