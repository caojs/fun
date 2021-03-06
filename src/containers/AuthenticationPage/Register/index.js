import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import schema from './schema';
import { RawInput } from '../../../components/Formiks';
import styles from '../index.module.scss';
import cn from 'classnames';

export default class Register extends Component {
    render() {
        return (
            <Formik
                validationSchema={schema}
                initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: ''
                }}

                onSubmit={(values) => { console.log(values); }}

                render={(_props) => {
                    return (
                        <div className={cn(styles.main, "container")}>
                            <div className="row">
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <div className="card card-signin my-5">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Register</h5>
                                            <Form className="form-signin">
                                                <div className="form-label-group">
                                                    <RawInput 
                                                    placeholder="Username"
                                                    name="username"/>
                                                </div>

                                                <div className="form-label-group">
                                                    <RawInput 
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password"/>
                                                </div>

                                                <div className="form-label-group">
                                                    <RawInput 
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"/>
                                                </div>
                                                
                                                <button className="btn btn-lg btn-primary btn-block text-uppercase mt-4" type="submit">Register</button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    )
                }}
            />
            
        )
    }
}