'use strict';

import React from 'react';
import GoogleOAuth from '../google-oauth';

class App extends React.Component{
  render() {
    return(
      <main className='app-container'>
        <h1>Pro_Mgmt</h1>
          <GoogleOAuth />
      </main>
    )
  }
}

export default App;