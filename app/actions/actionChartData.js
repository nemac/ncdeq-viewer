var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, Data_FeatureID } from './actionConstants';

const CHART_DATA_OUT_FIELDS = 'geography_label%2CID%2Cchart_id%2Cchart_matchid%2Cchart_type%2Cchart_level%2Cchart_description%2Cchart_value%2Cchart_matchid';
const CHART_DATA_ORDER_BY_FIELDS = 'chart_level%2Cchart_matchid';


//set base URL for axios
axios.defaults.baseURL = AGO_URL;

//get the next level of geog for a geography level to use in ago api
//  example this gets all the hucs for a Cataloging unit
function getNextLevel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 1;
      break;
    case 'Cataloging Units':
      return 3;
      break;
    case 'HUC12':
      return 3;
      break;
    default:
      return 3;
    }
}

//get chart data by huc id
function AGO_AllChartData_byID(hucid,geogLevel){

   var ID = hucid;
   var level = getNextLevel(geogLevel);

   if(geogLevel === 'HUC12'){
     ID = hucid.substring(0,8);
   }

   const query_URL = '/RDRBP/FeatureServer/' + Data_FeatureID + '/query' +
                   '?where=ID+like+%27' + ID + '%25%27+and+geography_level%3D'+ level +
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

  return axios.get(query_URL);

}

//get chart data by huc id
function AGO_ChartData_byID(ID){
   const query_URL = '/RDRBP/FeatureServer/' + Data_FeatureID + '/query' +
                     '?where=id%3D%27' + ID + '%27' +
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

  return axios.get(query_URL);

}

export function get_ChartData(ID,LEVEL){
    return (dispatch,getState) => {
      axios.all([AGO_ChartData_byID(ID), AGO_AllChartData_byID(ID,LEVEL)])
      .then(axios.spread(function (chartbyid, chartbylevel) {
        const state = getState()

        let visibility = false;

        visibility = ( state.chartData.chart_visibility === undefined ? false : state.chartData.chart_visibility);

        let chartData_Level = {};
        let chartData_ID = {};
        //only check responses if limiting data (ID ir LEVEL) was passed id
        //   this would cause an error but we still want data to flow in for initializing the charts state object.
        if(ID){
          //check for errors in responses
          chartData_Level = CheckReponse(chartbylevel,'AGO_API_ERROR');
          chartData_ID = CheckReponse(chartbyid,'AGO_API_ERROR');
        }
        //send the chart data on
        dispatch(ChartData('GET_CHART_DATA',chartData_ID,chartData_Level,visibility))

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
function ChartData(type,id_json,level_json,visibility) {
  return {
    type: type,
    chart_data: {id_json,level_json},
    chart_visibility: visibility,
    receivedAt: Date.now()
  }
}
