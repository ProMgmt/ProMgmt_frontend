'use strict';

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Auth from '../auth';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import appCreateStore from './../../lib/app-create-store';
import {tokenSet} from './../../action/auth-actions.js';
import Dashboard from './../dashboard';
import OrgForm from '../org/orgform/index.js';
import Navbar from '../navigation';
import MyOrgs from '../org/myorgs';
import MyProjects from '../project/myprojects';
import MyTasks from '../task/mytasks';
import ProfileForm from './../profile/profileform';
import * as util from './../../lib/util.js';

let store = appCreateStore();

class App extends Component{

  componentDidMount() {
    let token = util.readCookie('X-Promgmt-Token');
    if(token) {
      this.props.tokenSet(token);
    }
  }

  render() {
    return(
      <Provider store={store}>
        <main className='app-container'>
          
          {/* <Auth /> */}
          <BrowserRouter>
          <section>
              <header>
              <h1><Link to='/'>Pro_Mgmt</Link></h1>
                <nav>
                  <ul>
                    <li><Link to='/welcome/signup'>signup</Link></li>
                    <li><Link to='/welcome/signin'>signin</Link></li>
                    <li><Link to='/settings'>settings</Link></li>
                  </ul>
                </nav>
                 <NavBar />
              </header>
              <Route path='/welcome/:auth' component={Dashboard} />
              <Route exact path='/settings' component={ProfileForm} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/myorgs' component={MyOrgs} />
              <Route exact path='/myprojects' component={MyProjects} />
              <Route exact path='/mytasks' component={MyTasks} /> 

            </section>
          </BrowserRouter>

      </main>
     </Provider>

    )
  }
}

export default App;