import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../../lib/util.js';
import ProjectPreview from '../projectpreview';
import ProjectForm from '../projectform';
import * as orgActions from '../../../action/org-actions.js';
import * as projectActions from '../../../action/project-actions.js';

class MyProjects extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.userOrgSet();
  }

  render() {
    return(
      <div className='my-projects'>
        <h1>My Projects</h1>

        <ProjectPreview projects={this.props.projects} delete={this.props.projectDeleteRequest} update={this.props.projectUpdateRequest} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    orgs: state.org,
    projects: state.project
  }
}

const mapDispatchToProps = dispatch => ({
  userOrgSet: () => dispatch(orgActions.userOrgEtAllSetRequest()),
  projectUpdateRequest: (project) => dispatch(projectActions.projectUpdateRequest(project)),
  projectCreateRequest: (project) => dispatch(projectActions.projectCreateRequest(project)),
  projectDeleteRequest: (project) => dispatch(projectActions.projectDelete(project)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);