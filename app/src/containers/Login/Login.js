import React, { useState } from 'react';
import { Formik, Field, withFormik, ErrorMessage } from 'formik';
import axios from "axios";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { 
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea, } from 'semantic-ui-react';

import './Login.css';
import { Redirect, NavLink } from 'react-router-dom';
console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)

const responseGoogle = (response) => {
    console.log(response);
}

const LoginForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        resetForm
      } = props;
    const handleSelectChange = (setFieldValue) => {
        return (e, {name, value}) => {
            console.log(name, value);
            setFieldValue(name, value);
        };
    }

    const LoginSuccess = async (googleUser) => {
        console.log(googleUser);
        const profile = googleUser.getBasicProfile();
        console.log(googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        const res = axios({
            method: 'post',
            url: 'http://localhost:3001/user/signin',
            data: {loginType: "Google", id_token: googleUser.getAuthResponse().id_token}
        }).then(res => {
            if (res.status == "200") {
                localStorage.setItem('loginUser', res.data.id)
                values.history.push('/');
            } 
        })
    };

    return (
        <Form className="login-form-container" onSubmit={handleSubmit}>
            <h3 className="title column-container">Login</h3>
            <Form.Group className="column-container">
                <Form.Field 
                    control={Input} 
                    name="Username" 
                    label="Username" 
                    value={values.Username}
                    type="text"  
                    onChange={handleSelectChange(setFieldValue)} 
                    required 
                    width={16}/>   
            </Form.Group>
            <Form.Group className="column-container">
                <Form.Field 
                    control={Input} 
                    name="Password" 
                    label="Password" 
                    value={values.Password}
                    type="text"  
                    onChange={handleSelectChange(setFieldValue)} 
                    required 
                    width={16}/>   
            </Form.Group>
            <Form.Group className="column-container">
                <div className="bottom-container">
                    <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>Login</button>
                    <button type="reset" className="btn btn-secondary" onClick={resetForm} >Register</button>
                </div>
            </Form.Group>
            <Form.Group className="column-container">
                <div className="bottom-container">
                    <GoogleLogin className= "google-btn"
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign in with Google"
                        theme="dark"
                        onSuccess={LoginSuccess}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </Form.Group>
        </Form>
    )
}

const Login = (props) => {
    const { history } = props;
    const LoginWithFormik = withFormik({
        mapPropsToValues: () => ({ 
            Username: "",
            Password: "",
            history: history
        }),
        
        handleSubmit: async (values, { setSubmitting, resetForm }) => {
            
        },

        displayName: 'LoginForm',
    })(LoginForm); 
    return <LoginWithFormik/>
}

export default class LoginF extends React.Component {
    render() {
        const {history} = this.props;
        console.log(history)
        return (
            <Login history={history} />
        )
    }
};