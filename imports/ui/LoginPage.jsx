import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleLoginValidation = this.handleLoginValidation.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);

    this.state = {
      valid: {
        username: false,
        password: false,
        email: false,
      },
      login: true
    };
  }

  handleSwitch() {
    this.setState({
      login: !this.state.login,
    })
  }

  handleView() {
    if (this.state.login) {
      return [
        <TextField
          key="1"
          floatingLabelText="username or email"
          name="username"
          ref={(ref) => {
            this.username = ref;
          }}
          onBlur={this.handleLoginValidation}
        />,

        <TextField
          key="2"
          floatingLabelText="password"
          type="password"
          name="password"
          ref={(ref) => {
            this.password = ref;
          }}
          onBlur={this.handleLoginValidation}
        />,

        <div
          key="3"
          style={{
            margin: 10,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <RaisedButton
            primary
            label="Login"
            onClick={this.handleLogin}
          />

          <RaisedButton
            secondary
            label="Register"
            onClick={this.handleSwitch}
          />
        </div>
      ]
    }

    return [
      <TextField
        key="1"
        floatingLabelText="select username"
        name="username"
        ref={(ref) => {
          this.username = ref;
        }}
        onBlur={this.handleLoginValidation}
      />,

      <TextField
        key="2"
        floatingLabelText="enter email"
        name="email"
        type="email"
        ref={(ref) => {
          this.email = ref;
        }}
        onBlur={this.handleLoginValidation}
      />,

      <TextField
        key="3"
        floatingLabelText="select password"
        type="password"
        name="password"
        ref={(ref) => {
          this.password = ref;
        }}
        onBlur={this.handleLoginValidation}
      />,

      <div
        key="4"
        style={{
          margin: 10,
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <RaisedButton
          primary
          label="Register"
          onClick={this.handleSignup}
        />

        <RaisedButton
          secondary
          label="Login"
          onClick={this.handleSwitch}
        />
      </div>
    ]
  }

  handleLogin() {
    if (this.state.valid.username && this.state.valid.password) {
      Meteor.loginWithPassword(
        this.username.input.value, this.password.input.value, (err) => {
          if (!err) browserHistory.push('/');
          else console.log(err);
        }
      );
    }
  }

  handleLoginValidation(e) {
    const input = e.currentTarget;
    const newValid = this.state.valid;
    newValid[input.name] = input.value !== '';
    this.setState({
      valid: newValid,
    },);
  }

  handleSignup() {
    if (this.state.valid.username && this.state.valid.password && this.state.valid.email) {
      console.log(this.username.input.value, this.email.input.value, this.password.input.value)

      Accounts.createUser({
          username: this.username.input.value,
          email: this.email.input.value,
          password: this.password.input.value,
        }, (err) => {
          if (!err) browserHistory.push('my-profile');
          else console.log(err);
        }
      );
    }
  }

  render() {
    return (
      <div
        style={{
          padding: '50px 20px',
          backgroundColor: 'rgba(233,30,99, 0.1)',
          margin: 'auto',
          maxWidth: 500,
          position: 'fixed',
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Paper
          style={{
            padding: 10,
            textAlign: 'center',
          }}
        >
          <img
            style={{ marginTop: 20 }}
            role="presentation"
            src="img/jewel_default.png"
          />

          <h1
            className="heading"
          >
            discuvr
          </h1>

          {this.handleView()}
        </Paper>
      </div>
    );
  }
}

export default Login;
