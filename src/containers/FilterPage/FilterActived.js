import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterTag from './FilterTag';
import styles from './FilterActived.module.css';
import { selectedFiltersSelector } from './selectors';

class ActivatedFilters extends Component {
    render() {
        let { selectedFilters } = this.props;
        return (
            selectedFilters.length > 0 ?
                (<div className="cm-zone">
                    <span className="cm-heading">Active filters:</span>
                    <div className={styles.filters}>
                        {selectedFilters.map(filter => {
                            let {
                                id,
                                selectLabel,
                                label,
                                value
                            } = filter;
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

        return {
            ...ownProps,
            selectedFilters: selectedFiltersSelector(state)
        };
    }
)(ActivatedFilters)