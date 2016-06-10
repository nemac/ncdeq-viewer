import { combineReducers } from 'redux';

//import { chartVisibility } from '../actions/actions';

const testdata = 'test'
function test() {
  return {testdata}
}

const rootReducer = combineReducers( {test} );

export default rootReducer;
