import {Meteor} from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {Form,Field} from 'simple-react-form';
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
        let createdAt = moment(this.props.jewel.createdAt).format('DD MMMM YYYY [at] hh:mm a')
        return(<Card>
            <CardHeader
                    title={this.props.jewel.title}
                    subtitle={createdAt}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
            <CardText expandable={true}>
                <Form
                    collection={Jewels}
                    type='update'
                    ref='form'
                    doc={this.props.jewel}
                    logErrors
                >
                    <Field fieldName='title' />
                    <Field fieldName='date' />
                    <Field fieldName='description' />
                    <Field fieldName='category' />
                    <Field fieldName='coordinates' />
                    <Field fieldName='private' />
                </Form>
            <CardActions>
                <FlatButton
                    label="Save"
                    primary={true}
                    onTouchTap={() => this.refs.form.submit()}
                />
                <FlatButton
                    label="Delete"
                    secondary={true}
                    onTouchTap={() => this.deleteThisJewel()}
                />
            </CardActions>
            </CardText>
        </Card>)
    }

    getUsername() {
        return this.props.jewel.ownerObj.map((owner) => {
            return owner.username;
        });
    }

    viewThisJewel() {
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
                    <em>Author: </em>{this.getUsername()}<br />
                    { this.props.jewel.description ?
                        (<div><em>Description: </em>{this.props.jewel.description}<br /></div>) : '' }
                </CardText>
                <CardActions>
                    <FlatButton
                        label="Like"
                        secondary={true}
                        onTouchTap={() => console.log("LIKE!")}
                    />
                </CardActions>
            </Card>
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
        console.log(this.props.jewel.ownerObj)
        return (
            <div>
            { (Meteor.userId() === this.props.jewel.userId) ?
                this.editThisJewel() : this.viewThisJewel() }
            </div>
        )
    }
}

Jewel.propTypes = {
	jewel: PropTypes.object.isRequired
}