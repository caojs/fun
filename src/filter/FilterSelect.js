import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get, map } from 'lodash/fp';
import Select from '../common/Select';
import { actions } from '../ducks/filters';
import { filter_options as filterOptions } from '../data/filter.json';

const FilterSelect = ({label, option_ids: optionIds, ...rest}) => (
    <div className="filter-select">
        <span>{label}</span>
        <Select
            {...rest}
            options={map(id => ({ id, ...filterOptions[id]}), optionIds)}
            getOptionValue={(option) => option.id}/>
    </div>
);

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        value: get(`filters.main.${ownProps.filterType}.${ownProps.filterId}`, state)
    }),
    (dispatch, ownProps) => bindActionCreators({
        onSelect: (optionId) => actions.onSelect(ownProps.filterType, ownProps.filterId, optionId)
    }, dispatch)
)(FilterSelect);