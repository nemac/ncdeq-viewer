var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, AGO_RiverBasins, AGO_CatalogingUnits, AGO_HUCS, Data_FeatureID } from './actionConstants';

//set base URL for axios
axios.defaults.baseURL = AGO_URL;

const CHART_DATA_OUT_FIELDS = 'geography_level%2Cgeography_label%2C';
const CHART_DATA_ORDER_BY_FIELDS = 'geography_level';

function AGO_GeographyLevels(){

  const query_URL = '/RDRBP/FeatureServer/' + Data_FeatureID + '/query' +
                    '?where=id<>%27%27&objectIds=' +
                    '&time=&resultType=none' +
                    '&outFields=' + CHART_DATA_OUT_FIELDS +
                    '&returnIdsOnly=false' +
                    '&returnCountOnly=false' +
                    '&returnDistinctValues=true' +
                    '&orderByFields=' + CHART_DATA_ORDER_BY_FIELDS +
                    '&groupByFieldsForStatistics=' +
                    '&outStatistics=' +
                    '&resultOffset=' +
                    '&resultRecordCount='
                    +'&f=pgeojson' +
                    '&token='

  return axios.get(query_URL);

};

function emptylList(name,level){
    return {
      name,
      level
    }
}


export function get_GeographyLevels(){

  return dispatch => {
      AGO_GeographyLevels()
        .then(function test(response){

          //check repsonses for errors
          let theGeographyLevels = CheckReponse(response,'AGO_API_ERROR');
          let GList = [];

          theGeographyLevels.features.map(function(features) {

             let geography_label = features.properties.geography_label;
             let geography_level = features.properties.geography_level;

             let thisGeographyList = {geography_level,geography_label};

             GList.push(thisGeographyList)
           })

          //send the geography level data on
          dispatch(geography_levels(GList))
        })
        .catch(error => { console.log('request failed', error); });
  }
}

function geography_levels(json) {
   console.log('geography_levels')
  return {
    type: 'GET_GEOGRAPHY_LEVELS',
    geography_levels: json,
    receivedAt: Date.now()
  }
}
