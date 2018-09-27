import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { get } from 'lodash/fp';

import ErrorWrapper from '../common/ErrorWrapper';
import FilterSummary from './FilterSummary';
import FilterCustom from './FilterCustom';
import FilterPagination from './FilterPagination';

class FilterResult extends Component {
    render() {
        let {
            isLoaded,
            isFetching,
            error
        } = this.props;

        return (
            <ErrorWrapper error={error}>
                {() => {
                    return isLoaded
                        ? (isFetching
                            ? "fetching"
                            : <Tabs>
                                <TabList>
                                    <Tab>Summary</Tab>
                                    <Tab>Custom</Tab>
                                </TabList>
                                <TabPanel>
                                    <FilterSummary {...this.props}/>
                                </TabPanel>
                                <TabPanel>
                                    <FilterCustom {...this.props}/>
                                </TabPanel>
                                <FilterPagination {...this.props}/>
                            </Tabs>)
                        : "empty"}
                }
            </ErrorWrapper>
        );
    }
}

export default connect(
    (state) => get('filters.results', state)
)(FilterResult);