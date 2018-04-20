import React from 'react';
import { runInThisContext } from 'vm';
import * as util from '../../../lib/util.js';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';

class TaskForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.task ? {...props.task} : {projectId: this.props.project._id, orgId: this.props.project.orgId, admins: [], adminId: 'none', dependentTasks: [], status: '0'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminAdd = this.handleAdminAdd.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.task){
      this.setState(props.task);
    }
  }

  handleChange(e){
    if(e.target.type === 'number'){
      this.setState({[e.target.name]: +e.target.value});
    } else {
      this.setState({[e.target.name]: e.target.value});
    }
  }

  handleSubmit(e){
    e.preventDefault();
    delete this.state.adminId;
    delete this.state.taskDAdd;
    this.props.onComplete({...this.state});
    
    if(this.props.canToggle) {
      this.props.toggle();
    }

    if(!this.props.task){
      this.setState({desc: '',
      startDate: undefined,
      dueDate: undefined,
      endDate: undefined,
      expectedDuration: undefined,
      actualDuration: undefined,
      status: 0,
      isDependency: false,
      dependentTasks: []})
    }
  }

  handleStatusChange(event, index, value) {
    this.setState({value});
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

  handleTaskAdd(e){
    e.preventDefault();
    let {taskDAdd} = this.state;

    if(taskDAdd !== 'none'){
      this.setState(prevState => {
        return {dependentTasks: [...prevState.dependentTasks, taskDAdd]};
      })
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

  handleEndDateChange(event, date) {
    this.setState({
      endDate: date
    });
  };

  render(){
    let key = this.props.key ? this.props.key : undefined;
    return(
      <form key={key} className='task-form' onSubmit={this.handleSubmit}>
        <TextField
          style={{display: 'block'}}
          name='desc'
          type='text'
          floatingLabelText='Task Description'
          value={this.state.desc}
          onChange={this.handleChange} />
          
        <DatePicker
          style={{display: 'block'}}
          hintText='startDate'
          value={this.state.startDate}
          onChange={this.handleStartDateChange} />
        <DatePicker
          style={{display: 'block'}}
          hintText='dueDate'
          value={this.state.dueDate}
          onChange={this.handleDueDateChange} />
          
        <DatePicker
          style={{display: 'block'}}
          hintText='endDate'
          value={this.state.endDate}
          onChange={this.handleEndDateChange} />
        
        <TextField
          style={{display: 'block'}}
          name='expectedDuration'
          type='number'
          floatingLabelText='Expected Duration in Days'
          value={this.state.expectedDuration}
          onChange={this.handleChange} />
          
          <SelectField 
            style={{display: 'block'}}
            floatingLabelText='Status' 
            value={this.state.status} 
            onChange={this.handleStatusChange}
          >
            <MenuItem value='0' primaryText='0%' />
            <MenuItem value='25' primaryText='25%' />
            <MenuItem value='50' primaryText='50%' />
            <MenuItem value='75' primaryText='75%' />
            <MenuItem value='100' primaryText='100%' />
          </SelectField>
        
        {util.renderIf(this.state.admins.length > 0,
          <ul>
            <li>Existing Task Admins</li>
            {this.state.admins.map(user =>
              <li key={user._id}>{user.username}</li>
            )}
          </ul>
        )}
        
          
          <SelectField 
            style={{display: 'block'}}
            floatingLabelText='Add Admin' 
            value={this.state.adminId} 
            onChange={this.handleChange}
          >
            
            {this.props.project.admins.map(admin => 
              <MenuItem 
                key={admin._id} 
                value={admin._id}
                primaryText={admin.username}
              />
            )}
            {this.props.project.users.map(user => 
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
        
        {util.renderIf(this.state.dependentTasks.length > 0,
            <ul>
              <li>Existing Task Dependencies</li>
              {this.state.dependentTasks.map(task => 
                <li key={task._id}>{task.desc}</li>
              )}
          </ul>
        )}
       
          <SelectField 
            style={{display: 'block'}}
            floatingLabelText='Add Task Dependency' 
            value={this.state.taskDAdd} 
            onChange={this.handleChange}
          >
            
            {this.props.project.tasks.map(task => 
              <MenuItem 
                key={task._id}
                primaryText={task.desc}
              />
            )}
          </SelectField>
          <FlatButton 
            onClick={this.handleTaskAdd}
            icon={<Add />}
          />
        
        <FlatButton 
          type='submit'
          label={this.props.buttonText}
        />
      </form>
    )
  }
}

export default TaskForm;