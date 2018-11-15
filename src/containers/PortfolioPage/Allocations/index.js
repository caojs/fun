import React, { Component } from 'react';
import cn from 'classnames';
import { IoMdAdd } from 'react-icons/io';
import { connect, getIn } from 'formik';
import { range } from 'lodash-es';
import { RawInput, RawNumberInput } from '../../../components/Formiks';

class Allocations extends Component {
    constructor(props) {
        super(props);

        const { tickers } = this.props;

        this.state = { tickerCount: tickers.length };

        this.addTicker = this.addTicker.bind(this);
    }

    addTicker() {
        this.setState(({ tickerCount }) => ({
            tickerCount: tickerCount + 1
        }));
    }

    render() {
        let {
            allocations,
            formik
        } = this.props;
        let { tickerCount } = this.state; 

        return (
            <div className="row">
                <div className="col-3">
                    <table className="table">
                        <thead><tr><th>#Asset</th></tr></thead>
                        <tbody>
                            {range(tickerCount)
                                .map((tidx) => (
                                    <tr key={tidx}>
                                        <td>
                                            <RawInput name={`tickers.${tidx}`}/>
                                        </td>
                                    </tr>
                                ))}
                            <tr>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.addTicker}>
                                        <IoMdAdd/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {allocations.map((allocation, index) => {
                    const total = (getIn(formik.values, `allocations.${index}`) || [])
                        .filter(value => value)
                        .reduce((accum, value) => accum + +value, 0);

                    return (
                        <div className="col" key={index}>
                            <table className="table">
                                <thead><tr><th>Allocation #{allocation}</th></tr></thead>
                                <tbody>
                                    {range(tickerCount)
                                        .map((tidx) => (
                                            <tr key={tidx}>
                                                <td>
                                                    <RawNumberInput min={0} max={100} name={`allocations.${index}.${tidx}`}/>
                                                </td>
                                            </tr>
                                        ))}
                                    <tr>
                                        <td><span className={cn({
                                            "text-danger": total < 100 || total > 100
                                        })}>Total: {total}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(Allocations);