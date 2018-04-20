import React from 'react';
import { connect } from 'react-redux';
import ProjectForm from '../projectform';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';
import Create from 'material-ui/svg-icons/content/create';

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
    let {project} = this.props;
    let updateButtonText;
    this.state.editing ? updateButtonText = 'Hide' : updateButtonText = 'Update';
    let isAdmin = false;
    project.admins.forEach(adminObj => {
      if(this.props.user._id === adminObj._id || this.props.user._id === adminObj) isAdmin = true;
    })


    return (
      <div className='project-previews' >
        <Card key={this.props.key}>
          <CardHeader
            title={project.projectName}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
        
          {/* TODO: hyperlink this to the ProjectItem page */}
          <p>{project.desc}</p>
          <FlatButton onClick={() => { this.props.delete(project) }} icon={<Clear />}/> <FlatButton onClick={() => {this.toggleEdit()}} icon={<Create />}/>
          {this.state.editing ? 
            <ProjectForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} project={project} />

            :
            null
          }
          </CardText>
        </Card>
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