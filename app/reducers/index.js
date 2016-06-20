import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
import {menuLists} from './getMenuLists';
import {chartDataByID, AllChartDataByID} from './getChartData';
import {CurrentID} from './setCurrentID';
import {geogLevels} from './getGeographyLevels';

//import visibilityFilter from './visibilityFilter'

//const rootReducer = combineReducers( { listData, visibilityFilter, routing: routerReducer} );
const rootReducer = combineReducers( { menuLists, chartDataByID, AllChartDataByID, CurrentID, geogLevels, routing: routerReducer} );

export default rootReducer;
