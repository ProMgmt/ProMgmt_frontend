'use strict';

import React from 'react';
import TaskForm from '../taskform';

class TaskPreview extends React.Component {
  constructor(props) {
    this.state = props.tasks ?
      {...props.tasks, editing: false } :
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
    if (this.props.tasks) {
      this.setState(this.props.tasks);
    }
  }

  render() {
    let allTasks = this.props.tasks;
    let allTasksArray = [];
    for(let key in allTasks) {
      for(let i in allTasks[key]) {
        allTasksArray.push(allTasks[key][i]);
      }
    }

    return (
      <div className='task-previews'>
        {allTasksArray.length !== 0 ?
          allTasksArray.map(_task => 
            <div key={_task._id}>
              <h3>{_task.taskName}</h3>
              {/* TODO: hyperlink this to the TaskItem page */}
              <p>{_task.desc}</p>
              <button onClick={() => { this.props.delete(_task) }}>x</button>
              <TaskForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} task={_task} />
              }
            </div>
          )
          :
          <p>You currently have no tasks! Navigate to your MyOrgs page to add a task to a specific organization.</p>
        }      
      </div>
    )
  }
}

export default TaskPreview;