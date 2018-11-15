import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import CustomSelect from '../../components/Formiks/CustomSelect';
import PrependInput from '../../components/Formiks/PrependInput';
import AppendInput from '../../components/Formiks/AppendInput';
import Input from '../../components/Formiks/Input';
import CustomCheckbox from '../../components/Formiks/CustomCheckbox';
import RawNumberInput from '../../components/Formiks/RawNumberInput';
import Allocations from './Allocations';

import schema from './schema';

class PortfolioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: 'one',
            allocations: [1, 2, 3],
            one: {
                tickers: ['A', 'B', 'C'],
            },
            two: {
                tickers: [''],
            }
        };
    }

    render() {
        let {
            set,
            allocations
         } = this.state;

         let { tickers } = this.state[set];

        return (
            <Formik
                key={set}
                initialValues={{
                    tickers,
                    allocations: []
                }}

                validationSchema={schema}

                onSubmit={(values) => {
                    console.log(values);
                }}

                render={(props) => {
                    return (
                        <Form>
                            <RawNumberInput
                                name="numberer"/>
                            <CustomSelect
                                label="test"
                                name="test"
                                options={[{ label: "1", value:"1"}, { label:"2", value:"2"}]}/>
                            <PrependInput
                                label="test2"
                                name="tes2"
                                pender="abc"/>
                            <AppendInput
                                label="test2"
                                name="tes52"
                                pender="abc"/>
                            <Input label="input" name="input" placeholder="abc"/>
                            <CustomCheckbox
                                label="label"
                                name="checkbox"/>
                            <Allocations
                                tickers={tickers}
                                allocations={allocations}/>
                            <button type="submit">Submit</button>
                        </Form>
                    )
                }}
            />
        )
    }
}

export default PortfolioPage;