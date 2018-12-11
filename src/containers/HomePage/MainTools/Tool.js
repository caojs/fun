import React from 'react';
import { Link } from 'react-router-dom';
import ToolIcon from './ToolIcon';

import styles from './Tool.module.scss';

export default function Tool(props) {
    const {
        icon,
        title,
        text,
        link
    } = props;

    return (
        <div className={styles.main}>
            <div className="card">
                <div className="text-center" src=".../100px160/" alt="Card image cap">
                    <ToolIcon icon={icon}/>
                </div>
                <div className="card-body">
                    <h4 className="card-title text-center">{title}</h4>
                    <p className="card-text text-muted">{text}</p>
                    <p>Comming soon</p>
                    {/* <Link to={link} className="card-link">View</Link> */}
                </div>
            </div>
        </div>
    )
}