import React, { Component, PropTypes } from 'react';

import Map from './Map';
import Layer from './Layer'
import Feature from "./Feature";
import AccountsUIWrapper from './AccountsUIWrapper'

export default class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mapCenter: this.getCenter()
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos)
            this.setState({mapCenter: [pos.coords.longitude, pos.coords.latitude] })
        })

        // map.addLayer({
        //     'id': 'collection',
        //     'type': 'symbol',
        //     'source': 'awesome',
        //     'layout': {
        //         'icon-image': '{icon}-15',
        //         'text-field': '{title}',
        //         'text-offset': [0, 0.6],
        //         'text-anchor': 'top'
        //     }
        // })
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
                    center={this.state.mapCenter}
                >

                    <Layer
                        id="jewels"
                        type="symbol"
                        source="jewels"
                        data={{
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "properties": {
                                    "title": "Mapbox UTS",
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
                        }}
                        layout={{
                            'icon-image': '{icon}-15',
                            'text-field': '{title}',
                            'text-offset': [0, 0.6],
                            'text-anchor': 'top'
                        }}
                    />
                </Map>
                <AccountsUIWrapper />
            </div>
        );
    }
}
