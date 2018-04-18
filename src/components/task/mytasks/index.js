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
    return (
      <div className='my-tasks'>
        <h1>My Tasks</h1>
        <TaskPreview tasks ={this.props.tasks} delete={this.props.taskDeleteRequest} update={this.props.taskUpdateRequest} />

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