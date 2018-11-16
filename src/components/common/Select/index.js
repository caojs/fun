import React, { Component } from 'react';
import ReactClickOutside from 'react-click-outside';
import cn from 'classnames';
import { noop, find, findIndex, isFunction } from 'lodash-es';
import { FiChevronDown, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ClickableMenu from '../ClickableMenu';
import styles from './Select.module.css';

const propTypes = {
    options: PropTypes.array,
    onSelect: PropTypes.func,
    getOptionLabel: PropTypes.func,
    getOptionValue: PropTypes.func,
    value: PropTypes.string
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

        this.renderDeleteIconPartial = this.renderDeleteIconPartial.bind(this);
        this.renderDropDownIcon = this.renderDropDownIcon.bind(this);
        this.renderDropdownMenuPartial = this.renderDropdownMenuPartial.bind(this);
        this.renderOptionLabelPartial = this.renderOptionLabelPartial.bind(this);
    }

    _findSelectedOption(value) {
        let {
            options,
            getOptionValue
        } = this.props;

        return value
            ? find(options, option => getOptionValue(option) === value)
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

        this.hide();
        if (onSelect)
            onSelect(getOptionValue(data));
    }

    renderDeleteIconPartial(selectedOption) {
        return (props) => {
            return (
                selectedOption && <span {...props} onClick={this.delete}>
                    <FiX/>
                </span>
            );
        };
    }

    renderDropDownIcon(props) {
        return (
            <span {...props} onClick={this.toggle}>
                <FiChevronDown/>
            </span>
        );
    }

    renderOptionLabelPartial(selectedOption) {
        let { getOptionLabel } = this.props;
        return (props) => {
            return (
                selectedOption && <span {...props}>
                    {getOptionLabel(selectedOption)}
                </span>
            )
        };
    }

    renderDropdownMenuPartial(options, isShowMenu, selectedIndex) {
        let { getOptionLabel } = this.props;
        return (props) => {
            return (
                <div {...props}>
                    {isShowMenu &&
                        <ClickableMenu
                            data={options}
                            onSelect={this.onSelect}
                            defaultSelectedIndex={selectedIndex}>
                            {(item, isSelected) => {
                                let label = getOptionLabel(item);
                                let klass = cn("select-dropdown-item", { selected: isSelected });
                                return <span className={klass}> {label} </span>
                            }}
                        </ClickableMenu>}
                </div>
            );
        };
    }

    render() {
        let {
            options,
            value,
            getOptionValue,
            className,
            children,
        } = this.props;

        let { showMenu } = this.state;
        let selectedOption = this._findSelectedOption(value);

        let selectedIndex = selectedOption
            ? findIndex(options, option => getOptionValue(option) === getOptionValue(selectedOption))
            : -1;
        
        let DropDownIcon = this.renderDropDownIcon;
        let OptionLabel = this.renderOptionLabelPartial(selectedOption);
        let DeleteIcon = this.renderDeleteIconPartial(selectedOption);
        let DropDownMenu = this.renderDropdownMenuPartial(options, showMenu, selectedIndex);
        
        let component = isFunction(children) ?
            children({
                OptionLabel ,
                DeleteIcon,
                DropDownIcon,
                DropDownMenu
            }) :
            (<React.Fragment>
                <div className={cn("select__main", styles.main)}>
                    <OptionLabel className={cn("select__option-label", styles.label)}/>

                    <div className={cn("select__main-buttons", styles.buttons)}>
                        <DeleteIcon className={cn("select__delete-icon", styles.deleteIcon)}/>
                        <DropDownIcon className={cn("select__dropdown-icon", styles.dropdownIcon)}/>
                    </div>
                </div>
                <div className={cn("select__dropdown", styles.dropdown)}>
                    <DropDownMenu className={cn("select__dropdown-menu", styles.dropdownInner)}/>
                </div>
            </React.Fragment>);

        return (
            <ReactClickOutside className={cn("select", className)} onClickOutside={this.hide}>
                {component}               
            </ReactClickOutside>
        );
    }
}