import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from '../profileform';
import * as profileActions from '../../../action/profile-actions.js';
import FlatButton from 'material-ui/FlatButton/FlatButton';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {edit: false};

    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  toggleEdit() {
    this.setState(state => {
      edit: !state.edit;
    });
  }

  toggleAdd() {
    this.setState(state => {
      add: !state.add;
    });
  }

  render() {
    let buttonText = this.state.edit ? 'Hide' : 'Edit';
    console.log(':::this.props.profile:::', this.props.profile);
    return(
      <div className='profile'>
        <h1>Test</h1>
        {!this.props.profile ?
          <ProfileForm user={this.props.user} buttonText='Create a Profile' onComplete={this.props.profileCreateRequest}/>
          :
          <div className='profile-info'>
            <h3>{`Hello ${this.props.profile.firstName} ${this.props.profile.lastName}!`}</h3>
            <h4>Company:</h4>
            <p>{this.props.profile.company}</p>
            <h4>Title:</h4>
            <p>{this.props.profile.title}</p>
            <h4>Bio:</h4>
            <p>{this.props.profile.desc}</p>
            <FlatButton onClick={this.toggleEdit}>{buttonText}</FlatButton>  
          </div>
        }
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