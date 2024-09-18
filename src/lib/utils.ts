import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import toast from "react-hot-toast";
import {UseFormReturn} from "react-hook-form";
import {useEffect, useState} from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const setServerValidationErrors = (error: any, form: UseFormReturn<any>) => {
    toast.error(error.response?.data?.message as string)
    let focusField: string = ''
    if (error.response) {
        Object.keys(error.response.data.errors).map((field: string) => {
            if (error.response) {
                const message: string = error.response.data.errors[field][0]
                form.setError((field as any), {type: 'server', message})
            }
            if (!focusField) focusField = field
        })
    }
    form.setFocus(focusField as any)
}

export const fillFormCorresponding = (objSrc: any, form: UseFormReturn<any>) => {
    const formFields: string[] = Object.keys(form.control._fields)
    const objFields: string[] = Object.keys(objSrc)
    formFields.map((field: string) => {
        if (objFields.includes(field)) {
            form.setValue(field as any, objSrc[field])
        }
    })
}
