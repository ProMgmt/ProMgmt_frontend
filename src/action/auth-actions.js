'use strict';

import call from 'superagent';
import {profileSet} from './profile-actions.js';
import {userOrgEtAllSetRequest} from './org-actions.js';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const tokenDelete = () => ({
  type: 'TOKEN_DELETE',
})

export const userSet = (user) => ({
  type: 'USER_SET',
  payload: user,
})

export const userUpdate = (profileId) => ({
  type: 'USER_UPDATE',
  payload: profileId,
})

export const signupRequest = (user) => (dispatch) => {
  return call.post(`${__API_URL__}/api/signup`)
  .withCredentials(true)
  .send(user)
  .then( res => {
    dispatch(tokenSet(res.text))
    
    try {
      localStorage.token = res.text;
    } catch(err) {
      console.error(err);
    }
    return res;
  })
}

export const signinRequest = (user) => (dispatch) => {
  return call.get(`${__API_URL__}/api/signin`)
    .withCredentials(true)
    .auth(user.username, user.password)
    .then(({ body: {token, profileId, userId: _id} }) => {
      console.log(token, profileId, _id);
      dispatch(tokenSet(token));
      dispatch(userSet({_id, profileId}));
      dispatch(userOrgEtAllSetRequest());
      if (profileId) {
        profileFetch(profileId);
      }
      return;
  })
}

const profileFetch = (id) => (dispatch, getState) => {
  let {auth} = getState();

  return call.get(`${__API_URL__}/api/profile/${id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(profileSet(res.body));
      return res;
    })
}