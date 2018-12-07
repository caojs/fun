import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageHeader from '../../components/PageHeader';
import Filter from './Filter';
import FilterResult from './FilterResult';
import LoadableButton from '../../components/common/LoadableButton';
import { applyFilters } from './actions';
import { stateToQuery } from './helpers';

class FilterPage extends Component {
    constructor(props) {
        super(props);
        this.onFilter = this.onFilter.bind(this);
    }

    onFilter() {
        const {
            history,
            applyFilters,
            query
        } = this.props;

        return applyFilters()
            .then(() => {
                if (query) history.push('/filter?' + query)
            })
    }

    componentDidMount() {
        let {
            query,
            applyFilters
        } = this.props;
        if (query) {
            applyFilters();
        }
    }


    render() {
        return (
            <>
            <PageHeader title="Filter"/>
            <div className="mb-4">
                <Filter/>
            </div>
            <div className="text-center mb-4">
                <LoadableButton
                    className="btn btn-primary"
                    onClickPromise={this.onFilter}>
                    Apply
                </LoadableButton>
            </div>
            <div className="mb-4">
                <FilterResult/>
            </div>
            </>
        );
    }
}

export default connect(

    (state) => {
        let query = stateToQuery(state.filters || {});
        return ({
            query
        });
    },
    {
        applyFilters
    }
)(FilterPage);