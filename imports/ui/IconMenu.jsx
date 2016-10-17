import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import IconMenu from 'material-ui/IconMenu';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider/Divider';

class AppIconMenu extends Component {

  render() {
    return (
      <div
        style={{
          position: "fixed",
          right: 20,
          top: 20,
        }}
      >
        <IconMenu
          iconButtonElement={<IconButton></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <List>
            <ListItem
              leftAvatar={
                <Avatar>
                  {this.props.currentUser ? this.props.currentUser.username.substring(0, 1).toUpperCase() : ''}
                </Avatar>
              }
            >
              {this.props.currentUser ? this.props.currentUser.username : ''}
            </ListItem>
          </List>

          <Divider />

          <MenuItem
            primaryText="My Profile"
            href='my-profile'
          />

          <MenuItem
            primaryText="My Jewels"
            href="my-jewels"
          />

          <MenuItem
            primaryText="My Circles"
            href="my-circles"
          />

          <MenuItem
            primaryText="Logout"
            onClick={() => Meteor.logout(() => browserHistory.push('login'))}
          />
        </IconMenu>
      </div>
    )
  }
}

AppIconMenu.PropTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, AppIconMenu);
