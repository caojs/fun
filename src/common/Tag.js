import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string.isRequired,
    onRemove: PropTypes.func
}

export default class Tag extends Component {
    static propTypes = propTypes;

    render() {
        let {
            label,
            onRemove
        } = this.props;
        return (
            <div>
                {label}
                {onRemove && <span onClick={onRemove}>remove</span>}
            </div>
        )
    }
}