import React, { Component } from 'react';
import { CustomSelect } from '../../../components/Formiks';

export default class PeriodicAdjustment extends Component {
    render() {
        return (
            <>
                <CustomSelect name="periodicAdjustment" label="Periodic Adjustment" options={[
                    { label: "None", value: ""},
                    { label: "Contribute fixed amount", value: "contributeFixedAmount"}
                ]}/>
            </>
        );
    }
}