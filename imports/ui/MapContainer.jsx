import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import JewelIcon from 'material-ui/svg-icons/maps/add-location';

import Map from './Map';
import Layer from './Layer'
import Feature from "./Feature";
import AppIconMenu from './IconMenu'
import AccountsUIWrapper from './AccountsUIWrapper';
import Jewels from '../api/jewels';
import Circles from '../api/circles';
import Profiles from '../api/profiles';

class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mapCenter: this.getCenter()
        }
        navigator.geolocation.getCurrentPosition((pos)=>{
            this.setState({mapCenter: [pos.coords.longitude, pos.coords.latitude]});
        });
    }
    //test code to update location via setInterval() 
    /*updateCenter(){
        console.log("updateCenter() called");
        navigator.geolocation.getCurrentPosition((pos)=>{
            this.setState({mapCenter: [pos.coords.longitude, pos.coords.latitude]});
        });
        console.log(this.state.mapCenter);
    }*/

    getJewelData() {
        return {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {
                    // "title": "Mapbox UTS",
                    "description": "This is a test description",
                    "icon": "jewel_default"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        151.1994834,
                        -33.8840109
                    ]
                }
            }]
        }
    }

    getCenter() {
        // here be logic about getting center
        return [151.2093, -33.8688]
    }

    _onToggleHover(cursor, { map }) {
        map.getCanvas().style.cursor = cursor;
    }

    componentDidMount(){
    }

    render() {
        console.log(this.props.profiles.length);
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
                
                <AccountsUIWrapper />
                <AppIconMenu />
                
                <FloatingActionButton href="create-jewel" style={{
                    position: "fixed",
                    right: 20,
                    bottom: 20,
                }}>
                    <JewelIcon/>
                </FloatingActionButton>
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
    Meteor.subscribe('circles');
    Meteor.subscribe('profiles');

    return {
        jewels: Jewels.find().fetch(),
        circles: Circles.find().fetch(),
        profiles: Profiles.find().fetch(),
    };
}, MapContainer);
