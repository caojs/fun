import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash-es';

import styles from './SelectableList.module.css';

export default class SelectableList extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        children: PropTypes.func.isRequired,
        value: PropTypes.array,
        onSelect: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        let parent = this.ref.current;
        let child = this.findChildIn(e.target, parent);
        let index = [].slice
            .call(parent.children)
            .findIndex(c => c === child);

        if (index >= 0)
        {
            let {
                data,
                onSelect
            } = this.props;

            onSelect(data[index], index);
        }
    }

    findChildIn(target, parent) {
        if (target === parent) return null;

        while(target.parentElement !== null && target.parentElement !== parent)
        {
            target = target.parentElement;
        }

        return target;
    }

    render() {
        let {
            children,
            data,
            value
        } = this.props;

        return (
            <ul
                className={styles.main}
                ref={this.ref}
                onClick={this.onClick}>
                {data.map((item, index) => {
                    let hasInValue = some(value, item);
                    return (
                        <li className={styles.item} key={index}>
                            {children(item, hasInValue)}
                        </li>);
                })}
            </ul>
        );
    }
}