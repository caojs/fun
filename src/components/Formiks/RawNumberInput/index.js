import React, { Component } from 'react';
import { FastField, getIn } from 'formik';
import cn from 'classnames';

export default class RawNumberInput extends Component {
    onChangePartial(handleChange) {
        const {
            min = Number.MIN_SAFE_INTEGER,
            max = Number.MAX_SAFE_INTEGER
        } = this.props;

        return (e) => {
            const value = +e.target.value;
            if (Number.isNaN(value) || value < min || value > max) {
                return;
            }

            handleChange(e);
        }
    }

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
                    const {
                        errors,
                        touched,
                        handleChange
                    } = form;

                    const error = getIn(errors, name);
                    const hasTouched = getIn(touched, name);
                    const isInvalid = error && hasTouched;
                    const onChange = this.onChangePartial(handleChange);

                    return (
                        <>
                            <input
                                className={cn(className, "form-control", {"is-invalid" : isInvalid})}
                                id={nameId}
                                {...field}
                                {...rest}
                                value={field.value || ""}
                                onChange={onChange}/>
                            {isInvalid && <div className="invalid-feedback">{error}</div>}
                        </>
                    )
                }}
            </FastField>
        )
    }
}