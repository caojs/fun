import React, { Component } from 'react';
import { CustomSelect } from '../../../components/Formiks';

export default class ComparedAllocation extends Component {
    render() {
        return (
            <>
                <CustomSelect name="comparedAllocation" label="Compared Allocation" options={[
                    { label: "None", value: ""},
                    { label: "Equal Weighted", value: "equalWeighted"}
                ]}/>
            </>
        );
    }
}