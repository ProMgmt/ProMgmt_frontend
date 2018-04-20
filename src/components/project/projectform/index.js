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
    if(this.props.project){
      var tempProject = {...props.project};
      tempProject.startDate = new Date(tempProject.startDate);
      tempProject.dueDate = new Date(tempProject.dueDate);
      tempProject.adminId = 'none';
      tempProject.userId = 'none';
    }
    this.state = this.props.project ? {...tempProject} : { 
      _id: undefined,
      orgId: this.props.org._id, 
      projectName: '',
      desc: '', 
      startDate: {}, 
      dueDate: {},
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
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  componentWillReceiveProps(props){
    if (props.project){
      props.project.startDate = new Date(props.project.startDate);
      props.project.dueDate = new Date(props.project.dueDate);
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

  handleAdminChange(e, i, v){
    this.setState({adminId: v});
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

  handleUserChange(e, i, v){
    this.setState({userId: v});
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
    console.log(':::this.props.org', this.props.org)
    let key = this.props.key ? this.props.key : undefined;
    return(
      <form key={key} className='project-form' onSubmit={this.handleSubmit}>
        <TextField
          style={{display: 'block'}}
          name='projectName'
          type='text'
          floatingLabelText='Project Name'
          value={this.state.projectName}
          onChange={this.handleChange} />
        <TextField
          style={{display: 'block'}}
          name='desc'
          type='text'
          floatingLabelText='Project Description'
          value={this.state.desc}
          onChange={this.handleChange} />
        <DatePicker
          style={{display: 'block'}}
          hintText='Start Date'
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <DatePicker
          style={{display: 'block'}}
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
            style={{display: 'block'}}
            floatingLabelText='Add Admin' 
            value={this.state.adminId} 
            onChange={this.handleAdminChange}
          >
              <MenuItem
                key='none'
                value='none'
                primaryText='none' />
            {this.props.org ?
              this.props.org.admins.map((admin, i) => 
                <MenuItem 
                  key={`${admin._id}-${i}`} 
                  value={admin}
                  primaryText={admin.username} 
                />
              )
              : null
            }
            {this.props.org ?
              this.props.org.users ?
              this.props.org.users.map((user, i) => 
              <MenuItem 
                key={`${user._id}-${i}`} 
                value={user._id}
                primaryText={user.username}
              />
             )
             : null 
             : null
            }
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
            style={{display: 'block'}}
            floatingLabelText='Add User' 
            value={this.state.userId} 
            onChange={this.handleUserChange}
          >
              <MenuItem
                key='none'
                value='none'
                primaryText='none' />
            {this.props.org ?
              this.props.org.admins.map((admin, i) => 
                <MenuItem 
                  key={`${admin._id}-${i}`} 
                  value={admin}
                  primaryText={admin.username} 
                />
              )
              : null
            }            
            {this.props.org ?
              this.props.org.users ?
              this.props.org.users.map((user, i) => 
              <MenuItem 
                key={`${user._id}-${i}`} 
                value={user._id}
                primaryText={user.username}
              />
             )
             : null 
             : null
            }
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