import React, { Component } from 'react';
import { isFunction } from 'lodash/fp';
import MessageAlert, { Err } from './MessageAlert';

export default class ErrorWrapper extends Component {
    render() {
        let {
            error,
            children
        } = this.props;

        return (!!error) ?
            <MessageAlert type={Err} message="There are something wrong!"/> :
            isFunction(children) ? children() : children;
    }
}