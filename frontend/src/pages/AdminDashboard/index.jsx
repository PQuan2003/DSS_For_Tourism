import { NavBar } from '@/components/NavigationBar/NavBar'
import React, { useState } from 'react'

import { AdminNavBar } from './components/AdminNavBar'

import DashboardTable from './components/DashboardTable'
import { Button } from '@headlessui/react'


const AdminDashboardPage = () => {
    const [tableType, setTableType] = useState("all")

    const handleButtonClick = (type) => {
        setTableType(type)
    }

    return (
        <>
            <AdminNavBar />
            <div className="w-full max-w-6xl mx-auto p-6">
               
                <div className="flex items-center space-x-2 mb-6">
                    {["all", "today"].map((type) => {
                        const isActive = tableType === type;
                        return (
                            <Button
                                key={type}
                                onClick={() => handleButtonClick(type)}
                                className={`
                                    px-6 py-3
                                    text-lg font-semibold
                                    rounded-full
                                    transition
                                    ${isActive
                                        ? "bg-gray-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }
                                `}
                            >
                                {type === "all" ? "All" : "Today"}
                            </Button>
                        );
                    })}
                </div>
                <DashboardTable type={tableType} />
            </div>
        </>
    )
}

export default AdminDashboardPage