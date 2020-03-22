import React, {useState} from "react";
import {IInput} from "../interfaces";
import './Textarea.scss';

interface ITextareaProps {
    input: IInput,
    onChange: (e: any) => void
}

export const Textarea = (props: ITextareaProps) => {

    const [value, setValue] = useState('');

    const handleChange = (e: any): void => {
        let value = e.target.value;
        setValue(value);
        props.onChange(value);
    };

    return (
        <>
            <textarea
                minLength={props.input.constraints.min}
                maxLength={props.input.constraints.max}
                required={props.input.constraints.required}
                value={value}
                onChange={handleChange}
            />
        </>
    )
};
