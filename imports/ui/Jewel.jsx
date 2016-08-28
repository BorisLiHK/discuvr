import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Jewel component - represents a single todo item
export default class Jewel extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Meteor.call('jewels.setChecked', this.props.jewel._id, !this.props.jewel.checked);
    }

    deleteThisJewel() {
        Meteor.call('jewels.remove', this.props.jewel._id);
    }

    togglePrivate() {
        Meteor.call('jewels.setPrivate', this.props.jewel._id, ! this.props.jewel.private);
    }

    render() {
        // Give jewels a different className when they are checked off,
        // so that we can style them nicely in CSS
        const jewelClassName = classnames({
            checked: this.props.jewel.checked,
            private: this.props.jewel.private,
        });

        return (
            <li className={jewelClassName}>
                <button className="delete" onClick={this.deleteThisJewel.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={this.props.jewel.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                { this.props.showPrivateButton ? (
                    <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                        { this.props.jewel.private ? 'Private' : 'Public' }
                    </button>
                ) : ''}

                <span className="text">
                  <strong>{this.props.jewel.username}</strong>: {this.props.jewel.text}
                </span>
            </li>
        );
    }
}

Jewel.propTypes = {
    // This component gets the jewel to display through a React prop.
    // We can use propTypes to indicate it is required
    jewel: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired,
};
