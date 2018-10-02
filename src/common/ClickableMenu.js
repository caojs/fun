import React, { Component } from 'react';
import cn from 'classnames';
import { noop, isFunction, findIndex } from 'lodash/fp';

import styles from './ClickableMenu.module.css';

export default class ClickableMenu extends Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        let parent = this.ref.current;
        let child = this.findChildIn(e.target, parent);
        let index = findIndex(c => c === child)(parent.children);

        let {
            data,
            onSelect
        } = this.props;

        if (index >= 0 && isFunction(onSelect))
        {
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
            defaultSelectedIndex = -1
        } = this.props;

        if (!Array.isArray(data)){
            throw new Error("Wrong type");
        }

        if (!isFunction(children)) {
            children = noop;
        }

        return (
            <ul
                className={cn("dropdown-menu", styles.list)}
                ref={this.ref}
                onClick={this.onClick}>
                {data.map((item, index) => {
                    let isSelected = defaultSelectedIndex === index;
                    return (
                        <li className={cn("dropdown-item", {selected: isSelected}, styles.listItem)}
                            key={index}>
                            {children(item, isSelected)}
                        </li>
                    );
                })}
            </ul>
        );
    }
}