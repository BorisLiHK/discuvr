import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class AddFriendButton extends Component {
	addFriend() {
		Meteor.call('circles.addFriend', this.props.userId, this.props.circleId)
	}
	render() {
		<RaisedButton
			label={this.props.label}
			primary={true}
			onTouchTap{() => this.addFriend()}
		/>
	}
}

AddFriendButton.PropTypes = {
	label: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	circleId: PropTypes.string.isRequired
}