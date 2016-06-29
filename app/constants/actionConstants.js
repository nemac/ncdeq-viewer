//  eventually move this to YAML config file, so anyone can change location

//ArcGIS online feature layer id's - each layer in a feautre services has an unique id
// these refer to those.  put into a const so it can be figured for different sites
export const Basin_FeatureID = 0;
export const CatalogingUnit_FeatureID = 1;
export const HUC12_FeatureID = 2;
export const DATA_FEATUREID = 3;
export const HUCNames_FeatureID = 4;

//encoding constants to use in ArcGIS online api calls
export const ENCODED_COMMAS = '%2C'

//out fields for menu lists
const MENU_OUT_FIELDS = 'id,NAME,VALUE,MAIN,SUB';


//ArcGIS Online base URl
export const AGO_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'

//URL or Getting RiverBasins
export const AGO_RiverBasins = '/RDRBP/FeatureServer/' + Basin_FeatureID +
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

export const AGO_CatalogingUnits = '/RDRBP/FeatureServer/' + CatalogingUnit_FeatureID +
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

export const AGO_HUCS = '/RDRBP/FeatureServer/' + HUC12_FeatureID +
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
