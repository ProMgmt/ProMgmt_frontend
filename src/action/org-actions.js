import superagent from 'superagent';

export const userOrgEtAllSet = orgs => ({
  type: 'USER_ORG_ET_ALL_SET',
  payload: orgs
});

export const userOrgEtAllSetRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/api/org/user/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(userOrgEtAllSet(res.body));
      return res;
    })
}