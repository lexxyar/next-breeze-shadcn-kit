import axios, {csrf} from "@/lib/axios";
import {Dispatch, SetStateAction} from "react";
import {setServerValidationErrors} from "@/lib/utils";
import {UseFormReturn} from "react-hook-form";

export const useProfile = () => {
    const updateProfileInfo = async (form: UseFormReturn<any>, setStatus: Dispatch<SetStateAction<any>>) => {
        try {
            await csrf()
            const response = await axios.put('/api/profile', form.getValues())
            setStatus(response.data.status)
        } catch (error:any) {
            if (error.response.status !== 422) throw error

            setServerValidationErrors(error, form)
        }
    }
    return {
        updateProfileInfo,
    }
}
