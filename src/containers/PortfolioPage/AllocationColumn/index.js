import React, { Component } from 'react';
import { connect } from 'formik';
import { RawNumberInput, RawDumbInput } from '../../../components/Formiks';

import styles from './index.module.scss';

// TODO: optimize
class AllocationColumn extends Component {
    constructor(props) {
        super(props);
        this.equalize = this.equalize.bind(this);
        this.reset = this.reset.bind(this);
    }

    equalize() {
        const {
            set,
            index,
            tickers,
            formik
        } = this.props;

        const cleanTickers = tickers.filter(Boolean);
        const eq = 100/cleanTickers.length;

        formik.setFieldValue(
            `${set}.allocations.${index}`,
            tickers.map(ticker => ticker ? eq : 0 )
        );
    }

    reset() {
        const {
            set,
            index,
            tickers,
            formik
        } = this.props;

        formik.setFieldValue(
            `${set}.allocations.${index}`,
            tickers.map(() => 0 )
        );
    }

    render() {
        const {
            set,
            name,
            index,
            tickers,
            allocations,
        } = this.props;

        const total = (allocations || [])
            .filter((value, idx) => value && tickers[idx])
            .reduce((accum, value) => accum + +value, 0);

        return (
            <div className={styles.main}>
            <table className="table table-borderless mb-0">
                <thead className=""><tr><th>
                    Allocation #{name}
                    {/* <button className="btn btn-primary" onClick={this.equalize}>Equalize</button>
                    <button className="btn btn-primary" onClick={this.reset}>Reset</button> */}
                </th></tr></thead>
                <tbody>
                    {tickers.map((ticker, tidx) => (
                        <tr key={ticker + tidx}>
                            <td>
                                <RawNumberInput
                                    min={0}
                                    max={100}
                                    name={`${set}.allocations.${index}.${tidx}`}
                                    disabled={!tickers[tidx]}/>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <RawDumbInput
                                name={`${set}.total.${index}`}
                                value={total}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}

export default connect(AllocationColumn);