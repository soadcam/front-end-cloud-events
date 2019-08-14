import React, { Component } from 'react';
import MainHeader from "../main/Header";
import EventList from "./List";

export default class EventListContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <MainHeader />
                <EventList history={this.props.history} />
            </div>
        );
    }
}
