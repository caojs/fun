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
                    console.log(field.value);

                    return (
                        <>
                            <label>{label}</label>
                            <div className="row">
                                <div className="col-3">
                                    <label className="text-secondary mb-0"><small>{startLabel}</small></label>
                                    <MonthYearInput
                                        {...start}
                                        value={startValue}
                                        onChange={this.onStartChangePartial(name, field.value, form.setFieldValue)}/>
                                </div>
                                <div className="col-3">
                                    <label className="text-secondary mb-0"><small>{endLabel}</small></label>
                                    <MonthYearInput
                                        {...end}
                                        value={endValue}
                                        onChange={this.onEndChangePartial(name, field.value, form.setFieldValue)}/>
                                </div>
                            </div>
                        </>
                    );
                }}
            </FastField>
        )
    }
}