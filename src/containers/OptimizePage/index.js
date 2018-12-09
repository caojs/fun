import React, { Component } from 'react';

import PageHeader from '../../components/PageHeader';
import FormZone from './FormZone';

class OptimizePage extends Component {
    constructor(props) {
        super(props);
        const { location: { search } } = props;

        this.state = {
            tickers: ~search.indexOf('?') ?
                search.substring(1).split(',') :
                ['']
        }
    }

    render() {
        return (
            <>
            <PageHeader title="Optimization"/>
            <FormZone tickers={this.state.tickers}/>
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
            </>
        )
    }
}

export default OptimizePage;