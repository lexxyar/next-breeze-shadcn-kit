import React from 'react';
import {IInputProps} from "@/components/custom/input/BaseInput";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";

const CheckboxInput = (props: IInputProps) => {
    const {control, label, description, name} = props
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <div className="inline-flex items-center gap-2">
                        <FormControl>
                            <Checkbox {...field} />
                        </FormControl>

                        {label && (
                            <FormLabel>{label}</FormLabel>
                        )}
                    </div>

                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}

export default CheckboxInput;
