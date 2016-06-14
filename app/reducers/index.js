import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

import AGOHelpers from '../utils/ago-helpers';


function listData(state = [], action) {
  //console.log("The post will change");
  //console.log(state, action);
  return state;
}

const rootReducer = combineReducers( { listData, routing: routerReducer} );

export default rootReducer;
