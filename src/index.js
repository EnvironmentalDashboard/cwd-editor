import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const PATH_PREFIX = process.env.REACT_APP_PATH_PREFIX || "";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path={`${PATH_PREFIX}/messages`} component={App} />
      <Redirect from="*" to={`${PATH_PREFIX}/messages`} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
