import React, { Component } from 'react';
import { Button, Card, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { handleResponse } from '../../helpers/handle-response'

export default class UserRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
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
        if (!this.validateForm())
            ToastsStore.error("El email y la contraseña son campos obligratorios.");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptionsUniqueUser = {
            method: 'GET',
            headers: headers,
            cache: 'default'
        };
        fetch(`http://172.24.42.63:8080/api/users/${this.state.email}`, requestOptionsUniqueUser)
            .then(handleResponse)
            .then(response => {
                if (!response || response.length === 0) {
                    const requestOptionsAddUser = {
                        method: 'POST',
                        headers: headers,
                        cache: 'default',
                        body: JSON.stringify({
                            username: this.state.email,
                            password: this.state.password
                        })
                    };
                    fetch(`http://172.24.42.63:8080/api/users`, requestOptionsAddUser)
                        .then(handleResponse)
                        .then(userResponse => {
                            if (userResponse)
                              ToastsStore.success("Usuario registrado.");
                        });
                }
                else
                    ToastsStore.error("El correo ya está registrado.");
            });
    }

    render() {
        return (
            <div>
                <ToastsContainer store={ToastsStore} />
                <Card style={{ marginLeft: '33%', marginRight: '33%', marginTop: '5%' }}>
                    <Card.Header style={{ fontWeight: 'bold' }}>Registrar usuario</Card.Header>
                    <Card.Body>
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
                                type="submit">Registrar</Button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
