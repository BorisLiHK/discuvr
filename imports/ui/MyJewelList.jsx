import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {List, ListItem} from 'material-ui/List';

import Paper from 'material-ui/Paper';

import Jewels from '../api/jewels'
import Jewel from './Jewel'

class MyJewelList extends Component {
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
            <div className="jewel_list">
                <h1>My Jewels</h1>
                <h2>Sorted by Creation Date</h2>
                <div>
                    {this.renderJewels()}
                </div>
            </div>
        )
    }
}

MyJewelList.PropTypes = {
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
}, MyJewelList);
