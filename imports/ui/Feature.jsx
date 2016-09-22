import React, { PropTypes } from "react";

const Feature = () => null;

Feature.propTypes = {
    id: PropTypes.number,
    coordinates: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Feature;
