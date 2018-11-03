import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isPromise from 'is-promise';
import { FiLoader } from 'react-icons/fi';

import styles from './LoadableButton.module.css';

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
            className,
            ...rest
        } = this.props;

        let {
            isClickable,
            isLoading
        } = this.state;

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
                className={cn(className, styles.button)}
                onClick={onClick}
                disabled={disabled || !isClickable}>
                {isLoading ?
                    <span className={cn("loadablebutton__icon", styles.loadingIcon)}><FiLoader/></span> :
                    children}
            </button>
        )
    }
}