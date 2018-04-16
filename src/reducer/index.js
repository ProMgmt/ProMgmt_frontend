import {combineReducers} from 'redux';
import auth from './auth.js';
import org from './org.js';
import profile from './profile.js';
import project from './project.js';
import task from './task.js';

export default combineReducers({auth, org, profile, project, task});
