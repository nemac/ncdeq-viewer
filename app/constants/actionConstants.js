var axios = require('axios');

import {  get_constant } from '../utils/helpers';

//ArcGIS online feature layer id's - each layer in a feautre services has an unique id
// these refer to those.  put into a const so it can be figured for different sites
//ArcGIS Online base URl
//get title from constant.json file read in from index.html file
export const AGO_URL = get_constant('AGO_URL')
export const FEATURE_SERVICE_NAME = get_constant('FEATURE_SERVICE_NAME')
export const TITLE = get_constant('TITLE')

//feature layers
export const TRA_FEATUREID = get_constant('TRA_FEATUREID')
export const HUC12_MAP_FEATUREID = get_constant('HUC12_MAP_FEATUREID')
export const CATALOGING_MAP_FEATUREID = get_constant('CATALOGING_MAP_FEATUREID')
export const BASIN_MAP_FEATUREID = get_constant('BASIN_MAP_FEATUREID')
export const NLCD_CATCHMENT_FEATUREID = get_constant('NLCD_CATCHMENT_FEATUREID')
export const NCDEQ_NORMALIZED_FEATUREID = get_constant('NCDEQ_NORMALIZED_FEATUREID')
export const HUC_NAMES_FEATUREID = get_constant('HUC_NAMES_FEATUREID')
export const TRA_XWALK = get_constant('TRA_XWALK')

//tile layers
export const IMAGERY_BASEMAP = get_constant('imagery')
export const BASE_MAP_LABELS = get_constant('base map labels')
export const BASE_MAP = get_constant('base map')
export const CATCHMENTS_BASE_MAP = get_constant('Catchments Base Map')
export const HUC12_BASE_MAP = get_constant('HUC 12 Base Map')
export const HUC8_BASE_MAP = get_constant('Cataloging Units Base Map')
export const HUC6_BASE_MAP = get_constant('River Basins Base Map')
export const TRA_BASE_MAP = get_constant('Targeted Resource Areas (TRA) Base Map')


//set base URL for axios
axios.defaults.baseURL = AGO_URL;

//encoding constants to use in ArcGIS online api calls
export const ENCODED_COMMAS = '%2C'

//out fields for menu lists
const MENU_OUT_FIELDS = 'id,NAME,VALUE,MAIN,SUB';

//URL or Getting RiverBasins
export const AGO_RIVER_BASINS = '/' + FEATURE_SERVICE_NAME + '/FeatureServer/' + BASIN_MAP_FEATUREID +
                               '/query?where=id%3C%3E%27%27' +
                               '&objectIds='+
                               '&time='+
                               '&geometry='+
                               '&geometryType=esriGeometryEnvelope&inSR='+
                               '&spatialRel=esriSpatialRelIntersects'+
                               '&resultType=none'+
                               '&distance=&units=esriSRUnit_Meter'+
                               '&outFields='+ MENU_OUT_FIELDS +
                               '&returnGeometry=false'+
                               '&returnCentroid=false'+
                               '&multipatchOption=xyFootprint' +
                               '&maxAllowableOffset='+
                               '&geometryPrecision='+
                               '&outSR='+
                               '&returnIdsOnly=false'+
                               '&returnCountOnly=false'+
                               '&returnExtentOnly=false'+
                               '&returnDistinctValues=true'+
                               '&orderByFields='+
                               '&groupByFieldsForStatistics='+
                               '&outStatistics=&resultOffset='+
                               '&resultRecordCount='+
                               '&returnZ=false&returnM=false'+
                               '&quantizationParameters='+
                               '&f=pgeojson'+
                               '&token='

export const AGO_CATALOGING_UNITS = '/' + FEATURE_SERVICE_NAME + '/FeatureServer/' + CATALOGING_MAP_FEATUREID +
                              '/query?where=id%3C%3E%27%27'+
                              '&objectIds='+
                              '&time='+
                              '&geometry='+
                              '&geometryType=esriGeometryEnvelope'+
                              '&inSR=&spatialRel=esriSpatialRelIntersects'+
                              '&resultType=none'+
                              '&distance='+
                              '&units=esriSRUnit_Meter'+
                              '&outFields='+ MENU_OUT_FIELDS +
                              '&returnGeometry=false'+
                              '&returnCentroid=false'+
                              '&multipatchOption=xyFootprint' +
                              '&maxAllowableOffset='+
                              '&geometryPrecision='+
                              '&outSR='+
                              '&returnIdsOnly=false'+
                              '&returnCountOnly=false'+
                              '&returnExtentOnly=false'+
                              '&returnDistinctValues=true'+
                              '&orderByFields='+
                              '&groupByFieldsForStatistics='+
                              '&outStatistics='+
                              '&resultOffset='+
                              '&resultRecordCount='+
                              '&returnZ=false'+
                              '&returnM=false'+
                              '&quantizationParameters='+
                              '&f=pgeojson'+
                              '&token='

export const AGO_HUCS = '/' + FEATURE_SERVICE_NAME + '/FeatureServer/' + HUC12_MAP_FEATUREID +
                              '/query?where=id%3C%3E%27%27'+
                              '&objectIds='+
                              '&time='+
                              '&geometry='+
                              '&geometryType=esriGeometryEnvelope&inSR='+
                              '&spatialRel=esriSpatialRelIntersects'+
                              '&resultType=none'+
                              '&distance='+
                              '&units=esriSRUnit_Meter'+
                              '&outFields='+ MENU_OUT_FIELDS +
                              '&returnGeometry=false'+
                              '&returnCentroid=false'+
                              '&multipatchOption=xyFootprint' +
                              '&maxAllowableOffset='+
                              '&geometryPrecision='+
                              '&outSR=&returnIdsOnly=false'+
                              '&returnCountOnly=false'+
                              '&returnExtentOnly=false'+
                              '&returnDistinctValues=true'+
                              '&orderByFields='+
                              '&groupByFieldsForStatistics='+
                              '&outStatistics='+
                              '&resultOffset='+
                              '&resultRecordCount='+
                              '&returnZ=false&returnM=false'+
                              '&quantizationParameters='+
                              '&f=pgeojson'+
                              '&token='
