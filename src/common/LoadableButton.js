import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isPromise from 'is-promise';

export default class LoadableButton extends Component {
    static propTypes = {
        onClickPromise: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            isClickable: true,
            isLoading: false
        };
    }

    render() {
        let {
            children,
            onClickPromise,
            disabled,
            ...rest
        } = this.props;

        let { isClickable } = this.state;

        let onClick = (e) => {
            let pm = onClickPromise(e);

            if (!isPromise(pm)) {
                pm = Promise.resolve(pm);
            }

            this.setState({
                isClickable: false,
                isLoading: true
            });

            return pm
                .finally(() => {
                    this.setState({
                        isClickable: true,
                        isLoading: false
                    });
                });
        }

        return (
            <button
                {...rest}
                onClick={onClick}
                disabled={disabled || !isClickable}>
                {children}
            </button>
        )
    }
}