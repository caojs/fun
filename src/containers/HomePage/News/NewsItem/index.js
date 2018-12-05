import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import slugify from 'slugify';

import styles from './NewsItem.module.scss';

export default function NewsItem(props) {
    const {
        id,
        title,
        description,
        thumbnailUrl,
        createdAt
    } = props;

    const slug = slugify(title);

    return (
        <div className={styles.main}>
            <div className="card">
                <img className="card-img-top" src={thumbnailUrl} alt="thumbnail"/>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link to={`/news/${slug}.${id}`}>{title}</Link>
                    </h4>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">{createdAt}</small></p>
                </div>
            </div>
        </div>
    )
}