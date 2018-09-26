import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { map, reduce, get, size, filter, flow } from 'lodash/fp';

import FilterSelect from './FilterSelect';
import LoadableButton from '../common/LoadableButton';
import {
    filter_types as filterTypes,
    filter_list as filterList
} from '../data/filter.json';
import { actions } from '../ducks/filters';

let filterCount = (type) => `${type}Count`;

const Filter = (props) => {
    return (
        <Tabs>
            <TabList>
                {map(({type, label}) => (
                    <Tab key={type}>{label} {props[filterCount(type)]}</Tab>
                ), filterTypes)}
            </TabList>

            {map(({ type, filter_ids : filterIds }) => (
                <TabPanel key={type}>
                    <div>
                        {filterIds.map((id) => {
                            let filter = filterList[id];
                            return (
                                <FilterSelect
                                    key={id}
                                    filterType={type}
                                    filterId={id}
                                    {...filter}/>
                            );
                        })}
                    </div>
                    <div>
                        <LoadableButton onClickPromise={() => props.applyFilters("test")}>Apply</LoadableButton>
                    </div>
                </TabPanel>
            ), filterTypes)}
        </Tabs>
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