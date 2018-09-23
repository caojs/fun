import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash/fp';
import Select from '../common/Select';

const onSelect = (type, name) => (value) => ({
    type: "ON_FILTER_SELECT",
    payload: { type, name, value }
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
        defaultValue: get(`filters.${ownProps.type}.${ownProps.name}`, state)
    }),
    (dispatch, ownProps) => bindActionCreators({
        onSelect: onSelect(ownProps.type, ownProps.name)
    }, dispatch)
)(FilterSelect);