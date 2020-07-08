import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const PATH_PREFIX = process.env.REACT_APP_PATH_PREFIX || "/";

ReactDOM.render(
  <React.StrictMode>
    <Router basename={PATH_PREFIX}>
      <Route component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
