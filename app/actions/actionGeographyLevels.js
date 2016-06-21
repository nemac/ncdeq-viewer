var axios = require('axios');
import { CheckReponse } from './responses';
import { AGO_URL, AGO_RiverBasins, AGO_CatalogingUnits, AGO_HUCS, Data_FeatureID } from './actionConstants';

//set base URL for axios
axios.defaults.baseURL = AGO_URL;

const CHART_DATA_OUT_FIELDS = 'geography_level%2Cgeography_label';
const CHART_DATA_ORDER_BY_FIELDS = 'geography_level';

//AGO query to get list of geography levels available
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

//get the current level of geog for a geography level to use in ago api
//  example this gets all the hucs for a Cataloging unit
function getCurrentLevel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 1;
      break;
    case 'Cataloging Units':
      return 2;
      break;
    case 'HUC12':
      return 3;
      break;
    default:
      return 99;
    }
}

//get the next level of geog for a geography level to use in ago api
//  example this gets all the hucs for a Cataloging unit
function getNextLevel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 2;
      break;
    case 'Cataloging Units':
      return 3;
      break;
    case 'HUC12':
      return 99;
      break;
    default:
      return 99;
    }
}

//only needs this untill I change the data feed have named generically?
// or maybe control via yaml file....
function get_AGOGeographyLabel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 'huc_6';
      break;
    case 'Cataloging Units':
      return 'huc_8';
      break;
    case 'HUC12':
      return 'huc_12';
      break;
    default:
      return 'huc_12';
    }
}
//updates the a geography level filter
//  determined by changed menuitem value
//  or when the user clicks on huc in map (not done yet)
function update_activeGeographyFilter( state, active_level, filter_value ){

  //convert the active layer name to the AGO generic name
  // need to do check of active layer
  const nextLevel = getNextLevel(active_level)
  const currentLevel = getCurrentLevel(active_level)
  const geography_levels = state.geography_levels.geography_levels

  //instatiate variables
  let GList = [];

  //loop the geography levels
  geography_levels.map(function(level) {

     //get the label, level,for the geography_level
     let geography_label = level['geography_label'];
     let geography_level = level['geography_level'];
     let active = level['active'];
     let filter = level['filter'];
     let current_id = level['current_id'];

    //  console.log(geography_level)
    //  console.log(currentLevel)
    //       console.log('')
    //  console.log('before: '  + nextLevel + ' ' + geography_level)
     //check of the labels matches the new active layer label
     //  is so set active to true.
     //  otherwise false
     if (currentLevel === geography_level ){
       current_id = filter_value;
     }

     if (currentLevel < geography_level ){
       current_id = '';
     }

     if (geography_level >= nextLevel){
      //  console.log('after: '  + nextLevel + ' ' + geography_level)
       filter = filter_value;
      //  console.log(geography_level)
      //  console.log(nextLevel)
      //  console.log(filter_value)
      //  console.log('')
     }

     //create new geography_level object
     let thisGeographyList = {geography_level, geography_label, active, filter, current_id};

     //add the geography_level object to new state array
     GList.push(thisGeographyList)
   })

  return GList;

}

//updates the which geograpy level is active_level
//  determined by which menu item the user clicks or
//  or when the user clicks on huc in map (not done yet)
function update_activeGeographyLevel( state, active_level ){

  //convert the active layer name to the AGO generic name
  // need to do check of active layer
  const label = get_AGOGeographyLabel(active_level)
  const geography_levels = state.geography_levels.geography_levels

  //instatiate variables
  let GList = [];
  let active = false;
  // let filter = '';

  //loop the geography levels
  geography_levels.map(function(level) {

     //get the label, level,for the geography_level
     let geography_label = level['geography_label'];
     let geography_level = level['geography_level'];
     let filter = level['filter'];
     let current_id = level['current_id'];

     //check of the labels matches the new active layer label
     //  is so set active to true.
     //  otherwise false
     if (level['geography_label'] === label){
       active = true;
     } else {
       active = false;
     }

     //create new geography_level object
     let thisGeographyList = {geography_level, geography_label, active, filter, current_id};

     //add the geography_level object to new state array
     GList.push(thisGeographyList)
   })

  return GList;

}

// change filter for geography level
export function change_geographyLevelFilter(filter_value, active_level) {
  return (dispatch, getState) => {

    const state = getState()

    //create new geography_level state object
    const newLevels = update_activeGeographyFilter( state, active_level, filter_value );

    //send the new geography level data on
    dispatch(geography_levels('CHANGE_FILTER_GEOGRAPHY_LEVEL',newLevels))

  }
}

// change active geography level
export function change_geographyLevelActive(active_level) {
  return (dispatch, getState) => {

    const state = getState()

    //create new geography_level state object
    const newLevels = update_activeGeographyLevel( state, active_level );

    //send the new geography level data on
    dispatch(geography_levels('CHANGE_ACTIVE_GEOGRAPHY_LEVEL',newLevels))

  }
}

export function get_GeographyLevels(){
  return dispatch => {
      AGO_GeographyLevels()
        .then(function test(response){

          //check repsonses for errors
          let theGeographyLevels = CheckReponse(response,'AGO_API_ERROR');

          //instatiate variables and default values
          let GList = [];
          let active = false;
          let filter = '';
          let current_id = '';

          //loop the geography_levels and build the geography_level state obect
          theGeographyLevels.features.map(function(features) {

             //get values for label and level   //instatiate variables
             let geography_label = features.properties.geography_label;
             let geography_level = features.properties.geography_level;

             //create new geography_level state object
             let thisGeographyList = {geography_level, geography_label, active , filter, current_id};

             //add the geography_level object to new state array
             GList.push(thisGeographyList)
           })

          //send the geography level data on
          dispatch(geography_levels('GET_GEOGRAPHY_LEVELS',GList))
        })
        .catch(error => { console.log('request failed', error); });
  }
}

//new geography_levels object to pass to reducer
function geography_levels(type,data) {
  return {
    type: type,
    geography_levels: data,
    receivedAt: Date.now()
  }
}
