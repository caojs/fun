import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { get } from 'lodash/fp';
import cn from 'classnames';

import ErrorWrapper from '../common/ErrorWrapper';
import MessageAlert, { Waiting } from '../common/MessageAlert';
import FilterSummary from './FilterSummary';
import FilterCustom from './FilterCustom';
import FilterPagination from './FilterPagination';

import styles from './FilterResult.module.css';

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
                        body,
                        total_count: totalCount
                    } = response || {};

                    return isLoaded
                        ? (isFetching
                            ? <MessageAlert type={Waiting} message="Loading..."/>
                            : <div className={styles.main}>
                                <span className="cm-heading">Results:</span>
                                <Tabs className={cn(styles.tabs)}>
                                    <div className="tabs__head">
                                            <div className="tabs__total">Total: <span className="tabs__total-number">{totalCount} tickers</span></div>
                                            <span className="tabs__label">Result Type:</span>
                                            <TabList>
                                                <Tab>Summary</Tab>
                                                <Tab>Custom</Tab>
                                            </TabList>
                                    </div>
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
                                </Tabs>
                            </div>)
                        : null}
                }
            </ErrorWrapper>
        );
    }
}

export default connect(
    (state) => get('filters.results', state)
)(FilterResult);