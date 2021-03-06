import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import JewelIcon from 'material-ui/svg-icons/maps/add-location';
import ProfileIcon from 'material-ui/svg-icons/social/person';

import Map from './Map';
import Layer from './Layer'
import Feature from "./Feature";
import Jewels from '../api/jewels';
import Circles from '../api/circles';
import Profiles from '../api/profiles';
import AppIconMenu from './IconMenu';
import { browserHistory } from 'react-router';

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapCenter: this.getCenter()
    }
  }

  //use callback so that the function to update center get called once position is updated
  getCenter(callback) {
    var position = [151.1998, -33.8848];
    var onSuccess = (pos) => {
      position = [pos.coords.longitude, pos.coords.latitude];

      if (callback && typeof callback === 'function')
        callback(position)
      else return position
    }
    let onFail = (pos) => {
      if (callback && typeof callback === 'function')
        callback(position)
      else return position
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onFail);
  }

  _onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  componentDidMount() {
    const that = this;
    const userId = Meteor.userId();
    window.setInterval(() => {
      that.getCenter((pos) => {
        that.setState({ mapCenter: pos })
        Meteor.call('profiles.updateLocation', userId, pos);
        //console.log("newMapCenter: ", that.state.mapCenter);
      })
    }, 3000);
  }

  showButtons() {
    if (!location.pathname.includes('login')) {
      return (
        <div>
          <FloatingActionButton
            key="profile"
            style={{
              position: "fixed",
              right: 20,
              top: 20,
            }}
          >
            <ProfileIcon/>
          </FloatingActionButton>

          <AppIconMenu key="menu"/>

          <FloatingActionButton
            key="jewel"
            onClick={() => browserHistory.push('create-jewel')}
            style={{
              position: "fixed",
              right: 20,
              bottom: 20,
            }}
          >
            <JewelIcon/>
          </FloatingActionButton>
        </div>
      )
    }
    return ''
  }

  render() {
    return (
      <div className="super_class">
        <Map center={this.state.mapCenter}>
          <Layer
            id="jewelsLayer"
            type="symbol"
            source="jewelsLayer"
            layout={{
              'icon-image': '{icon}',
              'text-field': '{title}',
              'text-offset': [0, 2],
              'text-size': 10,
              'text-anchor': 'top',
              'icon-allow-overlap': true
            }}
          >
            {
              this.props.jewels.map((jewel, index) => (
                <Feature
                  key={jewel._id}
                  id={jewel.id}
                  userId={jewel.userId}
                  title={jewel.title}
                  coordinates={[
                    jewel.coordinates.longitude,
                    jewel.coordinates.latitude
                  ]}
                />
              ))
            }
          </Layer>

        </Map>

        {this.showButtons()}

        {this.props.children}
      </div>
    );
  }
}

MapContainer.PropTypes = {
  jewels: PropTypes.array.isRequired,
  circles: PropTypes.array.isRequred,
  profiles: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('jewels');
  Meteor.subscribe('mycircles');
  Meteor.subscribe('myprofiles');

  return {
    jewels: Jewels.find().fetch(),
    circles: Circles.find({}).fetch(),
    profiles: Profiles.find({}).fetch(),
  };
}, MapContainer);
