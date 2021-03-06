import superagent from 'superagent';

export const taskCreate = task => ({
  type: 'TASK_CREATE',
  payload: task,
})

export const taskUpdate = task => ({
  type: 'TASK_UPDATE',
  payload: task,
})

export const taskDelete = task => ({
  type: 'TASK_DELETE',
  payload: task,
})

export const taskCreateRequest = task => (dispatch, getState) => {
  let {auth} = getState();
  for(let key in task){
    if(!task[key]){
      delete task[key];
    }
  }

  return superagent.post(`${__API_URL__}/api/project/${task.projectId}/task`)
    .set('Authorization', `Bearer ${auth}`)
    .send(task)
    .then(res => {
      dispatch(taskCreate(res.body));
      return res;
    })
}

export const taskUpdateRequest = task => (dispatch, getState) => {
  let {auth} = getState();

  for(let key in task){
    if(!task[key]){
      delete task[key];
    }
  }

  return superagent.put(`${__API_URL__}/api/task/${task._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .send(task)
    .then(res => {
      dispatch(taskUpdate(res.body));
      return res;
    })
}

export const taskDeleteRequest = task => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/api/task/${task._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(taskDelete(task));
      return res;
    })
}