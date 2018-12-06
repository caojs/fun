import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import FilterTag from './FilterTag';
import styles from './FilterActived.module.css';
import { selectedFiltersSelector } from '../../selectors';

class SelectedFilters extends Component {
    render() {
        let { selectedFilters } = this.props;
        return (
            selectedFilters.length > 0 ?
                (<>
                    <div className={styles.filters}>
                        <span>Activated Filters:</span>
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
                </>):
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
)(SelectedFilters)