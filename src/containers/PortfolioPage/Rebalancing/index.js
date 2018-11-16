import React, { Component } from 'react';
import { CustomSelect } from '../../../components/Formiks';

export default class Rebalancing extends Component {
    render() {
        return (
            <>
                <CustomSelect name="rebalancing" label="Rebalancing" options={[
                    { label: "No balancing", value: ""},
                    { label: "Rebalance annually", value: "rebalanceAnnually"}
                ]}/>
            </>
        );
    }
}