import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flow, get, map, flatMap, toPairs, omitBy, isNil } from 'lodash/fp';
import FilterTag from './FilterTag';
import { filter_list as filterList, filter_options as filterOptions } from '../data/filter.json';
import styles from './FilterActived.module.css';

class ActivatedFilters extends Component {
    render() {
        let {activatedFilters} = this.props;
        return (
            activatedFilters.length > 0 ?
                (<div className="cm-zone">
                    <span className="cm-heading">Active filters:</span>
                    <div className={styles.filters}>
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
                </div>):
                null);
    }
}

export default connect(
    (state, ownProps) => {

        let activatedFilters = flow(
            get('filters.main'),
            toPairs,
            map(([filterType, o]) => [filterType, toPairs(omitBy(isNil, o))]),
            flatMap(([filterType, list]) => map(([filterId, optionId]) => ({filterType, filterId, optionId}), list))
        )(state);

        return {
            ...ownProps,
            activatedFilters
        };
    }
)(ActivatedFilters)