import React, {useState} from "react";
import {IInput} from "../interfaces";
import './Checkbox.scss';

interface ICheckboxProps {
    input: IInput,
    onChange: (e: any) => void
}

export const Checkbox = (props: ICheckboxProps) => {

    let initialValues: string[] = [];
    if (props.input.default && Array.isArray(props.input.default)) {
        initialValues = props.input.default;
    }
    const [values, setValues] = useState<string[]>(initialValues);

    const handleChange = (e: any): void => {

        let newValues,
            v = e.target.value;

        if (values.includes(v)) {
            newValues = values.filter((item) => {
                return item !== v;
            });
        } else {
            newValues = values.concat(v);
        }
        setValues(newValues);
        props.onChange(newValues);
    };

    return (
        <div className={'input-holder'}>
            {
                props.input.values?.map((value, index) => {
                    return (
                        <label key={index} className={'checkbox-label'}>
                            <input name={'checkbox'}
                                   type={'checkbox'}
                                   value={value}
                                   checked={values?.includes(value)}
                                   onChange={handleChange}
                            />
                            <span>{value}</span>
                        </label>
                    )
                })
            }
        </div>
    );
};
