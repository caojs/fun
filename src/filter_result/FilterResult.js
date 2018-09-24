import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FilterSummary from './FilterSummary';

export default class FilterResult extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Summary</Tab>
                        <Tab>Basic</Tab>
                    </TabList>
                    <TabPanel>
                        <FilterSummary/>
                    </TabPanel>
                    <TabPanel>
                        Basic
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}