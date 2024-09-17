import React from 'react';
import Image from "next/image";
import Link from "next/link";

const AppLogo = () => {
    return (
        <Link href="/dashboard">
            <Image src="assets/logo.svg"
                   alt="Logo"
                   width={36}
                   height={36}
            />
        </Link>
    );
};

export default AppLogo;
