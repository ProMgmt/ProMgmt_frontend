import React from 'react';
import { connect } from 'react-redux';
import './_main.scss';
import ProfileForm from '../profileform';
import * as profileActions from '../../../action/profile-actions.js';
import FlatButton from 'material-ui/FlatButton/FlatButton';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {edit: false};

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState(state => {
      return {edit: !state.edit}
    });
  }

  render() {
    let buttonText = this.state.edit ? 'Hide' : 'Edit';
    
    return(
      <div className='profile' style={{margin: '50px 50px 50px 50px', padding: '3.5vw', backgroundColor: 'rgba(255, 255, 255, .5)', padding: '30px 30px'}}>
        <h1 className='big-title'>Your Profile:</h1>
        <br/>
        {!this.props.profile ?
          <ProfileForm user={this.props.user} buttonText='Create a Profile' onComplete={this.props.profileCreateRequest} />
          :
          <div className='profile-info'>
            <h3>{`Hello ${this.props.profile.firstName} ${this.props.profile.lastName}!`}</h3>
            <br/>
            <h4>Company:</h4>
            <p>{this.props.profile.company}</p>
            <h4>Title:</h4>
            <p>{this.props.profile.title}</p>
            <h4>Bio:</h4>
            <p>{this.props.profile.desc}</p>
            <FlatButton onClick={this.toggleEdit} style={{marginBottom: '2.4vw', backgroundColor: 'rgba(54, 178, 232, .5)', padding: '2px 11px'}}>{buttonText}</FlatButton>  
          </div>
        }
        {this.state.edit ?
          <ProfileForm user={this.props.user} canToggle={true} toggle={this.toggleEdit} profile={this.props.profile} buttonText='Save Changes' onComplete={this.props.profileUpdateRequest} />
          :
          null
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
  profileUpdateRequest: (profile) => dispatch(profileActions.profileUpdateRequest(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);