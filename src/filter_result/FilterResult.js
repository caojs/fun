import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { get } from 'lodash/fp';

import FilterSummary from './FilterSummary';
import FilterPagination from './FilterPagination';

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
                            <FilterPagination pageCount={20}/>
                        </Tabs>)
                    : "empty"}
            </div>
        );
    }
}

export default connect(
    (state) => get('filters.results', state)
)(FilterResult);