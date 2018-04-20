import React from 'react';
import { connect } from 'react-redux';
import { orgUpdateRequest, orgDeleteRequest } from '../../../action/org-actions.js';
import { projectCreateRequest } from '../../../action/project-actions.js';
import OrgForm from '../orgform';
import ProjectForm from '../../project/projectform';
import ProjectItem from '../../project/projectitem';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Clear from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';

class OrgItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editOrg: false,
      addProject: false,
    }

    this.toggleEditOrg = this.toggleEditOrg.bind(this);
    this.toggleAddProject = this.toggleAddProject.bind(this);
  }

  toggleEditOrg() {
    this.setState(state => {
      return { ...state, editOrg: !state.editOrg }
    });
  }

  toggleAddProject() {
    this.setState(state => {
      return { ...state, addProject: !state.addProject }
    });
  }

  render() {
    let orgButtonText;
    this.state.editOrg ? orgButtonText = 'Hide' : orgButtonText = 'Edit';
    let projectButtonText;
    this.state.addProject ? projectButtonText = 'Hide' : projectButtonText = 'Add a Project';

    let { org, orgDelete, orgUpdate, projectCreate } = this.props;
    return (
      <section className='org-item'>
        <Card className='content'>
          <CardHeader
            title={org.name}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>{org.desc}

            {this.state.addProject ?
              <div className='proj-form'>
                <ProjectForm
                  buttonText='Save Project'
                  org={org}
                  onComplete={projectCreate}
                  canToggle={true}
                  toggle={this.toggleAddProject}
                />
              </div>
              :
              null
            }

            {this.props.project.length !== 0 ?
              <h3>{`Projects belonging to ${this.props.org.name}`}:</h3>
              :
              <p>This org currently has no projects.</p>
            }
            <FlatButton onClick={this.toggleAddProject}>{projectButtonText}</FlatButton>

            {this.props.project[this.props.org._id].map(item =>
              <ProjectItem
                key={item._id}
                org={org}
                project={item}
              />)}

          </CardText>
          <FlatButton
            onClick={() => orgDelete(org)}
            icon={<Clear />}
          />
          {this.state.editOrg ?
            <div className='edit'>
              <OrgForm
                key={org._id}
                buttonText='Update Org'
                org={org}
                onComplete={orgUpdate}
                canToggle={true}
                toggle={this.toggleEditOrg}
              />
            </div>
            :
            null
          }
          <FlatButton onClick={this.toggleEditOrg}>{orgButtonText}</FlatButton>
        </Card>

      </section>
    )
  }
}

const mapStateToProps = state => ({
  project: state.project,
});

const mapDispatchToProps = dispatch => ({
  orgUpdate: org => dispatch(orgUpdateRequest(org)),
  orgDelete: org => dispatch(orgDeleteRequest(org)),
  projectCreate: project => dispatch(projectCreateRequest(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgItem);