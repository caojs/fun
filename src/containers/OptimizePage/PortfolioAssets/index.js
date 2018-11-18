import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'formik';
import AssetColumn from '../../PortfolioPage/AssetColumn';
import AllocationColumn from '../../PortfolioPage/AllocationColumn';

class PortfolioAssets extends Component {
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
            set,
            formik: { values }
        } = this.props;

        const { tickers, allocations } = values[set];

        return (
            <>
            <label>
                <span>Portfolio assets</span>
                <span className="btn btn-secondary btn-sm ml-2" onClick={this.reset}><FaTrashAlt/></span>
            </label>

            <div className="row no-gutters">
                <div className="col-3">
                    <AssetColumn
                        set={set}
                        tickers={tickers}/>
                </div>
                <div className="col-3">
                    <AllocationColumn
                        set={set}
                        name={"1"}
                        index={0}
                        tickers={tickers}
                        allocations={allocations}/>
                </div>
            </div>
            </>
        )
    }
}

export default connect(PortfolioAssets);