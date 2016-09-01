import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AccountsUIWrapper />
        );
    }
}
