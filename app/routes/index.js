import React from 'react';
import App from '../containers/App';
import MainComponent from '../components/MainComponent';
import ResourcesContainer from '../containers/ResourcesContainer';
import ResourcesComponent from '../components/ResourcesComponent';

import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import { Provider } from 'react-redux';
import store, {history} from '../stores/RBRPStore';

//removed for gh-pages adds extra # hash to url. need to understand how to do this on gh-pages..
//    <Router history={history}>

var routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={MainComponent} />
      </Route>
      <Route path='/Resources' component={ResourcesContainer}>
        <IndexRoute component={ResourcesComponent} />
      </Route>
    </Router>
  </Provider>
);

module.exports = routes;
