'use strict';

import reducer from '../reducer';
import thunk from './redux-thunk';
import reporter from './redux-reporter';
import { createStore, applyMiddleware } from 'redux';


const prod = process.env.NODE_ENV === 'production';

const middleware = prod 
? applyMiddleware(thunk)
: applyMiddleware(thunk, reporter);



const appCreateStore = () => (
  createStore(reducer, middleware)
)

export default appCreateStore;