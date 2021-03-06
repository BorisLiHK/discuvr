import React, { Component, PropTypes } from 'react';
import Meteor from 'meteor/meteor'
import MapboxGl from "mapbox-gl/dist/mapbox-gl";
import isEqual from "deep-equal";

export default class Map extends Component {
  constructor() {
    super()

    this.state = {};

    this.containerStyle = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'fixed'
    }
  }

  getChildContext() {
    return { map: this.state.map }
  };

  getBounds(center) {
    return [
      [(center[0] - 0.007), (center[1] - 0.007)],
      [(center[0] + 0.007), (center[1] + 0.007)]
    ]
  }

  componentWillMount() {

  }

  componentDidMount() {
    const {
      style,
      hash,
      preserveDrawingBuffer,
      accessToken,
      center,
      pitch,
      zoom,
      minZoom,
      maxZoom,
      maxBounds,
      bearing,
      onStyleLoad,
      onClick,
      onMouseMove,
      onDragStart,
      onDrag,
      onMouseUp,
      onMove,
      onMoveStart,
      onMoveEnd,
      onZoom,
      scrollZoom
    } = this.props;

    MapboxGl.accessToken = accessToken;

    console.log(`bounds`, this.props.center)

    const map = new MapboxGl.Map({
      preserveDrawingBuffer,
      hash,
      zoom: zoom[0],
      minZoom,
      maxZoom,
      maxBounds: this.getBounds(this.props.center),
      bearing,
      container: this.refs.mapboxContainer,
      center,
      pitch,
      style,
      scrollZoom
    });

    map.dragPan.disable();


    map.on("style.load", (...args) => {
      if (onStyleLoad) {
        onStyleLoad(map, ...args);
      }
      // console.log(`we're here`)
      //
      /*map.addSource('awesome', {
       type: 'geojson',
       data: {}
       });
       //
       map.addLayer({
       'id': 'collection',
       'type': 'symbol',
       'source': 'awesome',
       'layout': {
       'icon-image': '{icon}-15',
       'text-field': '{title}',
       'text-offset': [0, 0.6],
       'text-anchor': 'top'
       }
       })

       map.getSource('awesome').setData({
       "type": "FeatureCollection",
       "features": [{
       "type": "Feature",
       "properties": {
       "title": "User",
       "icon": "User"
       },
       "geometry": {
       "type": "Point",
       "coordinates": [
       151.082020,
       -33.9653413
       ]
       }
       }]
       })*/
      map.addSource("avatar", {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": this.props.center
          },
          "properties": {
            "title": "",
            "icon": "avatar"
          }
        }
      })
      map.addLayer({
        "id": "avatar",
        "type": "symbol",
        "source": "avatar",
        "layout": {
          "icon-image": "{icon}",
          "text-field": "{title}",
        }
      })

      this.setState({ map });
    });

    map.on("click", (...args) => {
      if (onClick) {
        onClick(map, ...args);
      }

      var features = map.queryRenderedFeatures(args[0].point, { layers: ['jewelsLayer'] });
      if (!features.length) {
        return;
      }

      var feature = features[0];
      console.log(feature)
      //Do something with the feature
    });

    map.on("mousemove", (...args) => {
      if (onMouseMove) {
        onMouseMove(map, ...args);
      }
    });

    map.on("dragstart", (...args) => {
      if (onDragStart) {
        onDragStart(map, ...args);
      }
    });

    map.on("drag", (...args) => {
      if (onDrag) {
        onDrag(map, ...args);
      }
    });

    map.on("mouseup", (...args) => {
      if (onMouseUp) {
        onMouseUp(map, ...args);
      }
    });

    map.on("movestart", (...args) => {
      if (onMoveStart) {
        onMoveStart(map, ...args);
      }
    });

    map.on("move", (...args) => {
      if (onMove) {
        onMove(map, ...args);
      }
    });

    map.on("moveend", (...args) => {
      if (onMoveEnd) {
        onMoveEnd(map, ...args);
      }
    });

    map.on("zoom", (...args) => {
      if (onZoom) {
        onZoom(map, ...args);
      }
      map.setCenter(this.props.center)
      let MIN_ZOOM = 14.5,
        MAX_ZOOM = 17,
        MIN_PITCH = 0,
        MAX_PITCH = 60

      var zoom = map.getZoom();
      if (zoom < MIN_ZOOM)
        MIN_ZOOM = zoom;

      var newPitch =
        (zoom - MIN_ZOOM) *
        (MAX_PITCH - MIN_PITCH) / (MAX_ZOOM - MIN_ZOOM) +
        MIN_PITCH
      console.log("Pitch: " + newPitch + " Zoom: " + zoom)
      map.setPitch(newPitch);
    });
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.state.map.off();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.containerStyle !== this.props.containerStyle ||
      nextState.map !== this.state.map ||
      nextProps.style !== this.props.style
    );
  }

  componentWillReceiveProps(nextProps) {
    const { map } = this.state;
    if (!map) {
      return null;
    }

    const center = map.getCenter();
    const zoom = map.getZoom();
    const bearing = map.getBearing();

    const didZoomUpdate = (
      this.props.zoom !== nextProps.zoom &&
      nextProps.zoom !== map.getZoom()
    );

    const didCenterUpdate = (
      this.props.center !== nextProps.center &&
      nextProps.center !== map.getCenter()
    );

    const didBearingUpdate = (
      this.props.bearing !== nextProps.bearing &&
      nextProps.bearing !== map.getBearing()
    )

    if (didZoomUpdate || didCenterUpdate || didBearingUpdate) {
      map[this.props.movingMethod]({
        zoom: didZoomUpdate ? nextProps.zoom[0] : zoom,
        center: didCenterUpdate ? nextProps.center : center,
        bearing: didBearingUpdate ? nextProps.bearing : bearing
      });
      map.setMaxBounds(this.getBounds(nextProps.center))
      map.getSource("avatar").setData({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": nextProps.center
        },
        "properties": {
          "title": "",
          "icon": "avatar"
        }
      })
    }

    if (!isEqual(this.props.style, nextProps.style)) {
      map.setStyle(nextProps.style);
    }
  }

  render() {
    const { containerStyle, children } = this.props;
    const { map } = this.state;

    return (
      <div ref="mapboxContainer" style={this.containerStyle}>
        {
          map && children
        }
      </div>
    );
  }
}

