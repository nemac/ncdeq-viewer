var axios = require('axios');

//base URl
const Basin_FeatureID = 0;
const CatalogingUnit_FeatureID = 1;
const HUC12_FeatureID = 2;
const Data_FeatureID = 3;
const HUCNames_FeatureID = 4;

const ago_URL = 'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services'
const actualBasins = '/RDRBP/FeatureServer/' + Basin_FeatureID + '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
const actualCatalogingUnits = '/RDRBP/FeatureServer/' + CatalogingUnit_FeatureID + '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='
const actualHUCS = '/RDRBP/FeatureServer/' + HUC12_FeatureID + '/query?where=id%3C%3E%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=id,NAME,VALUE,MAIN,SUB&returnGeometry=false&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='


//set base URL for axios
axios.defaults.baseURL = ago_URL;

//create menu list
const menuLists = [];

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

function buildNameList(name){
    return {
      name,
      lists:[]
    }
}

//builds a menu list
function buildMenuList (name, menuList, geoJSON){
  var ml = [];
  var nameList = buildNameList(name);

  ml.push( nameList );

  //map the menu list
  ml.map(function(menu){
    //check if name matches the passed name
    if(menu.name === name){
      //map geojson features and add the properties (attributes) to the list
      //  this will populate the menu items
      geoJSON.features.map(function(features) {
         menu.lists.push(features.properties)
       })
    }
  })

  //return new menu list
  return ml[0]
}

//merges two json data lists
//   nested would not do {...list1, ...list2}
function mergeList(list1,list2){
  var merged = [];

  //if already an array just create a new array
  if (Array.isArray(list1)){
    merged = list1
  } else{
    merged.push(list1);
  }

  //merged.push(l1);
  merged.push(list2);

  return merged
}

function response_error(error, from) {
  return { error, type: from };
}

function CheckReponse(response,from){
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }else{
    const error = new Error(response.statusText);
    error.response = response;
    dispatch(response_error(error,from));
    throw error;
  }
}

export function get_basinsAC(){
  return dispatch => {
    return axios.get(actualBasins)
    .then(response => {

      //check reponse status
      let data = CheckReponse(response,"AGO_API_ERROR");

      //get the menu list based on filtered features
      var ml = buildMenuList( 'River Basins', menuLists, data)
      return ml;

    })
     .then(RBList => {
       return axios.get(actualCatalogingUnits)
        .then(response => {

          //check reponse status
          let data = CheckReponse(response,"AGO_API_ERROR");

          //get the menu list based on filtered features
          var ml = buildMenuList( 'Cataloging Units', menuLists, data)

          //merge lists
          var merged = mergeList(RBList,ml)

          return merged;
        })
          .then(CUList => {
            return axios.get(actualHUCS)
              .then(response => {
                //check reponse status
                let data = CheckReponse(response,"AGO_API_ERROR");

                //get the menu list based on filtered features
                var ml = buildMenuList( 'HUC12', menuLists,  data)

                //merge lists
                var merged = mergeList(CUList,ml)

                //return the JSON list
                //return merged;
                dispatch(set_MenuList(merged));

              })
          })
     })
    .catch(error => { console.log('request failed', error); });
  }
}

function set_MenuList(json) {
  // console.log('action json:')
  // console.log(json)
  return {
    type: 'GET_LIST',
    lists: json,
    receivedAt: Date.now()
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}
