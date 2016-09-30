import React, {Component, PropTypes} from 'react';
import {Accounts} from 'meteor/zetoff:accounts-material-ui';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Just render a placeholder container that will be filled in
        return (
            <div style={loginContainerStyle}>
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
    margin: 30,
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center'
}
