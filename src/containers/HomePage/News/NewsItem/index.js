import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './NewsItem.module.scss';

export default function NewsItem(props) {
    const {
        thumbnail,
        title,
        description,
        date
    } = props;

    return (
        <div className={styles.main}>
            <div className="card">
                <img className="card-img-top" src={thumbnail} alt="thumbnail"/>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link to="/">{title}</Link>
                    </h4>
                    <p className="card-text">{description}</p>
                    <p class="card-text"><small class="text-muted">{date}</small></p>
                </div>
            </div>
        </div>
    )
}