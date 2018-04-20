import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../../task/taskform';
import { taskUpdateRequest, taskDeleteRequest } from '../../../action/task-actions.js';
import ProjectForm from '../../project/projectform';
import FlatButton from 'material-ui/FlatButton';
import * as util from '../../../lib/util.js';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Create from 'material-ui/svg-icons/content/create';
import Clear from 'material-ui/svg-icons/content/clear';

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
    // TODO: Check this functionality b/c can't text it since i have no tasks
    task.admins.forEach(adminObj => {
      if (this.props.user._id === adminObj._id || this.props.user._id === adminObj) isAdmin = true;
    });

    return (
      <section key={key} className='task-item'>
        <Card className='content' style={{backgroundColor: '#ddeaff'}}>
          <CardHeader
            title={task.desc}
            actAsExpander={true}
            showExpandableButton={true}
          />


          <CardText expandable={true}>
            <p>Start Date: {new Date(task.startDate).toDateString()}</p>
            <p>Expected Duration: {task.expectedDuration} days</p>
            <p>Due Date: {new Date(task.dueDate).toDateString()} </p>
            <p>Status: {task.status}% Complete</p>
            {util.renderIf(task.admins.length > 0,
              <List>
                <Subheader>Existing Task Admins</Subheader>
                {task.admins.map(user =>
                  <ListItem 
                    key={user._id}
                    primaryText={user.username}
                  />
                  
                )}
              </List>
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
                <FlatButton 
                  onClick={this.toggleEdit}
                  icon={<Create style={{width: '14px'}}/>}
                />
                <FlatButton 
                  onClick={() => taskDelete(task)}
                  style={{color: 'red'}}
                  icon={<Clear style={{width: '14px'}}/>}
                />
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
