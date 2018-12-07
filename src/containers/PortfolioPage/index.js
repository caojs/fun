import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';

import PageHeader from '../../components/PageHeader';
import { MonthYearRangePicker, AppendInput } from '../../components/Formiks';
import PeriodicAdjustment from './PeriodicAdjustment';
import Rebalancing from './Rebalancing';
import Benchmark from './Benchmark';
import PortfolioAssets from './PortfolioAssets';
import { tickersSelector } from '../FilterPage/selectors';

import schema from './schema';

const On = 'on';
const Off = 'off';

class PortfolioPage extends Component {
    constructor(props) {
        super(props);

        const { hasFilters } = props;

        // TODO: dynamic portfolios
        this.state = {
            set: hasFilters ? On : Off,
            portfolios: [1, 2, 3],
        };
        
        this.useFilter = this.useFilter.bind(this)
    }

    useFilter(e) {
        this.setState({
            set: e.target.checked ? On : Off
        });
    }

    render() {
        const {
            tickers
         } = this.props;
        let {
            set,
            portfolios
         } = this.state;

        return (
            <div className="container">
            <PageHeader title="portfolio"/>
            <Formik
                validationSchema={schema}
                initialValues={{
                    period: ['11/2013', '12/2018'],
                    initialAmount: '100000',
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
                                <div className="col-12">
                                    <MonthYearRangePicker
                                        name="period"
                                        label="Time period"
                                        startLabel="From"
                                        endLabel="To"/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <AppendInput name="initialAmount" label="Initial Amount" pender="VND"/>
                                </div>
                            </div>

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
            </div>
        )
    }
}

export default connect(
    state => {
        const tickers = tickersSelector(state);
        return ({
            tickers,
            hasFilters: !!tickers
        });
    }
)(PortfolioPage);