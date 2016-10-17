import React, { Component, PropTypes } from 'react';
import { Form } from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';

import Jewels from '../api/jewels';

export default class ViewJewelPage extends Component {
  handleSubmit(event) {
    Console.log(this);
  }

  render() {
    return (
      <Paper
        style={{
          backgroundColor: '#fff',
          margin: 20,
          padding: 15,
          position: 'absolute',
          left: 0,
          right: 0,
        }}
      >
        <h1>{this.PropTypes.jewel.title}</h1>

        <Form
          collection={Jewels}
          type='insert'
          ref='form'
          onSuccess={() => browserHistory.push('/')}
          logErrors
        />

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

ViewJewelPage.PropTypes = {
  jewel: PropTypes.object.isRequired,
};
