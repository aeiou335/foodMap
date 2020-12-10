import React, { Component, Fragment } from "react";
import axios from 'axios';
import {withFormik, ErrorMessage } from 'formik';
import { 
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea, } from 'semantic-ui-react';
import {PriceOpt, TypeOpt, ReasonOpt, HWPOpt, LineOpt, StationOpt} from "../../components/Option/FormOption";
import './Search.css';

import Result from '../../components/SearchResult/Result';

const SearchForm = (props) => {
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
            <Form className='search-form-container' onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field 
                        control={Input} 
                        name="Name" 
                        label="Name" 
                        value={values.Name}
                        type="text"  
                        onChange={handleSelectChange(setFieldValue)} 
                        width={12}
                        />
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
                        onChange={handleSelectChange(setFieldValue)}
                    />
                    <Form.Field
                        control={Select}
                        fluid
                        selection
                        clearable
                        label='Line'
                        name='Line'
                        value={values.Line}
                        options={LineOpt}
                        placeholder='Location'
                        onChange={handleSelectChange(setFieldValue)} 
                    /> 
                    <Form.Field
                        control={Select}
                        fluid
                        selection
                        multiple
                        search
                        clearable
                        label='Station'
                        name='Station'
                        value={values.Station}
                        options={StationOpt[values.Line]}
                        placeholder='Station'  
                        
                        onChange={handleSelectChange(setFieldValue)}                               
                    />
                </Form.Group>
                <Form.Group widths='equal'>
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
                </Form.Group>
                <Form.Group className="button-container">
                    <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>Submit</button>
                    <button type="reset" className="btn btn-secondary" onClick={resetForm} >Reset</button>
                </Form.Group>                
            </Form>
    )
}

const Search = props => {
    console.log(props);
    const { handleSubmit } = props;

    const SearchFormFormik = withFormik({
        mapPropsToValues: () => ({ 
            Name: '',
            Price: '',
            Line: '',
            Station: [],
            Type: '',
            HowManyPeople: [],
            Reason: []
        }),
        handleSubmit: handleSubmit,
    
        displayName: 'SearchForm',
    })(SearchForm);

    return <SearchFormFormik />;
}
     


class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: {}
        }
    }

    handleSubmit = (values, { setSubmitting, resetForm }) => {
        try {
            const res = axios({
                method: 'post',
                url: 'http://localhost:3001/restaurant/getRestaurants',
                data: values
            }).then(res => {
                if (res.status == "200") {
                    //resetForm();
                    this.setState({
                        results: res.data.result
                    });
                }
            }).catch(err => {
                console.log(err);
            })          
        } catch (err) {
            console.log(err);
        }
        setSubmitting(false);
    }
    render() {
        return (
            <div className="search-container">
                <Search handleSubmit={this.handleSubmit}/>
                <Result results={this.state.results} query={this.state.query}/>
            </div>
        )
    }
}
export default SearchResult;