import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import { changeSort } from '../actions';
import Select from '../../../components/common/Select';
import {
    type_options as typeOptions,
    order_options as orderOptions
} from '../initialState/sort.json';

import styles from './FilterSort.module.css';

class FilterSort extends Component {
    render() {
        let {
            type,
            order,
            changeSort
        } = this.props;

        if (!type) {
            type = get(typeOptions, '[0].value');
            order = get(orderOptions, '[0].value');
            changeSort([type, order]);
        }

        return (
            <div className={styles.main}>
                <span className={styles.label}>Order:</span>
                <Select
                    className={styles.select}
                    value={type}
                    options={typeOptions}
                    onSelect={(value) => changeSort([value, order])}/>
                <Select
                    className={styles.select}
                    value={order}
                    options={orderOptions}
                    onSelect={(value) => changeSort([type, value])}/>
            </div>
        );
    }
}

export default connect(
    (state) => {
        let [type, order] = get(state, 'filters.order');
        return {
            type,
            order
        };
    },
    { changeSort: changeSort }
)(FilterSort);