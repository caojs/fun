import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
                        summary
                    </TabPanel>
                    <TabPanel>
                        Basic
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}