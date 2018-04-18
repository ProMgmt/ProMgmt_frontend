'use strict';

import call from 'superagent';

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

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  let { auth } = getState();
  let userId = profile.userId;
  console.log('profile', profile);
  return call.post(`${__API_URL__}/api/user/${userId}/profile`)
  .set('Authorization', `Bearer ${auth}`)
  .field('desc', profile.desc)
  .attach('avatarURL', profile.avatarURL)
  .then( res => {
    dispatch(profileCreate(res.body));
    return res;
  })
}

export const profileFetch = profile => ({
  type: 'PROFILE_FETCH', 
  payload: profile
})