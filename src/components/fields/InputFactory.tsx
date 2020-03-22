import React from 'react';
import {IInput} from "../interfaces";
import {Text} from "./Text";
import {Textarea} from "./Textarea";
import {Checkbox} from "./Checkbox";
import {Radio} from "./Radio";

interface IInputFactoryProps {
    input: IInput,
    onChange: (e: any) => void
}

export const InputFactory = (props: IInputFactoryProps) => {
    switch (props.input.type) {
        case 'text':
            return <Text input={props.input} onChange={props.onChange}/>;
        case 'radio':
            return <Radio input={props.input} onChange={props.onChange}/>;
        case 'checkbox':
            return <Checkbox input={props.input} onChange={props.onChange}/>;
        case 'textarea':
            return <Textarea input={props.input} onChange={props.onChange}/>;
        default:
            return <div>Input factory</div>
    }
};
