import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Map from './Map';
import Layer from './Layer'
import Feature from "./Feature";
import AccountsUIWrapper from './AccountsUIWrapper'
import Jewels from '../api/jewels'

class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mapCenter: this.getCenter()
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos)
            this.setState({mapCenter: [pos.coords.longitude, pos.coords.latitude] })
        });
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((pos) => {
            return [pos.coords.longitude, pos.coords.latitude]
        })
    }

    getJewelData() {
        return {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {
                    "title": "Mapbox UTS",
                    "description": "This is a test description",
                    "icon": "harbor"
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

    render() {
        return (
            <div className="super_class">
                <Map
                    center={this.state.mapCenter}>
                    <Layer
                        id="jewelsLayer"
                        type="symbol"
                        source="jewelsLayer"
                        data={this.getJewelData()}
                        layout={{
                            'icon-image': '{icon}-15',
                            'text-field': '{title}',
                            'text-offset': [0, 0.6],
                            'text-anchor': 'top',
                            'icon-allow-overlap': true
                        }}
                    >
                    {
                        // this.props.jewels.map((jewel, index) => (
                        //     <Feature 
                        //         key={jewel.id}
                        //     />
                        // ))
                        
                    } 
                    </Layer>
                </Map>
                <AccountsUIWrapper />
            </div>
        );
    }
}

MapContainer.PropTypes = {
    jewels: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('jewels');

    console.log(Jewels)

    return {
        jewels: Jewels.find().fetch()
    };
}, MapContainer);