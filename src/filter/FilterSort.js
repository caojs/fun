import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import { actions } from '../ducks/filters';
import Select from '../common/Select';
import {
    type_options as typeOptions,
    order_options as orderOptions
} from '../data/sort.json';

import styles from './FilterSort.module.css';

class FilterSort extends Component {
    render() {
        let {
            type = get('[0].value', typeOptions),
            order = get('[0].value', orderOptions),
            changeSort
        } = this.props;

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
        let [type, order] = get('filters.sort', state);
        return {
            type,
            order
        };
    },
    { changeSort: actions.changeSort }
)(FilterSort);