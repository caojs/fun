import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cn from 'classnames';

import FilterSearch from './FilterSearch';
import FilterSort from './FilterSort';
import FilterSignal from './FilterSignal';
import FilterSelect from './FilterSelect';
import LoadableButton from '../../components/common/LoadableButton';
import { applyFilters } from './actions';
import { filtersSelector, selectedFiltersSelector, countSelectedFiltersSelector } from './selectors';
import { stateToQuery } from './helpers';

import styles from './Filter.module.css';

class Filter extends Component {
    componentDidMount() {
        let {
            query,
            applyFilters
        } = this.props;
        if (query) {
            applyFilters();
        }
    }

    onFilter = () => {
        const {
            history,
            applyFilters,
            query
        } = this.props;

        return applyFilters()
            .then(() => {
                if (query) history.push('/filter?' + query)
            })
    }

    render() {
        const props = this.props;

        return (
            <>
                <div className="col-12">
                    <span className="cm-heading">Filters:</span>
                </div>
                <div className={cn("col-12")}>
                    <div className="row mr-0 ml-0 justify-content-between">
                        <div className={cn("col-12", styles.main)}>
                            <div className="row">
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
                        </div>
                        <div className="w-100 border-top"></div>
                        <Tabs className={cn("col-12", styles.main, styles.tabs)}>
                            <div className="row">
                                <div className={"col-12 tabs__head"}>
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

                            <div className="row">
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
                                                onClickPromise={this.onFilter}>Apply
                                            </LoadableButton>
                                        </div>
                                    </TabPanel>
                                ))}
                            </div>
                        </Tabs>
                    </div>
                </div>
            </>

        );
    }
}

export default withRouter(connect(
    (state) => {
        let filters = filtersSelector(state);
        let selectedFilters = selectedFiltersSelector(state);
        let countSelectedFilters = countSelectedFiltersSelector(state);
        let query = stateToQuery(state.filters || {});
        return ({
            filters,
            selectedFilters,
            countSelectedFilters,
            query
        });
    },
    {
        applyFilters
    })(Filter));