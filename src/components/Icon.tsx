import React from "react";

interface IIconProps {
    icon: string
}

export const Icon = (props: IIconProps) => {

    return (
        <span className={'icon'}>
            <i className={props.icon}></i>
        </span>
    )
};
