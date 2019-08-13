import { Nav, Navbar, Form } from "react-bootstrap";
import React, { Component } from 'react';

export default class LoginNav extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App container">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/login">Eventos</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/user/register">Registrar</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                    <Form inline>
                    </Form>
                </Navbar>
            </div>
        );
    }
}