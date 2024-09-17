import React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {usePathname} from "next/navigation";

const AppNavigation = () => {
    const pathname = usePathname()
    return (
        <NavigationMenu className="inline-flex items-center gap-2 list-none">
            <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink active={pathname === '/dashboard'} className={navigationMenuTriggerStyle()}>
                        Dashboard
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    );
};

export default AppNavigation;
