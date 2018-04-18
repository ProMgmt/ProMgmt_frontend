import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import ProfileMenu from './../profile/profile-menu';

// class NavBar extends React.Component {
//   render() {
//     return (
//       <List>
//         <Link to='/myorgs'>My Orgs</Link>
//         <Link to='/myprojects'>My Projects</Link>
//         <Link to='/mytasks'>My Tasks</Link>
//         <Link to='/logout'>Log Out</Link>
//       </List>
//     )
//   }
// }

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {open: false}
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
      <div>
        <AppBar
          title="Pro_Mgmt"
          onLeftIconButtonClick={this.handleToggle}
          //iconElementRight={<IconButton><AccountCircle /></IconButton>}
        >

          <ProfileMenu />

         </AppBar>
                  
        <Drawer
         open={this.state.open}
         docked={false}
         width={250}
         onRequestChange={(open) => this.setState({open})}

        >
          <MenuItem onClick={this.handleClose}><Link to='/myorgs'>My Orgs</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/myprojects'>My Projects</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/mytasks'>My Tasks</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/logout'>Log Out</Link></MenuItem>
          
        </Drawer>
      </div>
    )
  }
}

export default NavBar;
    

  

  
  
