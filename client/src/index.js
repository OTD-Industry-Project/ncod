/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Wed Nov 03 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import '@popperjs/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// All the magic happens here
ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
