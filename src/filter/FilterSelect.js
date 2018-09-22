import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash/fp';
import Select from '../common/Select';

const onSelect = (name) => (value) => ({
    type: "ON_FILTER_SELECT",
    payload: { name, value }
});

const FilterSelect = (props) => (
    <div>
        {props.label}
        <Select {...props} />
    </div>
)

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        defaultValue: get(`filter.${ownProps.name}`, state)
    }),
    (dispatch, ownProps) => bindActionCreators({
        onSelect: onSelect(ownProps.name)
    }, dispatch)
)(FilterSelect);