import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import JewelIcon from 'material-ui/svg-icons/maps/add-location';
import ProfileIcon from 'material-ui/svg-icons/social/person';

import Map from './Map';
import Layer from './Layer'
import Feature from "./Feature";
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
        //console.log("getCenter() triggered");
        navigator.geolocation.getCurrentPosition((pos)=>{
            console.log(pos.coords);
            return [pos.coords.longitude,pos.coords.latitude];
        })
    }

    _onToggleHover(cursor, { map }) {
        map.getCanvas().style.cursor = cursor;
    }

    componentDidMount(){
        let that=this;
        window.setInterval(function(){
            //console.log("setInterval() triggered");
            that.setState({mapCenter: that.getCenter()});
        },3000);
    }

    render() {
        //console.log(this.props.profiles.length);
        console.log("state updated");
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

                <FloatingActionButton href="create-profile" style={{
                    position:"fixed",
                    right:20,
                    top:20,
                }}>
                    <ProfileIcon/>
                </FloatingActionButton>
                
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
