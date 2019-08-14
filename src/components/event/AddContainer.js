import React, { Component } from 'react';
import MainHeader from "../main/Header";
import EventAdd from './Add';

export default class EventAddContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <MainHeader />
                <EventAdd history={this.props.history} />
            </div>
        );
    }
}
