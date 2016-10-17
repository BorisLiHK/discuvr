import React, { Component, PropTypes } from 'react';
import { Form, Field } from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';

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
      <Paper
        style={{
          backgroundColor: '#fff',
          margin: 20,
          padding: 15,
          position: 'absolute',
        }}
      >
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

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <RaisedButton
            label='Create'
            primary={true}
            onTouchTap={() => this.refs.form.submit()}
          />

          <RaisedButton
            label='Cancel'
            secondary={true}
            onClick={() => browserHistory.push('/')}
          />
        </div>
      </Paper>
    );
  }
}
