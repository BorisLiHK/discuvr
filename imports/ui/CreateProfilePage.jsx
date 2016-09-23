import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

import Profiles from '../api/profiles'

export default class CreateProfilePage extends Component {
    handleSubmit(event) {
        Console.log(this);
    }
    render() {
        return (
            <div>
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
                    onTouchTap={() => this.refs.form.submit()}
                    style={{position:"fixed",left:20,}}
                />
                <RaisedButton
                    secondary label='Later'
                    href="/"
                    style={{position:"fixed",right:20,}}
                />
            </div>
        );
    }
}
