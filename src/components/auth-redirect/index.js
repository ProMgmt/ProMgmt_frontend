import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { readCookie } from '../../lib/util';


class AuthRedirect extends React.Component {
  render() {

    let redirect = null;

    if(!this.props.auth) {
      const { pathname } = this.props.history.location;
      if(['/mytasks', '/myorgs', '/myprojects', '/myprofile'].includes(pathname) 
        || '/dashboard' === pathname && !readCookie('X-ProMgmt-Token'))  {
        redirect = <Redirect to='/' />
      }
    }

    return redirect;
  }

}

const mapStateToProps = state => ({
  auth: state.auth,

})

export default connect(mapStateToProps)(AuthRedirect);