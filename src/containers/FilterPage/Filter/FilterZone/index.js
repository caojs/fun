import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import FilterSelect from '../FilterSelect';
import { filtersSelector, selectedFiltersSelector, countSelectedFiltersSelector } from '../../selectors';

import styles from './index.module.scss';

class FilterZone extends Component {
    render() {
        const {
            filters,
            selectedFilters,
            countSelectedFilters
        } = this.props;
        return (
            <Tabs className={styles.main}>
                    <div className={"row tabs__head"}>
                        <div className="col-12">
                            <span className="tabs__label">Filter Type:</span>
                            <TabList>
                                {filters.map(({type, label}) => {
                                    let count = countSelectedFilters[type];
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
                    {filters.map(({ type, filters }) => (
                        <TabPanel 
                            className="row tabs__panel"
                            key={type}>
                            {filters.map((filter) => {
                                let { id } = filter;

                                let selectedOption = selectedFilters
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
        )
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
    }
)(FilterZone);