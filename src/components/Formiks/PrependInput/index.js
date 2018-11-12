import React from 'react';
import cn from 'classnames';
import { FastField, getIn } from 'formik';

export default function PrependInput(props) {
    let {
        label,
        name,
        pender,
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
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">{pender}</span>
                                </div>
                                <input
                                    className={cn("form-control", {"is-invalid" : isInvalid})}
                                    id={nameId}
                                    {...Object.assign(rest, field)}/>
                            </div>
                            {isInvalid &&
                                <>
                                    <div className={cn("form-control d-none", {"is-invalid" : isInvalid})}></div>
                                    <div className="invalid-feedback">{error}</div>
                                </>}
                        </>
                    )
                }}
            </FastField>
        </>
    )
}