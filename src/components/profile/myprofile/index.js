import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from '../profileform';
import * as profileActions from '../../../action/profile-actions.js';

class MyProfile extends React.Component {
  
  render() {
    console.log(this.props.user);
    return(
      <div className='profile'>
        <h1>Test</h1>
        {this.props.profile ?
          <h3>{`Hello ${this.props.profile.firstName} ${this.props.profile.LastName}!`}</h3>
          : null}
        <ProfileForm user={this.props.user} buttonText='Create a Profile' onComplete={this.props.profileCreateRequest}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile,
  }
}

const mapDispatchToProps = dispatch => ({
  userOrgSet: () => dispatch(orgActions.userOrgEtAllSetRequest()),
  profileCreateRequest: (profile) => dispatch(profileActions.profileCreateRequest(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);