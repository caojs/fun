import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import Select from '../common/Select';
import { actions } from '../ducks/filters';
import { signal_options as signalOptions } from '../data/signal.json';

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
    (state) => ({ signal: get('filters.signal', state) }),
    { changeSignal: actions.changeSignal }
)(FilterSignal)