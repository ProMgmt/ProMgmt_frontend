export default (state=[], action) => {
  let {type, payload} = action;
  switch(type){
    case 'USER_ORG_ET_ALL_SET':
      let newProjects = payload.reduce((acc, org) => {
        acc.push(org.projects);
        return acc;
      }, []);
      console.log('newProjects', newProjects);
      let newTasks = newProjects.reduce((acc, proj) => {
        acc[proj[0]._id] = proj[0].tasks;
        return acc;
      },{});
      console.log('newTasks', newTasks);
      return newTasks;
    case 'PROJECT_CREATE':
      return {...state, [payload._id]: []};
    case 'PROJECT_DELETE':
      delete state[payload._id];
      return {...state};
    case 'TASK_CREATE':
      let projTasks = [...state[payload.projId], payload];
      return {...state, [payload.projId]: [...projTasks]};
    case 'TASK_UPDATE':
      let projTaskUpdate = state[payload.projId].map(task => task._id === payload._id ? payload : task);
      return {...state, [payload.projId]: [...projTaskUpdate]};
    case 'TASK_DELETE':
      let projTaskDelete = state[payload.projId].filter(task => task._id !== payload._id);
      return {...state, [payload.projId]: [...projTaskDelete]};
    default:
      return state;
  }
}