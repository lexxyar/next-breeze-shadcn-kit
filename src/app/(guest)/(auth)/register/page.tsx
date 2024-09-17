"use client"
// @flow
import * as React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Form,} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import EmailInput from "@/components/custom/input/EmailInput";
import TextInput from "@/components/custom/input/TextInput";
import PasswordInput from "@/components/custom/input/PasswordInput";
import Link from "next/link";
import {RegisterFormValidation} from "@/lib/validations/auth";
import {useAuth} from "@/api/auth";
import toast from "react-hot-toast";


const RegisterPage = () => {
    const {register} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })

    const form = useForm<z.infer<typeof RegisterFormValidation>>({
        resolver: zodResolver(RegisterFormValidation),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    })

    const onSubmit = async () => {

        try {
            await register(form)
        } catch (err) {
            toast.error("Something went wrong!")
        }

    }

    const {isSubmitting, isValid} = form.formState

    return (
        <div>
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Sign-Up</CardTitle>
                    <CardDescription>to be smarter</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <TextInput
                                    control={form.control}
                                    name="name"
                                    label="Name"
                                    placeholder="e.g. John Doe"
                                    description="This is your public display name."
                                    disabled={isSubmitting}
                                />

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

                                <PasswordInput
                                    control={form.control}
                                    name="password_confirmation"
                                    label="Password confirmation"
                                    placeholder="********"
                                    description="Confirm your password."
                                    disabled={isSubmitting}
                                />

                                <div className="inline-flex items-center justify-end gap-2 w-full">
                                    <Link
                                        href="/login"
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                                        Already registered?
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Register
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

export default RegisterPage
