'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthFrom from '../auth';
import * as util from './../../lib/util.js';
import {signupRequest, signinRequest} from './../../action/auth-actions.js';
import AuthForm from '../auth';
import GoogleOAuth from '../google-oauth';

class Welcome extends Component{
  render() {

    let { params } = this.props.match;

    let handleComplete = params.auth === 'signin' 
    ? this.props.signin
    : this.props.signup;

    return (
      <section>


        <AuthForm
          auth={params.auth}
          onComplete={handleComplete}
        />
        <GoogleOAuth />
      </section>

    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    signup: (user) => dispatch(signupRequest(user)),
    signin: (user) => dispatch(signinRequest(user)),
  }
}

export default connect(null, mapDispatchToProps)(Welcome);