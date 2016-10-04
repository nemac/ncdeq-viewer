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

//get chart data for all
function ago_get_tra_id(hucid,current_geography_level){

   //set default id
   var id = hucid;

  //  //get the lower level in the huc heirachy
  //  var next_level = getNextLevel(current_geography_level);
  const level = current_geography_level.toUpperCase();


   //build the query to arcgis online api for getting the raw chart data
   const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + DATA_FEATUREID + '/query' +
                   '?where=ID+like+%27' + id + '%25%27+and+TYPE%3D'+ next_level + //'+and+chart_type%3D%27' + CHART_TYPE + '%27' +
                   '&objectIds=' +
                   '&time=' +
                   '&resultType=none' +
                   '&outFields=*' +
                   '&returnIdsOnly=false' +
                   '&returnCountOnly=false' +
                   '&returnDistinctValues=true' +
                   '&groupByFieldsForStatistics=' +
                   '&outStatistics=' +
                   '&resultOffset=' +
                   '&resultRecordCount=' +
                   '&f=pgeojson&token=';

  //send the ajax request via axios
  return axios.get(query_URL);

}


export function get_ChartData(id,level){
    return (dispatch,getState) => {
      AGO_AllChartData_byID(id,level)
      .then(function test(response){
        const state = getState()

        let visibility = CHART_VISIBILITY;

        //get visibility state of charts
        visibility = ( state.chartData.chart_visibility === undefined? CHART_VISIBILITY : state.chartData.chart_visibility);

        //instatiate variables
        let chart_data = {};
        let chart_all_base = [];
        let chart_id_base = [];
        let chart_all_upflift = [];
        let chart_id_upflift = [];

        //check response and get response data
        chart_data = CheckReponse(response,'AGO_API_ERROR');


        //if the chart_data_features is returned.
        //  filter the data for the different parts
        if(chart_data.features){

          //get all the chart features objects for baseline
          chart_all_base = chart_data.features.filter( key =>{
            return key.properties.chart_type === 'BASELINE';
          })

          //get all the chart features objects for uplift
          chart_all_upflift = chart_data.features.filter( key =>{
            return key.properties.chart_type === 'UPLIFT';
          })

          // //this is for legacy method where we did this in action creator. do this in the component in the new version
          // chart_id_base = chart_data.features.filter( key =>{
          //   return key.properties.ID === id && key.properties.chart_type === 'BASELINE';
          // })

          // chart_id_upflift = chart_data.features.filter( key =>{
          //   return key.properties.ID === id && key.properties.chart_type === 'UPLIFT';
          // })
        }

        //user TURF.JS to create geoJSON feature collections
        var chartData_ID_fc = turf_FC(chart_id_base);
        var chartData_Level_fc = turf_FC(chart_all_base);

        //create a array objects for the chart types: baseline and uplift
        //  this chart limit is passed so we can limit the charts for a spefic huc N level
        const types = [
                {chart_type: 'baseline',
                  chart_features: chart_all_base,
                  chart_limit: id,
                 },
                {chart_type: 'uplift',
                 chart_features: chart_all_upflift,
                 chart_limit: id,
                },
              ];

        //send the chart data on
        dispatch(
          tra_data('TRA_CHART_DATA', chartData_ID_fc, chartData_Level_fc, visibility, types)
        )
      }//)
    )
    .catch(error => { console.log('request failed', error); });
  }
}

//function to handle sending to reducer and store
function tra_data(type, id_json, level_json, visibility, types) {
  // return {
  //   type: type,
  //   chart_data: {id_json,level_json},
  //   receivedAt: Date.now()
  // }
  return {
   type: type,
   tra_data: {
     chart_types: types,
   },
   receivedAt: Date.now()
 }
}
