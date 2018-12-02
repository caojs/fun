import React, { Component } from 'react';

import styles from './Footer.module.scss';

export default class Footer extends Component {
    render() {
        return (
            <footer className={styles.main}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="text-white mb-0">Copyright © 2018 XQuant.</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}