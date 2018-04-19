import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../../task/taskform';
import { taskUpdateRequest, taskDeleteRequest } from '../../../action/task-actions.js';
import ProjectForm from '../../project/projectform';
import * as util from '../../../lib/util.js';

class TaskItem extends React.Component {
  render() {
    let { org, project, task, taskUpdate, taskDelete, taskCreate } = this.props;
    return(
      <section className='task-item'>
        <div className='content'>
          <h4>{task.taskName}</h4>
          <p>{task.desc}</p>
          <p>Start Date: {task.startDate}</p>
          <p>Due Date: {task.dueDate} </p>
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
          <button onClick={() => taskDelete(task)}>X</button>
        </div>
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
