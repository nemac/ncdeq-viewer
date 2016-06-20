import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
import {menuLists} from './getMenuLists';
import {chartDataByID, AllChartDataByID} from './getChartData';
import {setCurrentID} from './setCurrentID';

//import visibilityFilter from './visibilityFilter'

//const rootReducer = combineReducers( { listData, visibilityFilter, routing: routerReducer} );
const rootReducer = combineReducers( { menuLists, chartDataByID, AllChartDataByID, setCurrentID,routing: routerReducer} );

export default rootReducer;
