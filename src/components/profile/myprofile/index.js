import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from '../profileform';

class MyProfile extends React.Component {
  
  render() {
    return(
      <div className='profile'>
        <h3>{`Hello ${this.props.profile.firstName} ${this.props.profile.LastName}!`}</h3>
        <ProfileForm />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile = state.profile,
  }
}

export default connect(mapStateToProps, null)(MyProfile);