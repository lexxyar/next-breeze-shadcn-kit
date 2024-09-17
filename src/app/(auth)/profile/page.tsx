import * as React from 'react';
import Header from "@/app/(auth)/_components/Header";
import {Card, CardContent} from "@/components/ui/card";
import UpdateProfileInformationForm from "@/app/(auth)/profile/_partials/UpdateProfileInformationForm";

const ProfilePage = () => {
    return (
        <>
            <Header>
                <h1 className="font-semibold text-lg">
                    Profile
                </h1>
            </Header>

            <div className="py-12">
                <Card className="max-w-7xl mx-auto space-y-6">
                    <CardContent>
                        <div className="pt-6">
                            <UpdateProfileInformationForm/>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </>
    );
};

export default ProfilePage;
