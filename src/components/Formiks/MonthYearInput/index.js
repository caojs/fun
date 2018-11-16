import React, { Component } from 'react';
import RawMonthYearInput from '../RawMonthYearInput';

export default class MonthYearInput extends Component {
    render() {
        const {
            label,
            name,
            ...rest
        } = this.props;

        return (
            <>
                <label>{label}</label>
                <RawMonthYearInput name={name} {...rest}/>
            </>
        )
    }
}