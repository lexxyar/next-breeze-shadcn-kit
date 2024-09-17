"use client"
import * as React from 'react'
import {useState} from 'react'
import toast from "react-hot-toast";
import {useProfile} from "@/api/profile";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ProfileChangePasswordFormValidation} from "@/lib/validations/profile";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/api/auth";
import PasswordInput from "@/components/custom/input/PasswordInput";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";

const UpdatePasswordForm = () => {
    const {user, resendEmailVerification} = useAuth({middleware: 'auth'})
    const {updatePassword} = useProfile()

    const form = useForm<z.infer<typeof ProfileChangePasswordFormValidation>>({
        resolver: zodResolver(ProfileChangePasswordFormValidation),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    })

    const [status, setStatus] = useState(null)

    const onSubmit = async () => {
        try {
            await updatePassword(form, setStatus)
        } catch (err) {
            toast.error("Something went wrong!")
        }
    }

    const {isSubmitting} = form.formState

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    {/* Current password */}
                    <PasswordInput
                        control={form.control}
                        name="current_password"
                        label="Current password"
                        placeholder="********"
                        disabled={isSubmitting}
                    />

                    <PasswordInput
                        control={form.control}
                        name="password"
                        label="New password"
                        placeholder="********"
                        disabled={isSubmitting}
                    />

                    <PasswordInput
                        control={form.control}
                        name="password_confirmation"
                        label="Password confirmation"
                        placeholder="********"
                        disabled={isSubmitting}
                    />

                    <div className="flex items-center gap-4">
                        <Button>Save</Button>

                        {status === 'password-updated' && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        )}
                    </div>
                </form>
            </Form>
        </section>

    )
}

export default UpdatePasswordForm
