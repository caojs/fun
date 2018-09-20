import React, { Component } from 'react';
import noop from 'lodash/fp/noop';
import isFunction from 'lodash/fp/isFunction';
import findIndex from 'lodash/fp/findIndex';

export default class ItemList extends Component {
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
            onSelect(data[index]);
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
            data
        } = this.props;

        if (!Array.isArray(data)){
            throw new Error("Wrong type");
        }

        if (!isFunction(children)) {
            children = noop;
        }

        return (
            <ul ref={this.ref} onClick={this.onClick}>
                {data.map((item, index) => <li key={index}> {children(item)} </li>)}
            </ul>
        );
    }
}