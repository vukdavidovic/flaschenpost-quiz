import React from "react";
import {Icon} from "./Icon";
import './Button.scss';

interface IButtonProps {
    label: string,
    icon: string,
    onClick: () => void
}

export const Button = (props: IButtonProps) => {

    const handleClick = () => {
        props.onClick();
    };

    return (
        <button onClick={handleClick}>
            {props.label}
            <Icon icon={props.icon}/>
        </button>
    )
};
