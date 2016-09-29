import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'

import Circles from '../api/circles'

export default class CreateCirclePage extends Component {
    handleSubmit(event) {
        Console.log(this);
    }
    render() {
        return (
            <div>
                <h1>Create a New Circle</h1>
                <Form
                    collection={Circles}
                    type='insert'
                    ref='form'
                    logErrors
                />
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
            </div>
        );
    }
}
