import superagent from 'superagent';

export const userTasks = tasks => ({
  type: 'USER_TASKS',
  paload: tasks,
})

export const userTaskCreate = task => ({
  type: 'USER_TASK_CREATE',
  payload: task,
})

export const userTaskUpdate = task => ({
  type: 'USER_TASK_UPDATE',
  payload: task,
})

export const userTaskDelete = task => ({
  type: 'USER_TASK_DELETE',
  payload: task,
})

export const userTasksFetchRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/api/task/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(userTasks(res.body));
      return res;
    })
}

export const userTaskCreateRequest = (projId, task) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/api/project/${projId}/task`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(userTaskCreate(task));
      return res;
    })
}

export const userTaskUpdateRequest = task => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.put(`${__API_URL__}/api/task/${task._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .send(task)
    .then(res => {
      dispatch(userTaskUpdate(res.body));
      return res;
    })
}

export const userTaskDeleteRequest = task => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/api/task/${task._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(userTaskDelete(task));
      return res;
    })
}