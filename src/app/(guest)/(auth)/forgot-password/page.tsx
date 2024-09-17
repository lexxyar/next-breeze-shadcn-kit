"use client"
// @flow
import * as React from 'react';
import {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Form,} from "@/components/ui/form"
import {useForm} from "react-hook-form";

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import EmailInput from "@/components/custom/input/EmailInput";
import Link from "next/link";
import {ForgotPasswordFormValidation} from "@/lib/validations/auth";
import {useAuth} from "@/api/auth";
import AuthSessionStatus from "@/app/(auth)/_components/AuthSessionStatus";

const ForgotPasswordPage = () => {
    const [status, setStatus] = useState(null)
    const {forgotPassword} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })
    const form = useForm<z.infer<typeof ForgotPasswordFormValidation>>({
        resolver: zodResolver(ForgotPasswordFormValidation),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = async () => {
        try {
            await forgotPassword(form, setStatus)
        } catch (e) {
            toast.error('Something went wrong!')
        }
    }

    const {isSubmitting, isValid} = form.formState


    return (
        <div>
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Forgot your password</CardTitle>
                    <CardDescription>Recover your password</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Forgot your password? No problem. Just let us know your
                            email address and we will email you a password reset link
                            that will allow you to choose a new one.
                        </div>

                        <AuthSessionStatus className="mb-4" status={status}/>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                                <EmailInput
                                    control={form.control}
                                    name="email"
                                    placeholder="e.g. johndoe@master.com"
                                    label="Email"
                                    description="This is your email address for contact."
                                    disabled={isSubmitting}
                                />

                                <div className="inline-flex items-center justify-end gap-2 w-full">
                                    <Link href="/login">
                                        <Button type="button" variant="ghost">
                                            Cancel
                                        </Button>
                                    </Link>

                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Email Password Reset Link
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

export default ForgotPasswordPage
