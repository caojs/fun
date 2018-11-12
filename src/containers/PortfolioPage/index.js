import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import CustomSelect from '../../components/Formiks/CustomSelect';
import PrependInput from '../../components/Formiks/PrependInput';
import AppendInput from '../../components/Formiks/AppendInput';
import Input from '../../components/Formiks/Input';
import CustomCheckbox from '../../components/Formiks/CustomCheckbox';

class PortfolioPage extends Component {
    render() {
        return (
            <Formik
                render={(props) => {
                    return (
                        <Form>
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
                        </Form>
                    )
                }}
            />
        )
    }
}

export default PortfolioPage;