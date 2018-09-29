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
            error,
        } = this.props;

        return (
            <ErrorWrapper error={error}>
                {() => {
                    let {
                        response,
                        summaryHeaderIds,
                        customHeaderIds
                    } = this.props;

                    let {
                        headers,
                        body
                    } = response || {};

                    return isLoaded
                        ? (isFetching
                            ? "fetching"
                            : <Tabs>
                                <TabList>
                                    <Tab>Summary</Tab>
                                    <Tab>Custom</Tab>
                                </TabList>
                                <TabPanel>
                                    <FilterSummary
                                        headerIds={summaryHeaderIds}
                                        headers={headers}
                                        body={body}/>
                                </TabPanel>
                                <TabPanel>
                                    <FilterCustom 
                                        headerIds={customHeaderIds}
                                        headers={headers}
                                        body={body}/>
                                </TabPanel>
                                <FilterPagination {...this.props}/>
                            </Tabs>)
                        : null}
                }
            </ErrorWrapper>
        );
    }
}

export default connect(
    (state) => get('filters.results', state)
)(FilterResult);