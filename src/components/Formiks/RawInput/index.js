import React, { Component } from 'react';
import { FastField, getIn } from 'formik';
import cn from 'classnames';

export default class RawInput extends Component {
    render() {
        const {
            name,
            className,
            ...rest
        } = this.props;

        const nameId = name + "_id";

        return (
            <FastField name={name}>
                {({ field, form }) => {
                    let error = getIn(form.errors, name);
                    let hasTouched = getIn(form.touched, name);
                    let isInvalid = error && hasTouched;

                    return (
                        <>
                            <input
                                className={cn(className, "form-control", {"is-invalid" : isInvalid})}
                                id={nameId}
                                {...Object.assign(rest, field)}/>
                            {isInvalid && <div className="invalid-feedback">{error}</div>}
                        </>
                    )
                }}
            </FastField>
        )
    }
}