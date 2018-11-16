import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { MonthYearInput, MonthYearRangePicker } from '../../components/Formiks';
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
                    ...this.state[set]
                }}

                onSubmit={(values) => { console.log(values); }}

                render={({ values }) => {
                    // no need to setState.
                    this.state[set] = values;

                    return (
                        <Form>
                            <div className="row">
                                <div className="col-12">
                                    <MonthYearRangePicker
                                        name="period"
                                        label="Time period"
                                        startLabel="From"
                                        endLabel="To"/>
                                </div>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="checktest"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={set === Left}
                                    onChange={this.changeSide}/>
                                <label className="custom-control-label" htmlFor="checktest">Test</label>
                            </div>
                            <Allocations
                                portfolios={portfolios}
                                tickers={tickers}
                                allocations={allocations} />
                            <button type="submit">Submit</button>
                        </Form>
                    )
                }}
            />
        )
    }
}

export default PortfolioPage;