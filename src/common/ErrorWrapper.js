import React, { Component } from 'react';
import { isFunction } from 'lodash/fp';

export default class ErrorWrapper extends Component {
    render() {
        let {
            error,
            children
        } = this.props;

        return (!!error) ?
            <div>Error</div> :
            isFunction(children) ? children() : children;
    }
}