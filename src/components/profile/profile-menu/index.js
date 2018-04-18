import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import {Link} from 'react-router-dom';

import './_profile-menu.scss';


class ProfileMenu extends React.Component {
  render(){
    return(
      <div>
        <IconMenu
          iconButtonElement={<IconButton ><AccountCircle className='profile-button'/></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem><Link to='/welcome/signup'>Sign Up</Link></MenuItem>
          <MenuItem><Link to='/welcome/signin'>Sign In</Link></MenuItem>
          <MenuItem><Link to='/myprofile'>Profile Settings</Link></MenuItem>
          <MenuItem><Link to='/devtool'>dev tool</Link></MenuItem>
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </div>
    )
  }
}

export default ProfileMenu;

{/* <nav>
<ul>
  <li><Link to='/welcome/signup'>signup</Link></li>
  <li><Link to='/welcome/signin'>signin</Link></li>
  <li><Link to='/myprofile'>settings</Link></li>
  <li><Link to='/devtool'>dev tool</Link></li>
</ul>
</nav> */}