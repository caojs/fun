import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import FilterTag from './FilterTag';
import { selectedFiltersSelector } from '../../selectors';

import styles from './index.module.scss';

class SelectedFilters extends Component {
    render() {
        let { selectedFilters } = this.props;
        return (
            selectedFilters.length > 0 ?
                (<>
                    <div className={styles.main}>
                        <span className="d-block me-label">Activated Filters:</span>
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