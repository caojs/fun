import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cn from 'classnames';
import { map, reduce, get, size, filter, flow } from 'lodash/fp';

import FilterSearch from './FilterSearch';
import FilterSort from './FilterSort';
import FilterSignal from './FilterSignal';
import FilterSelect from './FilterSelect';
import LoadableButton from '../common/LoadableButton';
import { filter_types as filterTypes, filter_list as filterList } from '../data/filter.json';
import { actions } from '../ducks/filters';

import styles from './Filter.module.css';

let filterCount = (type) => `${type}Count`;

const Filter = (props) => {
    return (
        <div className="cm-zone">
            <div className="row">
                <span className="col-12 cm-heading">Filters</span>
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
                        {map(({type, label}) => {
                            let count = props[filterCount(type)];
                            let countText = count > 0 ? `(${count})` : '';
                            return (
                                <Tab key={type}>
                                    {label}{countText}
                                </Tab>
                            );
                        }, filterTypes)}
                    </TabList>
                </div>

                {map(({ type, filter_ids : filterIds }) => (
                    <TabPanel 
                        className="col-12"
                        key={type}>
                        <div className="row">
                            {filterIds.map((id, index) => {
                                let filter = filterList[id];
                                let comp = (
                                    <div className="col-3 tabs__select-item" key={id}>
                                        <FilterSelect
                                            filterType={type}
                                            filterId={id}
                                            {...filter}/>
                                    </div>
                                );

                                return index !== 0 && index % 4 == 0 ?
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
                                onClickPromise={() => props.applyFilters("test")}>Apply
                            </LoadableButton>
                        </div>
                    </TabPanel>
                ), filterTypes)}
            </Tabs>
        </div>

    );
}

export default connect(
    (state, ownProps) => {
        return ({
            ...ownProps,
            ...reduce((accum, {type}) => {
                let result = {
                    ...accum,
                    [filterCount(type)]: flow(
                        get(`filters.main.${type}`),
                        filter(item => !!item),
                        size
                    )(state)
                };

                return result;
            }, {}, filterTypes)
        });
    },
    {
        applyFilters: actions.applyFilters
    })(Filter);