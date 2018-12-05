import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import slugify from 'slugify';
import fecha from 'fecha';

import styles from './NewsItem.module.scss';

export default function NewsItem(props) {
    const {
        id,
        title,
        description,
        thumbnailUrl,
        createdAt
    } = props;

    const linkTo = `/news/${slugify(title)}.${id}`;
    
    const createdDate = fecha.format(createdAt, 'DD/MM/YYYY');

    return (
        <article className={cn(styles.main, "d-flex")}>
            <div className="card pl-0 pr-0">
                <Link className="card-img-link" to={linkTo}>
                    <img className="card-img-top" src={thumbnailUrl} alt="thumbnail"/>
                </Link>
                <div className="card-body">
                    <Link to={linkTo}>
                        <h4 className="card-title">{title}</h4>
                        <p className="card-text mb-3">{description}</p>
                    </Link>
                    <p className="card-text text-right"><small className="text-muted">{createdDate}</small></p>
                </div>
            </div>
        </article>
    )
}