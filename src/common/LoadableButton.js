import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            ...rest
        } = this.props;

        let {
            isClickable,
            isLoading
        } = this.state;

        let onClick = (e) => {
            let pm = onClickPromise(e);
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
                disabled={!isClickable}>
                {children}
            </button>
        )
    }
}