import React, { Component, PropTypes } from 'react';
import MapboxGl from "mapbox-gl/dist/mapbox-gl";
import isEqual from "deep-equal";

export default class Map extends Component {
    constructor() {
        super()

        this.state = {};

        this.childContextTypes = {
            map: React.PropTypes.object
        };

        this.containerStyle = {
            height: '100%',
            width: '100%',
            position: 'fixed'
        }
    }

    getChildContext() {
        map: this.state.map
    };

    // MapboxGl.accessToken = 'pk.eyJ1IjoiYWxleGQiLCJhIjoiY2lycmd5anZpMGk1cGZrbTYzMHU3OGJ5YiJ9.5cKvcoZRsDYxzFsCjJLG4Q'

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

        const map = new MapboxGl.Map({
            preserveDrawingBuffer,
            hash,
            zoom: zoom[0],
            minZoom,
            maxZoom,
            maxBounds,
            bearing,
            container: this.refs.mapboxContainer,
            center,
            pitch,
            style,
            scrollZoom
        });

        map.on("style.load", (...args) => {
            if (onStyleLoad) {
                onStyleLoad(map, ...args);
            }

            this.setState({ map });
        });

        map.on("click", (...args) => {
            if (onClick) {
                onClick(map, ...args);
            }
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
        console.log(`new props ${nextProps}`)
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

Map.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    accessToken: PropTypes.string.isRequired,
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
    ])
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
    movingMethod: "flyTo",
    pitch: 60
};