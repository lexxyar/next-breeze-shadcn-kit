import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useHasMounted} from "@/lib/clientHelpers";

const ThemeSwitcher = () => {
    const hasMounted = useHasMounted()
    const {setTheme, theme} = useTheme()

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <Button variant="ghost" size="icon" type="button" onClick={() => toggleTheme()}>
            {hasMounted && theme === 'light' && (
                <>
                    <SunIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                </>
            )
            }
            {hasMounted && theme === "dark" && (
                <>
                    <MoonIcon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                </>)
            }
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export default ThemeSwitcher;
