'use strict';

import {Provider} from 'react-redux';
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';
import appCreateStore from './lib/app-create-store';
import './style/main.scss';




let store = appCreateStore();
console.log(store); 

ReactDom.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));