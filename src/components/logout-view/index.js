'use strict';

import React from 'react';
import { connect } from 'react-redux';
import logoutRequest from '../../action/auth-actions';
import { pushPath } from 'redux-simple-router';

class LogoutView extends React.Component {
  componentWillMount() {
    this.props.dispatch(logoutRequest());
    this.props.dispatch(pushPath('/logout'));
  }

  render() {
    return 'thanks for using ProMgmt!';
  }
}

export default connect()(LogoutView);