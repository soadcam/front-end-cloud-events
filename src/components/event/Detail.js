import React, { Component } from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Button, Card, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { handleResponse } from '../../helpers/handle-response'

export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                eventId: props.match.params.eventId,
                name: "",
                eventCategoryId: "",
                place: "",
                address: "",
                startDate: "",
                finishDate: "",
                eventTypeId: "",
            },
            lists: {
                categories: [],
                types: [],
            }
        };
    }

    componentDidMount() {
        this.getEvent();
        this.getEventCategories();
        this.getEventTypes();
    }

    getEvent() {
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: headers,
            cache: 'default'
        };
        fetch(`http://172.24.42.63:8080/api/events/${this.state.event.eventId}`, requestOptions)
            .then(response => handleResponse(response, this.props.history))
            .then(event => {
                if (event && event.length > 0) {
                    const newState = this.state;
                    newState.event = event[0];
                    this.setState(newState);
                    debugger
                }
            });
    }

    getEventCategories() {
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: headers,
            cache: 'default'
        };
        fetch(`http://172.24.42.63:8080/api/categories`, requestOptions)
            .then(response => handleResponse(response, this.props.history))
            .then(categories => {
                if (categories) {
                    if (categories.length > 0) {
                        const newState = this.state;
                        newState.lists.categories = categories;
                        this.setState(newState);
                    }
                }
            });
    }

    getEventTypes() {
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: headers,
            cache: 'default'
        };
        fetch(`http://172.24.42.63:8080/api/types`, requestOptions)
            .then(response => handleResponse(response, this.props.history))
            .then(types => {
                if (types) {
                    if (types.length > 0) {
                        debugger
                        const newState = this.state;
                        newState.lists.types = types;
                        this.setState(newState);
                    }
                }
            });
    }

    validateForm() {
        return this.state.event.name.length > 0
            && this.state.event.place.length > 0
            && this.state.event.address.length > 0
            && this.state.event.startDate.length > 0
            && this.state.event.finishDate.length > 0
            && this.state.event.eventCategoryId > 0
            && this.state.event.eventTypeId > 0;
    }

    handleChange = event => {
        const newState = this.state;
        newState.event[event.target.id] = event.target.value;
        this.setState(newState);
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.event.startDate > this.state.event.finishDate) {
            ToastsStore.error("La fecha inicial debe ser menor o igual a la final.");
            return;
        }
        var headers = new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            cache: 'default',
            body: JSON.stringify(this.state.event)
        };
        fetch(`http://172.24.42.63:8080/api/events/${this.state.event.eventId}`, requestOptions)
            .then(handleResponse)
            .then(operation => {
                if (operation) {
                    ToastsStore.success("El evento ha sido editado.");
                    this.props.history.push('/');
                }
            });
    }

    render() {
        return (
            <div>
                <ToastsContainer store={ToastsStore} />
                <Card style={{ marginLeft: '33%', marginRight: '33%', marginTop: '5%' }}>
                    <Card.Header style={{ fontWeight: 'bold' }}>Editar evento</Card.Header>
                    <Card.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="name">
                                <FormLabel>Nombre</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.event.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="place">
                                <FormLabel>Lugar</FormLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.event.place}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="address">
                                <FormLabel>Dirección</FormLabel>
                                <FormControl
                                    type="address"
                                    value={this.state.event.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="eventCategoryId">
                                <FormLabel>Categoría</FormLabel>
                                <FormControl as="select"
                                    value={this.state.event.eventCategoryId}
                                    onChange={this.handleChange}
                                >
                                    <option key="" value="" disabled>Elije una opción</option>
                                    {this.state.lists.categories.map(function (data, key) {
                                        return (
                                            <option key={key} value={data.eventCategoryId}>{data.description}</option>
                                        )
                                    })}
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="eventTypeId">
                                <FormLabel>Tipo</FormLabel>
                                <FormControl as="select"
                                    value={this.state.event.eventTypeId}
                                    onChange={this.handleChange}
                                >
                                    <option key="" value="" disabled>Elije una opción</option>
                                    {this.state.lists.types.map(function (data, key) {
                                        return (
                                            <option key={key} value={data.eventTypeId}>{data.description}</option>
                                        )
                                    })}
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="startDate">
                                <FormLabel>Fecha de inicio</FormLabel>
                                <FormControl
                                    type="date"
                                    value={this.state.startDate}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="finishDate">
                                <FormLabel>Fecha de fin</FormLabel>
                                <FormControl
                                    type="date"
                                    value={this.state.finishDate}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button
                                block
                                disabled={!this.validateForm()}
                                type="submit">Editar</Button>
                        </form>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}