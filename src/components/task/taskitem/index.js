import React from 'react';
import {connect} from 'react-redux';
import {taskUpdateRequest, taskDeleteRequest} from '../../../action/task-actions.js';
import TaskForm from '../taskform';

class TaskItem extends React.Component{
  render(){
    let {org, project, task, taskUpdate, taskDelete} = this.props;
    return(
      <section className='task-item'>
        <div className='content'>
          <h6>{task.desc}</h6>
          <p>Start Date: {task.startDate}</p>
          <p>{task.status}% Complete</p>
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

let mapDispatchToProps = dispatch => ({
  taskUpdate: task => dispatch(taskUpdateRequest(task)),
  taskDelete: task => dispatch(taskDeleteRequest(task)),
})

export default connect(null, mapDispatchToProps)(TaskItem);