import React from 'react';
import * as util from '../../../lib/util.js';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class ProjectForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.project ? {...props.project} : { 
      _id: undefined,
      orgId: this.props.org._id, 
      projectName: '',
      desc: '', 
      startDate: '', 
      dueDate: '',
      admins: [],
      adminId: 'none',
      users: [],
      userId: 'none',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminAdd = this.handleAdminAdd.bind(this);
    this.handleUserAdd = this.handleUserAdd.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }

  componentWillReceiveProps(props){
    if (props.project){
      this.setState(props.project);
    }
  }

  handleStartDateChange(event, date) {
    this.setState({
      startDate: date,
    });
  };

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleAdminAdd(e){
    e.preventDefault();
    let {adminId} = this.state;

    if(adminId !== 'none'){
      this.setState(prevState => {
        return {admins: [...prevState.admins, adminId]};
      })
    }
  }

  handleUserAdd(e){
    e.preventDefault();
    let {userId} = this.state;

    if(userId !== 'none'){
      this.setState(prevState => {
        return {users: [...prevState.users, userId]};
      })
    }
  }

  handleSubmit(e){
    e.preventDefault();

    if(this.props.canToggle) {
      this.props.toggle();
    }
    
    this.props.onComplete({...this.state});
  }

  render(){
    let key = this.props.key ? this.props.key : undefined;
    return(
      <form key={key} className='project-form' onSubmit={this.handleSubmit}>
        <TextField
          name='projectName'
          type='text'
          floatingLabelText='Project Name'
          value={this.state.projectName}
          onChange={this.handleChange} />
        <TextField
          name='desc'
          type='text'
          floatingLabelText='Project Description'
          value={this.state.desc}
          onChange={this.handleChange} />
        <DatePicker
          name='startDate'
          
          hintText='Start Date'
          value={this.state.startDate}
          onChange={this.handleDateChange}
        />
        <DatePicker
          name='dueDate'
          
          hintText='Due Date'
          value={this.state.dueDate}
          onChange={this.handleDateChange} 
        />
        {util.renderIf(this.state.admins.length > 0,
          <ul>
            <li>Existing Project Admins</li>
            {this.state.admins.map(user =>
              <li key={user._id}>{user.username}</li>
            )}
          </ul>
        )}
        <label>
          Add Admin:
          <select name='adminId' value={this.state.adminId} onChange={this.handleChange}>
            <option selectedvalue='none'>None</option>
            {this.props.org.admins.map(admin => 
              <option key={admin._id} value={admin._id}>{admin.username}</option>
            )}
            {this.props.org.users.map(user => 
              <option key={user._id} value={user._id}>{user.username}</option>
            )}
          </select>
          <button onClick={this.handleAdminAdd}>+</button>
        </label>
        {util.renderIf(this.state.users.length > 0,
          <ul>
            <li>Existing Project Users</li>
            {this.state.users.map(user =>
              <li key={user._id}>{user.username}</li>
            )}
          </ul>
        )}
        <label>
          Add User:
          <select name='userId' value={this.state.userId} onChange={this.handleChange}>
            <option selectedvalue='none'>None</option>
            {this.props.org.admins.map(admin => 
              <option key={admin._id} value={admin._id}>{admin.username}</option>
            )}
            {this.props.org.users.map(user => 
              <option key={user._id} value={user._id}>{user.username}</option>
            )}
          </select>
          <button onClick={this.handleUserAdd}>+</button>
        </label>
        <FlatButton type='submit'>{this.props.buttonText}</FlatButton>
      </form>
    )
  }
}

export default ProjectForm;