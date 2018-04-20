import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import {Link} from 'react-router-dom';
import { tokenDelete } from '../../../action/auth-actions';
import { connect } from 'react-redux';
import { deleteCookie } from '../../../lib/util';

import './_profilemenu.scss';

const styles = {
  link: {
    textDecoration: 'none',
    color: '#000',
    ':visited': {
      textDecoration: 'none',
      color: '#000'
    },
  },
};

class ProfileMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    this.props.signout();
    deleteCookie();
    delete localStorage.token();
  }

  render(){
    console.log('logged in', this.props.loggedIn);
    return(
      <div>
        <IconMenu
          className='profile-menu'
          iconButtonElement={<IconButton ><AccountCircle /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          style={{textDecoration: 'none'}}
        >
        {!this.props.loggedIn ?
          <div className='signinup'>
            <MenuItem ><Link style={styles.link} to='/welcome/signup'>Sign Up</Link></MenuItem>
            <MenuItem><Link style={styles.link} to='/welcome/signin'>Sign In</Link></MenuItem>
          </div>
        :
        null
        }
          <MenuItem><Link style={styles.link} to='/myprofile'>Profile Settings</Link></MenuItem>
        {this.props.loggedIn ?
          <MenuItem><Link style={styles.link} to='/' onClick={this.handleSignout}>sign out</Link></MenuItem>
          :
          null
        }
          

        </IconMenu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth,
})

const mapDispatchToProps = dispatch => ({
  signout: user => dispatch(tokenDelete(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
