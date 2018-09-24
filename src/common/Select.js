import React, { Component } from 'react';
import ReactClickOutside from 'react-click-outside';
import { noop, find, findIndex } from 'lodash/fp';
import PropTypes from 'prop-types';
import ClickableMenu from './ClickableMenu';

const propTypes = {
    options: PropTypes.array,
    onSelect: PropTypes.func,
    getOptionLabel: PropTypes.func,
    getOptionValue: PropTypes.func,
    defaultValue: PropTypes.string
};

const defaultProps = {
    options: [],
    onSelect: noop,
    getOptionLabel: (option) => option.label,
    getOptionValue: (option) => option.value,
};

export default class Select extends Component {
    static propTypes = propTypes;

    static defaultProps = defaultProps;

    constructor(props) {
        super(props);

        this.state = {};

        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.delete = this.onSelect.bind(this, -1);
    }

    _findSelectedOption(value) {
        let {
            options,
            getOptionValue
        } = this.props;

        return value
            ? find(option => getOptionValue(option) === value, options)
            : null;
    }

    toggle() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    hide() {
        this.setState({
            showMenu: false
        });
    }

    onSelect(data) {
        let {
            onSelect,
            getOptionValue
        } = this.props;

        if (onSelect)
            onSelect(getOptionValue(data));
    }

    render() {
        let {
            options,
            value,
            getOptionLabel,
            getOptionValue
        } = this.props;

        let { showMenu } = this.state;
        let selectedOption = this._findSelectedOption(value);

        let selectedIndex = selectedOption
            ? findIndex(option => getOptionValue(option) === getOptionValue(selectedOption), options)
            : -1;

        return (
            <ReactClickOutside onClickOutside={this.hide}>
                <div>
                    {selectedOption && <span>{getOptionLabel(selectedOption)}</span>}

                    <div>
                        {selectedOption && <button onClick={this.delete}>clear</button>}

                        <button onClick={this.toggle}>dropdown</button>
                    </div>
                </div>
                {showMenu &&
                    <ClickableMenu
                        data={options}
                        onSelect={this.onSelect}
                        defaultSelectedIndex={selectedIndex}>
                        {(item, isSelected) => {
                            let label = getOptionLabel(item);
                            return isSelected
                                ? <React.Fragment> {label} v </React.Fragment>
                                : <React.Fragment> {label} </React.Fragment>
                        }}
                    </ClickableMenu>}
            </ReactClickOutside>
        );
    }
}