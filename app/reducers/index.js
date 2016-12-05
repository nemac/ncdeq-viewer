import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import { getLists } from '../actions/actionCreators';

//import each reducers
import {menuLists, fetching_menu} from './getMenuLists';
import {chartDataByID, AllChartDataByID, chartData, fetching_chart, NLCDDATA, CATCHMENTDATA, active_function} from './ChartData';
import {geography_levels, change_geographyLevelActive, fetching_geo} from './GeographyLevels';
import {mapConfig, fetching_map, hoverInfo} from './MapConfig';
import {default_settings} from './DefaultSettings';
import {leafletMap} from './LeafetMap'
import {traData, fetching_tra} from './TraData'



//combie all reducers for importating into connect
const rootReducer = combineReducers( { menuLists, chartDataByID, AllChartDataByID, chartData, traData, geography_levels, change_geographyLevelActive, mapConfig, default_settings, leafletMap, routing: routerReducer, fetching_chart, fetching_map, fetching_tra, fetching_geo, fetching_menu, NLCDDATA, CATCHMENTDATA, hoverInfo, active_function} );

export default rootReducer;
