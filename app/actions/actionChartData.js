var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, Data_FeatureID } from './actionConstants';

const CHART_DATA_OUT_FIELDS = 'chart_id%2Cchart_matchid%2Cchart_type%2Cchart_level%2Cchart_description%2Cchart_value%2C';
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

export function get_AllChartData_byID(ID,LEVEL){
    return dispatch => {
      axios.all([AGO_ChartData_byID(ID), AGO_AllChartData_byID(ID,LEVEL)])
      .then(axios.spread(function (chartbyid, chartbylevel) {



            let chartData_Level = CheckReponse(chartbylevel,'AGO_API_ERROR');
            let chartData_ID = CheckReponse(chartbyid,'AGO_API_ERROR');


            dispatch(AllChartDatalByID(chartData_Level,LEVEL))
            dispatch(ChartData(chartData_ID,chartData_Level,LEVEL))

          })
        )
        .catch(error => { console.log('request failed', error); });
  }
}

function ChartData(id_json,level_json) {
  return {
    type: 'GET_CHART_DATA',
    chart_data: {id_json,level_json},
    receivedAt: Date.now()
  }
}

function AllChartDatalByID(json,id) {
  return {
    type: 'GET_ALL_CHART_DATA_BY_ID',
    all_chart_data: json,
    id: id,
    receivedAt: Date.now()
  }
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

export function get_ChartData_byID(ID){
    return dispatch => {
        AGO_ChartData_byID(ID)
          .then(function test(response){

            //check repsonses for errors
            let theChartDataByID = CheckReponse(response,'AGO_API_ERROR');

            //send the chart data on
            dispatch(ChartDataByID(theChartDataByID,ID))
          })
          .catch(error => { console.log('request failed', error); });
  }
}


function ChartDataByID(json,id) {
  return {
    type: 'GET_CHART_DATA_BY_ID',
    chart_data: json,
    id: id,
    receivedAt: Date.now()
  }
}
