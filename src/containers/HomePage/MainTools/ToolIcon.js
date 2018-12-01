import React from 'react';
import { IconContext } from 'react-icons';
import { FaCircle } from 'react-icons/fa';
import cn from 'classnames';

import styles from './ToolIcon.module.scss';

export default function ToolIcon({ icon, className }) {
    return (
        <div className={cn(className, styles.main)}>
            <IconContext.Provider value={{ className:"me-circle-icon" }}><FaCircle/></IconContext.Provider>
            <div className="me-tool">
                <IconContext.Provider value={{ className:"me-tool-icon" }}>{icon}</IconContext.Provider>
            </div>
        </div>
    )
}

