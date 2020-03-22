import React, {useState} from "react";
import {IInput} from "../interfaces";
import './Radio.scss';

interface IRadioProps {
    input: IInput,
    onChange: (e: any) => void
}

export const Radio = (props: IRadioProps) => {

    const [value, setValue] = useState(props.input.default);

    const handleChange = (e: any): void => {
        let value = e.target.value;
        setValue(value);
        props.onChange(value);
    };

    return (
        <div>
            <p className={'hint'}>Choose one answer</p>
            {
                props.input.values?.map((val, index) => {
                    return (
                        <label key={index} htmlFor={val} className={'radio-label'}>
                            <input name={'radio'}
                                   type={'radio'}
                                   id={val}
                                   value={val}
                                   checked={val === value}
                                   onChange={handleChange}
                            />
                            <span>
                                {val}
                            </span>
                        </label>
                    )
                })
            }
        </div>
    );
};
