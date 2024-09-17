"use client"
// @flow
import * as React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Form,} from "@/components/ui/form"
import {useForm} from "react-hook-form";

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import EmailInput from "@/components/custom/input/EmailInput";
import PasswordInput from "@/components/custom/input/PasswordInput";
import {PasswordResetFormValidation} from "@/lib/validations/auth";
import {useSearchParams} from "next/navigation";
import {useAuth} from "@/api/auth";

const PasswordReset = ({params}: { params: { token: string } }) => {
    const searchParams = useSearchParams()
    const {resetPassword} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const form = useForm<z.infer<typeof PasswordResetFormValidation>>({
        resolver: zodResolver(PasswordResetFormValidation),
        defaultValues: {
            email: searchParams.get('email') ?? '',
            password: '',
            password_confirmation: '',
        },
    })

    const onSubmit = async () => {
        try {
            await resetPassword(params.token, form)
        } catch (e) {
            toast.error('Something went wrong!')
        }
    }

    const {isSubmitting, isValid} = form.formState

    return (
        <div>
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Reset password</CardTitle>
                    <CardDescription>Type your new password</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                                <EmailInput
                                    control={form.control}
                                    name="email"
                                    placeholder="e.g. johndoe@master.com"
                                    label="Email"
                                    description="This is your email address for contact."
                                    disabled={true}
                                />

                                <PasswordInput
                                    control={form.control}
                                    name="password"
                                    label="Password"
                                    placeholder="********"
                                    description="Create super secret password."
                                    disabled={isSubmitting}
                                />

                                <PasswordInput
                                    control={form.control}
                                    name="password_confirmation"
                                    label="Password confirmation"
                                    placeholder="********"
                                    description="Confirm your password."
                                    disabled={isSubmitting}
                                />

                                <div className="inline-flex items-center justify-end gap-2 w-full">
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Reset Password
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
};

export default PasswordReset
