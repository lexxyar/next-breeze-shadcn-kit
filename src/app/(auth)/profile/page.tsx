import * as React from 'react';
import Header from "@/app/(auth)/_components/Header";
import {Card, CardContent} from "@/components/ui/card";
import UpdateProfileInformationForm from "@/app/(auth)/profile/_partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "@/app/(auth)/profile/_partials/UpdatePasswordForm";
import DeleteUserForm from "@/app/(auth)/profile/_partials/DeleteUserForm";

const ProfilePage = () => {
    return (
        <>
            <Header>
                <h1 className="font-semibold text-lg">
                    Profile
                </h1>
            </Header>

            <div className="py-12 flex flex-col gap-4">
                <div className="w-full">
                    <Card className="max-w-7xl mx-auto space-y-6">
                        <CardContent>
                            <div className="pt-6">
                                <UpdateProfileInformationForm/>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full">
                    <Card className="max-w-7xl mx-auto space-y-6">
                        <CardContent>
                            <div className="pt-6">
                                <UpdatePasswordForm/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full">
                    <Card className="max-w-7xl mx-auto space-y-6">
                        <CardContent>
                            <div className="pt-6">
                                <DeleteUserForm/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </>
    );
};

export default ProfilePage;
