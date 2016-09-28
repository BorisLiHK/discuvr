import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

import Jewels from '../api/jewels'
import Jewel from './Jewel'

class MyJewelsList extends Component {
    constructor(props) {
        super(props)
    }
    renderJewels() {
        return this.props.jewels.map((jewel) => {
            return (
                <Jewel
                    key={jewel._id}
                    jewel={jewel}
                />
            )
        })
    }
    render() {
        return (
            <div>
                <h1>My Jewels</h1>
                <h2>Sorted by Creation Date</h2>
                <div className="jewel_cards">
                    {this.renderJewels()}
                </div>
                <RaisedButton
                    label='Back to Map'
                    secondary={true}
                    href="/"
                />
            </div>
        )
    }
}

MyJewelsList.PropTypes = {
    jewels: PropTypes.array,
    currentUser: PropTypes.object.isRequired
};

//fetch by createdAt date or do the sort later?
export default createContainer(() => {
    Meteor.subscribe('myjewels');

    return {
        jewels: Jewels.find({}, {sort: {createdAt : -1}}).fetch(),
        currentUser: Meteor.user()
    };
}, MyJewelsList);
