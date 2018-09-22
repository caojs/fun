import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FilterSelect from './FilterSelect';
import dummy from './dummy.json';

export default class Filter extends Component {
    renderSelect(item, index) {
        return <FilterSelect
            key={index}
            name={item.name}
            label={item.label}
            options={item.options}/>;
    }

    render() {
        let {
            descriptive,
            fundamental,
            technical
        } = dummy;

        return (
            <Tabs>
                <TabList>
                    <Tab>Descriptive</Tab>
                    <Tab>Fundamental</Tab>
                    <Tab>Technical</Tab>
                </TabList>
                <TabPanel>
                    {descriptive.map(this.renderSelect)}
                </TabPanel>
                <TabPanel>
                    {fundamental.map(this.renderSelect)}
                </TabPanel>
                <TabPanel>
                    {technical.map(this.renderSelect)}
                </TabPanel>
            </Tabs>
        )
    }
}