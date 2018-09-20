import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Select from '../common/Select';
import dummy from './dummy.json';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        console.log(dummy);
    }

    renderSelect(item, index) {
        return <Select
            key={index}
            label={item.label}
            name={item.name}
            data={item.options}/>;
    }

    render() {
        let {
            descriptive,
            fundamental,
            technical
        } = dummy;

        return (
            <Tabs forceRenderTabPanel={true}>
                <span>abc</span>
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