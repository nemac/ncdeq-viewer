import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
//import visibilityFilter from './visibilityFilter'


function listData(state = [], action) {
  // console.log('reducer list:')
  // console.log(action.lists)
  switch (action.type) {
    case 'GET_LIST':
      return { ...state, lists: action.lists}
      //return Object.assign({}, state, action.lists)
      //return action
      //console.log(action.lists);
      //return action.lists
      // console.log('listdata reducer: ' + action.type);
      // console.log(action.posts);
      //console.log(action.lists);
      //console.log(state)
    default:
      return state
  }
  return state;
}

//const rootReducer = combineReducers( { listData, visibilityFilter, routing: routerReducer} );
const rootReducer = combineReducers( { listData, routing: routerReducer} );

export default rootReducer;
