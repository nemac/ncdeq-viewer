import {createStore} from 'redux';

// import the root reducer
import rootReducer from '../reducers/index';

import AGOHelpers from '../utils/ago-helpers';




// create an object for the default data
const defaultState = {};

const store = createStore(rootReducer,defaultState);

if(module.hot) {
  module.hot.accept('../reducers/',() => {
    const nextRootReducer = require('../reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;

//default state
// const defaultState = {
//   test,
//   second
// }
//
//export default const store = createStore(defaultState);
