'use strict';

import React from "react";

class GoogleOAuth extends React.Component {
  
  render() {
    let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let clientIDQuery = 'client_id=364312005571-pbr7b8l3g91jqc7iqbflnv972nd7bnkf.apps.googleusercontent.com';
    let responseTypeQuery = 'response_type=code';
    let scopeQuery = 'scope=openid%20profile%20email';
    let promptQuery = 'prompt=consent';
    let redirectURIQuery = 'redirect_uri=http://localhost:3000/oauth/google/code';
    let formattedURL = `${AUTH_URL}?${clientIDQuery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`;

    return ( 
      <a href={formattedURL}>login with google</a>
    )
  }
}

export default GoogleOAuth;