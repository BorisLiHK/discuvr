import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

import Jewels from '../api/jewels'
import JewelCard from './JewelCard'

class JewelList extends Component {
    constructor(props) {
        super(props)
    }
    renderJewels() {
        return this.props.jewels.map((jewel) => {
            return (
                <JewelCard
                    key={jewel._id}
                    jewel={jewel}
                />
            )
        })
    }
    render() {
        return (
            <div>
                <h1>Jewels</h1>
                <div className="jewel_cards">
                    {this.renderJewels()}
                </div>
                <div style={{position:'fixed',top:20,}}>
                    <RaisedButton
                        label='Back to Map'
                        secondary={true}
                        href="/"
                        style={{
                            position: 'fixed',
                            right: 20,
                    }}/>

                </div>
            </div>
        )
    }
}

JewelList.PropTypes = {
    jewels: PropTypes.array,
    currentUser: PropTypes.object.isRequired
};

//fetch by createdAt date or do the sort later?
export default createContainer(() => {
    Meteor.subscribe('userList');
    Meteor.subscribe('publicjewels');

    return {
        jewels: Jewels.find({userId: {$ne: Meteor.userId()}}, {sort: {createdAt : -1}}).fetch(),
        currentUser: Meteor.user()
    };
}, JewelList);