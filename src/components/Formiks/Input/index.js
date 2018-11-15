import React from 'react';
import RawInput from '../RawInput';

export default function Input(props) {
    let {
        label,
        name,
        ...rest
    } = props;

    let nameId = name + "_id";

    return (
        <>
            <label htmlFor={nameId}>{label}</label>
            <RawInput name={name} {...rest}/>
        </>
    )
}