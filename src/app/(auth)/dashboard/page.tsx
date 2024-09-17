"use client"

import React from 'react';
// import {useAuth} from "@/hooks/auth";
import Header from "@/app/(auth)/_components/Header";
import {Card, CardContent} from "@/components/ui/card";


const DashboardPage = () => {
    // const {logout} = useAuth({middleware: 'auth'});

    return (
        <>
            <Header>
                <h1 className="font-semibold text-lg">
                    Dashboard
                </h1>
            </Header>

            <div className="py-12">
                <Card className="max-w-7xl mx-auto">
                    <CardContent>
                        <div className="pt-6">
                            You are logged in!
                        </div>
                    </CardContent>
                </Card>
            </div>

        </>
    );
};

export default DashboardPage;
