var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var MainContainer = require('../containers/MainContainer');
import { Provider } from 'react-redux';
import store from '../stores/RBRPStore';

var routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={MainContainer}>
      </Route>
    </Router>
  </Provider>
);

module.exports = routes;
