import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'formik';
import AssetColumn from '../../PortfolioPage/AssetColumn';
import AllocationColumn from '../../PortfolioPage/AllocationColumn';

class PortfolioAssets extends Component {
    constructor(props) {
        super(props);
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
                {/* <span className="btn btn-secondary btn-sm ml-2" onClick={this.reset}><FaTrashAlt/></span> */}
            </label>

            <div className="row no-gutters">
                <div className="col-4">
                    <AssetColumn
                        set={set}
                        tickers={tickers}/>
                </div>
                <div className="col">
                    <AllocationColumn
                        set={set}
                        name={"1"}
                        index={0}
                        tickers={tickers}
                        allocations={allocations[0]}/>
                </div>
            </div>
            </>
        )
    }
}

export default connect(PortfolioAssets);