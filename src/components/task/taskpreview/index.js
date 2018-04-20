'use strict';

import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../taskform';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Create from 'material-ui/svg-icons/content/create';
import Clear from 'material-ui/svg-icons/content/clear';

class TaskPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.task ?
      {...props.task, editing: false } :
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
    if (this.props.task) {
      this.setState(this.props.task);
    }
  }

  render() {
    let updateButtonText;
    this.state.editing ? updateButtonText = 'Hide' : updateButtonText = 'Update';
    
    let {task} = this.props;
    let isAdmin = false;
    task.admins.forEach(adminObj => {
      if(this.props.user._id === adminObj._id || this.props.user._id === adminObj) isAdmin = true;
    })

    return (

      <div className='task-previews' >
        <Card key={task._id}>
          <CardHeader
            title={task.desc}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>

            
            
            <p>{task.desc}</p>
            <p>{task.startDate}</p>
            <FlatButton onClick={() => { this.props.delete(task) }} icon={<Clear />}/> <FlatButton onClick={() => {this.toggleEdit()}} icon={<Create />}/>
            {this.state.editing ?
              <TaskForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} task={task} />
              : null
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

export default connect(mapStateToProps, null)(TaskPreview);