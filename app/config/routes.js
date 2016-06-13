import React from 'react';
import App from '../components/App';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import store, {history} from '../stores/RBRPStore';

var routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>
);

module.exports = routes;
