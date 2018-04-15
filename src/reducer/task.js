export default (state=[], action) => {
  let {type, payload} = action;
  switch(type){
    case 'USER_TASKS':
      return payload;
    case 'USER_TASK_CREATE':
      return [payload, ...state];
    case 'USER_TASK_UPDATE':
      return state.map(item => item._id === payload._id ? payload : item);
    case 'USER_TASK_DELETE':
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
}