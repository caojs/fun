import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flow, map, flatMap, toPairs, omitBy, isNil } from 'lodash/fp';
import FilterTag from './FilterTag';
import {
    filter_list as filterList,
    filter_options as filterOptions 
} from '../filter/filter.json';

class ActivatedFilters extends Component {
    render() {
        let {activatedFilters} = this.props;
        return (
            <div>
                {activatedFilters.map(({ filterType, filterId, optionId }) => {
                    let { label: filterLabel } = filterList[filterId];
                    let { label: optionLabel } = filterOptions[optionId];
                    return (
                        <FilterTag
                            key={filterId}
                            filterType={filterType}
                            filterId={filterId}
                            label={`${filterLabel} : ${optionLabel}`}/>);
                })}
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => {
        let { filters = {} } = state;

        let activatedFilters = flow(
            toPairs,
            map(([filterType, o]) => [filterType, toPairs(omitBy(isNil, o))]),
            flatMap(([filterType, list]) => map(([filterId, optionId]) => ({filterType, filterId, optionId}), list))
        )(filters);

        return {
            ...ownProps,
            activatedFilters
        }
    }
)(ActivatedFilters)