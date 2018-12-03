import React, { Component } from 'react';

import styles from './PostsPage.module.scss';

export default class PostsPage extends Component {
    render() {
        return (
            <div className={styles.main}>
                <section className="me-title-section">
                    <div className="container text-center">
                        <h1 className="text-secondary">Tin Tức</h1>
                    </div>
                </section>
                <section className="me-content-section">
                    <div className="container">

                    </div>
                </section>
           </div>
        )
    }
}