import React from 'react';
import { runInThisContext } from 'vm';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';


class TaskForm extends React.Component{
  constructor(props){
    super(props);
    // let projectId = this.props.project._id;
    // let {orgId} = this.props.project;
    this.state = this.props.task ? {...props.task} : {projectId: this.props.project._id, orgId: this.props.project.orgId};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <TextField
          name='desc'
          type='text'
          floatingLabelText='Task Description'
          value={this.state.desc}
          onChange={this.handleChange} />
        <DatePicker
          name='startDate'
          type='date'
          value={this.state.startDate}
          onChange={this.handleChange} />
        <DatePicker
          name='dueDate'
          type='date'
          value={this.state.dueDate}
          onChange={this.handleChange} />
        <DatePicker
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
        <SelectField>
          Status: 
          <select name='status' value={this.state.status} onChange={this.handleChange}>
            <option value='0'>0%</option>
            <option value='25'>25%</option>
            <option value='50'>50%</option>
            <option value='75'>75%</option>
            <option value='100'>100%</option>
          </select>
        </SelectField>
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default TaskForm;