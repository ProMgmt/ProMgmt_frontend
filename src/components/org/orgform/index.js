import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';
import * as util from '../../../lib/util.js';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';
import './_org-form.scss';
import {List, ListItem} from 'material-ui/List';
import SubHeader from 'material-ui/Subheader';

class OrgForm extends React.Component {
  constructor(props) {
    super(props);

    if(props.org){
      var tempState = props.org;
      tempState.adminNames ? tempState.adminNames = tempState.admins.map(admin => admin.username) : null;
      tempState.userNames ? tempState.users.map(user => user.username) : null;
    }
    this.state = {
      _id: props.org ? props.org._id : undefined,
      name: props.org ? props.org.name : '',
      desc: props.org ? props.org.desc : '',
      projects: props.org ? props.org.projects : [],
      admins: props.org ? props.org.admins : [],
      adminNames: props.org ? tempState.adminNames : [],
      users: props.org ? props.org.users : [],
      userNames: props.org ? tempState.userNames : [],
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

    this.state.projects ? this.setState(prevState => {
      return {projects: prevState.projects.map(project => project._id)}}) : null;
    this.state.admins ? this.setState(prevState => {
      return {admins: prevState.admins.map(admin => admin._id)}}) : null;
    this.state.users ? this.setState(prevState => {
      return {users: prevState.users.map(user => user._id)}}) : null;
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
    
    // TODO: if (!firstName) tell the user they messed up
    if (firstName) superagent.get(`${__API_URL__}/api/profile/${firstName}/${lastName}`)
      .set('Authorization', `Bearer ${this.props.auth}`)      
      .then(({ body: profile }) => {
        let fullName = `${profile.firstName} ${profile.lastName}`;

        this.setState(prevState => {
          if(prevState.admins) {
            return !prevState.admins.includes(profile.userId) ? {admins: [...prevState.admins, profile.userId], adminNames: [...prevState.adminNames, fullName]} : {}
          } else {
            return {admins: [profile.userId], adminNames: [fullName]};
          }
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

    // TODO: if (!firstName) tell the user they messed up
    if(firstName) superagent.get(`${__API_URL__}/api/profile/${firstName}/${lastName}`)
      .set('Authorization', `Bearer ${this.props.auth}`)
      .then(({ body: profile }) => {
        let fullName = `${profile.firstName} ${profile.lastName}`;
        console.log('full nerm', fullName)
        console.log('profile', profile)
        this.setState(prevState => {
          if(prevState.users) {
            return !prevState.users.includes(profile.userId) ? {users: [...prevState.users, profile.userId], userNames: [...prevState.userNames, fullName]} : {}
          } else {
            return {users: [profile.userId], userNames: [fullName]}
          }
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
          style={{display: 'block'}}
          className='org-field'
          name='name'
          value={this.state.name}
          type='text'
          floatingLabelText='Name of Organization'
          onChange={this.handleChange}
          required /> 
          
        
        <TextField
          style={{display: 'block'}}
          className='org-field'
          multiLine={true}
          rows={2}
          name='desc'
          value={this.state.desc}
          type='text'
          floatingLabelText='Description of Organization'
          onChange={this.handleChange} 
          required /> 
        <div style={{display: 'inline-block'}}>
        <TextField 
          style={{display: 'block'}}
          className='org-field'
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
          style={{float: 'right'}}
        />
        </div>
        {util.renderIf(this.state.adminError, 
          <p className='error'>{this.state.adminError}</p>
        )}
        {(this.state.adminNames !== undefined) ?
          <List>
            <SubHeader>Admins</SubHeader>
            {this.state.adminNames.map((admin, i) => 
              <ListItem 
                key={i}
                primaryText={admin}
              />
            )}

              {/* TODO: add remove admin functionality */}
          </List>

          : null
        }
        
        <div  style={{display: 'inline-block'}}>
          <TextField 
            style={{display: 'block'}}
            className='org-field'
            name='user'
            type='text'
            floatingLabelText='Add a Member' 
            onChange={this.handleChange}/>
          <FlatButton 
            className='tiny-plus'
            type='submit'
            onClick={this.handleUserSubmit}
            icon={<Add />}
            style={{float: 'right'}}
          />
        </div>
        {util.renderIf(this.state.userError, 
          <p className='error'>{this.state.userError}</p>
        )}
        {this.state.userNames !== undefined ?
          <ul>
            {this.state.userNames
              .filter(a => a)
              .map((user, i) => 
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