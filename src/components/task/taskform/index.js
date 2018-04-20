import React from 'react';
import {connect} from 'react-redux';
import { runInThisContext } from 'vm';
import * as util from '../../../lib/util.js';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';
import {taskRemoveAdmin} from '../../../action/task-actions.js';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.task) {
      this.props.task.startDate = this.props.task.startDate ? new Date(this.props.task.startDate) : null;
      this.props.task.dueDate = this.props.task.dueDate ? new Date(this.props.task.dueDate) : null;
      this.props.task.endDate = this.props.task.endDate ? new Date(this.props.task.endDate) : null;
    }
    this.state = this.props.task ? { ...props.task, adminId: '', taskDAdd: '' } : { projectId: this.props.project._id, orgId: this.props.project.orgId, admins: [], adminId: {}, dependentTasks: [], status: '0', addDTask: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminAdd = this.handleAdminAdd.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.handleTaskDepChange = this.handleTaskDepChange.bind(this);
    this.handleTaskRemoveAdmin = this.handleTaskRemoveAdmin.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.task) {
      this.setState(props.task);
    }
  }

  handleStatusChange(event, index, value) {
    this.setState({ status: value });
  }

  handleAdminChange(event, index, value) {
    this.setState({ adminId: value });
  }

  handleTaskDepChange(event, index, value) {
    this.setState({ taskDAdd: value });
  }

  handleChange(e) {
    if (e.target.type === 'number') {
      this.setState({ [e.target.name]: +e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    delete this.state.adminId;
    delete this.state.taskDAdd;
    this.state.admins ? this.setState(prevState => {
      return {admins: prevState.admins.map(admin => admin._id)}}) : null;
    this.state.dependentTasks ? this.setState(prevState => {
      return {dependentTasks: prevState.dependentTasks.map(task => task._id)}}) : null;
    console.log('this.state @ taskform submit', this.state);
    this.props.onComplete({ ...this.state });

    if (this.props.canToggle) {
      this.props.toggle();
    }

    if (!this.props.task) {
      this.setState({
        desc: '',
        startDate: undefined,
        dueDate: undefined,
        endDate: undefined,
        expectedDuration: undefined,
        actualDuration: undefined,
        status: 0,
        isDependency: false,
        dependentTasks: []
      })
    }
  }

  handleAdminAdd(e) {
    e.preventDefault();
    let { adminId } = this.state;

    if (adminId !== 'none') {
      this.setState(prevState => {
        return { admins: [...prevState.admins, adminId] };
      })
    }
  }

  handleTaskAdd(e) {
    e.preventDefault();
    let { taskDAdd } = this.state;

    if (!!taskDAdd) {
      this.setState(prevState => {
        return { dependentTasks: [...prevState.dependentTasks, taskDAdd] };
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

  handleTaskRemoveAdmin(e){
    console.log('e.target.value @ delete button', e.target.value);
    this.props.taskRemoveAdmin(this.props.task, e.target.value);
  }

  render(){
    let {handleTaskRemoveAdmin} = this.props;
    console.log('handleTaskRemoveAdmin', handleTaskRemoveAdmin);
    let key = this.props.key ? this.props.key : undefined;
    return (
      <form key={key} className='task-form' onSubmit={this.handleSubmit}>
        <TextField
          style={{ display: 'block' }}
          name='desc'
          type='text'
          floatingLabelText='Task Description'
          value={this.state.desc}
          onChange={this.handleChange} />

        <DatePicker
          style={{ display: 'block' }}
          hintText='startDate'
          value={this.state.startDate}
          onChange={this.handleStartDateChange} />
        <DatePicker
          style={{ display: 'block' }}
          hintText='dueDate'
          value={this.state.dueDate}
          onChange={this.handleDueDateChange} />

        <DatePicker
          style={{ display: 'block' }}
          hintText='endDate'
          value={this.state.endDate}
          onChange={this.handleEndDateChange} />

        <TextField
          style={{ display: 'block' }}
          name='expectedDuration'
          type='number'
          floatingLabelText='Expected Duration in Days'
          value={this.state.expectedDuration}
          onChange={this.handleChange} />

        <SelectField
          style={{ display: 'block' }}
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
              <li key={user._id}>
                {user.username}
                <FlatButton 
                  type='button'
                  value={user}
                  onClick={(e) => handleTaskRemoveAdmin(e)}
                  icon={<Clear/>}
                  />
              </li>
            )}
          </ul>
        )}


        <SelectField
          style={{ display: 'block' }}
          floatingLabelText='Add Admin'
          value={this.state.adminId}
          onChange={this.handleAdminChange}
        >

          {this.props.project ?
            this.props.project.admins ?
              this.props.project.admins.map(admin =>
                <MenuItem
                  key={admin._id}
                  value={admin}
                  primaryText={admin.username}
                />
              )
              : null
            : null
          }
          {this.props.project ?
            this.props.project.users ?
              this.props.project.users.map(user =>
                <MenuItem
                  key={user._id}
                  value={user}
                  primaryText={user.username}
                />)
              : null
            : null
          }
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
          style={{ display: 'block' }}
          floatingLabelText='Add Task Dependency'
          value={this.state.taskDAdd}
          onChange={this.handleTaskDepChange}
        >

          {this.props.project ?
            this.props.project.tasks ?
              this.props.project.tasks.map(task =>
                <MenuItem
                  key={task._id}
                  value={task}
                  primaryText={task.desc}
                />
              )
              : null
            : null
          }
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


let mapDispatchToProps = dispatch => ({
  taskRemoveAdmin: (task, removeUser) => dispatch(taskRemoveAdmin(task, removeUser)),
});

export default TaskForm;