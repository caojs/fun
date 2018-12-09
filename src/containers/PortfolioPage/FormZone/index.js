import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';

import PeriodicAdjustment from './PeriodicAdjustment';
import Rebalancing from './Rebalancing';
import Benchmark from './Benchmark';
import PortfolioAssets from './PortfolioAssets';
import { tickersSelector } from '../FilterPage/selectors';

import schema from './schema';

export default class FormZone extends Component {
    render() {
        const {
            tickers
         } = this.props;
        let {
            set,
            portfolios
         } = this.state;

        return (
            <Formik
                validationSchema={schema}
                initialValues={{
                    [On]: {
                        tickers: tickers,
                        allocations: []
                    },
                    [Off]: {
                        tickers: [''],
                        allocations: []
                    }
                }}

                onSubmit={(values) => { console.log(values); }}

                render={(_props) => {

                    return (
                        <Form>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <PeriodicAdjustment/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <Rebalancing/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <Benchmark/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-12">
                                    <PortfolioAssets
                                        hasFilters={!!tickers}
                                        key={set}
                                        set={set}
                                        portfolios={portfolios}
                                        onUseFilter={this.useFilter}/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-4">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </Form>
                    )
                }}
            />
        )
    }
}

export default connect(
    state => {
        const tickers = tickersSelector(state);
        console.log(tickers);
        return ({
            tickers,
            hasFilters: !!tickers
        });
    }
)(FormZone);