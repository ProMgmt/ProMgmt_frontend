'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as util from '../../../lib/util';
import TaskPreview from '../taskpreview';
import TaskForm from '../taskform';
import * as orgActions from '../../../action/org-actions';
import * as taskActions from '../../../action/task-actions';

class MyTasks extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.userOrgSet();
  }

  render() {
    let allTasks = this.props.tasks;
    let allTasksArray = [];
    for(let key in allTasks) {
      for(let i in allTasks[key]) {
        allTasksArray.push(allTasks[key][i]);
      }
    }

    console.log(':::allTasksArray:::', allTasksArray);

    return (
      <div className='my-tasks'>
        <h1>My Tasks</h1>
        {allTasksArray.length !== 0 ?
          allTasksArray.map(_task => 
            <TaskPreview task={_task} delete={this.props.taskDeleteRequest} update={this.props.taskUpdateRequest} />
          )
          :
          <p>You currently have no tasks! Navigate to your MyOrgs page to add a task to a specific organization.</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orgs: state.org, 
    tasks: state.task,
  }
}

const mapDispatchToProps = dispatch => ({
  userOrgSet: () => dispatch(orgActions.userOrgEtAllSetRequest()), 
  taskUpdateRequest: task => dispatch(taskActions.taskUpdateRequest(task)),
  taskCreateRequest: task => dispatch(taskActions.taskCreateRequest(task)),
  taskDeleteRequest: task => dispatch(taskActions.taskDeleteRequest(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);