import React, { Component } from 'react';
import MainHeader from "../main/Header";
import EventDetails from './Detail';

export default class EventDetailsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <MainHeader />
                <EventDetails history={this.props.history} match={this.props.match} />
            </div>
        );
    }
}
