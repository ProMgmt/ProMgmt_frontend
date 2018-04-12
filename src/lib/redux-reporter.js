'use strict';

const reporter = store => next => action => {
  console.log('__ACTION IN REDUX REPORTER__', action);
  try {
    let result = next(action);
    console.log('__STATE IN REDUX REPORTER__', store.getState());
    return result;
  } catch (err) {
    err.action = action;
    console.error('__ERROR__', err);
    return err;
  }
}

export default reporter;