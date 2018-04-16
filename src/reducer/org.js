export default (state=[], action) => {
  let {type, payload} = action;
  switch(type){
    case 'USER_ORG_ET_ALL_SET':
      return payload;
    case 'ORG_CREATE':
      return {...state, org: [...org, payload]};
    default:
      return state;
  }
}