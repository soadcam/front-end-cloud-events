import React, { Component } from 'react';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        const eventsDb = [
            {
                eventId: 1,
                name: "1",
                place: "1",
                address: "qewqeqw",
                startDate: "2019-01-05",
                finishDate: "2019-02-05",
                category: 'Cat 1',
                type: 'Presencial',
            },
            {
                eventId: 2,
                name: "2",
                place: "2",
                address: "qewqeqw",
                startDate: "2019-01-05",
                finishDate: "2019-02-05",
                category: 'Cat 2',
                type: 'Virtual',
            },
        ];
        this.setState({events: eventsDb});
    }

    deleteEvent() {
        if (window.confirm('¿Estás seguro de eliminar el evento?')) {
            this.getEvents();
        }
    }

    render() {
        return (
            <Card style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}>
                <Card.Header style={{ fontWeight: 'bold' }}>Crear evento</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Lugar</th>
                                <th>Dirección</th>
                                <th>Fecha de inicio</th>
                                <th>Fecha de fin</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th colSpan={2}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.events.map((event, index) => {
                                const {
                                    eventId,
                                    name,
                                    place,
                                    address,
                                    startDate,
                                    finishDate,
                                    category,
                                    type } = event
                                return (
                                    <tr key={eventId}>
                                        <td>{name}</td>
                                        <td>{place}</td>
                                        <td>{address}</td>
                                        <td>{startDate}</td>
                                        <td>{finishDate}</td>
                                        <td>{category}</td>
                                        <td>{type}</td>
                                        <td><Link to={`/event/details/${eventId}`}>Editar</Link></td>
                                        <td>
                                            <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                                onClick={() => {this.deleteEvent();}}>
                                                Eliminar
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}