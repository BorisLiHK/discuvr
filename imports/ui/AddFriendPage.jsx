import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data'
import {Form} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

class AddFriendPage extends Component {
    handleSubmit(event) {
        Console.log(this);
    }
    render() {
        return (
            <div>
                <h1>Add a new Friend</h1>
                

                <div style={{marginTop: 20}}>
                    <RaisedButton label='Select' primary={true} onTouchTap={() => this.refs.form.submit()} style={{
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

AddFriendPage.PropTypes = {
    strangers: PropTypes.array,
};

export default createContainer(() => {
    Meteor.subscribe('userList');
    console.log(Meteor.users.find({}))


    return {
        strangers: Meteor.users.find({}),
    };
}, AddFriendPage)