import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FilterSummary from './FilterSummary';

class FilterResult extends Component {
    render() {
        let {
            isLoaded,
            isFetching
        } = this.props;

        return (
            <div>
                {isLoaded
                    ? (isFetching
                        ? "fetching"
                        : <Tabs>
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
                        </Tabs>)
                    : "empty"}
            </div>
        );
    }
}

export default connect(
    ({ filters }) => filters
)(FilterResult);