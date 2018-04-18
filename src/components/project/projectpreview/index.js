import React from 'react';
import ProjectForm from '../projectform';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';

class ProjectPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.projects ?
      {...props.projects, editing: false } :
      {
        _id: undefined,
        name: '',
        desc: '',
        editing: false,
      }

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState(state => {
      return { editing: !state.editing }
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.projects) {
      this.setState(this.props.projects);
    }
  }

  render() {
    let allProjects = this.props.projects;
    let allProjectsArray = [];
    for(let key in allProjects) {
      for(let i in allProjects[key]) {
        allProjectsArray.push(allProjects[key][i]);
      }
    }

    return (
      <div className='project-previews'>
        {allProjectsArray.length !== 0 ?
          allProjectsArray.map(_project => 
            <Card key={_project._id}>
              <CardHeader
                title={_project.projectName}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText>
                {/* TODO: hyperlink this to the ProjectItem page */}
                <p>{_project.desc}</p>
                <FlatButton 
                  onClick={() => { this.props.delete(_project) }}
                  icon={<Clear />}
                />
                <ProjectForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} project={_project} />
              </CardText>
              
            </Card>
          )
          :
          <p>You currently have no projects! Navigate to your MyOrgs page to add a project to a specific organization.</p>
        }      
      </div>
    )
  }
}

export default ProjectPreview;