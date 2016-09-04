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
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": "marker-15" }}>

                        <Feature
                            key={0}
                            onHover={this._onToggleHover.bind(this, "pointer")}
                            onEndHover={this._onToggleHover.bind(this, "")}
                            coordinates={[
                                151.1470661,
                                -33.9092054
                            ]}/>
                    </Layer>
                </Map>
                <AccountsUIWrapper />
            </div>
        );
    }
}
