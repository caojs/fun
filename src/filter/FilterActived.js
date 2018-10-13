import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flow, get, map, flatMap, toPairs, omitBy, isNil } from 'lodash/fp';
import FilterTag from './FilterTag';
import { filter_list as filterList, filter_options as filterOptions } from '../data/filter.json';
import styles from './FilterActived.module.css';

class ActivatedFilters extends Component {
    render() {
        let {
            selectedFilters,
            filterOptions
        } = this.props;
        return (
            selectedFilters.length > 0 ?
                (<div className="cm-zone">
                    <span className="cm-heading">Active filters:</span>
                    <div className={styles.filters}>
                        {selectedFilters.map(value => {
                            let {
                                id,
                                selectLabel,
                                label
                            } = filterOptions[value];
                            return (
                                <FilterTag
                                    key={id}
                                    value={value}
                                    label={`${selectLabel} : ${label}`}/>);
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
            filterOptions: state.entities.filterOptions,
            selectedFilters: state.filters.selectedFilters
        };
    }
)(ActivatedFilters)