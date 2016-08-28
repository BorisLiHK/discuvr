import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Jewels } from '../api/jewels.js';

import Jewel from './Jewel.jsx';
import Map from './Map';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
            mapCenter: this.props.initialMapCenter
        };

        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos)
            this.setState({mapCenter: [pos.coords.longitude, pos.coords.latitude] })
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('jewels.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderJewels() {
        let filteredJewels = this.props.jewels;
        if (this.state.hideCompleted) {
            filteredJewels = filteredJewels.filter(jewel => !jewel.checked);
        }
        return filteredJewels.map((jewel) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = jewel.owner === currentUserId;

            return (
                <Jewel
                    key={jewel._id}
                    jewel={jewel}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    render() {
        return (
            <div className="">
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    center={this.state.mapCenter}
                    accessToken="pk.eyJ1IjoiYWxleGQiLCJhIjoiY2lycmd5anZpMGk1cGZrbTYzMHU3OGJ5YiJ9.5cKvcoZRsDYxzFsCjJLG4Q" />
            </div>
        );
    }
}

App.propTypes = {
    jewels: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
    initialMapCenter: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('jewels');

    return {
        jewels: Jewels.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Jewels.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
        initialMapCenter: [151.2093, -33.8688]
    };
}, App);
