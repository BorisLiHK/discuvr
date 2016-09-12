import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Jewels } from '../api/jewels.js'

export default class CreateJewelPage extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();

        //find all the elements
        const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        const date = ReactDOM.findDOMNode(this.refs.date).value;

        //update the database
        Meteor.call('jewels.insert', title, date);

        //clear form
        ReactDOM.findDOMNode(this.refs.title).value = '';
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Create a New Jewel</h1>

                    { this.props.currentUser ?
                        <form className="new-jewel" onSubmit={this.handleSubmit.bind(this)} >
                            <label>Title</label>
                            <input
                                type="text"
                                ref="title"
                                placeholder="Type in the title"
                            />
                            <label>Date</label>
                            <input
                                type="date"
                                ref="date"
                            />
                            <input
                                type="submit"
                                value="Create"
                            />
                        </form> : ''
                    }
                </header>
            </div>
        );
    }
}

CreateJewelPage.propTypes = {
    currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, CreateJewelPage);
