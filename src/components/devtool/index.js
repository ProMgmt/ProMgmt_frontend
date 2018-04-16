import React from 'react';
import {connect} from 'react-redux';
import OrgForm from '../org/orgform';
import ProjectForm from '../project/projectform';
import TaskForm from '../task/taskform';
import {userOrgEtAlSetRequest, orgCreateRequest, orgUpdateRequest} from '../../action/org-actions.js';
import {projectCreateRequest, projectUpdateRequest} from '../../action/project-actions.js';
import {userTaskCreateRequest, userTaskUpdateRequest} from '../../action/task-actions.js';

class DevTool extends React.Component{
  constructor(props){
    super(props)
    this.userOrgEtAlSet = this.userOrgEtAlSet.bind(this);
    this.handleOrgCreate = this.handleOrgCreate.bind(this);
    this.handleOrgUpdate = this.handleOrgUpdate.bind(this);
    this.handleProjectCreate = this.handleProjectCreate.bind(this);
    this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
    this.handleTaskCreate = this.handleTaskCreate.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
  }

  componentDidMount(){
    this.props.userOrgEtAlSet()
    .catch(console.error);
  }

  handleOrgCreate(org){
    return this.props.orgCreate(org)
    .catch(console.error);
  }

  handleOrgUpdate(org){
    return this.props.orgUpdate(org)
    .catch(console.error);
  }

  handleProjectCreate(project){
    return this.props.projectCreate(project)
    .catch(console.error);
  }

  handleProjectUpdate(project){
    return this.props.projectUpdate(project)
    .catch(console.error);
  }

  handleTaskCreate(task){
    return this.props.taskCreate(task)
    .catch(console.error);
  }

  handleTaskUpdate(task){
    return this.props.taskUpdate(task)
    .catch(console.error);
  }

  render(){
    return(
      <section className='devtool'>
        <OrgForm 
          buttonText='Create Org'
          onComplete={this.props.handleOrgCreate}
        />
        {this.props.orgs.map(org => {
          <OrgForm 
            buttonText='Update Org'
            onComplete={this.props.handleOrgUpdate}
          />
        })}
        <ProjectForm />
        <TaskForm />
      </section>
    )
  }
}

let mapStateToProps = state => ({
  orgs: state.org,
})

let mapDispatchToProps = dispatch => ({
  userOrgEtAlSet: () => dispatch(userOrgEtAlSetRequest()),
  orgCreate: org => dispatch(orgCreateRequest(org)),
  orgUpdate: org => dispatch(orgUpdateRequest(org)),
  projectCreate: project => dispatch(projectCreateRequest(project)),
  projectUpdate: project => dispatch(projectUpdateRequest(project)),
  taskCreate: task => dispatch(userTaskCreateRequest(task)),
  taskUpdate: task => dispatch(userTaskUpdateRequest(task)),
})