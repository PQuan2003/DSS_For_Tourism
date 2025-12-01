import { useLocation, Link } from 'react-router-dom'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from '../ui/navigation-menu'
import { Button } from '../ui/button'

import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'


export function NavBar({ ...props }) {
    const navItems = [
        {
            title: "Home",
            url: "/"
        },
        {
            title: "Form",
            url: "/form"
        },
        {
            title: "Destination",
            url: "/destination"
        },
    ]

    const location = useLocation();
    const [isDark, setIsDark] = useState(false)

    return (
        <NavigationMenu className="sticky top-0 bg-gray-100">
            <NavigationMenuList>
                <div className='flex justify-between items-center w-screen h-13 px-4'>
                    <NavigationMenuLink asChild className=' px-2'>
                        <Link to="/" className='flex text-2xl'>
                            <span className="material-symbols-outlined text-primary-600">flight_takeoff</span>
                            <h1 className=" font-bold text-primary-800">TravelQuest</h1>
                        </Link>
                    </NavigationMenuLink>
                    <div className="flex space-x-10">
                        {navItems.map((item) => {
                            const isActive = location.pathname == item.url;

                            return (
                                <NavigationMenuLink asChild className='px-4' key={item.title}>
                                    <Link to={item.url} className='flex'>
                                        <p className={`text-xl font-bold text-primary-800 ${isActive ? 'underline' : ''}`}>{item.title}</p>
                                    </Link>
                                </NavigationMenuLink>
                            )
                        })}
                    </div>
                    <div className='flex'>
                        <Button className='rounded-2xl'>Login</Button>
                        <Button className='rounded-2xl ml-4'>Sign Up</Button>
                        <Button className='rounded-2xl ml-4' onClick={() => setIsDark(!isDark)}>
                            {isDark ? <Moon /> : <Sun />}
                        </Button>
                    </div>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}




{/* <NavigationMenuItem>
    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
    <NavigationMenuContent >
    </NavigationMenuContent>
    </NavigationMenuItem> */}