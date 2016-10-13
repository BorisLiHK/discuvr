import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import FilteredMultiSelect from 'react-filtered-multiselect';
import TextField from 'material-ui/TextField';

import Circles from '../api/circles';

class CreateCirclePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newCircleFriends: new Array
        }

        this.addFriend = this.addFriend.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
        this.render = this.render.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            //myFriends: nextProps.friendCircle[0].membersObj
            myFriends: nextProps.friendCircle[0].membersObj.map((member) => {
                return {
                    username: member.username,
                    _id: member._id
                }
            })
        })
    }

    addFriend(newFriends) {
        this.setState({newCircleFriends: newFriends}) 
    }

    removeFriend(index) {
        var newFriends = this.state.newCircleFriends.slice()
        newFriends.splice(index, 1)
        this.setState({newCircleFriends: newFriends})
    }

    submit() {
        const text = document.getElementById("tbTitle").value;
        console.log(text)
        console.log(this.state.newCircleFriends.map(function(a) {return a._id}))
        Meteor.call('circles.addCircle', text, this.state.newCircleFriends.map(function(a) {return a._id}))
    }

    render() {
        return (
            <div>
                <h1>Create a New Circle</h1>
                <TextField
                    id="tbTitle"
                    hintText="title"
                    floatingLabelText="Title"
                    fullWidth={true}
                />

                {
                    (this.state.myFriends && this.state.myFriends.length !== 0) ? (
                        <div style={{marginTop: 20}}>
                            <FilteredMultiSelect
                                buttonText="Add Friend"
                                onChange={this.addFriend}
                                options={this.state.myFriends}
                                selectedOptions={this.state.newCircleFriends}
                                textProp="username"
                                valueProp="_id"
                                classNames={{
                                    button: 'FilteredMultiSelect__button',
                                    // Used when at least one <option> is selected
                                    buttonActive: 'FilteredMultiSelect__button--active',
                                    filter: 'FilteredMultiSelect__filter',
                                    select: 'FilteredMultiSelect__select'
                                }}
                            />

                            <FilteredMultiSelect
                                buttonText="Remove Friend"
                                onChange={this.removeFriend}
                                options={this.state.newCircleFriends}
                                textProp="username"
                                valueProp="_id"
                                classNames={{
                                    button: 'FilteredMultiSelect__button',
                                    // Used when at least one <option> is selected
                                    buttonActive: 'FilteredMultiSelect__button--active',
                                    filter: 'FilteredMultiSelect__filter',
                                    select: 'FilteredMultiSelect__select'
                                }}
                                style={{marginTop: 20}}
                            />
                        </div>
                    ) : ''
                }

                <div style={{marginTop: 20}}>
                    <RaisedButton label='Create' primary={true} onTouchTap={this.submit} style={{
                        position: 'fixed',
                        left: 20,
                    }}/>
                    <RaisedButton label='Cancel' secondary={true} href="/my-circles" style={{
                        position: 'fixed',
                        right: 20,
                    }} />
                </div>
            </div>
        );
    }
}

CreateCirclePage.PropTypes = {
    friendCircle: PropTypes.array,
}

export default createContainer(() => {
    Meteor.subscribe('userList');
    Meteor.subscribe('mycircles');
    
    return {
        friendCircle: Circles.find({"title": "myfriends"}, {fields: {members: 1}}).fetch(),
    };
}, CreateCirclePage)