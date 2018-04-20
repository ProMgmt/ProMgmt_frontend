'use strict';

export default (state=null, action) => {
  
  let { type, payload } = action;

  switch(type) {
    case 'USER_SET':
      return payload;
    case 'USER_UPDATE':
      return {...state, profileId: payload};
    default: 
      return state;
  }
}