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

        this.deleteMember = this.deleteMember.bind(this);
    }

    deleteThisCircle() {
        Meteor.call('circles.remove', this.props.circle._id)
    }

    deleteMember(e) {
        console.log(e.currentTarget.dataset.member)
        Meteor.call('circles.removeFriend', e.currentTarget.dataset.member, this.props.circle._id)
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
                    {
                        this.props.circle.membersObj.map((member, i) => {
                            return (
                                <li key={i}>
                                    {member.username} 
                                    <button
                                        data-member={member._id} 
                                        onClick={this.deleteMember}
                                    >
                                        Remove
                                    </button>
                                </li>
                            )
                        }, this)
                    }
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