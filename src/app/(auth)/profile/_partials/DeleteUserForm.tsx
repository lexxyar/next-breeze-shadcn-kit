"use client"
import * as React from 'react'
import {FormEventHandler, useRef, useState} from 'react'
import axios, {csrf} from '@/lib/axios'
import {useAuth} from '@/api/auth'
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useProfile} from "@/api/profile";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {DeleteProfileFormValidation} from "@/lib/validations/profile";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import PasswordInput from "@/components/custom/input/PasswordInput";
import {Form} from "@/components/ui/form";

const DeleteUserForm = () => {
    const {logout} = useAuth({middleware: 'auth'})
    const {deleteProfile} = useProfile()

    const form = useForm<z.infer<typeof DeleteProfileFormValidation>>({
        resolver: zodResolver(DeleteProfileFormValidation),
        defaultValues: {
            password: '',
        },
    })

    const onSubmit = async () => {
        try {
            await deleteProfile(form)
            closeModal()
            await logout()
        } catch (err) {
            // toast.error("Something went wrong!")
        }
    }



    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef<HTMLInputElement>()
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState<string | null>(null)

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)
    }


    const submitForm: FormEventHandler = async (event) => {
        event.preventDefault()
        form.handleSubmit(onSubmit)()
    }

    const {isSubmitting} = form.formState

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                    Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will be permanently deleted.
                            Please enter your password to confirm you would like to permanently delete your account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="w-full">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                    {/* Current password */}
                                    <PasswordInput
                                        control={form.control}
                                        name="password"
                                        label="Current password"
                                        disabled={isSubmitting}
                                    />
                                </form>
                            </Form>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <div className="w-full inline-flex justify-end gap-3">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="button"
                                    variant="destructive"
                                    onClick={submitForm}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>

    )
}

export default DeleteUserForm
