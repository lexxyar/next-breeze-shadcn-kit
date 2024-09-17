import React from 'react';
import BaseInput, {IInputProps, InputFieldType} from "@/components/custom/input/BaseInput";

function EmailInput(props: IInputProps) {
    const {control, placeholder, label, description, name, disabled, required} = props
    return (
        <BaseInput control={control}
                   name={name}
                   label={label}
                   placeholder={placeholder}
                   inputType={InputFieldType.EMAIL}
                   description={description}
                   disabled={disabled}
                   required={required}
        />
    );
}

export default EmailInput;
