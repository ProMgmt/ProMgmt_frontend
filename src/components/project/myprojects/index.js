import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../../lib/util.js';
import ProjectPreview from '../projectpreview';
import ProjectForm from '../projectform';
import * as orgActions from '../../../action/org-actions.js';
import * as projectActions from '../../../action/project-actions.js';

import './_myprojects.scss';

class MyProjects extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.userOrgSet();
  }

  render() {
    let allProjects = this.props.projects;
    let allProjectsArray = [];
    for (let key in allProjects) {
      for (let i in allProjects[key]) {
        allProjectsArray.push(allProjects[key][i]);
      }
    }

    return(
      <div className='my-projects' style={{margin: '50px 50px 50px 50px', padding: '3.5vw', backgroundColor: 'rgba(255, 255, 255, .5)', padding: '30px 30px'}}>
        <h1 style={{margin: '0px 0px 20px 0px'}}>My Projects</h1>
        {allProjectsArray.length !== 0 ?
          allProjectsArray.map(_project => 
            <ProjectPreview project={_project} key={_project._id} delete={this.props.projectDeleteRequest} update={this.props.projectUpdateRequest} />
          )
          :
          <p>You currently have no projects! Navigate to the Dashboard to add a project to a specific organization.</p>
        }
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