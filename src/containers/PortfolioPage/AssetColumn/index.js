import React, { Component } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { connect } from 'formik';
import { RawInput } from '../../../components/Formiks';

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
            <table className="table table-borderless mb-0">
                <thead  className="thead-light"><tr><th>#Asset</th></tr></thead>
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
        )
    }
}

export default connect(AssetColumn);