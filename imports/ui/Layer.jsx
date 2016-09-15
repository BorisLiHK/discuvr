import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import React, { Component, PropTypes, cloneElement, Children } from "react";
import isEqual from "deep-equal";

import { diff } from "../api/helper";
import Feature from "./Feature";

let index = 0;
const generateID = () => index++;

export default class Layer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { map } = this.context

        console.log(map)
        console.log(this.props)

        map.addSource(this.props.source, {
            type: 'geojson',
            data: this.props.data
        })

        map.addLayer({
            'id': this.props.id,
            'type': this.props.type,
            'source': this.props.source,
            'layout': this.props.layout
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        return null
    }

}

Layer.contextTypes = {
    map: PropTypes.object
};

Layer.propTypes = {
    id: PropTypes.string,

    type: PropTypes.oneOf([
        "symbol",
        "line",
        "fill",
        "circle"
    ]),

    layout: PropTypes.object,
    paint: PropTypes.object,
    sourceOptions: PropTypes.object,
    layerOptions: PropTypes.object,
    source: PropTypes.string.isRequired,
    before: PropTypes.string,
    data: PropTypes.object
};

Layer.defaultProps = {
    type: "symbol",
    layout: {},
    paint: {},
    data: {
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
    }
};
