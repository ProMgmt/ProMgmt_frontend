import React from 'react';
import {connect} from 'react-redux';
import {projectUpdateRequest, projectDeleteRequest} from '../../../action/project-actions.js'
import ProjectForm from '../projectform';
import TaskForm from '../../task/taskform';
import {taskCreateRequest} from '../../../action/task-actions.js';
import TaskItem from '../../task/taskitem';
import ProjectGantt from '../../gantt';
import * as util from '../../../lib/util.js';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';

class ProjectItem extends React.Component{
  render(){
    let {org, project, projectUpdate, projectDelete, taskCreate, key} = this.props;
    return(
      <section key={key} className='project-item'>
        <Card className='content'>
          <CardHeader
          title={project.projectName}
          actAsExpander={true}
          showExpandableButton={true}
          />

          <CardText expandable={true}>
            <p>{project.desc}</p>
            <p>Start Date: {project.startDate}</p>
            <p>Due Date: {project.dueDate}</p>
            {util.renderIf(project.tasks.length > 0,
              <ProjectGantt 
                project={project}
                />
            )}
            <FlatButton
             onClick={() => projectDelete(project)}
             icon={<Clear />}
            />
          </CardText>
        </Card>
        <div className='edit'>
          <ProjectForm
            key={project._id}
            buttonText='Update Project'
            org={org}
            project={project}
            onComplete={projectUpdate} />
        </div>
        <div className='task-form'>
          <TaskForm
            buttonText='New Task'
            org={org}
            project={project}
            onComplete={taskCreate} />
        </div>
        {this.props.task[this.props.project._id].map(item =>
          <TaskItem
            key={item._id}
            org={org}
            project={project}
            task={item}
          />
        )}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  task: state.task,
})

let mapDispatchToProps = dispatch => ({
  projectUpdate: project => dispatch(projectUpdateRequest(project)),
  projectDelete: project => dispatch(projectDeleteRequest(project)),
  taskCreate: task => dispatch(taskCreateRequest(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);