import React, { Component } from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Button, Card, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

export default class EventDetails extends Component {
    eventCategories;
    eventTypes;

    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.match.params.idEvent,
            name: "",
            eventCategoryId: "",
            place: "",
            address: "",
            startDate: "",
            finishDate: "",
            eventTypeId: "",
        };
        this.eventCategories = [];
        this.eventTypes = [];
        this.getEventCategories();
        this.getEventTypes();
    }
    
    componentDidMount() {
        this.getEvent();
    }

    getEvent(){
        const eventDb = {
            name: "adsada",
            eventCategoryId: 1,
            place: "asdsad",
            address: "qewqeqw",
            startDate: "2019-01-05",
            finishDate: "2019-02-05",
            eventTypeId: 2,
        };
        this.setState(eventDb);
    }

    getEventCategories() {
        this.eventCategories = [
            {
                eventCategoryId: 1,
                description: 'Cat 1',
            },
            {
                eventCategoryId: 2,
                description: 'Cat 2',
            },
            {
                eventCategoryId: 3,
                description: 'Cat 3',
            },
        ];
    }

    getEventTypes() {
        this.eventTypes = [
            {
                eventTypeId: 1,
                description: 'Presencial',
            },
            {
                eventTypeId: 2,
                description: 'Virtual',
            },
        ];
    }

    validateForm() {
        return this.state.eventId.length > 0
            && this.state.name.length > 0
            && this.state.place.length > 0
            && this.state.address.length > 0
            && this.state.startDate.length > 0
            && this.state.finishDate.length > 0
            && this.state.eventCategoryId > 0
            && this.state.eventTypeId > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.startDate > this.state.finishDate) {
            ToastsStore.error("La fecha inicial debe ser menor o igual a la final.");
            return;
        }
        ToastsStore.success("El evento ha sido creado.");
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
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="place">
                                <FormLabel>Lugar</FormLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.place}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="address">
                                <FormLabel>Dirección</FormLabel>
                                <FormControl
                                    type="address"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="eventCategoryId">
                                <FormLabel>Categoría</FormLabel>
                                <FormControl as="select"
                                    value={this.state.eventCategoryId}
                                    onChange={this.handleChange}
                                >
                                    <option key="" value="" disabled>Elije una opción</option>
                                    {this.eventCategories.map(function (data, key) {
                                        return (
                                            <option key={key} value={data.eventCategoryId}>{data.description}</option>
                                        )
                                    })}
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="eventTypeId">
                                <FormLabel>Tipo</FormLabel>
                                <FormControl as="select"
                                    value={this.state.eventTypeId}
                                    onChange={this.handleChange}
                                >
                                    <option key="" value="" disabled>Elije una opción</option>
                                    {this.eventTypes.map(function (data, key) {
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