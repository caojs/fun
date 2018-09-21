import React, { Component } from 'react';
import ReactClickOutside from 'react-click-outside';
import ClickableMenu from './ClickableMenu';
import { FaBeer } from 'react-icons/fa';


export default class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: props.selectedIndex || -1,
            showMenu: false
        };

        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.delete = this.onSelect.bind(this, -1);
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

    onSelect(data, index) {
        this.setState({
            selectedIndex: index
        });

        let {
            onSelect,
            name
        } = this.props;

        if (onSelect)
            onSelect(name, data.value);
    }

    render() {
        let {
            label,
            name,
            data,
        } = this.props;

        let {
            selectedIndex,
            showMenu
        } = this.state;

        let hasSelected = selectedIndex >= 0;
        var selectedItem = hasSelected && data[selectedIndex];

        return (
            <ReactClickOutside onClickOutside={this.hide}>
                <div>
                    <label>{label}</label>
                    {hasSelected && <button onClick={this.delete}><FaBeer/></button>}

                    <button onClick={this.toggle}>Click</button>

                    {showMenu &&
                        <ClickableMenu
                            data={data}
                            onSelect={this.onSelect}
                            defaultSelectedIndex={selectedIndex}>
                            {(item, isSelected) => isSelected
                                ? <React.Fragment> {item.label} v </React.Fragment>
                                : <React.Fragment> {item.label} </React.Fragment>}
                        </ClickableMenu>}
                </div>
                {selectedItem && <input name={name} value={selectedItem.value} readOnly/>}
            </ReactClickOutside>
        );
    }
}