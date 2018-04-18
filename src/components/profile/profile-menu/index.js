import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import {Link} from 'react-router-dom';


class ProfileMenu extends React.Component {
  render(){
    return(
      <div>
        <IconMenu
          iconButtonElement={<IconButton><AccountCircle /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem><Link to='/welcome/signup'>signup</Link></MenuItem>
          <MenuItem><Link to='/welcome/signin'>signin</Link></MenuItem>
          <MenuItem primaryText="Settings" />
          <MenuItem primaryText="Help" />
          <MenuItem><Link to='logout'>sign out</Link></MenuItem>
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
  <li><Link to='/settings'>settings</Link></li>
  <li><Link to='/devtool'>dev tool</Link></li>
</ul>
</nav> */}