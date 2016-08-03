var axios = require('axios');
var turf_FC = require('turf-featurecollection');

//import helper functions
//  to check ajax (AXIOS) responses - error handling
import { CheckReponse } from './responses';

//  general functions and  helpers.  reuse functions
import { getNextLevel } from '../utils/helpers';

//import ACTION constants
import { AGO_URL, DATA_FEATUREID, ENCODED_COMMAS } from '../constants/actionConstants';
import { START_POSITION, CATALOGING_UNIT_FROM_HUC12_END_POISTION } from '../constants/appConstants';

//set consts for this module
const CHART_DATA_OUT_FIELDS_LIST = [
  'ID',
  'OBJECTID',
  'chart_description',
  'chart_id',
  'chart_label',
  'chart_level',
  'chart_level_label',
  'chart_matchid',
  'chart_type',
  'chart_value',
  'geography_label',
  'geography_level',
  'geography_match_id'
];
const CHART_DATA_OUT_FIELDS = CHART_DATA_OUT_FIELDS_LIST.join(ENCODED_COMMAS);
const CHART_DATA_ORDER_BY_FIELDS = 'chart_level' + ENCODED_COMMAS + 'chart_matchid';

const CHART_TYPE = 'BASELINE';

//set base URL for axios
axios.defaults.baseURL = AGO_URL;

//get chart data for all hucs of the next lower level in the huc heirachy (huc6,huc8,huc12) for huc id
//   requires an id of huc6,huc8, or huc12....
//            geogLevel which is the current geography level,
//            need this so we can limit the
//  the huc heirachy is huc 6 (river basins), huc 8 (Cataloging units), huc 12 (huc 12) for now will be adding
//      TRA's and catchments
function AGO_AllChartData_byID(hucid,current_geography_level){

   //set default id
   var id = hucid;

   //get the lower level in the huc heirachy
   var next_level = getNextLevel(current_geography_level);

   //if current huc hierachy is set to huc12 we do not have a lower level in the heirachy
   //  but we want to show all the hucs in the current huc12's Cataloging unit
   //  so we need to get the first 8 characters, which is the Cataloging Unit
   if(current_geography_level === 'HUC12'){
     id = hucid.substring(START_POSITION, CATALOGING_UNIT_FROM_HUC12_END_POISTION);
   }

   //build the query to arcgis online api for getting the raw chart data
   const query_URL = '/RDRBP/FeatureServer/' + DATA_FEATUREID + '/query' +
                   '?where=ID+like+%27' + id + '%25%27+and+geography_level%3D'+ next_level + //'+and+chart_type%3D%27' + CHART_TYPE + '%27' +
                   '&objectIds=' +
                   '&time=' +
                   '&resultType=none' +
                   '&outFields=' + CHART_DATA_OUT_FIELDS +
                   '&returnIdsOnly=false' +
                   '&returnCountOnly=false' +
                   '&returnDistinctValues=true' +
                   '&orderByFields=' + CHART_DATA_ORDER_BY_FIELDS +
                   '&groupByFieldsForStatistics=' +
                   '&outStatistics=' +
                   '&resultOffset=' +
                   '&resultRecordCount=' +
                   '&f=pgeojson&token=';
  //send the ajax request via axios
  return axios.get(query_URL);

}

//get chart data for a single huc id
//   requires the id to search
function AGO_ChartData_byID(id){
   const query_URL = '/RDRBP/FeatureServer/' + DATA_FEATUREID + '/query' +
                     '?where=id%3D%27' + id + '%27' + //' +and+chart_type%3D%27' + CHART_TYPE + '%27' +
                     '&objectIds=' +
                     '&time=' +
                     '&resultType=none' +
                     '&outFields=' + CHART_DATA_OUT_FIELDS +
                     '&returnIdsOnly=false' +
                     '&returnCountOnly=false' +
                     '&returnDistinctValues=true' +
                     '&orderByFields=' +  CHART_DATA_ORDER_BY_FIELDS +
                     '&groupByFieldsForStatistics=' +
                     '&outStatistics=' +
                     '&resultOffset=' +
                     '&resultRecordCount=' +
                     '&f=pgeojson' +
                     '&token=';

  //send the ajax request via axios
  return axios.get(query_URL);

}
//
export function get_ChartData(id,level){
    return (dispatch,getState) => {
      AGO_AllChartData_byID(id,level)
      .then(function test(response){
        const state = getState()

        let visibility = false;

        //get visibility state of charts
        visibility = ( state.chartData.chart_visibility === undefined ? false : state.chartData.chart_visibility);

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

          //this is for legacy method where we did this in action creator. do this in the component in the new version
          chart_id_base = chart_data.features.filter( key =>{
            return key.properties.ID === id && key.properties.chart_type === 'BASELINE';
          })

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
          ChartData('GET_CHART_DATA', chartData_ID_fc, chartData_Level_fc, visibility, types)
        )
      }//)
    )
    .catch(error => { console.log('request failed', error); });
  }
}

export function update_ChartVisiblity (visibility){
    return (dispatch, getState) => {
      const state = getState()

      let chartData_Level = [];
      let chartData_ID = [];
      let types = [];
      let isVisible = true;
      
      if(state.chartData.chart_data){
        //ensure that the chart data exists create blank if not.
         chartData_Level = ( state.chartData.chart_data.level_json ? state.chartData.chart_data.level_json : {});
        chartData_ID = ( state.chartData.chart_data.id_json ? state.chartData.chart_data.id_json : {});


      //change visibility
       isVisible = (state.chartData.chart_visibility ? false : true);

      types = ( state.chartData.chart_data.chart_types ? state.chartData.chart_data.chart_types : []);

      }


      //send visibility setting on
      dispatch(ChartData('SET_CHART_VISIBILITY', chartData_ID, chartData_Level, isVisible, types ))


    }
}


//function to handle sending to reducer and store
function ChartData(type,id_json, level_json, visibility, types) {
  // return {
  //   type: type,
  //   chart_data: {id_json,level_json},
  //   chart_visibility: visibility,
  //   receivedAt: Date.now()
  // }
  return {
   type: type,
   chart_data: {
     id_json,
     level_json,
     chart_types: types,
   },
   chart_visibility: visibility,
   receivedAt: Date.now()
 }
}
