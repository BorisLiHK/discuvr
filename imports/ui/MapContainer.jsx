import React, { Component, PropTypes } from 'react';

import Map from './Map';
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

    render() {
        return (
            <div className="super_class">
                <Map
                    center={this.state.mapCenter} />
                <AccountsUIWrapper />
            </div>
        );
    }
}
