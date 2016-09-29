import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import moment from 'moment'

import Jewels from '../api/jewels'

// Jewel component - represents a single jewel item
// this.props.jewel.description
export default class Jewel extends Component {
    constructor(props) {
        super(props)
    }

    deleteThisJewel() {
        Meteor.call('jewels.remove', this.props.jewel._id)
    }

    renderDetails() {
        return (
            <div>
                {this.props.jewel.description}
            </div>
        )
    }

    render() {
        let createdAt = moment(this.props.jewel.createdAt).format('DD MMMM YYYY [at] hh:mm a')
        return (
            <Card>
                <CardHeader
                    title={this.props.jewel.title}
                    subtitle={createdAt}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {this.renderDetails()}
                </CardText>
                <CardActions>
                    <FlatButton
                        label="Edit"
                        primary={true}
                    />
                    <FlatButton
                        label ="Delete"
                        secondary={true}
                        onTouchTap={() => this.deleteThisJewel()}
                    />
                </CardActions>
            </Card>
        )
    }
}

Jewel.propTypes = {
	jewel: PropTypes.object.isRequired
}
