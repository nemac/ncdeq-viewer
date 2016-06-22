import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
import {menuLists} from './getMenuLists';
import {chartDataByID, AllChartDataByID,chartData} from './ChartData';
import {CurrentID} from './setCurrentID';
import {geography_levels, change_geographyLevelActive} from './GeographyLevels';

const rootReducer = combineReducers( { menuLists, chartDataByID, AllChartDataByID, chartData,CurrentID, geography_levels, change_geographyLevelActive, routing: routerReducer} );

export default rootReducer;
