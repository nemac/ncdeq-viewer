var axios = require('axios');

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
                   '?where=ID+like+%27' + id + '%25%27+and+geography_level%3D'+ next_level + '+and+chart_type%3D%27' + CHART_TYPE + '%27' +
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
                     '?where=id%3D%27' + id + '%27' + ' +and+chart_type%3D%27' + CHART_TYPE + '%27' +
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
      axios.all([AGO_ChartData_byID(id), AGO_AllChartData_byID(id,level)])
      .then(axios.spread(function (chartbyid, chartbylevel) {

        const state = getState()

        let visibility = false;

        visibility = ( state.chartData.chart_visibility === undefined ? false : state.chartData.chart_visibility);

        let chartData_Level = {};
        let chartData_ID = {};

        //only check responses if limiting data (ID ir LEVEL) was passed id
        //   this would cause an error but we still want data to flow in for initializing the charts state object.
        if(id){
          //check for errors in responses
          chartData_Level = CheckReponse(chartbylevel,'AGO_API_ERROR');
          chartData_ID = CheckReponse(chartbyid,'AGO_API_ERROR');
        }
        //send the chart data on
        dispatch(ChartData('GET_CHART_DATA', chartData_ID, chartData_Level, visibility))

      })
    )
    .catch(error => { console.log('request failed', error); });
  }
}

export function update_ChartVisiblity (visibility){
    return (dispatch, getState) => {
      const state = getState()

      //ensure that the chart data exists create blank if not.
      let chartData_Level = ( state.chartData.chart_data.level_json ? state.chartData.chart_data.level_json : {});
      let chartData_ID = ( state.chartData.chart_data.id_json ? state.chartData.chart_data.id_json : {});

      //change visibility
      let isVisible = (state.chartData.chart_visibility ? false : true);

      //send visibility setting on
      dispatch(ChartData('SET_CHART_VISIBILITY',chartData_ID,chartData_Level,isVisible))


    }
}
//function to handle sending to reducer and store
function ChartData(type,id_json,level_json,visibility) {
  return {
    type: type,
    chart_data: {id_json,level_json},
    chart_visibility: visibility,
    receivedAt: Date.now()
  }
}