Map.childContextTypes = {
  map: React.PropTypes.object
};

Map.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  accessToken: PropTypes.string,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.arrayOf(PropTypes.number),
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  maxBounds: PropTypes.array,
  bearing: PropTypes.number,
  pitch: PropTypes.number,
  containerStyle: PropTypes.object,
  hash: PropTypes.bool,
  preserveDrawingBuffer: PropTypes.bool,
  onClick: PropTypes.func,
  onStyleLoad: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMoveStart: PropTypes.func,
  onMove: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onMouseUp: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onZoom: PropTypes.func,
  scrollZoom: PropTypes.bool,
  movingMethod: PropTypes.oneOf([
    "jumpTo",
    "easeTo",
    "flyTo"
  ]),
  //showsUserLocation:PropTypes.bool
};

Map.defaultProps = {
  hash: false,
  preserveDrawingBuffer: false,
  center: [
    -0.2416815,
    51.5285582
  ],
  zoom: [18],
  minZoom: 0,
  maxZoom: 20,
  bearing: 0,
  scrollZoom: true,
  movingMethod: "easeTo",
  //showsUserLocation:true,
  pitch: 60,
  style: 'mapbox://styles/boriskenli/cit9v0ctt001u2hp3tp148ccr',
  accessToken: 'pk.eyJ1IjoiYm9yaXNrZW5saSIsImEiOiJjaXQzeHZudWYwMDNjMnNsZXBmN29nbHlsIn0.kdE7_5U86Vf4gnAIYvQ3zg',
  // onStyleLoad: function (map) {
  //     map.addSource('points', {
  //         type: 'geojson',
  //         data: {
  //             "type": "FeatureCollection",
  //             "features": [{
  //                 "type": "Feature",
  //                 "geometry": {
  //                     "type": "Point",
  //                     "coordinates": [
  //                         151.1470661,
  //                         -33.9092054
  //                     ]
  //                 },
  //                 "properties": {
  //                     "title": "Mapbox DC",
  //                     "icon": "monument"
  //                 }
  //             }]
  //         }
  //     });
  // }
};
