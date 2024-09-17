import useSWR from 'swr'
import axios, {csrf} from '@/lib/axios'
import {Dispatch, SetStateAction, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {setServerValidationErrors} from "@/lib/utils";
import {UseFormReturn} from "react-hook-form";

declare type TAuthMiddleware = 'guest' | 'auth'

interface IUseAuth {
    middleware: TAuthMiddleware
    redirectIfAuthenticated?: string | undefined
}

export interface IUser {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean
    created_at?: string
    updated_at?: string
}

export const useAuth = ({
                            middleware,
                            redirectIfAuthenticated
                        }: IUseAuth) => {
    const router = useRouter()

    const {data: user, error, mutate} = useSWR<IUser>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            })
    )


    const register = async (form: UseFormReturn<any>) => {
        try {
            await csrf()
            await axios.post('/register', form.getValues())
            await mutate()
            await router.push('/dashboard')
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            setServerValidationErrors(error, form)
        }
    }

    const login = async (form: UseFormReturn<any>) => {
        try {
            await csrf()
            await axios.post('/login', form.getValues())
            await mutate()
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            setServerValidationErrors(error, form)
        }
    }

    const logout = async () => {
        try {
            if (!error) {
                await axios.post('/logout')
                await mutate()
            }
        } finally {
            window.location.pathname = '/login'
        }
    }

    const forgotPassword = async (form: UseFormReturn<any>, setStatus: Dispatch<SetStateAction<any>>) => {
        try {
            await csrf()
            const response = await axios.post('/forgot-password', form.getValues())
            setStatus(response.data.status)
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            setServerValidationErrors(error, form)
        }
    }

    const resetPassword = async (token: string, form: UseFormReturn<any>) => {
        try {
            await csrf()
            const response = await axios.post('/reset-password', {token: token, ...form.getValues()})
            await router.push('/login?reset=' + btoa(response.data.status))
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            setServerValidationErrors(error, form)
        }
    }

    const resendEmailVerification = async (setStatus: Dispatch<SetStateAction<any>>) => {
        const response = await axios.post('/email/verification-notification')
        setStatus(response.data.status)
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }
        if (
            window.location.pathname === '/verify-email' &&
            (user as IUser)?.email_verified_at
        ) {
            if (redirectIfAuthenticated) {
                router.push(redirectIfAuthenticated)
            }
        }
        if (
            middleware === 'auth' &&
            process.env.NEXT_PUBLIC_MUST_VERIFY_EMAIL &&
            window.location.pathname !== '/verify-email' &&
            !!user &&
            !(<IUser>user).email_verified_at) {

            router.push('/verify-email')
        }
        if (middleware === 'auth' && error) logout()
    }, [user, error, middleware, router, redirectIfAuthenticated])

    return {
        user,
        csrf,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
    }
}
