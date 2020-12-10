import React, { useState } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import axios from "axios";
import './Profile.css';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
        this.getUserData();
    }

    getUserData = () => {
        const id = localStorage.getItem("loginUser");
        console.log(id)
        axios.get('http://localhost:3001/user/'+ id)
        .then(res => {
            this.setState({
                userData: res.data.user
            })
        }).catch(err => {console.log(err)})
    }

    render() {

        return (
            <div className="card-main-container">
                <Card> 
                    <Image src={this.state.userData.Picture} wrapped ui={false} referrerpolicy="no-referrer"/>
                    <Card.Content>
                        <Card.Header>{this.state.userData.Username}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.state.userData.createdAt}</span>
                        </Card.Meta>
                        <Card.Description>
                            {this.state.userData.Email}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default Profile;