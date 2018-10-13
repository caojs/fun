import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { get } from 'lodash/fp';
import cn from 'classnames';

import ErrorWrapper from '../../components/common/ErrorWrapper';
import MessageAlert, { Waiting } from '../../components/common/MessageAlert';
import FilterSummary from './FilterSummary';
import FilterCustom from './FilterCustom';
import FilterPagination from './FilterPagination';
import { ALL, PAGE } from './constants';

import styles from './FilterResult.module.css';

class FilterResult extends Component {
    render() {
        let {
            isLoaded,
            isLoading,
            loadingType,
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

                    let LoadingMessage = () => <MessageAlert type={Waiting} message="Loading..."/>;

                    return isLoaded
                        ? (isLoading && loadingType === ALL
                            ? <LoadingMessage/>
                            : <div className={styles.main}>
                                <span className="cm-heading">Results:</span>
                                <div className={cn(styles.result)}>
                                    <Tabs>
                                        <div className="tabs__head">
                                                <div className="tabs__total">Total: <span className="tabs__total-number">{totalCount} tickers</span></div>
                                                <span className="tabs__label">Result Type:</span>
                                                <TabList>
                                                    <Tab>Summary</Tab>
                                                    <Tab>Custom</Tab>
                                                </TabList>
                                        </div>
                                        <TabPanel>
                                            {isLoading && loadingType === PAGE ?
                                                <LoadingMessage/> :
                                                <FilterSummary
                                                    headerIds={summaryHeaderIds}
                                                    headers={headers}
                                                    body={body}/>}
                                        </TabPanel>
                                        <TabPanel>
                                            {isLoading && loadingType === PAGE ?
                                                <LoadingMessage/> :
                                                <FilterCustom 
                                                    headerIds={customHeaderIds}
                                                    headers={headers}
                                                    body={body}/>}
                                        </TabPanel>
                                    </Tabs>
                                    <FilterPagination {...this.props}/>
                                </div>
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