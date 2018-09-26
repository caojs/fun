import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';

import { FilterSummary } from './FilterSummary';

class FilterCustom extends Component {
    render() {
        let {
            results: { response, error }
        } = this.props;

        if (error) {
            return <div>Error!</div>
        }

        let {
            headers = [],
            body = []
        } = response;

        return (
            <div></div>
        )
    }
}

export default connect(
    (state) => ({ results: get('filters.results', state) })
)(FilterCustom);