import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import {Form} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import FilteredMultiSelect from 'react-filtered-multiselect';

import Circles from '../api/circles';

class CreateCirclePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myFriends: this.props.myFriends,
            newCircleFriends: []
        }

        this.addFriend = this.addFriend.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
    }

    addFriend(newFriends) {
        this.setState({newCircleFriends: newFriends}) 
    }

    removeFriend(index) {
        var newFriends = this.state.newCircleFriends.slice()
        newFriends.splice(index, 1)
        this.setState({newCircleFriends: newFriends})
    }

    render() {
        return (
            <div>
                <h1>Create a New Circle</h1>
                <Form
                    collection={Circles}
                    type='insert'
                    ref='form'
                    inSuccess={()=>
                        browserHistory.push('/')
                    }
                    logErrors
                />

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

                <div style={{marginTop: 20}}>
                    <RaisedButton label='Create' primary={true} onTouchTap={() => this.refs.form.submit()} style={{
                        position: 'fixed',
                        left: 20,
                    }}/>
                    <RaisedButton label='Cancel' secondary={true} href="/my-circles" style={{
                        position: 'fixed',
                        right: 20,
                    }} />
                </div>
                <RaisedButton 
                    primary label='Create'
                    onTouchTap={() => this.refs.form.submit()}
                    style={{position:"fixed",left:20,}}
                />
                <RaisedButton
                    secondary label='Cancel'
                    href="/"
                    style={{position:"fixed",right:20,}}
                />
            </div>
        );
    }
}

CreateCirclePage.PropTypes = {
    myFriends: PropTypes.object
}

export default createContainer(() => {
    Meteor.subscribe('userList');
    Meteor.subscribe('mycircles');

    //console.log(Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),)
    
    return {
        myFriends: Circles.find({"title": "myfriends"}, {fields: {members: 1}}).fetch(),
    };
}, CreateCirclePage)