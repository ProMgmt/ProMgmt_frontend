import React from 'react';
import { connect } from 'react-redux';
import ProjectForm from '../projectform';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';

class ProjectPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.project ?
      { ...props.project, editing: false } :
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
    if (this.props.project) {
      this.setState(this.props.project);
    }
  }

  render() {
    let project = this.props.project;
    let updateButtonText;
    this.state.editing ? updateButtonText = 'Hide' : updateButtonText = 'Update';
    let isAdmin = false;
    project.admins.forEach(adminObj => {
      if(this.props.user._id === adminObj._id || this.props.user._id === adminObj) isAdmin = true;
    })


    return (
      <div className='project-previews' key={project._id}>
        <h3>{project.projectName}</h3>
        {/* TODO: hyperlink this to the ProjectItem page */}
        <p>{project.desc}</p>
        <button onClick={() => { this.props.delete(project) }}>x</button> <button onClick={() => {this.toggleEdit()}}>{updateButtonText}</button>
        {this.state.editing ? 
          <ProjectForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} project={project} />

          :
          null
        }
      </div>
    )
  }
}


export const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(ProjectPreview);