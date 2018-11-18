import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { MonthYearRangePicker } from '../../components/Formiks';
import OptimizationGoal from './OptimizationGoal';
import AssetConstraints from './AssetConstraints';
import ComparedAllocation from './ComparedAllocation';
import Benchmark from '../PortfolioPage/Benchmark';
import PortfolioAssets from './PortfolioAssets';

import schema from './schema';

class OptimizePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Formik
                validationSchema={schema}
                initialValues={{
                    period: ['11/2013', '12/2018'],
                    initialAmount: '100000',
                    optimize: {
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
                                    <OptimizationGoal/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <AssetConstraints/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-6">
                                    <ComparedAllocation/>
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
                                        set={'optimize'}
                                        portfolios={[1]}/>
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

export default OptimizePage;