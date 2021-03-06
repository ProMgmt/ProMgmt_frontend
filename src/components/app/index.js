'use strict';

import GoogleOAuth from '../google-oauth';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auth from '../auth';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import {tokenSet} from './../../action/auth-actions.js';
import Dashboard from './../dashboard';
import OrgForm from '../org/orgform/index.js';
import NavBar from '../navigation';
import MyOrgs from '../org/myorgs';
import MyProjects from '../project/myprojects';
import MyTasks from '../task/mytasks';
import ProfileForm from './../profile/profileform';
import DevTool from '../devtool';
import * as util from './../../lib/util.js';
import {grey800} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import { IconButton } from 'material-ui';
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import ProfileMenu from './../profile/profile-menu';

//let store = appCreateStore();

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
  },
  appBar: {
    height: 50,
  },
});

class App extends Component{
  constructor(props){
    super(props);
    this.state = {open: false};

    
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  componentDidMount() {
    let token = util.readCookie('X-ProMgmt-Token');
    if(token) {
      this.props.tokenSet(token);
    }
  }

  render() {
    return(

      <MuiThemeProvider muiTheme={muiTheme}>
        {/* <Provider store={store}> */}
          <main className='app-container'>
            
            {/* <Auth /> */}
            <BrowserRouter>
            <section>
                
                {/* <h1><Link to='/'>Pro_Mgmt</Link></h1>
                <GoogleOAuth /> */}

                 
                  <NavBar
                  open={this.state.open}
                  
                  />
                 
                
                <Route path='/welcome/:auth' component={Dashboard} />
                <Route exact path='/settings' component={ProfileForm} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/myorgs' component={MyOrgs} />
                <Route exact path='/myprojects' component={MyProjects} />
                <Route exact path='/mytasks' component={MyTasks} /> 
                <Route exact path='/devtool' component={DevTool} />


              </section>
            </BrowserRouter>

        </main>
      {/* </Provider> */}
    </MuiThemeProvider>

    )
  }
}

let mapDispatchToProps = dispatch => {
  return {
    tokenSet: token => dispatch(tokenSet(token)),
    // fetchProfileStuff
  }
}

export default connect(null, mapDispatchToProps)(App);