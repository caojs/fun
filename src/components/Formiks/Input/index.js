import React from 'react';
import cn from 'classnames';
import { FastField, getIn } from 'formik';

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
            <FastField name={name}>
                {({ field, form }) => {
                    let error = getIn(form.errors, name);
                    let hasTouched = getIn(form.touched, name);
                    let isInvalid = error && hasTouched;

                    return (
                        <>
                            <input
                                className={cn("form-control", {"is-invalid" : isInvalid})}
                                id={nameId}
                                {...Object.assign(rest, field)}/>
                            {isInvalid && <div className="invalid-feedback">{error}</div>}
                        </>
                    )
                }}
            </FastField>
        </>
    )
}