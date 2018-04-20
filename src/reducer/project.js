export default (state=[], action) => {

  let {type, payload} = action;

  switch(type){
    case 'USER_ORG_ET_ALL_SET':
      let newProjects = payload.reduce((acc, org) => {
        acc[org._id] = org.projects;
        return acc;
      }, {});
      return newProjects;

    case 'ORG_CREATE':
      return {...state, [payload._id]: []};
    case 'ORG_DELETE':

      delete state[payload._id];
      return {...state};

    case 'PROJECT_CREATE':
      let orgProject = [...state[payload.orgId], payload];
      return {...state, [payload.orgId]: [...orgProject]};

    case 'PROJECT_UPDATE':
      let orgProjectUpdate = state[payload.orgId].map(proj => proj._id === payload._id ? payload : proj);
      return {...state, [payload.orgId]: [...orgProjectUpdate]};

    case 'PROJECT_DELETE':
      let orgProjectDelete = state[payload.orgId].filter(proj => proj._id !== payload._id);
      return {...state, [payload.orgId]: [...orgProjectDelete]};
      
    default:
      return state;
  }
}