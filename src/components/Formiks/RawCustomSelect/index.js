import React from 'react';
import { FastField, getIn } from 'formik';
import cn from 'classnames';

import styles from './index.module.scss';

export default function RawCustomSelect(props) {
    let {
        name,
        options
    } = props;

    let nameId = name + "_id";

    return (
        <FastField name={name}>
            {({ field, form}) => {
                let error = getIn(form.errors, name);
                let hasTouched = getIn(form.touched, name);
                let isInvalid = error && hasTouched;

                return (
                    <div className={styles.main}>
                        <select
                            className={cn("custom-select", { "is-invalid" : isInvalid })}
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
                    </div>
                )
            }}
        </FastField>
    )
}