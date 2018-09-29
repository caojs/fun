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
            <Tabs className={cn("row", styles.main)}>
                <TabList className="col-12">
                    {map(({type, label}) => (
                        <Tab key={type}>{label} {props[filterCount(type)]}</Tab>
                    ), filterTypes)}
                </TabList>

                {map(({ type, filter_ids : filterIds }) => (
                    <TabPanel key={type} className="col-12">
                        <div className="row">
                            {filterIds.map((id, index) => {
                                let filter = filterList[id];
                                let comp = (
                                    <div className="col-3" key={id}>
                                        <FilterSelect
                                            filterType={type}
                                            filterId={id}
                                            {...filter}/>
                                    </div>
                                );

                                return index !== 0 && index % 4 == 0 ?
                                    <React.Fragment key={id}>
                                        {comp}
                                        <div className="w-100"></div>
                                    </React.Fragment> :
                                    comp;
                            })}
                        </div>
                        <div>
                            <LoadableButton onClickPromise={() => props.applyFilters("test")}>Apply</LoadableButton>
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