import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MapContainer from './MapContainer';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <MapContainer>
          {this.props.children}
        </MapContainer>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {};
