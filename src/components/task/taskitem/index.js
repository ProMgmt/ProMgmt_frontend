import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../../task/taskform';
import { taskUpdateRequest, taskDeleteRequest } from '../../../action/task-actions.js';
import ProjectForm from '../../project/projectform';

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

const mapStateToProps = state => ({
  project: state.project, 
  org: state.org
})

const mapDispatchToProps = dispatch => ({
  taskUpdate: task => dispatch(taskUpdateRequest(task)), 
  taskDelete: task => dispatch(taskDeleteRequest(task)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
