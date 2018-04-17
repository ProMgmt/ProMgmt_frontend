import superagent from 'superagent';

export const userOrgEtAllSet = orgs => ({
  type: 'USER_ORG_ET_ALL_SET',
  payload: orgs
});

export const orgCreate = org => ({
  type: 'ORG_CREATE',
  payload: org,
});

export const orgDelete = org => ({
  type: 'ORG_DELETE',
  payload: org,
})

export const orgUpdate = org => ({
  type: 'ORG_UPDATE',
  payload: org,
})

export const userOrgEtAllSetRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/api/org/user/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(userOrgEtAllSet(res.body));
      return res;
    })
}

export const orgCreateRequest = org => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/api/org`)
    .set('Authorization', `Bearer ${auth}`)
    // need to pull in auth???
    .send(org)
    .then(res => {
      dispatch(orgCreate(res.body));
      return res;
    })
}

export const orgUpdateRequest = org => (dispatch, getState) => {
  let {auth} = getState();

  for (let key in org) {
    if (!org[key]) {
      delete org[key];
    }
  }

  let id = org._id;
  return superagent.put(`${__API_URL__}/api/org/${id}`)
    .set('Authorization', `Bearer ${auth}`)
    .send(org)
    .then(res => {
      dispatch(orgUpdate(res.body));
      return res;
    })
}

export const orgDeleteRequest = org => (dispatch, getState) => {
  let {auth} = getState();
  let id = org._id;
  console.log('ORG IN ORG DELETE REQUEST', org);

  return superagent.delete(`${__API_URL__}/api/org/${id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(orgDelete(org));
      return res;
    })
}