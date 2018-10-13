import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cn from 'classnames';

import FilterSearch from './FilterSearch';
import FilterSort from './FilterSort';
import FilterSignal from './FilterSignal';
import FilterSelect from './FilterSelect';
import LoadableButton from '../../components/common/LoadableButton';
import { applyFilters } from './actions';
import { filtersSelector, selectedFiltersSelector, countSelectedFiltersSelector } from './selectors';

import styles from './Filter.module.css';

const Filter = (props) => {
    return (
        <div className="cm-zone">
            <div className="row">
                <span className="col-12 cm-heading">Filters:</span>
            </div>
            <div className={cn("row", styles.main)}>
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
            <Tabs className={cn("row", styles.main, styles.tabs)}>
                <div className={"col tabs__head"}>
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

                {props.filters.map(({ type, filters }) => (
                    <TabPanel 
                        className="col-12"
                        key={type}>
                        <div className="row">
                            {filters.map((filter, index) => {
                                let { id } = filter;

                                let selectedOption = props.selectedFilters
                                    .find(option => option.selectName === filter.name);
                                let selectedOptionValue = selectedOption && selectedOption.value;

                                let comp = (
                                    <div className="col-3 tabs__select-item" key={id}>
                                        <FilterSelect
                                            filterType={type}
                                            filterId={id}
                                            value={selectedOptionValue}
                                            {...filter}/>
                                    </div>
                                );

                                return index !== 0 && index % 4 === 0 ?
                                    <React.Fragment key={id}>
                                        <div className="w-100">
                                            <div className="tabs__border"></div>
                                        </div>
                                        {comp}
                                    </React.Fragment> :
                                    comp;
                            })}
                        </div>
                        <div className={styles.buttons}>
                            <LoadableButton
                                className="filters__apply"
                                onClickPromise={() => props.applyFilters()}>Apply
                            </LoadableButton>
                        </div>
                    </TabPanel>
                ))}
            </Tabs>
        </div>

    );
}

export default connect(
    (state, ownProps) => {
        let filters = filtersSelector(state);
        let selectedFilters = selectedFiltersSelector(state);
        let countSelectedFilters = countSelectedFiltersSelector(state);
        return ({
            ...ownProps,
            filters,
            selectedFilters,
            countSelectedFilters
        });
    },
    {
        applyFilters
    })(Filter);