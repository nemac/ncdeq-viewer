import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
import visibilityFilter from './visibilityFilter'


function listData(state = [], action) {
  //console.log("The post will change");
  //console.log(state, action);
  switch (action.type) {
    case 'GET_LIST':
      // console.log('listdata reducer: ' + action.type);
      // console.log(action.posts);
      // console.log(action.receivedAt);
      //console.log(state)
    default:
      return state
  }
  return state;
}

const rootReducer = combineReducers( { listData, visibilityFilter, routing: routerReducer} );

export default rootReducer;
