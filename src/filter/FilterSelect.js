import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get, map } from 'lodash/fp';
import Select from '../common/Select';
import { actions } from '../ducks/filters';
import { filter_options as filterOptions } from '../data/filter.json';

import styles from './FilterSelect.module.css';

const FilterSelect = ({ label, option_ids: optionIds, ...rest }) => {
    return (
        <Select
            {...rest}
            options={map(id => ({ id, ...filterOptions[id]}), optionIds)}
            getOptionValue={(option) => option.id}>
            {({ OptionLabel, DropDownIcon, DropDownMenu }) => {
                return <React.Fragment>
                    <div>
                        <div className={styles.frame}>
                            <span className={styles.label}>{label}</span>
                            <DropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <DropDownMenu className={styles.dropdown}/>
                    </div>
                    <OptionLabel className={styles.optionLabel}/>
                </React.Fragment>
            }}
        </Select>
    )
};

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        value: get(`filters.main.${ownProps.filterType}.${ownProps.filterId}`, state)
    }),
    (dispatch, ownProps) => bindActionCreators({
        onSelect: (optionId) => actions.onSelect(ownProps.filterType, ownProps.filterId, optionId)
    }, dispatch)
)(FilterSelect);