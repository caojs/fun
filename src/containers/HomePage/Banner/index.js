import React, { Component } from 'react';
import cn from 'classnames';

import styles from './Banner.module.scss';

export default class Banner extends Component {
    render() {
        return (
            <header className={cn(styles.main, "bg-dark")}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className="text-center font-45 text-primary me-name">XQuant</h1>
                            <p className="text-white text-center font-24 me-description">Sit in dicta suscipit consectetur asperiores sed blanditiis quaerat.</p>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}