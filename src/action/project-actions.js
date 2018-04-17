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

export const projectCreateRequest = project => (dispatch, getState) => {
  let {auth} = getState();
  console.log('project', project);
  return superagent.post(`${__API_URL__}/api/org/${project.orgId}/project`)
    .set('Authorization', `Bearer ${auth}`)
    .send(project)
    .then(res => {
      dispatch(projectCreate(res.body));
      return res;
    })
}

export const projectUpdateRequest = project => (dispatch, getState) => {
  let {auth} = getState();
  console.log('::::project:::::', project)
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