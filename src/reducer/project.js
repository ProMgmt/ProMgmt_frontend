export default (state=[], action) => {
  let {type, payload} = action;
  switch(type){
    case 'PROJECT_CREATE':
      return [payload, ...state];
    case 'PROJECT_UPDATE':
      return state.map(item => item._id === payload._id ? payload : item);
    case 'PROJECT_DELETE':
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
}