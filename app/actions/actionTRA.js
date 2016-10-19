var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, DATA_FEATUREID , SERVICE_NAME, TRA_FEATUREID, TRA_MAP_FEATUREID} from '../constants/actionConstants';

import { START_POSITION, CATALOGING_UNIT_FROM_HUC12_END_POISTION } from '../constants/appConstants';

//  general functions and  helpers.  reuse functions
import {  getAGOGeographyLabel, getCurrentLevel } from '../utils/helpers';

//set base URL for axios
axios.defaults.baseURL = AGO_URL;


//get chart data for all
function ago_get_traxwalk_by_id(hucid, current_geography_level){

  //set default id
  var id = hucid;

  //get the lower level in the huc heirachy
  // var next_level = getNextLevel(current_geography_level);
  const level = getAGOGeographyLabel(current_geography_level).toUpperCase()
  // const level = 'HUC_12'

  //if current huc hierachy is set to huc12 we do not have a lower level in the heirachy
  //  but we want to show all the hucs in the current huc12's Cataloging unit
  //  so we need to get the first 8 characters, which is the Cataloging Unit
  // if(current_geography_level === 'HUC12'){
  //   id = hucid.substring(START_POSITION, CATALOGING_UNIT_FROM_HUC12_END_POISTION);
  // }


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



//get tra geom by its id
function ago_get_tra_geom_byid( id ){



  //build the query to arcgis online api for getting the raw chart data
  const query_URL = '/' + SERVICE_NAME + '/FeatureServer/' + TRA_MAP_FEATUREID + '/query' +
                    '?where=id+%3D+%27' + id + '%27' +
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

export function get_TRAData(hucid, current_geography_level){
  return (dispatch, getState) => {

    ago_get_traxwalk_by_id(hucid, current_geography_level)
    .then( tra_xwalk_response => {

      const state = getState()

      let tra_datas = {};
      let tra_geom = {};
      let chart_all_tra = [];
      let group = [];
      let tra_geom_obj = {};


      tra_datas = CheckReponse(tra_xwalk_response,'AGO_API_ERROR');

      if(tra_datas.features){
        // console.log(tra_datas)

        let group = []
        let tra_id_list = ""
        let count = 0;

        //walk the tra features and get the tra data.
        tra_datas.features.map( feature => {

          const id = feature.properties.ID
          const tra_name = feature.properties.TRA_Name
          tra_geom_obj = {};

          ///get the geometry for the tra
          ago_get_tra_geom_byid(tra_name)
            .then( tra_geom_response => {

              count += 1;

              tra_geom = CheckReponse(tra_geom_response,'AGO_API_ERROR');

              //if there are geometry feautures then add the geometry objec to the tra data
              if(tra_geom.features){
                tra_geom_obj = tra_geom.features[0].geometry
              }

              //add data to object to pass to store
              group.push({
                id,
                tra_name,
                tra_geom: tra_geom_obj,
              })

              //only dispatch when have down all features
              if(count === tra_datas.features.length){
                dispatch(tra_data('GET_TRA_DATA', group));
              }

            })
            .catch(error => { console.log('request failed', error); });

        })
      }


    })
    .catch(error => { console.log('request failed', error); });

    let group = [];

    //send empty group for nothing found
    dispatch(tra_data('GET_TRA_DATA', group));

  }
}


//function to handle sending to reducer and store
function tra_data(type, data,) {
  // return {
  //   type: type,
  //   chart_data: {id_json,level_json},
  //   receivedAt: Date.now()
  // }
  return {
   type: type,
   tra_data: {
     data,
   },
   receivedAt: Date.now()
 }
}
