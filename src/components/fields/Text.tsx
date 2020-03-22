import React, {useState} from "react";
import {IInput} from "../interfaces";
import './Text.scss';

interface ITextProps {
    input: IInput,
    onChange: (e: any) => void
}

export const Text = (props: ITextProps) => {

    const [value, setValue] = useState(props.input.default ? props.input.default : '');

    const handleChange = (e: any): void => {
        let value = e.target.value;
        setValue(value);
        props.onChange(value);
    };

    return (
        <>
            <input
                type={'text'}
                value={value}
                onChange={handleChange}
            />
        </>
    )
};
