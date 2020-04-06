import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import './index.css';
import App from './App';

const rootEL = document.getElementById('root');

render(
  <Router>
    <App />
  </Router>,
  rootEL
);
