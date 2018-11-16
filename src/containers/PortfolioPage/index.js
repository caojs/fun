import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { MonthYearRangePicker, AppendInput, CustomSelect } from '../../components/Formiks';
import PeriodicAdjustment from './PeriodicAdjustment';
import Rebalancing from './Rebalancing';
import Benchmark from './Benchmark';
import Allocations from './Allocations';

import schema from './schema';

const Left = 'left';
const Right = 'right';

class PortfolioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: Left,
            portfolios: [1, 2, 3],
            [Left]: {
                tickers: ['A', 'B', 'C'],
                allocations: []
            },
            [Right]: {
                tickers: [''],
                allocations: []
            }
        };
        
        this.changeSide = this.changeSide.bind(this)
    }

    changeSide(e) {
        this.setState({
            set: e.target.checked ? Left : Right
        });
    }

    render() {
        let {
            set,
            portfolios
         } = this.state;

         let {
             tickers,
             allocations
        } = this.state[set];

        return (
            <Formik
                key={set}
                validationSchema={schema}
                initialValues={{
                    period: ['11/2013', '12/2018'],
                    initialAmount: '100000',
                    ...this.state[set]
                }}

                onSubmit={(values) => { console.log(values); }}

                render={({ values, errors }) => {
                    console.log(errors);
                    // no need to setState.
                    this.state[set] = values;

                    return (
                        <Form>
                            <div className="custom-control custom-checkbox mb-4">
                                <input
                                    id="checktest"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={set === Left}
                                    onChange={this.changeSide}/>
                                <label className="custom-control-label" htmlFor="checktest">Test</label>
                            </div>

                            <div className="row mb-4">
                                <div className="col-8">
                                    <MonthYearRangePicker
                                        name="period"
                                        label="Time period"
                                        startLabel="From"
                                        endLabel="To"/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-4">
                                    <AppendInput name="initialAmount" label="Initial Amount" pender="VND"/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-4">
                                    <PeriodicAdjustment/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-4">
                                    <Rebalancing/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-4">
                                    <Benchmark/>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-12">
                                    <Allocations
                                        portfolios={portfolios}
                                        tickers={tickers}
                                        allocations={allocations} />
                                </div>
                            </div>
                            <button type="submit">Submit</button>
                        </Form>
                    )
                }}
            />
        )
    }
}

export default PortfolioPage;