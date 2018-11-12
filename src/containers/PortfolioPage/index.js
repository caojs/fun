import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import CustomSelect from '../../components/Formiks/CustomSelect'

class PortfolioPage extends Component {
    render() {
        return (
            <Formik
                render={(props) => {
                    return (
                        <Form>
                            <CustomSelect
                                title="test"
                                name="test"
                                options={[{ label: "1", value:"1"}, { label:"2", value:"2"}]}/>
                        </Form>
                    )
                }}
            />
        )
    }
}

export default PortfolioPage;