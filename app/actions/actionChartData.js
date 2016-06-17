var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL } from './actionConstants';

const CHART_DATA_OUT_FIELDS = 'chart_id%2Cchart_matchid%2Cchart_type%2Cchart_level%2Cchart_description%2Cchart_value';
const CHART_DATA_ORDER_BY_FIELDS = 'chart_level%2Cchart_matchid';

//set base URL for axios
axios.defaults.baseURL = AGO_URL;


//get chart data by huc id
function AGO_ChartData_byID(ID){
   const query_URL = '/RDRBP/FeatureServer/3/query' +
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
            dispatch(ChartDataByID(theChartDataByID.data,ID))
          })
          .catch(error => { console.log('request failed', error); });
  }
}

function ChartDataByID(json,id) {
  return {
    type: 'GET_CHART_DATA_BY_ID',
    chartDataByID: json,
    id: id,
    receivedAt: Date.now()
  }
}
