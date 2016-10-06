import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import moment from 'moment'

import Circles from '../api/circles'

// Circle component - represents a single circle item
// this.props.circle.title
export default class Circle extends Component {
    constructor(props) {
        super(props)
    }

    deleteThisCircle() {
        Meteor.call('circles.remove', this.props.circle._id)
    }

    renderMembers() {
        console.log("NEW STUFF")

        return this.props.circle.membersObj.forEach((member) => {
            return (
                <li>{member.username}</li>
            )
        })
        // let members =this.props.members
        // return members.map((member) => {
        //     return (
        //         <li>{member.username}</li>
        //     )
        // })
    }

    render() {
        let createdAt = moment(this.props.circle.createdAt).format('DD MMMM YYYY [at] hh:mm a')
        return (
            <Card>
                <CardHeader
                    title={this.props.circle.title}
                    subtitle={createdAt}
                    actAsExpander={true}
                    showExpandableButton={true}
                />

                <CardTitle title="Members" expandable={true} />
                <CardText expandable={true}>
                    <ul>
                    {this.renderMembers()}
                    </ul>
                </CardText>

                <CardActions>
                    <FlatButton
                        label="Edit"
                        primary={true}
                    />
                    <FlatButton
                        label ="Delete"
                        secondary={true}
                        onTouchTap={() => this.deleteThisCircle()}
                    />
                </CardActions>
            </Card>
        )
    }
}

Circle.propTypes = {
	circle: PropTypes.object.isRequired
}