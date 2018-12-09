import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';

import styles from './index.module.scss';

export default function AuthenticationButtons() {
    return (
        <div className={cn(styles.main, "d-inline-flex align-items-center")}>
            <NavLink className="ab-link" to="/login">Login</NavLink>
            <span class="ab-seperator font-4"><FaCircle/></span>
            <NavLink className="ab-link" to="/register">Register</NavLink>
        </div>
    )
}