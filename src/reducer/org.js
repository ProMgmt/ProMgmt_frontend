export default (state=[], action) => {
  let {type, payload} = action;
  switch(type){
    case 'USER_ORG_ET_ALL_SET':
      return payload;
    case 'ORG_CREATE':
      return [...state, payload];
    case 'ORG_UPDATE':
      return state.map(org => 
        org._id === payload._id ? payload : org);
    case 'ORG_DELETE':
      return state.filter(org => org._id !== payload._id)
    default:
      return state;
  }
}