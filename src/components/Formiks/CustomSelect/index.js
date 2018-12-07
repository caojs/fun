import React from 'react';
import RawCustomSelect from '../RawCustomSelect';

export default function CustomSelect(props) {
    let {
        label,
        name,
        options
    } = props;

    let nameId = name + "_id";

    return (
        <>
            <label htmlFor={nameId}>{label}</label>
            <RawCustomSelect name={name} options={options}/>
        </>
    )
}