import superagent from 'superagent';

export const projectCreate = project => ({
  type: 'PROJECT_CREATE',
  payload: project,
})

export const projectUpdate = project => ({
  type: 'PROJECT_UPDATE',
  payload: project,
})

export const projectDelete = project => ({
  type: 'PROJECT_DELETE',
  payload: project,
})

export const projectCreateRequest = (orgId, project) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/api/org/${orgjId}/project`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(projectCreate(project));
      return res;
    })
}

export const projectUpdateRequest = project => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.put(`${__API_URL__}/api/project/${project._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .send(project)
    .then(res => {
      dispatch(projectUpdate(res.body));
      return res;
    })
}

export const projectDeleteRequest = project => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/api/project/${project._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(projectDelete(project));
      return res;
    })
}