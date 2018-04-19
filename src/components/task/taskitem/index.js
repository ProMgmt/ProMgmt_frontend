import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../../task/taskform';
import { taskUpdateRequest, taskDeleteRequest } from '../../../action/task-actions.js';
import ProjectForm from '../../project/projectform';
import * as util from '../../../lib/util.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class TaskItem extends React.Component {
  render() {
    let { org, project, task, taskUpdate, taskDelete, taskCreate, key } = this.props;
    return(
      <section key={key} className='task-item'>
        <Card className='content'>
          <CardHeader
            title={task.taskName}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p>{task.desc}</p>
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
          </CardText>
          <button onClick={() => taskDelete(task)}>X</button>
        </Card>
        <div className='edit'>
          <TaskForm  
            buttonText='Update Task'
            org={org}
            project={project}
            task={task}
            onComplete={taskUpdate} />
        </div>
      </section>
    )
  } 
}

const mapDispatchToProps = dispatch => ({
  taskUpdate: task => dispatch(taskUpdateRequest(task)), 
  taskDelete: task => dispatch(taskDeleteRequest(task)), 
})

export default connect(null, mapDispatchToProps)(TaskItem);
