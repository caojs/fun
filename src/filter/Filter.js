import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { map, reduce, get, size, filter, flow } from 'lodash/fp';
import FilterSelect from './FilterSelect';
import {
    filter_list as filterList
} from './dummy.json';

let filterCount = (type) => `${type}Count`;

const Filter = (props) => {
    return (
        <Tabs>
            <TabList>
                {map(({type, label}) => (
                    <Tab key={type}>{label} {props[filterCount(type)]}</Tab>
                ), filterList)}
            </TabList>
            {map(({ type, filters }) => (
                <TabPanel key={type}>
                    {filters.map((filter) => (
                        <FilterSelect
                            key={filter.name}
                            type={type}
                            {...filter}/>
                    ))}
                </TabPanel>
            ), filterList)}
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
                        get(`filter.${type}`),
                        filter(item => !!item),
                        size
                    )(state)
                };

                return result;
            }, {}, filterList)
        });
    })(Filter)