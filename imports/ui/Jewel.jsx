import React, { Component, PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List';
import {darkBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import moment from 'moment'

import Paper from 'material-ui/Paper';

import Jewels from '../api/jewels'

// Jewel component - represents a single jewel item
// this.props.jewel.description
export default class Jewel extends Component {
	renderDetails() {
		let style = {
			padding:10
		}
    	let createdAt = moment(this.props.jewel.createdAt).format('DD MMMM YYYY [at] hh:mm a')
    	return (
    		<div style={style}>
    			<h3>{this.props.jewel.title}</h3>
    			Creation Date: {createdAt}
    		</div>
    	)
	}
    render() {
        let style = {
            margin:20,
            display: 'block'
        }
        return (
        	<Paper style={style} zDepth={2}>
        		{this.renderDetails()}
        	</Paper>
        )
    }
}

Jewel.propTypes = {
	jewel: PropTypes.object.isRequired
}