import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {browserHistory} from 'react-router';


export default class LogoutPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        browserHistory.push('/')
        return (
        <div>
        	<h1> You have been logged out sucessfully. </h1>
        </div>
        );
    }
}
