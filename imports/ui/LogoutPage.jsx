import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


export default class LogoutPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
        	<h1> You have been logged out sucessfully. </h1>
            <h3><a href = "login">Click Here to go back to the login page</a></h3>
        </div>
        );
    }
}
