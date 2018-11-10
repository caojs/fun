import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import Select from '../../components/common/Select';
import { changeSignal } from './actions';
import { signal_options as signalOptions } from './initialState/signal.json';

import styles from './FilterSignal.module.css';

class FilterSignal extends Component {
    render() {
        let {
            signal,
            changeSignal
        } = this.props;

        return (
            <div className={styles.main}>
                <span className={styles.label}>Signal:</span>
                <Select
                    className={styles.select}
                    value={signal}
                    options={signalOptions}
                    onSelect={changeSignal}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({ signal: get(state, 'filters.signal') }),
    { changeSignal: changeSignal }
)(FilterSignal)