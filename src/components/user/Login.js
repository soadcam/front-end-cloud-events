import React, { Component } from 'react';
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { handleResponse } from '../../helpers/handle-response'
import { ToastsContainer, ToastsStore } from 'react-toasts';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isAuthenticated: false
        };
    }

    componentDidMount() {

    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers: headers,
            cache: 'default',
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        };
        fetch(`http://172.24.42.63:8080/api/login`, requestOptions)
            .then(handleResponse)
            .then(token => {
                if (token && token.token) {
                    localStorage.setItem('token', token.token);
                    this.setState({ isAuthenticated: true });
                    this.props.history.push('/');
                }
                else
                    ToastsStore.error("Credenciales incorrectas.");
            });
    }

    render() {
        return (
            <div className="Login">
                <ToastsContainer store={ToastsStore} />
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <FormLabel>Correo</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Iniciar Sesión
                </Button>
                </form>
            </div>
        );
    }
}
