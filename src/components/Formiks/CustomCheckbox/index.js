import React from 'react';
import { FastField, getIn } from 'formik';

export default function Input(props) {
    let {
        label,
        name,
        ...rest
    } = props;

    let nameId = name + "_id";

    return (
        <FastField name={name}>
            {({ field, form }) => {
                let error = getIn(form.errors, name);
                let hasTouched = getIn(form.touched, name);
                let isInvalid = error && hasTouched;

                return (
                    <>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox"
                                className="custom-control-input"
                                id={nameId}
                                {...Object.assign(rest, field)}/>
                            <label className="custom-control-label" htmlFor={nameId}>{label}</label>
                            {isInvalid && <div className="invalid-feedback">{error}</div>}
                        </div>
                    </>
                )
            }}
        </FastField>
    )
}