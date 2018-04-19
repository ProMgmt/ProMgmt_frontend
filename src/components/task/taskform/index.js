import React from 'react';
import { runInThisContext } from 'vm';
import * as util from '../../../lib/util.js';

class TaskForm extends React.Component{
  constructor(props){
    super(props);
    let projectId = this.props.project._id;
    let {orgId} = this.props.project;
    this.state = this.props.task ? {...props.task} : {projectId, orgId, admins: [], adminId: 'none', dependentTasks: [], status: '0'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminAdd = this.handleAdminAdd.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
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
    if(!this.props.task){
      this.setState({desc: '',
      startDate: '',
      dueDate: '',
      endDate: '',
      expectedDuration: '',
      actualDuration: '',
      status: '',
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

  render(){
    return(
      <form className='task-form' onSubmit={this.handleSubmit}>
        <input
          name='desc'
          type='text'
          placeholder='Task Description'
          value={this.state.desc}
          onChange={this.handleChange} />
        <input
          name='startDate'
          type='date'
          value={this.state.startDate}
          onChange={this.handleChange} />
        <input
          name='dueDate'
          type='date'
          value={this.state.dueDate}
          onChange={this.handleChange} />
        <input
          name='endDate'
          type='date'
          value={this.state.endDate}
          onChange={this.handleChange} />
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
              <option value={task._id}>{task.desc}</option>
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