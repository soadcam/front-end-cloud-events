import { Nav, Navbar, Form } from "react-bootstrap";
import React, { Component } from 'react';

export default class MainHeader extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App container">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Eventos</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Todos</Nav.Link>
                        <Nav.Link href="/event/add">Agregar</Nav.Link>
                        <Nav.Link href="/logout">Cerrar sesión</Nav.Link>
                    </Nav>
                    <Form inline>
                    </Form>
                </Navbar>
            </div>
        );
    }
}