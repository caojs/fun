import React, { Component } from 'react';
import { FastField } from 'formik';
import MonthYearInput, { formatToDate, dateToFormat } from '../../Forms/MonthYearInput';

export default class MonthYearRangePicker extends Component {
    onStartChangePartial(name, oldValue, setFieldValue) {
        return (value) => {
            const [, end] = oldValue;
            this.onChange(value, end, name, setFieldValue);
        }
    }

    onEndChangePartial(name, oldValue, setFieldValue) {
        return (value) =>  {
            const [start] = oldValue;
            this.onChange(start, value, name, setFieldValue);
        }
    }

    onChange(start, end, name, setFieldValue) {
        const startDate = formatToDate(start);
        const endDate = formatToDate(end);

        if (startDate < endDate)
            setFieldValue(name, [start, end]);
    }

    render() {
        const {
            label,
            name,
            startLabel,
            start,
            endLabel,
            end 
        } = this.props;

        return (
            <FastField name={name}>
                {({ field, form }) => {
                    const [startValue, endValue] = field.value;

                    return (
                        <>
                            <label>{label}</label>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <small className="input-group-text">{startLabel}</small>
                                        </div>
                                        <MonthYearInput
                                            {...start}
                                            value={startValue}
                                            onChange={this.onStartChangePartial(name, field.value, form.setFieldValue)}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <small className="input-group-text">{endLabel}</small>
                                        </div>
                                        <MonthYearInput
                                            {...end}
                                            value={endValue}
                                            onChange={this.onEndChangePartial(name, field.value, form.setFieldValue)}/>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                }}
            </FastField>
        )
    }
}