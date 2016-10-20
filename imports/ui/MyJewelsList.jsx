import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';

import Jewels from '../api/jewels'
import JewelCard from './JewelCard'

class MyJewelsList extends Component {
  constructor(props) {
    super(props)
  }

  renderJewels() {
    return this.props.jewels.map((jewel) => {
      return (
        <JewelCard
          key={jewel._id}
          jewel={jewel}
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
        <h1>My Jewels</h1>
        <h2>Sorted by Creation Date</h2>
        <div className="jewel_cards">
          {this.renderJewels()}
        </div>

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <RaisedButton
            label='Back to Map'
            secondary={true}
            onClick={() => browserHistory.push('/')}
          />
        </div>
      </Paper>
    )
  }
}

MyJewelsList.PropTypes = {
  jewels: PropTypes.array,
  currentUser: PropTypes.object.isRequired
};

//fetch by createdAt date or do the sort later?
export default createContainer(() => {
  Meteor.subscribe('myjewels');

  return {
    jewels: Jewels.find({userId: Meteor.userId()}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
}, MyJewelsList);
