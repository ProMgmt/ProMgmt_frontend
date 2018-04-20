'use strict';

import React from "react";

class GoogleOAuth extends React.Component {
  
  render() {
    let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let clientIDQuery = `client_id=745938114906-7o1glsj54e3bptmosrdra8k4hdsp4e2n.apps.googleusercontent.com`;
    let responseTypeQuery = 'response_type=code';
    let scopeQuery = 'scope=openid%20profile%20email';
    let promptQuery = 'prompt=consent';
    let redirectURIQuery = 'redirect_uri=http://localhost:3000/oauth/google/code';
    let formattedURL = `${AUTH_URL}?${clientIDQuery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`;

    return ( 
      <a href={formattedURL}>signin with google</a>
    )
  }
}

export default GoogleOAuth;