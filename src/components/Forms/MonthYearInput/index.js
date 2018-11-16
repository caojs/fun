import React, { Component } from 'react';
import { range, isObject } from 'lodash-es';
import cn from 'classnames';

const regex = /^(\d{1,2})[\/-](\d{4})$/;

/*
Date
month/year
{ month, year }
*/
function parseFormat(d) {
    if (d instanceof Date) {
        return {
            month: d.getMonth() + 1,
            year: d.getFullYear()
        };
    }

    if (typeof d === 'string') {
        const matched = d.match(regex);
        if (matched) {
            return {
                month: +matched[1],
                year: +matched[2]
            }
        }
    }
    else if (isObject(d)) {
        const {
            month,
            year
        } = d;
        return {
            month: +month,
            year: +year
        };
    }

    throw new Error('Wrong format');
}

export function formatToDate(d) {
    const {
        month,
        year
    } = parseFormat(d);

    if (!month || !year) throw new Error('Wrong format');

    return new Date(year, month - 1);
}

export function dateToFormat(d) {
    return [d.getMonth() + 1, d.getFullYear()]
        .join('/');
}

export default class FormsMonthYearInput extends Component {
    constructor(props) {
        super(props);
        let {
            min,
            max
        } = props;

        this.state = {
            minYear: min ?
                parseFormat(min).year:
                1970,
            maxYear: max ?
                parseFormat(max).year:
                (new Date()).getFullYear(),
        };
    }

    onSelectPartial(key) {
        const {
            value,
            onChange
        } = this.props;

        return (e) => {
            const currentDate = formatToDate(value);

            const parsed = parseFormat(value);
            parsed[key] = e.target.value;
            const newDate = formatToDate(parsed);

            onChange(dateToFormat(newDate));
        }
    }

    render() {
        const {
            value,
            className
        } = this.props;

        const {
            minYear,
            maxYear
        } = this.state;

        const {
            month,
            year
        } = parseFormat(value);

        return (
            <div className={cn(className, "input-group")}>
                <select
                    className="custom-select"
                    value={month}
                    onChange={this.onSelectPartial('month')}>
                    {range(1, 13).map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
                <select
                    className="custom-select"
                    value={year}
                    onChange={this.onSelectPartial('year')}>
                    {range(minYear, maxYear + 1).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        )
    }
}