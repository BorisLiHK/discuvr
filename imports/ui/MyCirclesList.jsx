import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

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
            <div>
                <h1>My Circles</h1>
                <h2>Sorted by Creation Date</h2>
                <div className="circles_cards">
                    {this.renderCircles()}
                </div>
                <div style={{marginTop: 20}}>
                    <RaisedButton
                        label='Create Circle'
                        primary={true}
                        href="/create-circle"
                        style={{
                            position: 'fixed',
                            left: 20,
                        }}
                    />
                    <RaisedButton
                        label='Add Friends'
                        secondary={true}
                        href="/add-friend"
                        style={{
                            position:'fixed',
                            right: 20
                        }}
                    />
                </div>
                <div style={{position:'fixed',top:20,}}>
                    <RaisedButton
                        label='Back to Map'
                        secondary={true}
                        href="/"
                        style={{
                            position: 'fixed',
                            right: 20, 
                        }}
                    />
                </div>
            </div>
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
        allUsers: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),
        circles: Circles.find({}, {sort: {createdAt : -1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, MyCirclesList);
