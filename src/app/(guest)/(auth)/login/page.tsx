"use client"
// @flow
import * as React from 'react';
import {Suspense} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Form,} from "@/components/ui/form"
import {useForm} from "react-hook-form";

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import EmailInput from "@/components/custom/input/EmailInput";
import PasswordInput from "@/components/custom/input/PasswordInput";
import Link from "next/link";
import {LoginFormValidation} from "@/lib/validations/auth";
import CheckboxInput from "@/components/custom/input/CheckboxInput";
import {useAuth} from "@/api/auth";
import {useSearchParams} from "next/navigation";
import AuthSessionStatus from "@/app/(auth)/_components/AuthSessionStatus";

function PrintStatus() {
    const searchParams = useSearchParams()
    return (
        <>
            {searchParams.has('reset') &&
                <AuthSessionStatus
                    className="mb-4"
                    status={atob(searchParams.get('reset') as string)}/>
            }
        </>
    )
}

const LoginPage = () => {
    const {login} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })
    // const searchParams = useSearchParams()
    const form = useForm<z.infer<typeof LoginFormValidation>>({
        resolver: zodResolver(LoginFormValidation),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const onSubmit = async () => {
        try {
            await login(form)
        } catch (e) {
            toast.error('Something went wrong!')
        }
    }

    const {isSubmitting, isValid} = form.formState

    return (
        <div>
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Sign-In</CardTitle>
                    <CardDescription>to be smarter</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Suspense>
                            <PrintStatus/>
                        </Suspense>
                        {/*{searchParams.has('reset') &&*/}
                        {/*    <AuthSessionStatus*/}
                        {/*        className="mb-4"*/}
                        {/*        status={atob(searchParams.get('reset') as string)}/>*/}
                        {/*}*/}
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

                                <PasswordInput
                                    control={form.control}
                                    name="password"
                                    label="Password"
                                    placeholder="********"
                                    description="Create super secret password."
                                    disabled={isSubmitting}
                                />

                                <div className="w-full inline-flex items-start justify-between">
                                    <CheckboxInput
                                        control={form.control}
                                        name="remember"
                                        label="Remember me"
                                    />
                                    <Link
                                        href="/register"
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                                        New here?
                                    </Link>
                                </div>

                                <div className="inline-flex items-center justify-end gap-2 w-full">
                                    <Link
                                        href="/forgot-password"
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                                        Forgot your password?
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Sign In
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

export default LoginPage
