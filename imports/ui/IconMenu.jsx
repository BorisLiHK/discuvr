import React, { Component, PropTypes } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

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
          iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            primaryText="My Profile (no link)"
          />
          <MenuItem
            primaryText="My Jewels"
            href="my-jewels"
          />
          <MenuItem
            primaryText="My Circles (no link)"
          />
        </IconMenu>
      </div>
    )
  }
}

export default AppIconMenu;