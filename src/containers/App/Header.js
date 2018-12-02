import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { stateToQuery } from '../FilterPage/helpers';

import styles from './Header.module.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { isShow: false }
    }

    toggle = () => {
        this.setState(({ isShow }) => ({ isShow: !isShow }));
    }

    render() {
        let { query } = this.props;
        let { isShow } = this.state;
        
        return (
            <header className={cn(styles.main)}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav className="navbar navbar-expand-md navbar-dark">
                                <NavLink className="navbar-brand mr-4" to="/">Logo</NavLink>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    aria-label="Toggle navigation"
                                    onClick={this.toggle}>
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className={cn("navbar-collapse d-none", { "d-block": isShow })}>
                                    <div className="navbar-nav mr-auto">
                                        <NavLink
                                            className="nav-item nav-link"
                                            to={"/filter" + (query ? "?" + query : "")}
                                            isActive={(_, { pathname }) => pathname === '/filter'}>
                                            Filter
                                        </NavLink>
                                        <NavLink className="nav-item nav-link" to="/portfolio">Portfolio</NavLink>
                                        <NavLink className="nav-item nav-link" to="/optimization">Optimization</NavLink>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(connect(
    state => ({
        query: stateToQuery(state.filters)
    })
)(Header));