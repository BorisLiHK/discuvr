import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {Form,Field} from 'simple-react-form';
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
        if(this.props.circle.title=="myfriends")
            return(
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
                                    <button 
                                        className="deletecircle"
                                        data-member={member._id} 
                                        onClick={this.deleteFriend}
                                    >
                                        X
                                    </button>
                                    {member.username}
                                </li>
                            )
                        }, this)
                    }
                    </ul>
                </CardText>
            </Card>)
        return (
            <Card>
                <CardHeader
                    title={this.props.circle.title}
                    subtitle={createdAt}
                    actAsExpander={true}
                    showExpandableButton={true}
                />

                <CardText expandable={true}>
                    <Form
                        collection={Circles}
                        type='update'
                        ref='form'
                        doc={this.props.circle}
                        logErrors
                    >
                        <Field fieldName='title' />
                    </Form>
                <CardTitle title="Members" expandable={true} />
                    <ul>
                    {
                        this.props.circle.membersObj.map((member, i) => {
                            return (
                                <li key={i}> 
                                    <button 
                                        className="deletecircle"
                                        data-member={member._id} 
                                        onClick={this.deleteMember}
                                    >
                                        X
                                    </button>
                                    {member.username}
                                </li>
                            )
                        }, this)
                    }
                    </ul>
                    <CardActions>
                        <FlatButton
                            label="Save"
                            primary={true}
                            onTouchTap={() => this.refs.form.submit()}
                        />
                        <FlatButton
                            label ="Delete"
                            secondary={true}
                            onTouchTap={() => this.deleteThisCircle()}
                        />
                    </CardActions>
                </CardText>
            </Card>
        )
    }
}

Circle.propTypes = {
	circle: PropTypes.object.isRequired
}