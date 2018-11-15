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
            tickers: ['A', 'B', 'C'],
            allocations: [1, 2, 3]
        };

        this.addTicker = this.addTicker.bind(this);
    }

    addTicker(ticker) {
        this.setState(({ tickers }) => ({
            tickers: tickers.concat(ticker)
        }));
    }

    render() {
        let {
            tickers,
            allocations
         } = this.state;

         console.log(tickers)

        return (
            <Formik
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
                                allocations={allocations}
                                addTicker={this.addTicker}/>
                            <button type="submit">Submit</button>
                        </Form>
                    )
                }}
            />
        )
    }
}

export default PortfolioPage;