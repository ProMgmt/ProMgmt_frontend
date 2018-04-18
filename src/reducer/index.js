import {combineReducers} from 'redux';
import auth from './auth.js';
import orgs from './orgs.js';
import user from './user.js';
import profile from './profile.js';
import project from './project.js';
import task from './task.js';

export default combineReducers({auth, orgs, profile, project, task, user});
