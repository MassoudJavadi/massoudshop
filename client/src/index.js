//1500 Line of code untill 7/10
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Redux Stuff
import {Provider} from 'react-redux'
import store from './store' 

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
