import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { MonthYearRangePicker, AppendInput, CustomSelect } from '../../components/Formiks';
import PeriodicAdjustment from './PeriodicAdjustment';
import Rebalancing from './Rebalancing';
import Benchmark from './Benchmark';
import Allocations from './Allocations';

import schema from './schema';

const On = 'on';
const Off = 'off';

class PortfolioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: On,
            portfolios: [1, 2, 3],
        };
        
        this.changeSide = this.changeSide.bind(this)
    }

    changeSide(e) {
        this.setState({
            set: e.target.checked ? On : Off
        });
    }

    render() {
        let {
            set,
            portfolios
         } = this.state;

        return (
            <Formik
                validationSchema={schema}
                initialValues={{
                    period: ['11/2013', '12/2018'],
                    initialAmount: '100000',
                    [On]: {
                        tickers: ['A', 'B', 'C'],
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
                            <div className="custom-control custom-checkbox mb-4">
                                <input
                                    id="checktest"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={set === On}
                                    onChange={this.changeSide}/>
                                <label className="custom-control-label" htmlFor="checktest">Use filter results</label>
                            </div>

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
                                    <Allocations
                                        key={set}
                                        set={set}
                                        portfolios={portfolios}/>
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

export default PortfolioPage;