import React, { Component } from 'react';
import { CustomSelect } from '../../../components/Formiks';

export default class OptimizationGoal extends Component {
    render() {
        return (
            <>
                <CustomSelect name="optimizationGoal" label="Optimization Goal" options={[
                    { label: "None", value: ""},
                    { label: "Vanguard 500 index investor", value: "500indexinvestor"}
                ]}/>
            </>
        );
    }
}