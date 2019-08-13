import React, { Component } from 'react';
import UserRegister from './Register';
import LoginNav from './LoginNav';

export default class UserRegisterContainer extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <LoginNav/>
                <UserRegister history={this.props.history}/>
            </div>
        );
    }
}