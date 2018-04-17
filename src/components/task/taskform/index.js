import React from 'react';
import { runInThisContext } from 'vm';

class TaskForm extends React.Component{
  constructor(props){
    super(props);
    let projId = this.props.proj._id;
    let {orgId} = this.props.proj;
    this.state = this.props.task ? {...props.project} : {projId, orgId, desc: '', startDate: '', dueDate: '', endDate: '', expectedDuration: '', actualDuration: '', status: '', isDependency: false, dependentTasks: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.proj){
      this.setState(props.proj);
    }
    if(props.task){
      this.setState(props.task);
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
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
      dependentTasks: ''})
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
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default TaskForm;