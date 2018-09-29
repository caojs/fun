import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { IoMdClose } from 'react-icons/io';

import styles from './Tag.module.css';

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
            <div className={cn("tag", styles.tag)}>
                <span className={cn("tag__label", styles.tagLabel)}>{label}</span>
                {onRemove &&
                    <span className={cn("tag__remove", styles.tagRemove)} onClick={onRemove}>
                        <IoMdClose/>
                    </span>}
            </div>
        )
    }
}