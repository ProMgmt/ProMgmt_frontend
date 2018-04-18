import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import {Link} from 'react-router-dom';
import { tokenDelete } from '../../../action/auth-actions';
import { connect } from 'react-redux';
import { deleteCookie } from '../../../lib/util';

import './_profile-menu.scss';


class ProfileMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    this.props.signout();
    deleteCookie();
  }

  render(){
    return(
      <div>
        <IconMenu
          iconButtonElement={<IconButton ><AccountCircle className='profile-button'/></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >

          <MenuItem><Link to='/welcome/signup'>signup</Link></MenuItem>
          <MenuItem><Link to='/welcome/signin'>signin</Link></MenuItem>
          <MenuItem primaryText="Settings"><Link to='/myprofile'>Profile Settings</Link></MenuItem>
          <MenuItem><Link to='/devtool'>dev tool</Link></MenuItem>
          <MenuItem><Link to='/' onClick={this.handleSignout}>sign out</Link></MenuItem>

        </IconMenu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signout: user => dispatch(tokenDelete(user)),
})

export default connect(null, mapDispatchToProps)(ProfileMenu);

{/* <nav>
<ul>
  <li><Link to='/welcome/signup'>signup</Link></li>
  <li><Link to='/welcome/signin'>signin</Link></li>
  <li><Link to='/myprofile'>settings</Link></li>
  <li><Link to='/devtool'>dev tool</Link></li>
</ul>
</nav> */}