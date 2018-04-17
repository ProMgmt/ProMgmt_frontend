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

    this.state = {
      editing: false,
    }

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    this.props.userOrgSet();
  }

  toggleEdit() {
    this.setState(state => {
      return {add: !state.add};
    })
  }

  render() {
    console.log('THIS.PROPS.PROJECTS', this.props.projects);
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
    projects: state.project
  }
}

const mapDispatchToProps = dispatch => ({
  userOrgSet: () => dispatch(orgActions.userOrgEtAllSetRequest()),
  projectUpdateRequest: () => dispatch(projectActions.projectUpdateRequest()),
  projectCreateRequest: () => dispatch(projectActions.projectCreateRequest()),
  projectDeleteRequest: () => dispatch(projectActions.projectDelete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);