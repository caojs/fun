import React from 'react';

import styles from './index.module.scss';

export default function PageHeader(props) {
    const {
        title,
        subTitle
    } = props;

    return (
        <section className={styles.main}>
            <div className="text-center">
                <h1 className="ph-title">{title}</h1>
                {subTitle && <p className="ph-subtitle">{subTitle}</p>}
            </div>
        </section>
    )
}