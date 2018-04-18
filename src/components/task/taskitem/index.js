import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../../task/taskform';
import { taskUpdateRequest, taskDeleteRequest } from '../../../action/task-actions.js';
import ProjectForm from '../../project/projectform';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class TaskItem extends React.Component {
  render() {
    let { org, project, task, taskUpdate, taskDelete, taskCreate } = this.props;
    return(
      <section className='task-item'>
        <Card className='content'>
          <CardHeader
            title={task.taskName}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p>{task.desc}</p>
            <p>Start Date: {task.startDate}</p>
            <p>Due Date: {task.dueDate} </p>
          </CardText>
            
          <h4>{task.taskName}</h4>
          
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

const mapStateToProps = state => ({
  project: state.project, 
  org: state.org
})

const mapDispatchToProps = dispatch => ({
  taskUpdate: task => dispatch(taskUpdateRequest(task)), 
  taskDelete: task => dispatch(taskDeleteRequest(task)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
