import React, { Component } from 'react';
import { IoMdAdd } from 'react-icons/io';
import cn from 'classnames';
import { connect } from 'formik';
import { RawInput } from '../../../components/Formiks';

import styles from './index.module.scss';

class AssetColumn extends Component {
    constructor(props) {
        super(props);
        this.addTicker = this.addTicker.bind(this);
    }

    addTicker() {
        const {
            set,
            tickers,
            formik: { setFieldValue }
        } = this.props;

        setFieldValue(`${set}.tickers.${tickers.length}`, "");
    }

    render() {
        const {
            set,
            tickers,
        } = this.props;

        return (
            <div className={styles.main}>
                <table className={cn("table table-borderless mb-0")}>
                    <thead  className=""><tr><th>#Asset</th></tr></thead>
                    <tbody>
                        {tickers.map((_, tidx) => (
                            <tr key={tidx}>
                                <td>
                                    <RawInput name={`${set}.tickers.${tidx}`}/>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={this.addTicker}>
                                    <IoMdAdd/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(AssetColumn);