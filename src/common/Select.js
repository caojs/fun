import React, { Component } from 'react';
import ReactClickOutside from 'react-click-outside';
import ClickableMenu from './ClickableMenu';
import { FaBeer } from 'react-icons/fa';


export default class Select extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.delete = this.onSelect.bind(this, null);

        this.state = {
            selected: props.selected,
            showMenu: false
        };
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
        this.setState({
            selected: data
        });
    }

    render() {
        let {
            label,
            name,
            data,
        } = this.props;

        let {
            selected,
            showMenu
        } = this.state;

        return (
            <ReactClickOutside onClickOutside={this.hide}>
                <div>
                    <label>{label}</label>
                    { selected && <button onClick={this.delete}><FaBeer/></button>}

                    <button onClick={this.toggle}>Click</button>

                    {showMenu && <ClickableMenu data={data} onSelect={this.onSelect}>
                        {(item) => (selected && item.label === selected.label)
                            ? <React.Fragment>selected {item.label} </React.Fragment>
                            : <React.Fragment> {item.label} </React.Fragment>}
                    </ClickableMenu>}
                </div>
                {selected && <input name={name} value={selected.value} readOnly/>}
            </ReactClickOutside>
        );
    }
}