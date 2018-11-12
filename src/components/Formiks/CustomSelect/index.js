import React from 'react';
import cn from 'classnames';
import { FastField, connect, getIn } from 'formik';

export default function CustomSelect(props) {
    let {
        title,
        name,
        options
    } = props;

    let nameId = name + "_id";

    return (
        <>
            <label htmlFor={nameId}>{title}</label>
            <FastField name={name}>
                {({ field, form}) => {
                    let error = getIn(form.errors, name);
                    let hasTouched = getIn(form.touched, name);
                    let isInvalid = error && hasTouched;

                    return (
                        <>
                            <select
                                className={cn("custom-select", {isInvalid : "is-invalid"})}
                                id={nameId}
                                {...field}>
                                {options.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {isInvalid && <div className="invalid-feedback">{error}</div>}
                        </>
                    )
                }}
            </FastField>
        </>
    )
}