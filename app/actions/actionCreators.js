var axios = require('axios');

import { AGO_URL, AGO_RiverBasins, AGO_CatalogingUnits, AGO_HUCS } from '../constants/actionConstants';
import { CheckReponse } from './responses';
import * as MenuLists from './actionMenuLists';
import * as ChartData from './actionChartData';
import * as CurrentID from './actionCurrentID';
import * as GeographyLevels from './actionGeographyLevels';
import * as MapConfig from './actionMap';
import * as ActionDefault from './actionDefault';

export const get_MenuList = MenuLists.get_MenuList;
export const get_GeographyLevels = GeographyLevels.get_GeographyLevels;
export const change_geographyLevelActive = GeographyLevels.change_geographyLevelActive;
export const change_geographyLevelFilter = GeographyLevels.change_geographyLevelFilter;
export const update_ChartVisiblity = ChartData.update_ChartVisiblity
export const get_ChartData = ChartData.get_ChartData
export const set_CurrentID = CurrentID.set_CurrentID;
export const get_defaultMapData = MapConfig.get_defaultMapData;
export const HandleMapEnd = MapConfig.HandleMapEnd;
export const set_mapToPoint = MapConfig.set_mapToPoint;
export const set_defaults = ActionDefault.set_defaults;
export const update_ChartHeight = ActionDefault.update_ChartHeight;
export const update_MapHeight = ActionDefault.update_MapHeight;
