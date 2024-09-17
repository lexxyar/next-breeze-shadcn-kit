"use client"
import React from 'react';

const Header = ({children}: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="dark:shadow-gray-800 shadow w-full">
            <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
};

export default Header;
