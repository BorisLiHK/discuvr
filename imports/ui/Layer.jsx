import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import React, { Component, PropTypes, cloneElement, Children } from "react";
import isEqual from "deep-equal";
import { Meteor } from 'meteor/meteor';

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
        let icon = "jewel_default"
        const userId=Meteor.userId()

        if (this.props.children.length > 1) {
            this.props.children.map(feature => {
                //console.log(feature.props)
                if(feature.props.userId==userId)
                    icon="jewel_own"
                else
                    icon="jewel_default"
                jewelData.features.push({
                    "type" : "Feature",
                    "properties": {
                        "icon": icon,
                        "title": feature.props.title
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": feature.props.coordinates
                    }
                })
            })
        } else if (this.props.children.length != 0) {
            if(freture.props.userId==this.userId())
                icon="jewel_own"
            else
                icon="jewel_default"
            jewelData.features.push({
                "type" : "Feature",
                "properties": {
                    "icon": icon,
                    "title": feature.props.title
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": this.props.children.props.coordinates
                }
            })
        }
        // console.log(JSON.stringify(jewelData))
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
        },'avatar')
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        const { map } = this.context
        map.getSource(this.props.source).setData(this.getJewelData())
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
};
