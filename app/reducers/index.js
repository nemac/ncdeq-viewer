import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
import visibilityFilter from './visibilityFilter'

import AGOHelpers from '../utils/ago-helpers';


function listData(state = [], action) {
  //console.log("The post will change");
  //console.log(state, action);
  return state;
}

const rootReducer = combineReducers( { listData, visibilityFilter, routing: routerReducer} );

export default rootReducer;
