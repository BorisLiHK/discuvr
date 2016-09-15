import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'

import Jewels from '../api/jewelSchema.js'

export default class CreateJewelPage extends Component {
    render() {
        return (
            <div>
                <h1>Create a New Jewel</h1>
                <Form
                    collection={Jewels}
                    type='insert'
                    ref='createjewelform'
                />
                <RaisedButton primary label='Create' onTouchTap={() => this.refs.form.submit()}/>
            </div>
        );
    }
}
