"use client"
import React from 'react';
import UserMenu from "@/app/(auth)/_components/UserMenu";
import AppLogo from "@/app/(auth)/_components/AppLogo";
import ThemeSwitcher from "@/app/(auth)/_components/ThemeSwitcher";
import AppNavigation from "@/app/(auth)/_components/AppNavigation";
import {useAuth} from "@/api/auth";

const AuthorizedLayout = ({children,}: Readonly<{ children: React.ReactNode; }>) => {
    const { user } = useAuth({ middleware: 'auth' })
    return (
        <div>
            <div>
                <div className="nav-container w-full border-b relative">
                    <div className="w-full max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
                        <div className="w-full h-full inline-flex justify-between items-center">
                            <div className="h-full inline-flex items-center justify-start gap-2">
                                <AppLogo/>
                                <AppNavigation/>
                            </div>
                            <div className="h-full inline-flex items-center justify-end gap-2">
                                <ThemeSwitcher/>
                                <UserMenu user={user}/>
                            </div>
                        </div>
                    </div>
                </div>

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthorizedLayout;
