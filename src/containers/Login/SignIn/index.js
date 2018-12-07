import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import schema from './schema';
import { RawInput } from '../../../components/Formiks';
import styles from '../Login.module.scss';
import cn from 'classnames';

export default class SignIn extends Component {
    render() {
        return (
            <Formik
                validationSchema={schema}
                initialValues={{
                }}

                onSubmit={(values) => { console.log(values); }}

                render={(_props) => {
                    return (
                        <div className={cn(styles.main, "container")}>
                            <div className="row">
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <div className="card card-signin my-5">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Sign In</h5>
                                            <Form className="form-signin">
                                                <div className="form-label-group">
                                                    <RawInput 
                                                    placeholder="Email address"
                                                    name="userEmail"/>
                                                </div>

                                                <div className="form-label-group">
                                                    <RawInput 
                                                    type="password"
                                                    placeholder="Password"
                                                    placeholder="Password"
                                                    name="userPassword"/>
                                                </div>

                                                <div className="custom-control custom-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                                </div>
                                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
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