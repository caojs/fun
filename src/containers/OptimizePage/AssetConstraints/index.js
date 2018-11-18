import React, { Component } from 'react';
import { CustomSelect } from '../../../components/Formiks';

export default class AssetConstraints extends Component {
    render() {
        return (
            <>
                <CustomSelect name="assetConstraints" label="Asset Constraints" options={[
                    { label: "No", value: "no"},
                    { label: "Yes", value: "yes"}
                ]}/>
            </>
        );
    }
}