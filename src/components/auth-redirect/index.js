import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { mapStateToProps } from '../task/taskpreview';

class AuthRedirect extends React.Component {
  render() {
    if(auth) console.log('auth found!');
    if(!this.props.auth) {
      console.log('no auth :/');
    }

    return (

    )
  }

}
const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(AuthRedirect);