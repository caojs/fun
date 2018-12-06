import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cn from 'classnames';

import FilterSearch from './FilterSearch';
import FilterSort from './FilterSort';
import FilterSignal from './FilterSignal';
import FilterSelect from './FilterSelect';
import SelectedFilters from './SelectedFilters';
import { filtersSelector, selectedFiltersSelector, countSelectedFiltersSelector } from '../selectors';

import styles from './Filter.module.scss';

class Filter extends Component {
    render() {
        const props = this.props;

        return (
            <div className="container">
            <div className={cn(styles.main)}>
                <div className="row align-items-center justify-content-between me-tools">
                    <div className="col">
                        <FilterSearch/>
                    </div>
                    <div className="col">
                        <FilterSort/>
                    </div>
                    <div className="col">
                        <FilterSignal/>
                    </div>
                </div>
                <div className="w-100 border-top"></div>
                <Tabs className="me-filters">
                    <div className={"row tabs__head"}>
                        <div className="col-12">
                            <span className="tabs__label">Filter Type:</span>
                            <TabList>
                                {props.filters.map(({type, label}) => {
                                    let count = props.countSelectedFilters[type];
                                    let countText = count > 0 ? `(${count})` : '';
                                    return (
                                        <Tab key={type}>
                                            {label}{countText}
                                        </Tab>
                                    );
                                })}
                            </TabList>
                        </div>
                    </div>
                    {props.filters.map(({ type, filters }) => (
                        <TabPanel 
                            className="row"
                            key={type}>
                            {filters.map((filter, index) => {
                                let { id } = filter;

                                let selectedOption = props.selectedFilters
                                    .find(option => option.selectName === filter.name);
                                let selectedOptionValue = selectedOption && selectedOption.value;

                                return (
                                    <>
                                        <div className="col-3 me-filters-item" key={id}>
                                            <FilterSelect
                                                filterType={type}
                                                filterId={id}
                                                value={selectedOptionValue}
                                                {...filter}/>
                                        </div>
                                    </>
                                );
                            })}
                        </TabPanel>
                    ))}
                </Tabs>
                <SelectedFilters/>
            </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        let filters = filtersSelector(state);
        let selectedFilters = selectedFiltersSelector(state);
        let countSelectedFilters = countSelectedFiltersSelector(state);
        return ({
            filters,
            selectedFilters,
            countSelectedFilters,
        });
    })
(Filter);