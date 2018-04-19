import React from 'react';
import * as util from '../../../lib/util.js';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
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

  handleDueDateChange(event, date) {
    this.setState({
      dueDate: date,
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
          hintText='Start Date'
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <DatePicker
          hintText='Due Date'
          value={this.state.dueDate}
          onChange={this.handleDueDateChange} 
        />
        {util.renderIf(this.state.admins.length > 0,
          <ul>
            <li>Existing Project Admins</li>
            {this.state.admins.map(user =>
              <li key={user._id}>{user.username}</li>
            )}
          </ul>
        )}
        
          
          <SelectField 
            floatingLabelText='Add Admin' 
            value={this.state.adminId} 
            onChange={this.handleChange}
          >
            
            {this.props.org.admins.map(admin => 
              <MenuItem 
                key={admin._id} 
                value={admin._id}
                primaryText={admin.username} 
              />
            )}
            {this.props.org.users.map(user => 
              <MenuItem 
                key={user._id} 
                value={user._id}
                primaryText={user.username}
              />
            )}
          </SelectField>
          <FlatButton 
            onClick={this.handleAdminAdd}
            icon={<Add />}
          />
        
        {util.renderIf(this.state.users.length > 0,
          <ul>
            <li>Existing Project Users</li>
            {this.state.users.map(user =>
              <li key={user._id}>{user.username}</li>
            )}
          </ul>
        )}
        
          <SelectField
            floatingLabelText='Add User' 
            value={this.state.userId} 
            onChange={this.handleChange}
          >
            
            {this.props.org.admins.map(admin => 
              <MenuItem 
                key={admin._id} 
                value={admin._id}
                primaryText={admin.username}
              />
            )}
            {this.props.org.users.map(user => 
              <MenuItem 
                key={user._id} 
                value={user._id}
                primaryText={user.username}
              />
            )}
          </SelectField>
          <FlatButton 
            onClick={this.handleUserAdd}
            icon={<Add />}
          />
        
        <FlatButton type='submit'>{this.props.buttonText}</FlatButton>
      </form>
    )
  }
}

export default ProjectForm;