import React from 'react';
import {connect} from 'react-redux';
import {orgUpdateRequest, orgDeleteRequest} from '../../../action/org-actions.js';
import {projectCreateRequest} from '../../../action/project-actions.js';
import OrgForm from '../orgform';
import ProjectForm from '../../project/projectform';
import ProjectItem from '../../project/projectitem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class OrgItem extends React.Component{
  render(){
    let {org, orgDelete, orgUpdate, projectCreate} = this.props;
    return(
      <section className='org-item'>
        <Card className='content'>
          <CardHeader
            title={org.name}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>{org.desc}</CardText>
          <button onClick={() => orgDelete(org)}>X</button>
        </Card>
        <div className='edit'>
          <OrgForm
            key={org._id}
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
  project: state.project,
});

const mapDispatchToProps = dispatch => ({
  orgUpdate: org => dispatch(orgUpdateRequest(org)),
  orgDelete: org => dispatch(orgDeleteRequest(org)),
  projectCreate: project => dispatch(projectCreateRequest(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgItem);