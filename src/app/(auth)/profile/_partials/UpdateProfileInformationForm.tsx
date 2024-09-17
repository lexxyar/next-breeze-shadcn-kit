"use client"
import {useEffect, useState} from 'react'
import TextInput from "@/components/custom/input/TextInput";
import EmailInput from "@/components/custom/input/EmailInput";
import {IUser, useAuth} from "@/api/auth";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {useProfile} from "@/api/profile";
import {Form} from "@/components/ui/form";
import {fillFormCorresponding} from "@/lib/utils";
import {ProfileInformationFormValidation} from "@/lib/validations/profile";

const UpdateProfileInformationForm = () => {
    const {user, resendEmailVerification} = useAuth({middleware: 'auth'})
    const {updateProfileInfo} = useProfile()

    const form = useForm<z.infer<typeof ProfileInformationFormValidation>>({
        resolver: zodResolver(ProfileInformationFormValidation),
        defaultValues: {
            name: (user as IUser)?.name ?? '',
            email: (user as IUser)?.email ?? '',
        },
    })

    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (!!user) {
            fillFormCorresponding(user, form)
        }
    }, [user, form])

    const onSubmit = async () => {
        try {
            await updateProfileInfo(form, setStatus)
            setTimeout(() => setStatus(null), 5000)
        } catch (e) {
            toast.error('Something went wrong!')
        }
    }

    const {isSubmitting} = form.formState

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account&apos;s profile information and email address
                </p>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    {/* Name */}
                    <TextInput control={form.control}
                               name="name"
                               label="Name"
                               required={true}
                               disabled={isSubmitting}
                    />

                    {/* Email Address */}
                    <EmailInput control={form.control}
                                name="email"
                                label="Email"
                                required={true}
                                disabled={isSubmitting}
                    />

                    {
                        (user as IUser)?.must_verify_email &&
                        (user as IUser)?.email_verified_at === null &&
                        <div>
                            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                Your email address is unverified.

                                <Button variant="link"
                                        onClick={() => resendEmailVerification(setStatus)}
                                >
                                    Click here to re-send the verification email.
                                </Button>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    }

                    <div className="flex items-center gap-4">
                        <Button type="submit"
                                disabled={isSubmitting}
                        >Save</Button>

                        {status === 'profile-updated' && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        )}
                    </div>
                </form>
            </Form>
        </section>

    )
}

export default UpdateProfileInformationForm
