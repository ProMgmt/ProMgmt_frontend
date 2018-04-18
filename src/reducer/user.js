'use strict';

export default (state=null, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'USER_SET':
      return payload;
    default: 
      return state;
  }
}