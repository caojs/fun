import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { filterQuerySelector, tickersSelector } from '../FilterPage/selectors';

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
        let {
            query,
            tickers
        } = this.props;
        let { isShow } = this.state;

        const filterLink = `/filter${query ? "?" + query : ""}`;
        const optimizationLink = `/optimization${tickers.length ? "?" + tickers.join(','): ""}`;
        
        return (
            <header className={cn(styles.main)}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav className="navbar navbar-expand-md navbar-dark pl-0 pr-0">
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
                                            to={filterLink}
                                            isActive={(_, { pathname }) => pathname === '/filter'}>
                                            Filter
                                        </NavLink>
                                        <NavLink
                                            className="nav-item nav-link"
                                            to={optimizationLink}
                                            isActive={(_, { pathname }) => pathname === '/optimization'}>
                                            Optimization
                                        </NavLink>
                                        <NavLink className="nav-item nav-link" to="/portfolio">Portfolio</NavLink>
                                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                                        <NavLink className="nav-item nav-link" to="/register">Login</NavLink>
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
        query: filterQuerySelector(state),
        tickers: tickersSelector(state)
    })
)(Header));