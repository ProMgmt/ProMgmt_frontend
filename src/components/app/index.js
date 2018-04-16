'use strict';

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import appCreateStore from './../../lib/app-create-store';
import {tokenSet} from './../../action/auth-actions.js';
import Dashboard from './../dashboard';
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
      <main className='app-container'>
        <Provider store={store}>
          <BrowserRouter>
          <section>
              <header>
                <h1>Pro_Mgmt</h1>
                <nav>
                  <ul>
                    <li><Link to='/welcome/signup'>signup</Link></li>
                    <li><Link to='/welcome/signin'>signin</Link></li>
                    <li><Link to='/settings'>settings</Link></li>
                  </ul>
                </nav>
              </header>
              <Route path='/welcome/:auth' component={Dashboard} />
              <Route exact path='/settings' component={ProfileForm} />
            </section>
          </BrowserRouter>
        </Provider>

      </main>
    )
  }
}

export default App;