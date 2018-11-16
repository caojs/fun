import React, { Component } from 'react';
import { FastField } from 'formik';
import { MonthYearInput } from '../../Forms';

export default class RawMonthYearInput extends Component {
    constructor(props) {
        super(props);
    }

    onChangePartial(name, setFieldValue) {
        return (value) => {
            setFieldValue(name, value);
        }
    }

    render() {
        const {
            name,
            ...rest
        } = this.props;

        return (
            <FastField name={name}>
                {({ field, form }) => {
                    return (
                        <MonthYearInput
                            {...rest}
                            value={field.value}
                            onChange={this.onChangePartial(name, form.setFieldValue)}/>
                    )
                }}
            </FastField>
        )
    }
}