import React, { Component } from 'react';
import { flow, map, filter, findIndex } from 'lodash/fp';

import FilterSummary from './FilterSummary';
import FilterCustomSelect from './FilterCustomSelect';

const getter = (customHeaderIds) => (headers = [], body = []) => {
    let indexs = flow(
        map(id => findIndex(header => header.id === id, headers)),
        filter(idx => idx !== -1)
    )(customHeaderIds);
    let newHeaders = map(idx => headers[idx], indexs);
    let newBody = map((row) => map(idx => row[idx], indexs), body);
    return {
        headers: newHeaders,
        body: newBody
    };
};

let count = 0;

export default class FilterCustom extends Component {
    render() {
        let {
            response,
            customHeaderIds = []
        } = this.props;

        let {
            headers = [],
            body = []
        } = getter(customHeaderIds)(response.headers, response.body);

        return (
            <div>
                <div>
                    <FilterCustomSelect/>
                </div>
                <FilterSummary
                    key={count++}
                    {...this.props}
                    response={{
                        ...response,
                        headers,
                        body
                    }}/>
            </div>
        );
    }
}