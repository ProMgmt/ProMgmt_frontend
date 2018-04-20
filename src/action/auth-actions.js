'use strict';

import superagent from 'superagent';
import {profileSet, profileSetRequest} from './profile-actions.js';
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
  return superagent.post(`${__API_URL__}/api/signup`)
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
  return superagent.get(`${__API_URL__}/api/signin`)
    .withCredentials(true)
    .auth(user.username, user.password)
    .then(({ body: {token, profileId, userId: _id} }) => {
      dispatch(tokenSet(token));
      dispatch(userSet({_id, profileId}));
      if(!!profileId) {
        console.log(':::profileId', profileId);
        dispatch(profileSetRequest(profileId));
      }
      dispatch(userOrgEtAllSetRequest());
      return {token, profileId};
  })
}

export const userSetRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/api/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      console.log(res);
      dispatch(userSet(res.body));
      return res;
    })
}