import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';

import Circles from '../api/circles'
import Circle from './Circle'

class MyCirclesList extends Component {
  constructor(props) {
    super(props)
  }

  renderCircles() {
    return this.props.circles.map((circle) => {
      return (
        <Circle
          key={circle._id}
          circle={circle}
        />
      )
    })
  }

  render() {
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
        <h1>My Circles</h1>
        <h2>Sorted by Creation Date</h2>
        <div className="circles_cards">
          {this.renderCircles()}
        </div>
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <RaisedButton
            label='Create Circle'
            primary={true}
            onClick={() => browserHistory.push('create-circle')}
          />
          <RaisedButton
            label='Add Friends'
            secondary={true}
            onClick={() => browserHistory.push('add-friend')}
          />
        </div>

        <div
          style={{
            position: 'fixed',
            top: 35,
          }}
        >
          <RaisedButton
            label='Back to Map'
            secondary={true}
            onClick={() => browserHistory.push('/')}
            style={{
              position: 'fixed',
              right: 35,
            }}
          />
        </div>
      </Paper>
    )
  }
}

MyCirclesList.PropTypes = {
  allUsers: PropTypes.array,
  circles: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
};

//fetch by createdAt date or do the sort later?
export default createContainer(() => {
  Meteor.subscribe('userList');
  Meteor.subscribe('mycircles');

  return {
    allUsers: Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch(),
    circles: Circles.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, MyCirclesList);
