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
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/#/">Eventos</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/#/">Todos</Nav.Link>
                        <Nav.Link href="/#/event/add">Agregar</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Nav.Link href="/#/logout" className=" mr-sm-2">Cerrar sesión</Nav.Link>
                    </Form>
                </Navbar>
            </div>
        );
    }
}