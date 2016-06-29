import {createStore, applyMiddleware, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import thunkMiddleware from 'redux-thunk'

// import the root reducer
import rootReducer from '../reducers/index';

//create default store and apply middle ware so can talk to ArcGIS online api
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

//get history so we can this later
export const history = syncHistoryWithStore(browserHistory,store);

// add so we can do hot reloading of reducers and actions...
if(module.hot) {
  module.hot.accept('../reducers/',() => {
    const nextRootReducer = require('../reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
