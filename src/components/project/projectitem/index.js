import React from 'react';
import {connect} from 'react-redux';
import {projectUpdateRequest, projectDeleteRequest} from '../../../action/project-actions.js'
import ProjectForm from '../projectform';

class ProjectItem extends React.Component{
  render(){
    let {org, project, projectUpdate, projectDelete} = this.props;
    return(
      <section className='project-item'>
        <div className='content'>
          <h4>{project.projectName}</h4>
          <p>{project.desc}</p>
          <p>Start Date: {project.startDate}</p>
          <p>Due Date: {project.dueDate}</p>
          <button onClick={() => projectDelete(project)}>X</button>
        </div>
        <div className='edit'>
          <ProjectForm 
            buttonText='Update Project'
            org={org}
            project={project}
            onComplete={projectUpdate} />
        </div>
      </section>
    )
  }
}

let mapDispatchToProps = dispatch => ({
  projectUpdate: project => dispatch(projectUpdateRequest(project)),
  projectDelete: project => dispatch(projectDeleteRequest(project)),
})

export default connect(null, mapDispatchToProps)(ProjectItem);