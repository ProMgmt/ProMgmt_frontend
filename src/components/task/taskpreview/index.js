'use strict';

import React from 'react';
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
    let _task = this.props.task;
    let updateButtonText;
    this.state.editing ? updateButtonText = 'Hide' : updateButtonText = 'Update';
    console.log('TASK ITEM', _task);
    return (
      <div className='task-previews' key={_task._id}>
        <h3>{_task.taskName}</h3>
        {/* TODO: hyperlink this to the TaskItem page */}
        <p>{_task.desc}</p>
        <button onClick={() => { this.props.delete(_task) }}>x</button> <button onClick={() => {this.toggleEdit()}}>{updateButtonText}</button>
        {this.state.editing ?
          <TaskForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} task={_task} />
          : null
        }
      </div>
    )
  }
}

export default TaskPreview;