import React from 'react';
import {connect} from 'react-redux';
import {orgUpdateRequest, orgDeleteRequest} from '../../../action/org-actions.js';
import {projectCreateRequest} from '../../../action/project-actions.js';
import OrgForm from '../orgform';
import ProjectForm from '../../project/projectform';
import ProjectItem from '../../project/projectitem';

class OrgItem extends React.Component{
  render(){
    let {org, orgDelete, orgUpdate, projectCreate} = this.props;
    return(
      <section className='org-item'>
        <div className='content'>
          <h2>{org.name}</h2>
          <p>{org.desc}</p>
          <button onClick={() => orgDelete(org)}>X</button>
        </div>
        <div className='edit'>
          <OrgForm
            buttonText='Update Org'
            org={org}
            onComplete={orgUpdate}
          />
        </div>
        <div className='proj-form'>
          <ProjectForm
            buttonText='New Project'
            org={org}
            onComplete={projectCreate}
          />
        </div>
        {this.props.project[this.props.org._id].map(item => 
          <ProjectItem 
            key={item._id}
            org={org}
            project={item}
          />)}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  org: state.org,
  project: state.project,
});

const mapDispatchToProps = dispatch => ({
  orgUpdate: org => dispatch(orgUpdateRequest(org)),
  orgDelete: org => dispatch(orgDeleteRequest(org)),
  projectCreate: project => dispatch(projectCreateRequest(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgItem);