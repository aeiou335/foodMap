import React, { useState } from 'react';
import { Formik, Field, withFormik, ErrorMessage } from 'formik';
import axios from "axios";
import * as Yup from 'yup';
import { 
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    Message,
    TextArea, } from 'semantic-ui-react';
import './Form.css';
import {PriceOpt, TypeOpt, ReasonOpt, HWPOpt, LineOpt, StationOpt} from "../../components/Option/FormOption";

//class Add extends React.Component {
const foodForm =  (props) => {
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
    return (
    
            <Form className="form-container" onSubmit={handleSubmit}>
                <h3 className="title column-container">FoodBot Database</h3>
                <Form.Group className="column-container">                        
                    <Form.Field 
                        control={Input} 
                        name="Name" 
                        label="Name" 
                        value={values.Name}
                        type="text"  
                        onChange={handleSelectChange(setFieldValue)} 
                        required 
                        width={16}/>                               
                    <ErrorMessage name="Name" component="div" className="invalid-feedback" />
                </Form.Group>
                <Form.Group className="column-container">
                    <Form.Field
                        control={Select}
                        fluid
                        selection
                        clearable
                        label='Price'
                        name='Price'
                        value={values.Price}
                        options={PriceOpt}
                        placeholder='Empty'
                        width={16}
                        onChange={handleSelectChange(setFieldValue)}
                    /> 
                </Form.Group>
                <Form.Group className="column-container">                                 
                    <Form.Field
                        control={Select}
                        inline
                        fluid
                        selection
                        clearable
                        required
                        label='Line'
                        name='Line'
                        value={values.Line}
                        options={LineOpt}
                        placeholder='Location'
                        onChange={handleSelectChange(setFieldValue)}   
                        width={8}                      
                    />
                    <Form.Field
                        control={Select}
                        inline
                        fluid
                        selection
                        multiple
                        search
                        clearable
                        required
                        label='Station'
                        name='Station'
                        value={values.Station}
                        options={StationOpt[values.Line]}
                        placeholder='Station'  
                        width={8}
                        onChange={handleSelectChange(setFieldValue)}                               
                    />                                                                   
                </Form.Group>
                <Form.Group className="column-container">
                    <Form.Select 
                        fluid
                        selection
                        clearable
                        label='Type'
                        name='Type'
                        value={values.Type}
                        options={TypeOpt}
                        placeholder='Empty'
                        width={16}
                        onChange={handleSelectChange(setFieldValue)}
                    />   
                </Form.Group>
                <Form.Group className="column-container">
                    <Form.Select 
                        fluid
                        selection
                        multiple
                        clearable
                        label='How Many People'
                        name='HowManyPeople'
                        value={values.HowManyPeople}
                        options={HWPOpt}
                        placeholder='Empty'
                        width={16}
                        onChange={handleSelectChange(setFieldValue)}
                    /> 
                    <ErrorMessage name="HowManyPeople" component="div" className="invalid-feedback" />
                </Form.Group>
                <Form.Group className="column-container">
                    <Form.Select 
                        fluid
                        selection
                        multiple
                        clearable
                        label='Reason'
                        name='Reason'
                        value={values.Reason}
                        options={ReasonOpt}
                        placeholder='Empty'
                        width={16}
                        onChange={handleSelectChange(setFieldValue)}
                    /> 
                    <ErrorMessage name="Reason" component="div" className="invalid-feedback" />
                </Form.Group>
                <Form.Group className="column-container">
                    <Form.Field 
                        control={Input}
                        fluid
                        required
                        label='Rating'
                        name='Rating'
                        value={values.Rating}
                        placeholder='1~10'
                        width={16}
                        onChange={handleSelectChange(setFieldValue)}
                    /> 
                    <ErrorMessage name='Rating' render={(msg) => <span>{msg}</span>} />
                </Form.Group>
                <Form.Group className="column-container">
                    <div className="bottom-container">
                        <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>Submit</button>
                        <button type="reset" className="btn btn-secondary" onClick={resetForm} >Reset</button>
                    </div>
                </Form.Group>
            </Form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({ 
        Name: '',
        Price: '',
        Line: '',
        Station: [],
        Type: '',
        HowManyPeople: [],
        Reason: [],
        Rating: '' 
    }),

    handleSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:3001/restaurant/addRes',
                data: values
            })
            console.log(res.data.msg)
            if (res.data.success) {
                resetForm();
                alert('成功儲存！');
            }
        } catch (err) {
            console.log(err);
        }
        setSubmitting(false);
    },

    displayName: 'BasicForm',
})(foodForm);
