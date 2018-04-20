export default (state=[], action) => {
  
  let {type, payload} = action;

  switch(type){
    case 'USER_ORG_ET_ALL_SET':
      let newProjects = payload.reduce((acc, org) => {
        acc.push(org.projects);
        return acc;
      }, []);
      let newTasks = newProjects.reduce((acc, proj) => {
        proj.forEach(project => {
          acc[project._id] = project.tasks;
        })
        return acc;
      },{});
      return newTasks;

    case 'TOKEN_DELETE':
      return null;

    case 'PROJECT_CREATE':
      return {...state, [payload._id]: []};

    case 'PROJECT_DELETE':
      delete state[payload._id];
      return {...state};

    case 'TASK_CREATE':
      let projTasks = [...state[payload.projectId], payload];
      return {...state, [payload.projectId]: [...projTasks]};

    case 'TASK_UPDATE':
      let projTaskUpdate = state[payload.projectId].map(task => task._id === payload._id ? payload : task);
      return {...state, [payload.projectId]: [...projTaskUpdate]};

    case 'TASK_DELETE':
      let projTaskDelete = state[payload.projectId].filter(task => task._id !== payload._id);
      return {...state, [payload.projectId]: [...projTaskDelete]};

    case 'TASK_REMOVE_ADMIN':
      let projAdminRemove = state[payload.task.projectId].map(task => {
        if(task._id === payload.task._id){
          return task.admins.filter(admin => admin._id !== payload.removedUser._id);
        } else {
          return task;
        }
      });
      return {...state, [payload.task.projectId]: [projAdminRemove]};

    default:
      return state;
  }
}