import React, { Component } from 'react';
import { range } from 'lodash-es';
import cn from 'classnames';

export default class MonthYearInput extends Component {
    constructor(props) {
        super(props);
        let {
            min,
            max
        } = props;

        this.state = {
            minYear: min ?
                this.parseDate(min).year:
                1970,
            maxYear: max ?
                this.parseDate(max).year:
                (new Date()).getFullYear(),
        };
    }

    parseDate(d) {
        const [month, year] = d instanceof Date ?
            [d.getMonth() + 1, d.getFullYear()] :
            d.split('/');

        return { month, year };
    }

    onSelectPartial(key) {
        const {
            value,
            onChange
        } = this.props;

        return (e) => {
            const v = e.target.value;
            const parsed = this.parseDate(value);
            parsed[key] = v;

            onChange([parsed.month, parsed.year].join('/'));
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
        } = this.parseDate(value);

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