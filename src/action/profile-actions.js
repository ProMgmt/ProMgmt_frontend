'use strict';

import superagent from 'superagent';
import {userUpdate} from './auth-actions.js';

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile,
})

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
})

export const profileDelete = (profile) => ({
  type: 'PROFILE_DELETE',
  payload: profile, 
})

export const profileSet = (profile) => ({
  type: 'PROFILE_SET',
  payload: profile,
})

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  let { auth } = getState();
  console.log('profile sent to request', profile);
  let userId = profile.userId;
  return superagent.post(`${__API_URL__}/api/user/${userId}/profile`)
    .set('Authorization', `Bearer ${auth}`)
    .send(profile)
    .then( res => {
      dispatch(profileCreate(res.body));
      dispatch(userUpdate(res.body._id));
      return res;
    })
    .then( res => {
      res.body.auth = auth;
      return updateUserProfile(res.body);
    });
}

export const profileSetRequest = (req) => (dispatch, getState) => {
  let {auth} = getState();

  return superagent.get(`${__API_URL__}/api/profile/${req}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(profileSet(res.body));
      return res;
    })
}

export const profileUpdateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState();

  return superagent.put(`${__API_URL__}/api/profile/${profile._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .send(profile)
    .then(res => {
      dispatch(profileUpdate(res.body));
      return res;
    })
}

const updateUserProfile = (profile) => {
  let {userId} = profile;
  let profileId = profile._id;
  
  return superagent.put(`${__API_URL__}/api/user/${userId}/${profileId}`)
    .set('Authorization', `Bearer ${profile.auth}`)
    .send(profile)
    .then( res => {
      console.log('RES in profile actions', res);
      return res;
    })
}
