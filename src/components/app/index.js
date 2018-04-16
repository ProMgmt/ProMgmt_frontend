'use strict';

import React from 'react';
import OrgForm from '../org/orgform/index.js';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import appStoreCreate from '../../lib/app-create-store.js';
import Navbar from '../navigation';
import Dashboard from '../dashboard';
import MyOrgs from '../org/myorgs';
import MyProjects from '../project/myprojects';
import MyTasks from '../task/mytasks';

class App extends React.Component{
  render() {
    return(
      <Provider store={store}>
        <main className='app-container'>
          <h1>Pro_Mgmt</h1>
          <OrgForm />
          <BrowserRouter>
            <div>
              <Route path='*' component={Navbar} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/myorgs' component={MyOrgs} />
              <Route exact path='/myprojects' component={MyProjects} />
              <Route exact path='/mytasks' component={MyTasks} /> 
            </div>
          </BrowserRouter>
        </main>
      </Provider>
    )
  }
}

export default App;