'use strict';

import React from 'react';
import OrgForm from '../org/orgform/index.js';
import {Provider} from 'react-redux';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import appCreateStore from '../../lib/app-create-store.js';
import NavBar from '../navigation';
import Auth from '../auth';
import Dashboard from '../dashboard';
import MyOrgs from '../org/myorgs';
import MyProjects from '../project/myprojects';
import MyTasks from '../task/mytasks';

const store = appCreateStore();

class App extends React.Component{
  render() {
    return(
      <Provider store={store}>
        <main className='app-container'>
          
          {/* <Auth /> */}
          <BrowserRouter>
            <div>
              <h1><Link to='/'>Pro_Mgmt</Link></h1>
              <NavBar />
              {/* <Route exact path='/logout' component={Auth} /> */}
              {/* <Route exact path='/dashboard' component={Dashboard} /> */}
              <Route exact path='/myorgs' component={MyOrgs} />
              {/* <Route exact path='/myprojects' component={MyProjects} /> */}
              {/* <Route exact path='/mytasks' component={MyTasks} />  */}
            </div>
          </BrowserRouter>
        </main>
      </Provider>
    )
  }
}

export default App;