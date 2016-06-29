var axios = require('axios');

//import actions and action contstants
import { AGO_URL, AGO_RIVER_BASINS, AGO_CATALOGING_UNITS, AGO_HUCS } from '../constants/actionConstants';
import { CheckReponse } from './responses';
import * as MenuLists from './actionMenuLists';
import * as ChartData from './actionChartData';
import * as GeographyLevels from './actionGeographyLevels';
import * as MapConfig from './actionMap';
import * as ActionDefault from './actionDefault';

//create a const for each action so it can be imported and connected components
export const get_MenuList = MenuLists.get_MenuList;
export const get_GeographyLevels = GeographyLevels.get_GeographyLevels;
export const change_geographyLevelActive = GeographyLevels.change_geographyLevelActive;
export const change_geographyLevelFilter = GeographyLevels.change_geographyLevelFilter;
export const update_ChartVisiblity = ChartData.update_ChartVisiblity
export const get_ChartData = ChartData.get_ChartData
export const get_defaultMapData = MapConfig.get_defaultMapData;
export const HandleMapEnd = MapConfig.HandleMapEnd;
export const set_mapToPoint = MapConfig.set_mapToPoint;
export const handleSearchChange = MapConfig.handleSearchChange;
export const set_defaults = ActionDefault.set_defaults;
export const update_ChartHeight = ActionDefault.update_ChartHeight;
export const update_MapHeight = ActionDefault.update_MapHeight;
