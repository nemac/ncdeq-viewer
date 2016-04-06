var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var MainContainer = require('../containers/MainContainer');

var routes = (
<Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
    </Route>
  </Router>
);

module.exports = routes;
