import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data'
import {Form} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Circles from '../api/circles';

class AddFriendPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: null
        };
    }
    handleSubmit(event) {
        console.log(this.state.value);
        console.log(this.props.friendsCircle[0]._id);
        if (this.state.value) {
            Meteor.call('circles.addFriend', this.state.value, this.props.friendsCircle[0]._id);
            console.log("added");
        }
        else {
            console.log("not added");
        }
    }
    renderFriends() {
        let friends = this.props.strangers;
        if (friends) {
            return friends.map( friend => {
                return <MenuItem key={friend._id} value={friend._id} primaryText={friend.username} />
            })
        }
    }
    render() {
        return (
            <div>
                <h1>Add a New Friend</h1>
                
                <SelectField
                    value = {this.state.value}
                    onChange = {(event, index, value) => this.setState({value})}
                    autoWidth = {false}
                    floatingLabelText = "Add a New Friend"
                >
                {this.renderFriends()}
                </SelectField>

                <div style={{marginTop: 20}}>
                    <RaisedButton
                        label='Add Friend'
                        primary={true}
                        onTouchTap={() => this.handleSubmit()}
                        style={{
                            position: 'fixed',
                            left: 20,
                        }}
                    />
                    <RaisedButton
                        label='Cancel'
                        secondary={true}
                        href="/my-circles"
                        style={{
                            position: 'fixed',
                            right: 20,
                        }}
                    />
                </div>
            </div>
        );
    }
}

AddFriendPage.PropTypes = {
    strangers: PropTypes.array,
    currentUser: PropTypes.object.isRequired,
    friendsCircle: PropTypes.object.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('userList');
    Meteor.subscribe('mycircles');

    return {
        strangers: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),
        currentUser: Meteor.user(),
        friendsCircle: Circles.find({"title": "myfriends"}).fetch(),
    };
}, AddFriendPage)