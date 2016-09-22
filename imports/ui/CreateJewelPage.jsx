import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'

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
                    logErrors
                />
                <RaisedButton primary label='Create' onTouchTap={() => this.refs.form.submit()}/>
            </div>
        );
    }
}
