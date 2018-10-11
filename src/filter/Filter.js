import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cn from 'classnames';
import { map, reduce, get, size, filter, flow } from 'lodash/fp';
import { denormalize } from 'normalizr';

import { filterSchema } from '../data/normalizr-dummy';
import FilterSearch from './FilterSearch';
import FilterSort from './FilterSort';
import FilterSignal from './FilterSignal';
import FilterSelect from './FilterSelect';
import LoadableButton from '../common/LoadableButton';
import { actions } from '../ducks/filters';

import styles from './Filter.module.css';

let filterCount = (type) => `${type}Count`;

const Filter = (props) => {
    return (
        <div className="cm-zone">
            <div className="row">
                <span className="col-12 cm-heading">Filters:</span>
            </div>
            <div className={cn("row", styles.main)}>
                <div className="col">
                    <FilterSearch/>
                </div>
                <div className="col">
                    <FilterSort/>
                </div>
                <div className="col">
                    <FilterSignal/>
                </div>
            </div>
            <div className="w-100 border-top"></div>
            <Tabs className={cn("row", styles.main, styles.tabs)}>
                <div className={"col tabs__head"}>
                    <span className="tabs__label">Filter Type:</span>
                    <TabList>
                        {map(({type, label}) => {
                            let count = props[filterCount(type)];
                            let countText = count > 0 ? `(${count})` : '';
                            return (
                                <Tab key={type}>
                                    {label}{countText}
                                </Tab>
                            );
                        }, props.filters)}
                    </TabList>
                </div>

                {map(({ type, filters }) => (
                    <TabPanel 
                        className="col-12"
                        key={type}>
                        <div className="row">
                            {filters.map((filter, index) => {
                                let { id } = filter;
                                let comp = (
                                    <div className="col-3 tabs__select-item" key={id}>
                                        <FilterSelect
                                            filterType={type}
                                            filterId={id}
                                            {...filter}/>
                                    </div>
                                );

                                return index !== 0 && index % 4 === 0 ?
                                    <React.Fragment key={id}>
                                        <div className="w-100">
                                            <div className="tabs__border"></div>
                                        </div>
                                        {comp}
                                    </React.Fragment> :
                                    comp;
                            })}
                        </div>
                        <div className={styles.buttons}>
                            <LoadableButton
                                className="filters__apply"
                                onClickPromise={() => props.applyFilters()}>Apply
                            </LoadableButton>
                        </div>
                    </TabPanel>
                ), props.filters)}
            </Tabs>
        </div>

    );
}

const filtersSelector = (state) => {
    let filters = get('entities.filters', state);
    console.log(filters)
    let denor = denormalize(filters, [filterSchema], state.entities);
    return denor;
}

export default connect(
    (state, ownProps) => {
        console.log(filtersSelector(state));
        return ({
            ...ownProps,
            filters: filtersSelector(state),
            // ...reduce((accum, {type}) => {
            //     let result = {
            //         ...accum,
            //         [filterCount(type)]: flow(
            //             get(`filters.main.${type}`),
            //             filter(item => !!item),
            //             size
            //         )(state)
            //     };

            //     return result;
            // }, {}, filterTypes)
        });
    },
    {
        applyFilters: actions.applyFilters
    })(Filter);