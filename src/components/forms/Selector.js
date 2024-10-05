import React from 'react';
import { Controller } from "react-hook-form";
import {
    InputLabel,
    Select,
    FormControl,
    FormHelperText
} from "@material-ui/core/"

const ReactHookFormSelect = ({
    name,
    label,
    control,
    defaultValue,
    children,
    rules,
    errors,
    hint,
    ...props
}) => {
    const labelId = `${name}-label`;
    return (
        <FormControl 
            {...props}
            error={errors[name] && true}
            >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                as={
                    <Select labelId={labelId} label={label}>
                        {children}
                    </Select>
                }
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
            />
            <FormHelperText>
                {errors[name] ? errors[name]?.message : hint}
            </FormHelperText>
        </FormControl>
    );
};
export default ReactHookFormSelect;