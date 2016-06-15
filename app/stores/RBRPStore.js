import {createStore, applyMiddleware, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

// import the root reducer
import rootReducer from '../reducers/index';

import listData from '../utils/data';
// create an object for the default data
const defaultState = {};

const store = createStore(rootReducer,defaultState);

export const history = syncHistoryWithStore(browserHistory,store);

if(module.hot) {
  module.hot.accept('../reducers/',() => {
    const nextRootReducer = require('../reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
