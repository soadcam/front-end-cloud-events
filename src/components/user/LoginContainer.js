import React, { Component } from 'react';
import Login from "./Login";
import LoginNav from './LoginNav';

export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <LoginNav/>
                <Login history={this.props.history}/>
            </div>
        );
    }
}