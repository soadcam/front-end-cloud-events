import React, { Component } from 'react';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { handleResponse } from '../../helpers/handle-response'

export default class EventList extends Component {
    constructor(props) {
        super(props);
        debugger
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: headers,
            cache: 'default'
        };
        fetch(`http://172.24.42.63:8080/api/events`, requestOptions)
            .then(response => handleResponse(response, this.props.history))
            .then(events => {
                if (events){
                    if (events.length === 0)
                        ToastsStore.warning("No hay eventos asociados al usuario.");
                    this.setState({ events: events });
                }
            });
    }

    deleteEvent(eventId) {
        if (window.confirm('¿Estás seguro de eliminar el evento?')) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
            headers.append('Content-Type', 'application/json');
            const requestOptions = {
                method: 'DELETE',
                headers: headers,
                cache: 'default'
            };
            fetch(`http://172.24.42.63:8080/api/events/${eventId}`, requestOptions)
            .then(response => handleResponse(response, this.props.history))
            .then(operation => {
                if (operation) {
                    this.getEvents();
                    ToastsStore.success("Se ha eliminado el evento.");
                }
            });
        }
    }

    render() {
        if (!this.state.events || this.state.events.length === 0) {
            return (
                <Card style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}>
                    <Card.Header style={{ fontWeight: 'bold' }}>Evento</Card.Header>
                    <Card.Body>No hay eventos asociados al usuario.</Card.Body>
                </Card>
            );
        }
        return (
            <div>
                <ToastsContainer store={ToastsStore} />
                <Card style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}>
                    <Card.Header style={{ fontWeight: 'bold' }}>Eventos</Card.Header>
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
                                            <td><Link to={`/event/details/${eventId}/1`}>Detalles</Link></td>
                                            <td><Link to={`/event/details/${eventId}/0`}>Editar</Link></td>
                                            <td>
                                                <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                                    onClick={() => { this.deleteEvent(eventId); }}>
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
            </div>
        );
    }
}
