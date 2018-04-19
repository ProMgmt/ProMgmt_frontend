'use strict';

import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../taskform';

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

      <div className='task-previews' key={task._id}>
        <h3>{task.taskName}</h3>
        {/* TODO: hyperlink this to the TaskItem page */}
        <p>{task.desc}</p>
        <button onClick={() => { this.props.delete(task) }}>x</button> <button onClick={() => {this.toggleEdit()}}>{updateButtonText}</button>
        {this.state.editing ?
          <TaskForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} task={task} />
          : null
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

export default connect(mapStateToProps, null)(TaskPreview);