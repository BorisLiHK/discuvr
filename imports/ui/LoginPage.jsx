import React, {Component, PropTypes} from 'react';
import {Accounts} from 'meteor/zetoff:accounts-material-ui';

import LoginForm from './LoginForm'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Just render a placeholder container that will be filled in
        return (
            <div style={loginContainerStyle}>
                <img
                    style={loginImageStyle}
                    src="icons/temp_jewel.png"
                />

                <h1>discuvr</h1>

                <Accounts.ui.LoginForm />
            </div>
        );
    }
}

const loginContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: 'rgba(243, 154, 193, 0.5)'
}

const loginImageStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
}
