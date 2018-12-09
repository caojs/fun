import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import OptimizationGoal from '../OptimizationGoal';
import PortfolioAssets from '../PortfolioAssets';

import schema from './schema';
import styles from './index.module.scss';

export default class FormZone extends Component {
    render() {
        const { tickers } = this.props;

        return (
            <div className="container">
            <div className={styles.main}>
            <Formik
                validationSchema={schema}
                initialValues={{
                    optimize: {
                        tickers: tickers,
                        allocations: []
                    }
                }}

                onSubmit={(values) => { console.log(values); }}

                render={(_props) => {
                    return (
                        <Form>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <OptimizationGoal/>
                                </div>
                            </div>

                            {/* {hasFilters && <div className="row mb-2">
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
                            </div>} */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <PortfolioAssets
                                        set={'optimize'}
                                        portfolios={[1]}/>
                                </div>
                            </div>
                            
                        </Form>
                    )
                }}
            />
            </div>
            </div>
        )
    }
}