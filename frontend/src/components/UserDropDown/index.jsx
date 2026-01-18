"use client"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { isLoggedIn, logout } from "@/utils/auth_util"

import { UserRound, UserPen, Wrench, LogOut } from "lucide-react"

export default function UserDropDown({ username, setLoggedIn }) {
    const navigate = useNavigate()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                >
                    <UserRound className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="text-sm">
                    Signed in as
                    <div className="font-medium">{username}</div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="gap-2">
                        <UserPen className="h-4 w-4" />
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem className="gap-2">
                        <Wrench className="h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="gap-2 text-red-600 focus:text-red-600"
                    onClick={() => {
                        logout();
                        setLoggedIn(isLoggedIn);
                        navigate("/");
                    }}
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}