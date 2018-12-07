import React, { Component } from 'react';

import FilterSearch from './FilterSearch';
import FilterSort from './FilterSort';
import FilterSignal from './FilterSignal';
import FilterZone from './FilterZone';
import SelectedFilters from './SelectedFilters';

import styles from './index.module.scss';

class Filter extends Component {
    render() {
        return (
            <div className="container">
            <div className={styles.main}>
                <div className="d-flex align-items-center me-tools">
                    <div className="mr-4">
                        <FilterSearch/>
                    </div>
                    <div className="mr-4">
                        <FilterSort/>
                    </div>
                    <div className="">
                        <FilterSignal/>
                    </div>
                </div>
                <div className="w-100 border-top"></div>
                <FilterZone/>
                <SelectedFilters/>
            </div>
            </div>
        );
    }
}

export default Filter;