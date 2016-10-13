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

        console.log(this.props)
        this.state = {
            stranger: null,
            circle: null
        };
    }
    handleSubmit(event) {
        console.log(this.state.stranger);
        console.log(this.props.friendsCircle);
        if (this.state.stranger) {
            Meteor.call('circles.addFriend', this.state.stranger, this.props.friendsCircle[0]._id);
            console.log("added");
            if(this.state.circle){
                Meteor.call('circles.addFriend',this.state.stranger,this.state.circle);
                console.log("added to ",this.state.circle);
            }
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
    renderCircles(){
        let circles = this.props.myCircles;
        if (circles){
            return circles.map(circle => {
                return <MenuItem key={circle._id} value={circle._id} primaryText={circle.title} />
            })
        }
    }
    render() {
        return (
            <div>
                <h1>Add a New Friend</h1>
                
                <SelectField
                    value = {this.state.stranger}
                    onChange = {(event, index, stranger) => this.setState({stranger})}
                    autoWidth = {false}
                    floatingLabelText = "Add a New Friend"
                >
                {this.renderFriends()}
                </SelectField>
                <SelectField
                    value = {this.state.circle}
                    onChange = {(event,index,circle) => this.setState({circle})}
                    autoWidth = {false}
                    floatingLabelText = "Into a Circle"
                >
                {this.renderCircles()}
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
    myCircles: PropTypes.array,
    friendsCircle: PropTypes.object.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('userList');
    Meteor.subscribe('mycircles');

    return {
        strangers: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),
        //TODO strangers has to be users not in myfriends circle
        currentUser: Meteor.user(),
        myCircles: Circles.find().fetch(),
        friendsCircle: Circles.find({"title": "myfriends"}).fetch(),
    };
}, AddFriendPage)