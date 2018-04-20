import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import ProfileMenu from './../profile/profile-menu';
import * as util from './../../lib/util.js';
import FlatButton from 'material-ui/FlatButton';

import './_nav.scss';



class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      logged: false,
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open});
  }

  handleClose() {
    this.setState({ open: false });
  }
  
  render() {
    return (
      <div className='nav-container'>
        <AppBar
          title="Pro_Mgmt"
          onLeftIconButtonClick={this.handleToggle}
        //   iconElementRight={this.state.logged ? <ProfileMenu /> 
        //   : <FlatButton label='Sign In/Sign Up' containerElement={<Link to='/welcome/signin' />}
          
        // /> }
         
        >

          <ProfileMenu />
          {/* {util.renderIf(!this.state.user, 
          <FlatButton
            label='Sign In/Sign Up'
            containerElement={<Link to='/welcome/signin' />}
            
          />
          )}  
          {util.renderIf(this.state.user, <ProfileMenu />)} */}
          

         </AppBar>
                  
        <Drawer
          open={this.state.open}
          docked={false}
          width={250}
          onRequestChange={(open) => this.setState({open})}

        >
          <MenuItem onClick={this.handleClose}><Link to='/dashboard'>Dashboard</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/myorgs'>My Orgs</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/myprojects'>My Projects</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/mytasks'>My Tasks</Link></MenuItem>
          
        </Drawer>
      </div>
    )
  }
}

export default NavBar;
    

  

  
  
