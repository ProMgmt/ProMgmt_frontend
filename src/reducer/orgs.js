export default (state=[], action) => {

  let {type, payload} = action;

  switch(type){
    case 'USER_ORG_ET_ALL_SET':
      return payload;

    case 'ORG_CREATE':
      return [...state, payload];

    case 'ORG_DELETE':
      return state.filter(item => item._id !== payload._id);

    case 'ORG_UPDATE':
      return state.map(item => item._id === payload._id ? payload : item);
      
    default:
      return state;
  }
}