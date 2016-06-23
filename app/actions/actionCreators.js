var axios = require('axios');

import { AGO_URL, AGO_RiverBasins, AGO_CatalogingUnits, AGO_HUCS } from './actionConstants';
import { CheckReponse } from './responses';
import * as MenuLists from './actionMenuLists';
import * as ChartData from './actionChartData';
import * as CurrentID from './actionCurrentID';
import * as GeographyLevels from './actionGeographyLevels';
import * as MapConfig from './actionMap';

export const get_MenuList = MenuLists.get_MenuList;
export const get_GeographyLevels = GeographyLevels.get_GeographyLevels;
export const change_geographyLevelActive = GeographyLevels.change_geographyLevelActive;
export const change_geographyLevelFilter = GeographyLevels.change_geographyLevelFilter;
export const update_ChartVisiblity = ChartData.update_ChartVisiblity
export const get_ChartData = ChartData.get_ChartData
export const set_CurrentID = CurrentID.set_CurrentID;
export const set_MapZoom = MapConfig.setMapZoom
