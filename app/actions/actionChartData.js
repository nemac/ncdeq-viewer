var axios = require('axios');
var turf_FC = require('turf-featurecollection');

//import helper functions
//  to check ajax (AXIOS) responses - error handling
import { CheckReponse } from './responses';

//  general functions and  helpers.  reuse functions
import { getNextLevel, getAGOGeographyLabel, getPrevLevelName, get_matchEnd } from '../utils/helpers';

//import ACTION constants
import { AGO_URL, DATA_FEATUREID, TRA_FEATUREID, ENCODED_COMMAS, SERVICE_NAME } from '../constants/actionConstants';
import { START_POSITION, CATALOGING_UNIT_FROM_HUC12_END_POISTION, CHART_VISIBILITY} from '../constants/appConstants';

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
function AGO_AllChartData_byID(hucid, current_geography_level){

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
   const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + DATA_FEATUREID + '/query' +
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
   const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + DATA_FEATUREID + '/query' +
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


//get chart data from data api
function ago_get_tra_by_ids( id_list){

  const id_in_list = "(" + id_list + ')'

  //build the query to arcgis online api for getting the raw chart data
  const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + DATA_FEATUREID + '/query' +
                    '?where=ID+in+' + id_in_list +
                    '&objectIds=' +
                    '&time='  +
                    '&resultType=none' +
                    '&outFields=*' +
                    '&returnIdsOnly=false' +
                    '&returnCountOnly=false' +
                    '&returnDistinctValues=true' +
                    '&orderByFields=' +
                    '&groupByFieldsForStatistics=' +
                    '&outStatistics=' +
                    '&resultOffset=' +
                    '&resultRecordCount=' +
                    '&sqlFormat=none' +
                    '&f=pgeojson' +
                    '&token='

 //send the ajax request via axios
 return axios.get(query_URL);


}
//get chart data for all
function ago_get_traxwalk_by_id(hucid, current_geography_level){

  //set default id
  var id = hucid;

  //get the lower level in the huc heirachy
  // var next_level = getNextLevel(current_geography_level);
  const level = 'HUC_8'

  //if current huc hierachy is set to huc12 we do not have a lower level in the heirachy
  //  but we want to show all the hucs in the current huc12's Cataloging unit
  //  so we need to get the first 8 characters, which is the Cataloging Unit
  if(current_geography_level === 'HUC12'){
    id = hucid.substring(START_POSITION, CATALOGING_UNIT_FROM_HUC12_END_POISTION);
  }



   //build the query to arcgis online api for getting the raw chart data
   const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + TRA_FEATUREID + '/query' +
                   '?where=id%3D%27' + id + '%27+and+type+%3D+%27' + level.toUpperCase() + '%27' +
                   '&objectIds=' +
                   '&time=' +
                   '&resultType=' +
                   'none&outFields=*' +
                   '&returnIdsOnly=false' +
                   '&returnCountOnly=false' +
                   '&returnDistinctValues=true' +
                   '&orderByFields=' +
                   '&groupByFieldsForStatistics=' +
                   '&outStatistics=' +
                   '&resultOffset=' +
                   '&resultRecordCount=' +
                   '&sqlFormat=none' +
                   '&f=pgeojson' +
                   '&token='

  //send the ajax request via axios
  return axios.get(query_URL);

}

function ago_getChartLevels(){

     const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + DATA_FEATUREID + '/query' +
                          '?where=OBJECTID+>+0+and+chart_matchid+<>+chart_id' +
                          '&objectIds=' +
                          '&time=' +
                          '&resultType=none' +
                          '&outFields=chart_level%2C+chart_matchid%2C+chart_level_label%2C+chart_type%2C+chart_id' +
                          '&returnIdsOnly=false' +
                          '&returnCountOnly=false' +
                          '&returnDistinctValues=true' +
                          '&orderByFields=chart_level%2C+chart_matchid%2C+chart_type%2C+chart_level_label' +
                          '&groupByFieldsForStatistics=' +
                          '&outStatistics=' +
                          '&resultOffset=' +
                          '&resultRecordCount=' +
                          '&sqlFormat=none' +
                          '&f=pgeojson' +
                          '&token='

     //send the ajax request via axios
     return axios.get(query_URL);
}


function ago_getPreviousChart(chart_level, chart_id){

     const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + DATA_FEATUREID + '/query' +
                          '?where=chart_level+%3D+' + chart_level + '+and+chart_id+%3D+' + chart_id  + //' chart_type+%3D+%27' + chart_type + '%27'
                          '&objectIds=' +
                          '&time=' +
                          '&resultType=none' +
                          '&outFields=chart_level%2C+chart_matchid%2C+chart_level_label%2C+chart_type%2C+chart_id' +
                          '&returnIdsOnly=false' +
                          '&returnCountOnly=false' +
                          '&returnDistinctValues=true' +
                          '&orderByFields=chart_level%2C+chart_matchid%2C+chart_type%2C+chart_level_label' +
                          '&groupByFieldsForStatistics=' +
                          '&outStatistics=' +
                          '&resultOffset=' +
                          '&resultRecordCount=' +
                          '&sqlFormat=none' +
                          '&f=pgeojson' +
                          '&token='

     //send the ajax request via axios
     return axios.get(query_URL);
}

function check_limits_valid(data, item){

  const charts_levels = data.features;
  const chart_type = item.chart_type
  const current_chart_level = item.current_chart_level
  const current_chart_matchid = item.current_chart_matchid

  const checklevels = charts_levels.filter( charts_levels_features => {
   return charts_levels_features.properties.chart_type.toUpperCase() === chart_type.toUpperCase() &&
            charts_levels_features.properties.chart_level === current_chart_level &&
            charts_levels_features.properties.chart_matchid === current_chart_matchid
          })


  //if limited data is a length of 0 then there is no data in for a lower heirachy so we want to return false
  //  and use the original limit
  if(checklevels.length === 0){
    return false
  }

  return true
}
export function update_ChartLevels(new_level, new_matchid, chart_type){
  return (dispatch,getState) => {

      const state = getState()

      //set inital default settings just incase there is no data.
      let current_chart_level = null;
      let current_chart_matchid = null;
      let chart_level_data = [];
      let new_chart_type_limits = [];

      //make sure there is data in the state
      if(state.chartData){


        //get the chart level data if not set yet make it a blank array
        chart_level_data = ( state.chartData.chart_levels.levels ? state.chartData.chart_levels.levels : []);

        //get the limits for all chart types
        const chart_type_limits = state.chartData.chart_levels.chart_limits;
        let new_level_chk = new_level-1

        ago_getPreviousChart(new_level_chk, new_matchid)
          .then( previous_chart_response => {
            const previous_data = CheckReponse(previous_chart_response,'AGO_API_ERROR');

            //walk the chart limits
            chart_type_limits.map( item => {

              //if the chart types match the chart type we are trying to limit step in
              //  and create a new limit
              if(item.chart_type.toUpperCase() === chart_type.toUpperCase()){


                //set new levels and matchids
                current_chart_level = new_level
                current_chart_matchid = new_matchid
                const chart_type = item.chart_type

                //limit previous_data by the chart type
                const previous_data_type = previous_data.features.filter( previous_item => {
                  return previous_item.properties.chart_type.toUpperCase() === chart_type.toUpperCase()
                })

                //get previous chart heirachy from ago api
                let last_chart_level_raw = (previous_data_type[0].properties.chart_level ? previous_data_type[0].properties.chart_level : 2);
                let last_chart_matchid = (previous_data_type[0].properties.chart_matchid ? previous_data_type[0].properties.chart_matchid : 1);
                let last_chart_label = (previous_data_type[0].properties.chart_level_label ? previous_data_type[0].properties.chart_level_label : '  ');

                //make sure that the last chart_level is not 1.
                //  one is the top most level but we are never showing that..
                //  instead we are starting with the breakdown of the top most level.
                //  the top most level is the total and we already show it in level two
                let last_chart_level = last_chart_level_raw === 1 ? 2 : last_chart_level_raw;


                //create new object for the chart types limits
                const new_item = {chart_type, current_chart_level, current_chart_matchid, last_chart_level, last_chart_matchid, last_chart_label}

                ///we only want to change the limit if there is chart data in the next level down.
                //  this checks to make sure we have data
                const isvalid = check_limits_valid(chart_level_data, new_item)

                //there is data in the next chart level down
                if(isvalid){
                  new_chart_type_limits.push(new_item)
                //there is NOT data in the next chart level down
                } else {
                  new_chart_type_limits.push(item)
                }

             //just add old values if not the chart type we are updating limits for.
              } else {
                new_chart_type_limits.push(item)
              }
            })

            //send the chart data on
            dispatch(
              ChartLevels('UPDATE_CHART_LEVEL', chart_level_data, new_chart_type_limits)
            )
            return
          })
          .catch(error => { console.log('request failed', error); });

      } else {

        //send the chart data on
        dispatch(
          ChartLevels('in action UPDATE_CHART_LEVEL', chart_level_data, new_chart_type_limits)
        )


      }



  }
}

export function get_ChartLevels(id,level){
  return (dispatch,getState) => {

    ago_getChartLevels()
     .then( chart_level_response => {

       let chart_type_levels = []

       //get response for chart levels
       const chart_level_data = CheckReponse(chart_level_response,'AGO_API_ERROR');

       //get all the chart level featurs
       const charts_levels = chart_level_data.features;

       //get thge chart types.  there will be duplicates since there are multiple chart heierchal levels
       const chart_types_all = charts_levels.map( charts_levels_features => {
          return charts_levels_features.properties.chart_type
       })

       //make the array a unique list of chart types
       const chart_types = chart_types_all.filter(function(item, pos) {
           return chart_types_all.indexOf(item) == pos;
       })

       //default levels
       const current_chart_level = 2;
       const current_chart_matchid = 1;
       const last_chart_level = 2;
       const last_chart_matchid = 1;
       const last_chart_label = "  "

       //set initial chart levels for each chart type
      chart_types.map( chart_type => {
        chart_type_levels.push({chart_type, current_chart_level, current_chart_matchid, last_chart_level, last_chart_matchid, last_chart_label})
      })


      //send the chart data on
      dispatch(
        ChartLevels('GET_CHART_LEVELS', chart_level_data, chart_type_levels)
      )
    })
    .catch(error => { console.log('request failed', error); });

  }
}

//
export function get_ChartData(id,level){
    return (dispatch,getState) => {
      axios.all([AGO_AllChartData_byID(id, level), ago_get_traxwalk_by_id(id, level)])
      .then(axios.spread(function (chartdata_response, tra_response) {

        const state = getState()

        //get tra id from xwalk
        //get tra chart from table

        let visibility = CHART_VISIBILITY;

        //get visibility state of charts
        visibility = ( state.chartData.chart_visibility === undefined? CHART_VISIBILITY : state.chartData.chart_visibility);

        //instatiate variables
        let chart_data = {};
        let tra_chart_data = {};
        let tra_data = {};
        let chart_all_base = [];
        let chart_all_tra = [];
        let chart_id_base = [];
        let chart_all_upflift = [];
        let chart_id_upflift = [];

        //check response and get response data - chartdata_response
        chart_data = CheckReponse(chartdata_response,'AGO_API_ERROR');

        let huc_list = ""

        tra_data = CheckReponse(tra_response,'AGO_API_ERROR');

        let tra_id_list = ""

        //if the tra_data  is returned
        //  we need to get the chart data...
        if(tra_data.features){
          tra_data.features.map( tra => {

              //get tra xwalk this will retrieve the tra id's from the HUC id's
              //  the tra xwalk has already determined the spatial relationships between hucs and
              //  tra's so we do not have to
              const tra_id = tra.properties.TRA_Name;
              tra_id_list = tra_id_list + ',' + "'" + tra_id + "'"
            })
            tra_id_list = tra_id_list.substring(1,tra_id_list.length)
          }

          //from the tra ids retrieve the tra data fro charting
          ago_get_tra_by_ids(tra_id_list)
           .then( tra_chart_data_response => {

             //add geometry here
             tra_chart_data = CheckReponse(tra_chart_data_response,'AGO_API_ERROR');

             if(tra_chart_data.features){

               //so far the TRA data is all uplift but this may not matter really only doing this so
               // the format of the data matches baseline and uplfift for the 1st pass of charting
               chart_all_tra = tra_chart_data.features.filter(key =>{
                 return key.properties.chart_type === 'TRA';
               })

             }

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

            }

          //use TURF.JS to create geoJSON feature collections
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
                  {chart_type: 'tra',
                   chart_features: chart_all_tra,
                   chart_limit: id
                  },
                ];


          //send the chart data on
          dispatch(
            ChartData('GET_CHART_DATA', visibility, types)
          )

        })
        .catch(error => { console.log('request failed', error); });

      })

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

      //change visibility
      isVisible = (state.chartData.chart_visibility ? false : true);

      types = ( state.chartData.chart_data.chart_types ? state.chartData.chart_data.chart_types : []);

      }


      //send visibility setting on
      dispatch(ChartData('SET_CHART_VISIBILITY', isVisible, types ))


    }
}

//function to handle sending to reducer and store
function ChartLevels(type, levels, chart_limits) {
  // return {
  //   type: type,
  //   chart_levels: {levels},
  //   chart_visibility: visibility,
  //   receivedAt: Date.now()
  // }
  return {
   type: type,
   chart_levels: {
     levels,
     chart_limits
   },
   receivedAt: Date.now()
 }
}


//function to handle sending to reducer and store
function ChartData(type, visibility, types) {
  // return {
  //   type: type,
  //   chart_data: {id_json,level_json},
  //   chart_visibility: visibility,
  //   receivedAt: Date.now()
  // }
  return {
   type: type,
   chart_data: {
     chart_types: types,
   },
   chart_visibility: visibility,
   receivedAt: Date.now()
 }
}
