'use strict';

import call from 'superagent';

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
  .then( res => {
    console.log('RES.TEXT IN AUTH ACTIONS', JSON.parse(res.text));
    let resObj = JSON.parse(res.text);
    delete resObj.user.findHash;
    delete resObj.user.password;
    dispatch(userSet(resObj.user));
    dispatch(tokenSet(resObj.token));
    return;
  })
}