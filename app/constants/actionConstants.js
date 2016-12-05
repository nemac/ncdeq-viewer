//  eventually move this to YAML config file, so anyone can change location

//ArcGIS online feature layer id's - each layer in a feautre services has an unique id
// these refer to those.  put into a const so it can be figured for different sites
// export const BASIN_FEATUREID = 0;
// export const CATALOGING_FEATUREID = 1;
// export const HUC12_FEATUREID = 2;
export const TRA_FEATUREID = 12;

export const HUC12_MAP_FEATUREID = 4;
export const CATALOGING_MAP_FEATUREID = 5;
export const BASIN_MAP_FEATUREID = 6;
export const TRA_MAP_FEATUREID = 3;
export const NLCD_MAP_FEATUREID = 8;

export const DATA_FEATUREID = 10;
export const HUC_NAMES_FEATUREID = 11;

//encoding constants to use in ArcGIS online api calls
export const ENCODED_COMMAS = '%2C'

//out fields for menu lists
const MENU_OUT_FIELDS = 'id,NAME,VALUE,MAIN,SUB';

export const SERVICE_NAME = "RDRBP_AGO5"
//ArcGIS Online base URl
export const AGO_URL = 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'

//URL or Getting RiverBasins
export const AGO_RIVER_BASINS = '/' + SERVICE_NAME + '/FeatureServer/' + BASIN_MAP_FEATUREID +
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
                               '&multipatchOption='+
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

export const AGO_CATALOGING_UNITS = '/' + SERVICE_NAME + '/FeatureServer/' + CATALOGING_MAP_FEATUREID +
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
                              '&multipatchOption='+
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

export const AGO_HUCS = '/' + SERVICE_NAME + '/FeatureServer/' + HUC12_MAP_FEATUREID +
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
                              '&multipatchOption='+
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
