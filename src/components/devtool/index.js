import React from 'react';
import {connect} from 'react-redux';
import OrgForm from '../org/orgform';
import OrgItem from '../org/orgitem';
// import ProjectForm from '../project/projectform';
// import TaskForm from '../task/taskform';
import {userOrgEtAllSetRequest, orgCreateRequest, orgUpdateRequest} from '../../action/org-actions.js';
import {projectCreateRequest, projectUpdateRequest} from '../../action/project-actions.js';
import {userTaskCreateRequest, userTaskUpdateRequest} from '../../action/task-actions.js';

class DevTool extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.userOrgEtAllSet()
    .catch(console.error);
  }

  // componentWillReceiveProps(props){
  //   if(props.org){
  //     this.setState(props.org);
  //   }
  // }

  render(){
    console.log('this.props.org', this.props.org);
    return(
      <section className='devtool'>
        <OrgForm
          onComplete={this.props.orgCreate}
          buttonText='Create Org'
        />
        {this.props.orgs.map(org => 
          <OrgItem
            key={org._id}
            org={org}
          />
        )}
        {/* <ProjectForm />
        <TaskForm /> */}
      </section>
    )
  }
}

let mapStateToProps = state => ({
  orgs: state.orgs,
})

let mapDispatchToProps = dispatch => ({
  userOrgEtAllSet: () => dispatch(userOrgEtAllSetRequest()),
  orgCreate: org => dispatch(orgCreateRequest(org)),
  orgUpdate: org => dispatch(orgUpdateRequest(org)),
  projectCreate: project => dispatch(projectCreateRequest(project)),
  projectUpdate: project => dispatch(projectUpdateRequest(project)),
  taskCreate: task => dispatch(userTaskCreateRequest(task)),
  taskUpdate: task => dispatch(userTaskUpdateRequest(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DevTool);