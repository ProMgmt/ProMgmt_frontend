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


class App extends Component{

  componentDidMount() {
    let token = util.readCookie('X-ProMgmt-Token');
    console.log('token??????')
    if(token) {
      this.props.tokenSet(token);
      console.log('TOKENNNNNN')
    }
  }

  render() {
    return(
      <main className='app-container'>
        
        {/* <Auth /> */}
        <BrowserRouter>
          <section>
            <header>
            <h1><Link to='/'>Pro_Mgmt</Link></h1>
              <GoogleOAuth />
      
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'>signup</Link></li>
                  <li><Link to='/welcome/signin'>signin</Link></li>
                  <li><Link to='/settings'>settings</Link></li>
                  <li><Link to='/devtool'>dev tool</Link></li>
                </ul>
              </nav>
                <NavBar />
            </header>
            <Route path='/welcome/:auth' component={Dashboard} />
            <Route exact path='/settings' component={ProfileForm} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/myorgs' component={MyOrgs} />
            {/* <Route exact path='/myprojects' component={MyProjects} />
            <Route exact path='/mytasks' component={MyTasks} />  */}
            <Route exact path='/devtool' component={DevTool} />

            </section>
          </BrowserRouter>

      </main>
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