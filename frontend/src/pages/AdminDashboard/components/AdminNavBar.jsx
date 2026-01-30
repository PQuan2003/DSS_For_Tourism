import React from 'react'

import { useLocation, Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, isLoggedIn, logout } from '@/utils/auth_util'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button'

import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import UserDropDown from '@/components/UserDropDown'


export function AdminNavBar({ ...props }) {
    const navigate = useNavigate()
    const navItems = [
        {
            title: "Dashboard",
            url: "/admin"
        },
        {
            title: "Data",
            url: "/data"
        },

    ]

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

    const user = loggedIn ? getCurrentUser() : null

    const adminusername = "admin"

    const location = useLocation();
    const [isDark, setIsDark] = useState(false)

    const handleButtonClick = (url) => {
        navigate(`/${url}`)
    }

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
                                    {item.title === 'Data' ? (
                                        <span className="flex text-gray-400 cursor-not-allowed px-4">
                                            <p className="text-xl font-bold">{item.title}</p>
                                        </span>
                                    ) : (
                                        <NavigationMenuLink asChild className="px-4">
                                            <Link to={item.url} className="flex">
                                                <p className={`text-xl font-bold text-primary-800 ${isActive ? 'underline' : ''}`}>
                                                    {item.title}
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuLink>
                            )
                        })}
                    </div>
                    <div className='flex'>
                        {!loggedIn
                            ?
                            <>
                                <Button
                                    variant="ghost"
                                    className="rounded-xl px-4"
                                    onClick={() => handleButtonClick("login")}
                                >
                                    Login
                                </Button>

                                <Button
                                    className="rounded-xl px-4"
                                    onClick={() => handleButtonClick("signup")}
                                >
                                    Sign Up
                                </Button>
                            </>
                            : <UserDropDown username={adminusername} setLoggedIn={setLoggedIn} />
                        }

                    </div>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
