import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';
import * as util from '../../../lib/util.js';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';

class OrgForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: props.org ? props.org._id : undefined,
      name: props.org ? props.org.name : '',
      desc: props.org ? props.org.desc : '',
      projects: props.org ? props.org.projects : [],
      admins: props.org ? props.org.admins : [],
      adminNames: props.org ? props.org.adminNames : ['Nicole Weese'],
      users: props.org ? props.org.users : [],
      userNames: props.org ? props.org.users : ['Nicole Weese'],
      admin: '',
      user: '',
      adminError: '',
      userError: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminSubmit = this.handleAdminSubmit.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.org) {
      this.setState(props.org);
    }
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({ [name]: value, adminError: '', userError: '' });
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.props.canToggle) {
      this.props.toggle();
    }

    this.props.onComplete({...this.state});
  }

  handleAdminSubmit(e) {
    e.preventDefault();

    let name = this.state.admin.split(' ');
    let firstName = name[0];
    let lastName = name[name.length - 1];
    // TODO: FIX ERROR USER NOT AUTHORIZED

    superagent.get(`${__API_URL__}/api/profile/${firstName}/${lastName}`)
      .set('Authorization', `Bearer ${this.props.auth}`)      
      .then(profile => {
        let fullName = `${profile.firstName} ${profile.lastName}`;
        this.setState(prevState => {
          return {admins: [...prevState.admins, profile.userId], adminNames: [...prevState.adminNames, fullName]}
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({adminError: 'User was not found.'})
      });
  }

  handleUserSubmit(e) {
    e.preventDefault();

    let name = this.state.user.split(' ');
    let firstName= name[0];
    let lastName = name[name.length - 1];

    superagent.get(`${__API_URL__}/api/profile/${firstName}/${lastName}`)
      .set('Authorization', `Bearer ${this.props.auth}`)
      .then(profile => {
        let fullName = `${profile.firstName} ${profile.lastName}`;
        this.setState(prevState => {
          return {users: [...prevState.users, profile.userId], userNames: [...prevState.userNames, fullName]}
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({userError: 'User was not found.'})
      });
  }

  render() {
    let key = this.props.key ? this.props.key : undefined;
    return(
      
      <form key={key} className='org-form' onSubmit={this.handleSubmit}>
        <TextField 
          name='name'
          value={this.state.name}
          type='text'
          floatingLabelText='Name of Organization'
          onChange={this.handleChange}
          required /> 
          
        
        <TextField
          multiLine={true}
          rows={2}
          name='desc'
          value={this.state.desc}
          type='text'
          floatingLabelText='Description of Organization'
          onChange={this.handleChange} 
          required /> 
        <h3>Add Admins</h3>
        <TextField 
          name='admin'
          type='text'
          floatingLabelText='Add an Admin' 
          onChange={this.handleChange}
        />
        <FlatButton 
          className='tiny-plus'
          type='submit'
          icon={<Add />}
          onClick={this.handleAdminSubmit}
        />
        {util.renderIf(this.state.adminError, 
          <p className='error'>{this.state.adminError}</p>
        )}
        {(this.state.adminNames !== undefined) ?
          <ul>
            {this.state.adminNames.map((admin, i) => 
              <li key={i}>{admin}</li>
            )}
              {/* TODO: add remove admin functionality */}
          </ul>
          : null
        }
        <h3>Add Members</h3>
        <TextField 
          name='user'
          type='text'
          floatingLabelText='Add a Member' 
          onChange={this.handleChange}/>
        <FlatButton 
          className='tiny-plus'
          type='submit'
          onClick={this.handleUserSubmit}
          icon={<Add />}
        />
        {util.renderIf(this.state.userError, 
          <p className='error'>{this.state.userError}</p>
        )}
        {this.state.userNames !== undefined ?
          <ul>
            {this.state.userNames.map((user, i) => 
                <div key={i}>
                  <li>{user}</li> 
                  <FlatButton 
                    className='delete'
                    icon={<Clear />}
                  />
                </div>
            )}
          </ul>
          : null
        }
        <FlatButton 
          className='submit-button' 
          type='submit'
          label={this.props.buttonText}
        />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, null)(OrgForm);