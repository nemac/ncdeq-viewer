import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
import {menuLists} from './getMenuLists';
import {chartDataByID, AllChartDataByID,chartData} from './ChartData';
import {geography_levels, change_geographyLevelActive} from './GeographyLevels';
import {mapConfig} from './MapConfig';
import {default_settings} from './DefaultSettings';
import {leafletMap} from './LeafetMap'

//combie all reducers for importating into connect
const rootReducer = combineReducers( { menuLists, chartDataByID, AllChartDataByID, chartData, geography_levels, change_geographyLevelActive, mapConfig, default_settings, leafletMap, routing: routerReducer} );

export default rootReducer;
