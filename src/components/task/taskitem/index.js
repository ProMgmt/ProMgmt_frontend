import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../../task/taskform';
import { taskUpdateRequest, taskDeleteRequest } from '../../../action/task-actions.js';
import ProjectForm from '../../project/projectform';
import FlatButton from 'material-ui/FlatButton';
import * as util from '../../../lib/util.js';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    }

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState(state => {
      return { edit: !state.edit };
    });
  }

  render() {
    let editTaskButtonText;
    this.state.edit ? editTaskButtonText = 'Hide' : editTaskButtonText = 'Edit';
    let { org, project, task, taskUpdate, taskDelete, taskCreate, key } = this.props;

    let isAdmin = false;
    console.log('this.props.user', this.props.user);
    console.log('task.admins', task.admins);
    // TODO: Check this functionality b/c can't text it since i have no tasks
    task.admins.forEach(adminObj => {
      if (this.props.user._id === adminObj._id || this.props.user._id === adminObj) isAdmin = true;
    });

    return (
      <section key={key} className='task-item'>
        <Card className='content'>
          <CardHeader
            title={task.desc}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p>Start Date: {task.startDate}</p>
            <p>Expected Duration: {task.expectedDuration} days</p>
            <p>Due Date: {task.dueDate} </p>
            <p>Status: {task.status}% Complete</p>
            {util.renderIf(task.admins.length > 0,
              <ul>
                <li>Existing Task Admins</li>
                {task.admins.map(user =>
                  <li key={user._id}>{user.username}</li>
                )}
              </ul>
            )}
            {util.renderIf(task.dependentTasks.length > 0,
              <ul>
                <li>Existing Task Dependencies</li>
                {task.dependentTasks.map(task =>
                  <li key={task._id}>{task.desc}</li>
                )}
              </ul>
            )}
            {this.state.edit ?
              <div className='edit'>
                <TaskForm
                  buttonText='Update Task'
                  org={org}
                  project={project}
                  task={task}
                  onComplete={taskUpdate}
                  canToggle={true}
                  toggle={this.toggleEdit}
                />
              </div>
              :
              null
            }

            {isAdmin ?
              <div className='admin-buttons'>
                <FlatButton onClick={() => taskDelete(task)}>X</FlatButton>
                <FlatButton onClick={this.toggleEdit}>{editTaskButtonText}</FlatButton>
              </div>
            : null
            }
          </CardText>
        </Card>

      </section>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  taskUpdate: task => dispatch(taskUpdateRequest(task)),
  taskDelete: task => dispatch(taskDeleteRequest(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
