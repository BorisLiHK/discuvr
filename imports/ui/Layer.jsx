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

    getJewelData() {
        let jewelData = {
            "type": "FeatureCollection",
            "features": []
        }

        if (this.props.children.length > 1) {
            this.props.children.map(feature => {
                jewelData.features.push({
                    "type" : "Feature",
                    "properties": {
                        "icon": "harbor"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": feature.props.coordinates
                    }
                })
            })
        } else {
            jewelData.features.push({
                "type" : "Feature",
                "properties": {
                    "icon": "harbor"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": this.props.children.props.coordinates
                }
            })
        }
        console.log(JSON.stringify(jewelData))
        return jewelData
    }

    componentWillMount() {
        const { map } = this.context

        map.addSource(this.props.source, {
            type: 'geojson',
            data: this.getJewelData()
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
        const { map } = this.context

        map.getSource(this.props.source).setData(this.getJewelData)
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
