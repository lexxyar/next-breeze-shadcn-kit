import React, {HTMLInputTypeAttribute} from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control} from "react-hook-form";

export enum InputFieldType {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password',
}

export interface IInputProps {
    control: Control<any>
    placeholder?: string
    label?: string
    description?: string
    name: string
    disabled?: boolean
    required?: boolean
}

interface IInputFieldType {
    inputType?: InputFieldType
}

interface IBaseInputProps {
    iconSrc?: string
    iconAlt?: string
}

function EmailInput(props: IInputProps & IInputFieldType & IBaseInputProps) {
    const {control, placeholder, label, description, name, inputType, disabled, required} = props
    const syncFieldType: HTMLInputTypeAttribute = inputType ?? InputFieldType.TEXT
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    {label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <FormControl>
                        <Input placeholder={placeholder}
                               type={syncFieldType}
                               disabled={disabled}
                               required={required}
                               {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}

export default EmailInput;
