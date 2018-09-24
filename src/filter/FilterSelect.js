import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get, map } from 'lodash/fp';
import Select from '../common/Select';
import { filter_options as filterOptions } from './filter.json';

const onSelect = (filterType, filterId, optionId) => ({
    type: "ON_FILTER_SELECT",
    payload: { filterType, filterId, optionId }
});

const FilterSelect = ({label, option_ids: optionIds, ...rest}) => (
    <div>
        {label}
        <Select
            {...rest}
            options={map(id => ({ id, ...filterOptions[id]}), optionIds)}
            getOptionValue={(option) => option.id}/>
    </div>
);

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        value: get(`filters.${ownProps.filterType}.${ownProps.filterId}`, state)
    }),
    (dispatch, ownProps) => bindActionCreators({
        onSelect: (optionId) => onSelect(ownProps.filterType, ownProps.filterId, optionId)
    }, dispatch)
)(FilterSelect);