import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { stateToQuery } from '../FilterPage/helpers';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { isShow: false }
    }

    toggle = () => {
        this.setState(({ isShow }) => ({ isShow: !isShow }));
    }

    render() {
        let {
            isShow
        } = this.state;
        
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-5">
                <a className="navbar-brand" href="#">Logo</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Toggle navigation"
                    onClick={this.toggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={cn("navbar-collapse d-none", { "d-block": isShow })}>
                    <div className="navbar-nav mr-auto">
                        <NavLink className="nav-item nav-link" to="/filter">Filter</NavLink>
                        <NavLink className="nav-item nav-link" to="/portfolio">Portfolio</NavLink>
                        <NavLink className="nav-item nav-link" to="/optimize">Optimize</NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}

export default connect(
    state => ({
        query: stateToQuery(state.filters)
    })
)(Navbar)