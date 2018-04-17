import React from 'react';
import ProjectForm from '../projectform';

class ProjectPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.projects ?
      { ...props.projects, editing: false } :
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
          allProjectsArray.map(project => 
            <div key={project._id}>
              <h3>{project.projectName}</h3>
              {/* TODO: hyperlink this to the ProjectItem page */}
              <p>{project.desc}</p>
              <button onClick={() => { this.props.delete(project) }}>x</button>
              {this.state.editing ?
                <ProjectForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} project={project} />
                :
                <button onClick={() => this.toggleEdit()}>Update</button>
              }
            </div>
          )
        :
          <p>You currently have no projects! Navigate to your MyOrgs page to add a project to a specific organization.</p>
        }      
      </div>
    )
  }
}

export default ProjectPreview;