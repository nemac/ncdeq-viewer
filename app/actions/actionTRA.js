var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, DATA_FEATUREID , SERVICE_NAME} from '../constants/actionConstants';

//  general functions and  helpers.  reuse functions
import {  getAGOGeographyLabel, getCurrentLevel } from '../utils/helpers';

//set base URL for axios
axios.defaults.baseURL = AGO_URL;

//get cu huc 8/12 geom
  // get tra's that intersects
  // get tras data from normazlied and return as chart data
export function get_TRA_data(){

  const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + DATA_FEATUREID + '/query' ;

  const data = {
    resultType: 'none',
    outFields: '*',
    returnIdsOnly: false,
    returnCountOnly: false,
    returnDistinctValues: true,
    returnGeometry: true,
    geometryType: 'esriGeometryPolygon',
    spatialRel: 'esriSpatialRelIntersects',
    
    f: "json"
  }


  return axios.post(query_URL);

}
