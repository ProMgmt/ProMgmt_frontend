import React from 'react';
import { runInThisContext } from 'vm';
import * as util from '../../../lib/util.js';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class TaskForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.task ? {...props.task} : {projectId: this.props.project._id, orgId: this.props.project.orgId, admins: [], adminId: 'none', dependentTasks: [], status: '0'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminAdd = this.handleAdminAdd.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
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
          name='desc'
          type='text'
          floatingLabelText='Task Description'
          value={this.state.desc}
          onChange={this.handleChange} />
        <DatePicker
          hintText='startDate'
          
          value={this.state.startDate}
          onChange={this.handleStartDateChange} />
        <DatePicker
          hintText='dueDate'
          
          value={this.state.dueDate}
          onChange={this.handleDueDateChange} />
        <DatePicker
          hintText='endDate'
          
          value={this.state.endDate}
          onChange={this.handleEndDateChange} />
        <input
          name='expectedDuration'
          type='number'
          placeholder='Expected Duration in Days'
          value={this.state.expectedDuration}
          onChange={this.handleChange} />
        <label>
          Status: 
          <select name='status' value={this.state.status} onChange={this.handleChange}>
            <option value='0'>0%</option>
            <option value='25'>25%</option>
            <option value='50'>50%</option>
            <option value='75'>75%</option>
            <option value='100'>100%</option>
          </select>
        </label>
        {util.renderIf(this.state.admins.length > 0,
          <ul>
            <li>Existing Task Admins</li>
            {this.state.admins.map(user =>
              <li key={user._id}>{user.username}</li>
            )}
          </ul>
        )}
        <label>
          Add Admin:
          <select name='adminId' value={this.state.adminId} onChange={this.handleChange}>
            <option selectedvalue='none'>None</option>
            {this.props.project.admins.map(admin => 
              <option key={admin._id} value={admin._id}>{admin.username}</option>
            )}
            {this.props.project.users.map(user => 
              <option key={user._id} value={user._id}>{user.username}</option>
            )}
          </select>
          <button onClick={this.handleAdminAdd}>+</button>
        </label>
        {util.renderIf(this.state.dependentTasks.length > 0,
            <ul>
              <li>Existing Task Dependencies</li>
              {this.state.dependentTasks.map(task => 
                <li key={task._id}>{task.desc}</li>
              )}
          </ul>
        )}
        <label>
          Add Task Dependency:
          <select name='taskDAdd' value={this.state.taskDAdd} onChange={this.handleChange}>
            <option value='none'>None</option>
            {this.props.project.tasks.map(task => 
              <option key={task._id}>{task.desc}</option>
            )}
          </select>
          <button onClick={this.handleTaskAdd}>+</button>
        </label>
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default TaskForm;