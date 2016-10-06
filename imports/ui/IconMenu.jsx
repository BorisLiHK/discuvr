import React, { Component, PropTypes } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

class AppIconMenu extends Component {
  render() {
    return (
      <div
        style={{
          position:"fixed",
          right:20,
          top:20,
        }}
      >
        <IconMenu
          iconButtonElement={<IconButton></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            primaryText="My Profile"
            href='create-profile'
          />
          <MenuItem
            primaryText="My Jewels"
            href="my-jewels"
          />
          <MenuItem
            primaryText="My Circles"
            href="my-circles"
          />
        </IconMenu>
      </div>
    )
  }
}

export default AppIconMenu;