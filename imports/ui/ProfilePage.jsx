import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Form, Field } from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';

import Profiles from '../api/profiles';
import Circles from '../api/circles';

export default class ProfilePage extends Component {
  createProfile() {
    return (
      <Paper
        style={{
          backgroundColor: '#fff',
          margin: 20,
          padding: 15,
          position: 'absolute',
          left: 0,
          right: 0,
        }}
      >
        <h1>Tell Us About You</h1>

        <Form
          collection={Profiles}
          type='insert'
          ref='form'
          onSuccess={()=>
            browserHistory.push('/')
          }
          logErrors
        />

        <RaisedButton
          primary label='Save'
          onTouchTap={() => {
            this.refs.form.submit();
            Circles.insert({
              _id: new Meteor.Collection.ObjectID()._str,
              userId: Meteor.userId,
              createdAt: new Date(),
              title: "myfriends",
              members: [],
            })
          }}
        />
      </Paper>
    );
  }

  editProfile() {
    console.log(this.props.profiles[0])
    return (
      <Paper
        style={{
          backgroundColor: '#fff',
          margin: 20,
          padding: 15,
          position: 'absolute',
        }}
      >
        <h1>About You</h1>

        <Form
          collection={Profiles}
          type='update'
          ref='form'
          doc={this.props.profiles[0]}
          onSuccess={()=>
            browserHistory.push('/')
          }
          logErrors
        >
          <Field fieldName='firstName'/>
          <Field fieldName='lastName'/>
          <Field fieldName='dob'/>
        </Form>

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <RaisedButton
            primary label='Save'
            onTouchTap={() => this.refs.form.submit()}
          />

          <RaisedButton
            secondary
            label='Back'
            onClick={() => browserHistory.push('/')}
          />
        </div>

      </Paper>
    );
  }

  handleSubmit(event) {
    Console.log(this);
  }

  render() {
    console.log(this.props.profiles.length)
    if (this.props.profiles.length == 0)
      return <div>{this.createProfile()}</div>
    else
      return <div>{this.editProfile()}</div>
  }
}

export default createContainer(() => {
  Meteor.subscribe('mycircles');
  Meteor.subscribe('myprofiles');

  return {
    circles: Circles.find({}).fetch(),
    profiles: Profiles.find({}).fetch(),
  };
}, ProfilePage);
