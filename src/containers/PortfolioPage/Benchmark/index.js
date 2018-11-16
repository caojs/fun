import React, { Component } from 'react';
import { CustomSelect } from '../../../components/Formiks';

export default class Benchmark extends Component {
    render() {
        return (
            <>
                <CustomSelect name="benchmark" label="Benchmark" options={[
                    { label: "None", value: ""},
                    { label: "Vanguard 500 index investor", value: "500indexinvestor"}
                ]}/>
            </>
        );
    }
}