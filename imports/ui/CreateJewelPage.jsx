import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Form, Field} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

import Jewels from '../api/jewels';
import Category from './Category.jsx';

export default class CreateJewelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleSubmit(event) {
        console.log(this.state);
    }
    
    render() {
        return (
            <div>
                <h1>Create a New Jewel</h1>
                <Form
                    collection={Jewels}
                    type='insert'
                    ref='form'
                    onSuccess={()=>
                        browserHistory.push('/')
                    }
                    logErrors
                />
                <h3>If no coordinates are entered, then the current location is used.</h3>
                <div style={{
                    position: "relative",
                    marginTop: 20,
                }}>
                    <RaisedButton
                        label='Create'
                        primary={true}
                        onTouchTap={() => this.refs.form.submit()}
                        style={{
                            position: "absolute",
                            left: 20,
                            marginBottom: 20
                        }}
                    />
                    <RaisedButton
                        label='Cancel'
                        secondary={true}
                        href="/"
                        style={{
                            position: "absolute",
                            right: 20,
                            marginBottom: 20
                        }}
                    />
                </div>
            </div>
        );
    }
}
