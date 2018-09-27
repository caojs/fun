import React, { Component } from 'react';
import { findIndex, filter } from 'lodash/fp';
import PropTypes from 'prop-types';
import SelectableList from './SelectableList';

export default class MultiSelectableList extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        value: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(item) {
        let {
            value,
            onChange
        } = this.props;

        const index = findIndex(v => v === item, value);

        if (index >= 0) {
            value = value.slice();
            value.splice(index, 1);
        }
        else {
            value = [...value, item];
        }
        
        onChange(value);
    }

    render() {
        let {
            data,
            children,
            value
        } = this.props;

        return (
            <SelectableList
                data={data}
                value={value}
                onSelect={this.onSelect}
                children={children}/>
        )
    }
}