import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'formik';
import AssetColumn from '../AssetColumn';
import AllocationColumn from '../AllocationColumn';

class Allocations extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
    }

    cleanInputs(tickers, allocations) {
        const tk = tickers.filter(Boolean);
        const al = tickers.reduce((accum, ticker, index) => {
            if (ticker) return accum;
            return accum.map(nested => {
                return [
                    ...nested.slice(0, index),
                    ...nested.slice(index + 1)
                ];
            });
        }, allocations);

        return {
            tickers: tk,
            allocations: al
        };
    }

    reset() {
        const {
            set,
            formik: { values, setFieldValue }
        } = this.props;

        const { tickers, allocations } = values[set];

        const col = tickers.map(() => "");
        setFieldValue(`${set}.tickers`, col);
        setFieldValue(`${set}.allocations`, allocations.map(() => col))
    }

    render() {
        let {
            hasFilters,
            set,
            portfolios,
            onUseFilter,
            formik: { values }
        } = this.props;

        const { tickers, allocations } = values[set];

        return (
            <>
            <label>
                <span>Portfolio assets</span>
                <span className="btn btn-secondary btn-sm ml-2" onClick={this.reset}><FaTrashAlt/></span>
            </label>

            {hasFilters && <div className="row mb-2">
                <div className="col-12">
                    <div className="custom-control custom-checkbox text-secondary">
                        <input
                            id="checktest"
                            className="custom-control-input"
                            type="checkbox"
                            checked={set === "on"}
                            onChange={onUseFilter}/>
                        <label className="custom-control-label" htmlFor="checktest">Use filter results</label>
                    </div>
                </div>
            </div>}
            <div className="row no-gutters">
                <div className="col-3">
                    <AssetColumn
                        set={set}
                        tickers={tickers}/>
                </div>
                {portfolios.map((portfolio, index) => {
                    return (
                        <div className="col" key={index}>
                            <AllocationColumn
                                set={set}
                                name={portfolio}
                                index={index}
                                tickers={tickers}
                                allocations={allocations[index]}/>
                        </div>
                    )
                })}
            </div>
            </>
        )
    }
}

export default connect(Allocations);