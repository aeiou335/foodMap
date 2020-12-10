import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import Form from "../Form/Form"
import SearchResult from '../Search/Search';
import Login from '../Login/Login';
import Profile from "../Profile/Profile";
import "./Header.css";

class Header extends React.Component {
    state = { activeItem: 'Home'}
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    logout = () => {
        localStorage.clear('loginUser');
        alert('Successfully logout!');
        this.props.history.push('/');
    }
    render() {
        const { activeItem } = this.state
        let isLogin = false
        if (localStorage.getItem('loginUser')) isLogin = true;
        return (
            <Fragment>
                <Menu inverted size="massive" className="nav-bar">
                    <h1 className="brand">Taipei Food Map</h1>
                    <Menu.Item
                    name='Home'
                    as={NavLink}
                    exact to="/"
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    />
                    <Menu.Item
                    name='Add'
                    as={NavLink}
                    to="/addRes"
                    active={activeItem === 'Add'}
                    onClick={this.handleItemClick}
                    />
                    {isLogin &&
                        <Menu.Item
                        name='Profile'
                        as={NavLink}
                        to="/profile"
                        active={activeItem === 'Profile'}
                        onClick={this.handleItemClick}
                        />
                    }
                    {isLogin? 
                        <Menu.Item
                        name='Logout'
                        onClick={this.logout}
                        /> :
                        <Menu.Item
                        name='Login'
                        as={NavLink}
                        to={"/login"}
                        active={activeItem === 'Login'}
                        onClick={this.handleItemClick}
                        />
                    }
                    
                </Menu>
                <Switch>
                    <Route exact path='/' component={SearchResult}></Route>
                    <Route path='/addRes' component={Form}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/profile' component={Profile}></Route>
                </Switch>
            </Fragment>
        
        )
        
    }
}

export default withRouter(Header);