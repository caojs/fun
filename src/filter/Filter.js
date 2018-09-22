import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { map, keys, reduce, get, size, filter } from 'lodash';
import FilterSelect from './FilterSelect';
import dummy from './dummy.json';

let filterKeys = keys(dummy);

const Filter = (props) => {
    return (
        <Tabs>
            <TabList>
                {map(filterKeys, (k) => (
                    <Tab key={k}>{k} {props[`${k}Count`]}</Tab>
                ))}
            </TabList>
            {map(filterKeys, (k) => (
                <TabPanel key={k}>
                    {dummy[k].map((item, index) => (
                        <FilterSelect
                            key={index}
                            type={k}
                            {...item}/>
                    ))}
                </TabPanel>
            ))}
        </Tabs>
    );
}

export default connect(
    (state, ownProps) => {
        return ({
            ...ownProps,
            ...reduce(filterKeys, (accum, k) => {
                return {
                    ...accum,
                    [`${k}Count`]: size(filter(get(state, `filter.${k}`, {}), (item) => item))
                };
            }, {})
        });
    })(Filter)