import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import Jewels from '../api/jewels'

export default class CreateJewelPage extends Component {
    handleSubmit(event) {
        Console.log(this);
    }
    render() {
        return (
            <div>
                <h1>Create a New Jewel</h1>
                <Form
                    collection={Jewels}
                    type='insert'
                    ref='form'
                    onSuccess={() => Router.IndexRoute}
                    logErrors
                />
                <RaisedButton primary label='Create' primary={true} onTouchTap={() => this.refs.form.submit()} style={{
                    position: "fixed",
                    left: 20,
                }}/>
                <RaisedButton primary label='Cancel' secondary={true} href="/" style={{
                    position: "fixed",
                    right: 20,
                }} />
            </div>
        );
    }
}
