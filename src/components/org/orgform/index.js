import React from 'react';
import superagent from 'superagent';
import * as util from '../../../lib/util.js';

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
    console.log('this.state.adminNames', this.state.adminNames);

    let { name, value } = e.target;
    this.setState({ [name]: value, adminError: '', userError: '' });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onComplete({...this.state});
  }

  handleAdminSubmit(e) {
    e.preventDefault();

    let name = this.state.admin.split(' ');
    let firstName = name[0];
    let lastName = name[name.length - 1];
    // TODO:
    // let {auth} = this.setState();

    superagent.get(`${__API_URL__}/api/profile/${firstName}/${lastName}`)
      // .set({Authorization: `Bearer: ${auth}`})
      .then(profile => {
        let fullName = `${profile.firstName} ${profile.lastName}`;
        this.setState(prevState => {
          return {admins: [...prevState.admins, profile.userId], adminNames: [...prevState.adminNames, fullName]}
        }, () => {
          console.log(this.state);
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
    console.log(name);
    // TODO:
    // let {auth} = this.setState();

    superagent.get(`${__API_URL__}/api/profile/${firstName}/${lastName}`)
      // .set({Authorization: `Bearer: ${auth}`})
      .then(profile => {
        let fullName = `${profile.firstName} ${profile.lastName}`;
        this.setState(prevState => {
          return {users: [...prevState.users, profile.userId], userNames: [...prevState.userNames, fullName]}
        }, () => {
          console.log(this.state);
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({userError: 'User was not found.'})
      });
  }

  render() {
    console.log('adminNames', this.state.adminNames);
    const mapList = this.state.adminNames.map((admin, i) => <li key={i}>{admin}</li>)
    return(
      <form className='org-form' onSubmit={this.handleSubmit}>
        <input name='name'
          value={this.state.name}
          type='text'
          placeholder='Name of Organization'
          onChange={this.handleChange}
          required /> * required
        <textarea 
          rows='10'
          columns='50'
          name='desc'
          value={this.state.desc}
          type='text'
          placeholder='Description of Organization'
          onChange={this.handleChange} 
          required /> * required
        <input name='admin'
          type='text'
          placeholder='Add an Admin' 
          onChange={this.handleChange}/>
        <button className='tiny-plus'
          type='submit'
          onClick={this.handleAdminSubmit}>+</button>
        {util.renderIf(this.state.adminError, 
          <p className='error'>{this.state.adminError}</p>
        )}
        <ul>
          {mapList}
            {/* TODO: add remove admin functionality */}
        </ul>
        <input name='user'
          type='text'
          placeholder='Add a Member' 
          onChange={this.handleChange}/>
        <button className='tiny-plus'
          type='submit'
          onClick={this.handleUserSubmit}>+</button>
        {util.renderIf(this.state.userError, 
          <p className='error'>{this.state.userError}</p>
        )}
        <ul>
          {this.state.userNames.map((user, i) => {
            <span>
              <li key={i}>{user}</li> <button className='delete'>x</button>
            </span>          
          })}
        </ul>
        <button className='submit-button' type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default OrgForm;