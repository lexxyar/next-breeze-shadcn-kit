"use client"

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import {useAuth} from "@/hooks/auth";
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {IUser, useAuth} from "@/api/auth";
import Link from "next/link";


const UserMenu = ({user}: { user: IUser | undefined }) => {
    const {logout} = useAuth({middleware: 'auth'});

    const getUserInitials = (): string => {
        if (user?.name) {
            const names: string[] = user.name.split(' ')
            const initials: string[] = []
            while (names.length > 0) {
                const item: string | undefined = names.shift()
                if (item) {
                    initials.push(item[0].toUpperCase())
                }
            }
            return initials.slice(0, 2).join('')
        } else {
            return '?'
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full">
                    <Avatar>
                        {/*<AvatarImage src="assets/avatar.svg"/>*/}
                        <AvatarFallback>
                            {getUserInitials()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        {user?.name ?? 'My Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <Link href="/profile">
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => logout()}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserMenu;
