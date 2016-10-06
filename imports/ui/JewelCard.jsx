import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {Form,Field} from 'simple-react-form'
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
    editThisJewel(){
        return(
            <div>
                <Form
                    collection={Jewels}
                    type='update'
                    ref='form'
                    doc={this.props.jewel}
                    logError
                >
                    <Field fieldName='title' />
                    <Field fieldName='date' />
                    <Field fieldName='description' />
                    <Field fieldName='coordinates' />
                </Form>
                <FlatButton
                    label="Save"
                    primary={true}
                    onTouchTap={() => this.refs.form.submit()}
                />
                <FlatButton
                    label ="Delete"
                    secondary={true}
                    onTouchTap={() => this.deleteThisJewel()}
                />
            </div>
        )
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
                    {this.editThisJewel()}
                </CardText>
            </Card>
        )
    }
}

Jewel.propTypes = {
	jewel: PropTypes.object.isRequired
}