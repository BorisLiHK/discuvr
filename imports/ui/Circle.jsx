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
    }

    deleteThisCircle() {
        Meteor.call('circles.remove', this.props.circle._id)
    }

    editThisCircle(){
        console.log(this.props.circle);
        return(
            <div>
            <Form
                collection={Circles}
                type='update'
                ref='form'
                doc={this.props.circle}
                logErrors
            >
                <Field fieldName='name' />
                <Field fieldName='members' />
            </Form>
            <FlatButton
                label="Save"
                primary={true}
                onTouchTap={() => this.refs.form.submit()}
            />
            </div>
        )
    }

    renderDetails() {
        console.log(this.props.circle);
        return (
            <div>
                {this.props.circle.name}
                {this.props.circle.members}
            </div>
        )
    }

    render() {
        let createdAt = moment(this.props.circle.createdAt).format('DD MMMM YYYY [at] hh:mm a')
        return (
            <Card>
                <CardHeader
                    title={this.props.circle.name}
                    subtitle={createdAt}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {this.editThisCircle()}
                </CardText>
                <CardActions>
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