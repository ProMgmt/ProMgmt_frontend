'use strict';

import React from 'react';
import OrgForm from '../org/orgform/index.js';

class App extends React.Component{
  render() {
    return(
      <main className='app-container'>
        <h1>Pro_Mgmt</h1>
        <OrgForm />
      </main>
    )
  }
}

export default App;